export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // ✅ optional scratch price
  category: 'limited' | 'dark';
  frontImage: string;
  backImage: string;
  description: string;
}
