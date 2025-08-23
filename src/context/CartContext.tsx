// src/context/CartContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { useUser } from "@clerk/clerk-react";
import { Product } from "../types/Product";

interface CartItem extends Product {
  quantity: number;
  size: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

// --- config: choose behavior on sign-out ---
const CLEAR_ON_SIGN_OUT = true; // set to false if you want to keep guest cart after logout

// --- storage keys ---
const LS_GUEST = "osiris.cart.guest.v1";
const userKey = (userId: string) => `osiris.cart.user.${userId}.v1`;

// --- utils ---
const keyFor = (i: { id: string; size: string }) => `${i.id}__${i.size}`;

function mergeCarts(a: CartItem[], b: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();
  [...a, ...b].forEach((it) => {
    const k = keyFor(it);
    const prev = map.get(k);
    map.set(k, prev ? { ...prev, quantity: prev.quantity + it.quantity } : { ...it });
  });
  return Array.from(map.values());
}

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const prevSignedIn = useRef<boolean>(false);
  const initialised = useRef(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1) Initial load: start with guest cart from localStorage
  useEffect(() => {
    if (initialised.current) return;
    const guest = safeParse<CartItem[]>(localStorage.getItem(LS_GUEST), []);
    setCartItems(guest);
    initialised.current = true;
  }, []);

  // 2) React to auth state transitions
  useEffect(() => {
    if (!isLoaded) return;

    // just signed in
    if (!prevSignedIn.current && isSignedIn && user) {
      (async () => {
        try {
          // pull server cart from privateMetadata
          const meta = (user.privateMetadata as any) || {};
          const server: CartItem[] = Array.isArray(meta.cart) ? meta.cart : [];

          // merge once with any guest cart
          const guest = safeParse<CartItem[]>(localStorage.getItem(LS_GUEST), []);
          const merged = mergeCarts(server, guest);

          setCartItems(merged);

          // persist merged to local (user-specific) + clear guest store
          localStorage.setItem(userKey(user.id), JSON.stringify(merged));
          localStorage.removeItem(LS_GUEST);

          // push merged back to Clerk
          await user.update({ privateMetadata: { ...(user.privateMetadata || {}), cart: merged } });
        } catch (e) {
          console.warn("[Cart] merge on sign-in failed:", e);
        }
      })();
    }

    // just signed out
    if (prevSignedIn.current && !isSignedIn) {
      if (CLEAR_ON_SIGN_OUT) {
        setCartItems([]);
        localStorage.removeItem(LS_GUEST); // optional: also remove guest stash
      } else {
        // fallback to guest cart if you prefer keeping it
        const guest = safeParse<CartItem[]>(localStorage.getItem(LS_GUEST), []);
        setCartItems(guest);
      }
    }

    prevSignedIn.current = isSignedIn;
  }, [isLoaded, isSignedIn, user]);

  // 3) Persist changes
  useEffect(() => {
    if (!initialised.current) return;

    // always save guest snapshot so non-auth users keep their cart
    if (!isSignedIn) {
      localStorage.setItem(LS_GUEST, JSON.stringify(cartItems));
    } else if (user) {
      // save a user-local snapshot (handy for quick reloads)
      localStorage.setItem(userKey(user.id), JSON.stringify(cartItems));

      // debounce writes to Clerk privateMetadata
      if (debounce.current) clearTimeout(debounce.current);
      debounce.current = setTimeout(async () => {
        try {
          await user.update({
            privateMetadata: { ...(user.privateMetadata || {}), cart: cartItems },
          });
        } catch (e) {
          console.warn("[Cart] save to Clerk failed:", e);
        }
      }, 500);
    }
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [cartItems, isSignedIn, user]);

  // --- cart ops ---
  const addToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id && i.size === size);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
    }
      return [...prev, { ...product, size, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setCartItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => !(i.id === id && i.size === size));
      return prev.map((i) => (i.id === id && i.size === size ? { ...i, quantity } : i));
    });
  };

  const clearCart = () => setCartItems([]);

  const getTotalPrice = () => cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const getTotalItems = () => cartItems.reduce((t, i) => t + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
