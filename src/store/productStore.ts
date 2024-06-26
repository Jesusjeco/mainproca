// src/productsStore.ts
import { create } from 'zustand';
import { fetchAllProducts } from '../apiCalls/products';
import { Product } from '../interfaces/Product';

interface ProductsState {
    products: Product[];
    loading: boolean;
    fetchProducts: () => Promise<void>;
    getProductById: (id: string) => Product | undefined;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    loading: false,
    fetchProducts: async () => {
        set({ loading: true });
        try {
            const products = await fetchAllProducts();
            set({ products, loading: false });
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    },
    getProductById: (id: string) => {
        const { products } = get();
        return products.find(product => product._id === id);
    }
}));
