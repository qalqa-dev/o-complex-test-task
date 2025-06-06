import { CartItem } from '@/types/CartItem';
import { createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: CartItem[];
}

const CART_STORAGE_KEY = 'cartState';

const loadStateFromLocalStorage = (): CartState => {
  if (typeof window === 'undefined') {
    return { items: [] };
  }

  try {
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedState === null) {
      return { items: [] };
    }
    return JSON.parse(serializedState) as CartState;
  } catch (error) {
    console.warn('Failed to load cart state from localStorage', error);
    return { items: [] };
  }
};

const initialState: CartState = loadStateFromLocalStorage();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, title, price, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        state.items.push({ id, title, price, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity -= quantity;

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },
    updateCartItem: (state, action: PayloadAction<CartItem>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity = quantity;
        }
      }
    },
    clearCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const cartLocalStorageMiddleware: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (store) => (next) => (action: any) => {
    const result = next(action);

    if (action.type.startsWith('cart/')) {
      if (typeof window !== 'undefined') {
        const cartState = store.getState().cart;
        try {
          const serializedState = JSON.stringify(cartState);
          localStorage.setItem(CART_STORAGE_KEY, serializedState);
        } catch (error) {
          console.warn('Failed to save cart state to localStorage', error);
        }
      }
    }

    return result;
  };

export const { addToCart, updateCartItem, removeFromCart, clearCart } =
  cartSlice.actions;

export const getCartItemCount = (state: CartState, id: number) => {
  const item = state.items.find((item) => item.id === id);
  return item ? item.quantity : 0;
};

export default cartSlice.reducer;
