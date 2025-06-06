import { productsApi } from '@/app/api/products';
import { ProductEntity } from '@/types/ProductCard';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ProductsState {
  items: ProductEntity[];
  page: number;
  total: number;
  amount: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page: number) => {
    const response = await productsApi.getProducts({ page });
    return {
      items: response.items,
      page: response.page,
      amount: response.amount,
      total: response.total,
    };
  },
);

const initialState: ProductsState = {
  items: [],
  page: 1,
  total: 0,
  amount: 0,
  hasMore: true,
  isLoading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, ...action.payload.items];
        state.page = action.payload.page;
        state.amount = action.payload.amount;
        state.total = action.payload.total;
        state.hasMore = state.items.length < state.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;
