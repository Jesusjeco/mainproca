// src/productsStore.ts
import { create } from 'zustand';
import { fetchAllProducts } from '../apiCalls/products';
import { emptyProduct, Product } from '../interfaces/Product';

interface ProductsState {
    products: Product[];
    availableProducts: Product[];
    loading: boolean;
    fetchProducts: () => Promise<void>;
    getProductById: (id: string) => Product;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    availableProducts: [],
    loading: false,
    fetchProducts: async () => {
        set({ loading: true });
        try {
            const products = await fetchAllProducts();
            const availableProducts = products.filter(product => product.quantity > 0)
            set({ products });
            set({ availableProducts });
            set({ loading: false })
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    },
    getProductById: (id: string) => {
        const { products } = get();
        const foundProduct = products.find(product => product._id === id);
        if (foundProduct)
            return foundProduct
        else
            return emptyProduct
    }
}));
