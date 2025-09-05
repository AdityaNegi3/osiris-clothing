import { Product } from '../types/Product';

export const products: Product[] = [
  // LIMITED Edition Collection
  {
    id: 'limited-1',
    name: 'OSIRIS DRAGON',
    price: 1599,
     originalPrice: 2999, // ✅ Added for discount display
    category: 'limited',
    frontImage: '/dragon 33 back.jpg',
    backImage: '/dragon 33 front.jpg',
    description: 'Exclusive LIMITED edition signature tee with premium cotton blend and gold foil detailing.'
  },
  {
    id: 'limited-2',
    name: 'THE BEATLES',
    price: 1,
    category: 'limited',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'LIMITED collection featuring elegant gold script typography on premium fabric.'
  },
  {
    id: 'limited-3',
    name: 'BLACK SABBATH',
    price: 1,
    category: 'limited',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Royal edition with sophisticated design elements and luxury finishing.'
  },
  {
    id: 'limited-4',
    name: 'test sample',
    price: 1,
    category: 'limited',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Heritage collection piece with timeless design and premium craftsmanship.'
  },
  {
    id: 'limited-5',
    name: 'test',
    price: 1,
    category: 'limited',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Luxury edition with exclusive design elements and superior material quality.'
  },
  {
    id: 'limited-6',
    name: 'ALL BANDS',
    price: 1,
    category: 'limited',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Elite collection featuring sophisticated aesthetics and premium comfort.'
  },

  // Dark Edition Collection
  {
    id: 'dark-1',
    name: 'OSIRIS MENTALITY ',
    price: 1,
    category: 'dark',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Dark edition with shadow aesthetics and mysterious elegance.'
  },
  {
    id: 'dark-2',
    name: 'FRAGILE',
    price: 999,
    category: 'dark',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Midnight collection with deep black tones and subtle design details.'
  },
  {
    id: 'dark-3',
    name: 'EYES',
    price: 999,
    category: 'dark',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Noir edition featuring sophisticated dark aesthetics and premium quality.'
  },
  {
    id: 'dark-4',
    name: 'Dark Edition Phantom Tee',
    price: 999,
    category: 'dark',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Phantom collection with mysterious allure and exceptional craftsmanship.'
  },
  {
    id: 'dark-5',
    name: 'Dark Edition Eclipse Tee',
    price: 999,
    category: 'dark',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Eclipse edition symbolizing the union of light and shadow in perfect harmony.'
  },
  {
    id: 'dark-6',
    name: 'Dark Edition Storm Tee',
    price: 999,
    category: 'dark',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Storm edition with bold aesthetics and fierce energy, crafted for statement wear.'
  },
  {
    id: 'dark-7',
    name: 'Dark Edition Flame Tee',
    price: 999,
    category: 'dark',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Flame edition inspired by passion and intensity, designed with vibrant details.'
  },
  {
    id: 'dark-8',
    name: 'Dark Edition Mist Tee',
    price: 999,
    category: 'dark',
    frontImage: '/adi test front.jpg',
    backImage: '/adi test back.jpg',
    description: 'Mist edition embodying subtle elegance with soft mysterious tones.'
  }
];
