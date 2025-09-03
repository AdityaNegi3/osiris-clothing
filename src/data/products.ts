import { Product } from '../types/Product';

export const products: Product[] = [
  // LIMITED Edition Collection
  {
    id: 'limited-1',
    name: 'buy buy buy',
    price: 1599,
     originalPrice: 2999, // ✅ Added for discount display
    category: 'limited',
    frontImage: '/dragon 1 back.png',
    backImage: '/dragon 1 front.png',
    description: 'Exclusive LIMITED edition signature tee with premium cotton blend and gold foil detailing.'
  },
  {
    id: 'limited-2',
    name: 'THE BEATLES',
    price: 1,
    category: 'limited',
    frontImage: '/the beatles front.png',
    backImage: '/the beatles back.png',
    description: 'LIMITED collection featuring elegant gold script typography on premium fabric.'
  },
  {
    id: 'limited-3',
    name: 'BLACK SABBATH',
    price: 1,
    category: 'limited',
    frontImage: '/black sabbath front.png',
    backImage: '/black sabbath back.png',
    description: 'Royal edition with sophisticated design elements and luxury finishing.'
  },
  {
    id: 'limited-4',
    name: 'test sample',
    price: 1,
    category: 'limited',
    frontImage: '/sample1.png',
    backImage: '/back.png',
    description: 'Heritage collection piece with timeless design and premium craftsmanship.'
  },
  {
    id: 'limited-5',
    name: 'test',
    price: 1,
    category: 'limited',
    frontImage: '/tes12.png',
    backImage: '/test21.png',
    description: 'Luxury edition with exclusive design elements and superior material quality.'
  },
  {
    id: 'limited-6',
    name: 'ALL BANDS',
    price: 1,
    category: 'limited',
    frontImage: '/osiris front.png',
    backImage: '/all in one back.png',
    description: 'Elite collection featuring sophisticated aesthetics and premium comfort.'
  },

  // Dark Edition Collection
  {
    id: 'dark-1',
    name: 'OSIRIS MENTALITY ',
    price: 1,
    category: 'dark',
    frontImage: '/osiris middle front.png',
    backImage: '/osiris mentality front.png',
    description: 'Dark edition with shadow aesthetics and mysterious elegance.'
  },
  {
    id: 'dark-2',
    name: 'FRAGILE',
    price: 999,
    category: 'dark',
    frontImage: '/fragile front.png',
    backImage: '/fragile back.png',
    description: 'Midnight collection with deep black tones and subtle design details.'
  },
  {
    id: 'dark-3',
    name: 'EYES',
    price: 999,
    category: 'dark',
    frontImage: '/eyes front.png',
    backImage: '/back 12.png',
    description: 'Noir edition featuring sophisticated dark aesthetics and premium quality.'
  },
  {
    id: 'dark-4',
    name: 'Dark Edition Phantom Tee',
    price: 999,
    category: 'dark',
    frontImage: '/front 12.png',
    backImage: '/back 12.png',
    description: 'Phantom collection with mysterious allure and exceptional craftsmanship.'
  },
  {
    id: 'dark-5',
    name: 'Dark Edition Eclipse Tee',
    price: 999,
    category: 'dark',
    frontImage: '/front 12.png',
    backImage: '/back 12.png',
    description: 'Eclipse edition symbolizing the union of light and shadow in perfect harmony.'
  },
  {
    id: 'dark-6',
    name: 'Dark Edition Storm Tee',
    price: 999,
    category: 'dark',
    frontImage: '/front 12.png',
    backImage: '/back 12.png',
    description: 'Storm edition with bold aesthetics and fierce energy, crafted for statement wear.'
  },
  {
    id: 'dark-7',
    name: 'Dark Edition Flame Tee',
    price: 999,
    category: 'dark',
    frontImage: '/front 12.png',
    backImage: '/back 12.png',
    description: 'Flame edition inspired by passion and intensity, designed with vibrant details.'
  },
  {
    id: 'dark-8',
    name: 'Dark Edition Mist Tee',
    price: 999,
    category: 'dark',
    frontImage: '/front 12.png',
    backImage: '/back 12.png',
    description: 'Mist edition embodying subtle elegance with soft mysterious tones.'
  }
];
