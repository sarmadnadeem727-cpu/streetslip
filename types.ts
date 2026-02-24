
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'men' | 'women';
  colors: { name: string; hex: string }[];
  sizes: number[];
  images: string[];
  colorImages?: Record<string, string[]>;
  description: string;
  isNew?: boolean;
  isHot?: boolean;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem extends Omit<Product, 'images'> {
  cartId: string;
  selectedSize: number;
  selectedColor: { name: string; hex: string };
  quantity: number;
  image: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: number, colorHex: string) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  showToast: (message: string, action?: { label: string; onClick: () => void }, duration?: number) => void;
}
