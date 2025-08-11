import { create } from 'zustand';
import type { Product } from '@/lib/types';

export type CartItem = Product & {
  quantity: number;
  selectedColor?: {
    name: string;
    image: string;
  };
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, selectedColor?: { name: string; image: string }) => void;
  removeItem: (productId: string, selectedColorName?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColorName?: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product, selectedColor) =>
    set((state) => {
      // Find existing item with same product ID and color
      const existingItem = state.items.find(
        (item) =>
          item.id === product.id &&
          (selectedColor
            ? item.selectedColor?.name === selectedColor.name
            : !item.selectedColor)
      );

      if (existingItem) {
        // Update quantity of existing item
        return {
          items: state.items.map((item) =>
            item.id === product.id &&
            (selectedColor
              ? item.selectedColor?.name === selectedColor.name
              : !item.selectedColor)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Add new item to cart
        return {
          items: [...state.items, { ...product, quantity: 1, selectedColor }],
        };
      }
    }),
  removeItem: (productId, selectedColorName?) =>
    set((state) => ({
      items: state.items.filter(
        (item) =>
          !(
            item.id === productId &&
            (selectedColorName
              ? item.selectedColor?.name === selectedColorName
              : !item.selectedColor)
          )
      ),
    })),
  updateQuantity: (productId, quantity, selectedColorName?) =>
    set((state) => {
      if (quantity < 1) {
        return {
          items: state.items.filter(
            (item) =>
              !(
                item.id === productId &&
                (selectedColorName
                  ? item.selectedColor?.name === selectedColorName
                  : !item.selectedColor)
              )
          ),
        };
      }
      return {
        items: state.items.map((item) =>
          item.id === productId &&
          (selectedColorName
            ? item.selectedColor?.name === selectedColorName
            : !item.selectedColor)
            ? { ...item, quantity }
            : item
        ),
      };
    }),
}));