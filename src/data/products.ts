import { Product } from '../types/Product';

export const products: Product[] = [
  // LIMITED Edition Collection
  {
    id: 'limited-1',
    name: 'PINK FLOYD ',
    price: 1,
    category: 'limited',
    frontImage: '/1front.png',
    backImage: '/1.png',
    description: 'Exclusive LIMITED edition signature tee with premium cotton blend and gold foil detailing.'
  },
  {
    id: 'limited-2',
    name: 'GUNS & ROSES',
    price: 1499,
    category: 'limited',
    frontImage: '/2front.png',
    backImage: '/2.png',
    description: 'LIMITED collection featuring elegant gold script typography on premium fabric.'
  },
  {
    id: 'limited-3',
    name: 'EYES',
    price: 1499,
    category: 'limited',
    frontImage: '/eyes.png',
    backImage: '/back.png',
    description: 'Royal edition with sophisticated design elements and luxury finishing.'
  },
  {
    id: 'limited-4',
    name: 'LINKIN PARK',
    price: 1499,
    category: 'limited',
    frontImage: '/4 front.png',
    backImage: '/4.png',
    description: 'Heritage collection piece with timeless design and premium craftsmanship.'
  },
  {
    id: 'limited-5',
    name: 'GREEN DAY',
    price: 1499,
    category: 'limited',
    frontImage: '/5.png',
    backImage: '/5back.png',
    description: 'Luxury edition with exclusive design elements and superior material quality.'
  },
  {
    id: 'limited-6',
    name: 'OSIRIS',
    price: 1499,
    category: 'limited',
    frontImage: '/5.png',
    backImage: '/back.png',
    description: 'Elite collection featuring sophisticated aesthetics and premium comfort.'
  },
  // Dark Edition Collection
  {
    id: 'dark-1',
    name: 'Dark Edition Shadow Tee',
    price: 999,
    category: 'dark',
    frontImage: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
    backImage: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
    description: 'Dark edition with shadow aesthetics and mysterious elegance.'
  },
  {
    id: 'dark-2',
    name: 'Dark Edition Midnight Tee',
    price: 999,
    category: 'dark',
    frontImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
    backImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
    description: 'Midnight collection with deep black tones and subtle design details.'
  },
  {
    id: 'dark-3',
    name: 'Dark Edition Noir Tee',
    price: 999,
    category: 'dark',
    frontImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
    backImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
    description: 'Noir edition featuring sophisticated dark aesthetics and premium quality.'
  },
  {
    id: 'dark-4',
    name: 'Dark Edition Phantom Tee',
    price: 999,
    category: 'dark',
    frontImage: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
    backImage: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
    description: 'Phantom collection with mysterious allure and exceptional craftsmanship.'
  }
];