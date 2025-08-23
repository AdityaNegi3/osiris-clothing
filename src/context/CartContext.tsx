// src/context/CartContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
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
const LS_KEY = "osiris.cart.v1";

// --- helpers ---
const keyFor = (i: CartItem | { id: string; size: string }) => `${i.id}__${i.size}`;

function mergeCarts(a: CartItem[], b: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();
  [...a, ...b].forEach((it) => {
    const k = keyFor(it);
    const prev = map.get(k);
    if (prev) {
      map.set(k, { ...prev, quantity: prev.quantity + it.quantity });
    } else {
      map.set(k, { ...it });
    }
  });
  return Array.from(map.values());
}

function safeParse<T>(raw: unknown, fallback: T): T {
  try {
    if (typeof raw === "string") return JSON.parse(raw) as T;
    return fallback;
  } catch {
    return fallback;
  }
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const initializedRef = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1) Initial load: from localStorage, then (if signed in) merge with Clerk user metadata
  useEffect(() => {
    if (initializedRef.current) return;
    const fromLS = safeParse<CartItem[]>(localStorage.getItem(LS_KEY) || "[]", []);
    setCartItems(fromLS);
    initializedRef.current = true;
  }, []);

  // When Clerk finishes loading, merge Clerk cart -> local
  useEffect(() => {
    if (!isLoaded) return;
    (async () => {
      try {
        if (isSignedIn) {
          const meta = user?.publicMetadata as any;
          const serverCart: CartItem[] = Array.isArray(meta?.cart) ? meta.cart : [];
          if (serverCart.length) {
            setCartItems((local) => {
              const merged = mergeCarts(local, serverCart);
              // also push merged to LS immediately
              localStorage.setItem(LS_KEY, JSON.stringify(merged));
              return merged;
            });
          }
        }
      } catch (e) {
        console.warn("[Cart] Failed to read/merge Clerk cart:", e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn, user?.id]);

  // 2) Persist to localStorage on any change
  useEffect(() => {
    if (!initializedRef.current) return;
    localStorage.setItem(LS_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // 3) Debounced sync to Clerk publicMetadata when signed in
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await user.update({
          publicMetadata: {
            ...(user.publicMetadata || {}),
            cart: cartItems,
          },
        });
      } catch (e) {
        console.warn("[Cart] Failed to update Clerk cart:", e);
      }
    }, 600); // debounce 600ms
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [cartItems, isLoaded, isSignedIn, user]);

  // --- cart ops ---
  const addToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1, size }];
    });
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((i) => !(i.id === id && i.size === size));
      }
      return prev.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      );
    });
  };

  const clearCart = () => setCartItems([]);

  const getTotalPrice = () =>
    cartItems.reduce((t, i) => t + i.price * i.quantity, 0);

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
