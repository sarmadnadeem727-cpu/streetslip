import { Product, Review } from './types';

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'apex-drift',
    name: "Apex Drift",
    price: 2080,
    originalPrice: 2600,
    category: 'men',
    colors: [{ name: 'Stealth Red', hex: '#FF0000' }],
    sizes: [7, 8, 9, 10],
    images: [
      "/images/fleet-red.jpg",
      "/images/fleet-red2.jpg"
    ],
    description: "OFFICIAL DROP: The Apex Drift. Deep black core with high-visibility red 3D embossed branding. Engineered for the ultimate street flex with dual-density cloud foam technology.",
    isNew: true
  },
  {
    id: 'vortex-shadow',
    name: "Vortex Shadow",
    price: 2250,
    originalPrice: 2800,
    category: 'men',
    colors: [
      { name: 'Core Blue', hex: '#0000FF' }
    ],
    sizes: [7, 8, 9, 10],
    images: [
      "/images/phantom-blue.jpg",
      "/images/phantom-blue2.jpg"
    ],
    description: "ELITE DROP: The Vortex Shadow in our exclusive 'Core Blue'. This article features a singular, deep blue core that dominates the urban landscape. Powered by 'Blue-Cloud' foam for 24/7 comfort.",
    isHot: true
  },
  {
    id: 'neon-wave',
    name: "Neon Wave Slide",
    price: 2160,
    originalPrice: 2700,
    category: 'men',
    colors: [
      { name: 'Black & White', hex: '#000000' }
    ],
    sizes: [7, 8, 9, 10],
    images: [
      "/images/nike-street-black.jpg",
      "/images/nike-street-black2.jpg"
    ],
    description: "LAUNCH SPECIAL: Street-ready aesthetic with a classic vibe. Featuring a soft foam strap and responsive footbed for maximum daily comfort and drip.",
  },
  {
    id: 'onyx-prime',
    name: "Onyx Prime",
    price: 2000,
    originalPrice: 2500,
    category: 'men',
    colors: [{ name: 'Core Black', hex: '#000000' }],
    sizes: [7, 8, 9, 10],
    images: [
      "/images/adidas-black.jpg",
      "/images/adidas-black2.jpg"
    ],
    description: "LAUNCH SPECIAL: The minimalist legend. Sleek, black, and purely functional. The Onyx Prime series is designed for those who let their walk do the talking."
  },
  {
    id: 'neon-wave-electric',
    name: "Neon Wave Slide",
    price: 2160,
    originalPrice: 2700,
    category: 'men',
    colors: [
      { name: 'Electric Green', hex: '#00FF00' }
    ],
    sizes: [7, 8, 9, 10],
    images: [
      "/images/nike-street-green.jpg",
      "/images/nike-street-green2.jpg"
    ],
    description: "LAUNCH SPECIAL: Street-ready aesthetic with a classic vibe. Featuring a soft foam strap and responsive footbed for maximum daily comfort and drip.",
  }
];

export const TRENDING_PRODUCTS = [
  ALL_PRODUCTS[0],
  ALL_PRODUCTS[1]
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/streetslipp?igsh=MWJ0anB0cGZvcTM5NA==",
  facebook: "https://www.facebook.com/share/1ARL1tJhwa/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@streetslipp?_r=1&_t=ZS-936J0ik40oi",
  whatsapp: "+923248866737"
};

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', user: "ayesha_cheema", rating: 5, comment: "Shadow in Core Blue is insane. The color depth is crazy in sunlight. Most comfortable pair I own.", date: "1 day ago", verified: true },
  { id: 'r2', user: "k_Waleed", rating: 5, comment: "Apex drift performance red is a whole vibe. Parcel inspection first is a W.", date: "1 week ago", verified: true },
  { id: 'r4', user: "Nomanabid5", rating: 5, comment: "Onyx Prime is classic. 2000 pkr for these is a joke, copped 2 pairs.", date: "Just now", verified: true },
  { id: 'r5', user: "zain_rocky", rating: 5, comment: "Electric Green Neon Waves are literal head-turners. The comfort is actually better than my expensive sneakers.", date: "2 days ago", verified: true },
  { id: 'r6', user: "fatima_dxb", rating: 5, comment: "Got my Vortex Shadows today. The quality is top-notch, and the packaging was super premium. Highly recommend!", date: "3 days ago", verified: true },
  { id: 'r7', user: "hamza_vibes", rating: 5, comment: "Finally found slides that don't feel cheap. These are worth every penny. PostEX delivery was smooth.", date: "4 days ago", verified: true }
];