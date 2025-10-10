import { Product } from '../types/Product';

export const products: Product[] = [
  // LIMITED Edition Collection
  {
    id: 'limited-1',
    name: 'Serpent of Shadows',
    price: 1599,
     originalPrice: 2999, // ✅ Added for discount display
    category: 'limited',
    frontImage: '/shadows front.jpg',
    backImage: '/shawdows back.jpg',
    description: 'Wear the serpent. Command the streets.'
  },
  {
    id: 'limited-2',
    name: "CRIMSON'S WRATH",
    price: 1299,
    category: 'limited',
    frontImage: "/crimson front.jpg",
    backImage: "/crimson back.jpg",
    description: 'Unleash the wrath. Wear the crimson.'
  },
  {
    id: 'limited-3',
    name: 'Blossoms & Fangs',
    price: 1299,
    category: 'limited',
    frontImage: '/fangs front.jpg',
    backImage: '/fangs back.jpg',
    description: 'A bold essential crafted for those who demand both style and edge.'
  },
  {
  id: "limited-4",
  name: "Mythic Rage",
  price: 1099,
  originalPrice: 1999,
  category: "limited",
  frontImage: '/Mythic Rage front.jpg',
  backImage: "/Mythic Rage.jpg",
  description: "An exclusive heritage drop, bringing timeless myth and modern edge together."
  },
  {
    id: 'limited-5',
    name: 'The Last Warrior',
    price: 1299,
    category: 'limited',
    frontImage: '/last warriror front.jpg',
    backImage: '/last warriror back.jpg',
    description: 'Luxury edition with exclusive design elements and superior material quality.'
  },
  {
    id: 'limited-6',
    name: 'Eternal Balance',
    price: 1,
    category: 'limited',
    frontImage: '/uhoh front.jpg',
    backImage: '/Eternal Balance back.jpg',
    description: 'Elite collection featuring sophisticated aesthetics and premium comfort.'
  },

  // Dark Edition Collection
  {
    id: 'dark-1',
    name: 'Pierce of Serenity',
    price: 1,
    category: 'dark',
    frontImage: '/flowers front.jpg',
    backImage: "/flowers back.jpg",
    description: 'Dark edition with shadow aesthetics and mysterious elegance.'
  },
  {
    id: 'dark-2',
    name: 'FRAGILE',
    price: 999,
    category: 'dark',
    frontImage: '/adi test front.jpg',
    backImage: '/fangs back.jpg',
    description: 'Midnight collection with deep black tones and subtle design details.'
  },
  {
    id: 'dark-3',
    name: 'EYES',
    price: 999,
    category: 'dark',
    frontImage: '/snakeflower front.jpg',
    backImage: '/snakeflower back.jpg',
    description: 'Noir edition featuring sophisticated dark aesthetics and premium quality.'
  },
  {
    id: 'dark-4',
    name: 'Dark Edition Phantom Tee',
    price: 999,
    category: 'dark',
    frontImage: '/fangs back.jpg',
    backImage: '/fangs back.jpg',
    description: 'Phantom collection with mysterious allure and exceptional craftsmanship.'
  },
  {
    id: 'dark-5',
    name: 'Dark Edition Eclipse Tee',
    price: 999,
    category: 'dark',
    frontImage: '/fangs back.jpg',
    backImage: '/fangs back.jpg',
    description: 'Eclipse edition symbolizing the union of light and shadow in perfect harmony.'
  },
  {
    id: 'dark-6',
    name: 'Dark Edition Storm Tee',
    price: 999,
    category: 'dark',
    frontImage: '/adi test front.jpg',
    backImage: '/fangs back.jpg',
    description: 'Storm edition with bold aesthetics and fierce energy, crafted for statement wear.'
  },
  // {
  //   id: 'dark-7',
  //   name: 'Dark Edition Flame Tee',
  //   price: 999,
  //   category: 'dark',
  //   frontImage: '/adi test front.jpg',
  //   backImage: '/fangs back.jpg',
  //   description: 'Flame edition inspired by passion and intensity, designed with vibrant details.'
  // },
  // {
  //   id: 'dark-8',
  //   name: 'Dark Edition Mist Tee',
  //   price: 999,
  //   category: 'dark',
  //   frontImage: '/adi test front.jpg',
  //   backImage: '/fangs back.jpg',
  //   description: 'Mist edition embodying subtle elegance with soft mysterious tones.'
  // }
];
