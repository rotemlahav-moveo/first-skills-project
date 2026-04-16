import type { CartItem } from './types';

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'classic-tee',
    name: 'Classic Cotton Tee',
    color: 'White',
    size: 'M',
    price: 32,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=320&q=80',
  },
  {
    id: 'denim-jacket',
    name: 'Oversized Denim Jacket',
    color: 'Blue',
    size: 'L',
    price: 84,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=320&q=80',
  },
  {
    id: 'cargo-pants',
    name: 'Relaxed Cargo Pants',
    color: 'Olive',
    size: '32',
    price: 56,
    quantity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=320&q=80',
  },
];
