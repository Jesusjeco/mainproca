// src/productsStore.ts
import { create } from 'zustand';
import { deleteProductById, fetchAllProducts } from '../apiCalls/products';
import { emptyProduct, Product } from '../interfaces/Product';
import { ApiResponse } from '../interfaces/ApiResponse';

interface ProductsState {
    products: Product[]
    availableProducts: Product[]
    loading: boolean
    setLoading: (loading: boolean) => void
    fetchProducts: () => Promise<void>
    getProductById: (id: string) => Product | undefined
    deleteProductById: (id: string) => Promise<ApiResponse>
}

export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    availableProducts: [],
    loading: false,
    setLoading: (loading: boolean) => set({ loading }), // setLoading,
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
    },//fetchProducts
    getProductById: (id: string): Product | undefined => {
        const { products } = get();
        const foundProduct = products.find(product => product._id === id);
        if (foundProduct)
            return foundProduct
        else
            return undefined
    },//getProductById
    deleteProductById: async (id: string): Promise<ApiResponse> => {
        set({ loading: true });
        try {
            const response = await deleteProductById(id);
            if (response && response.ok) {
                set((state) => ({
                    products: state.products.filter(product => product._id !== id),
                }));
                set({ loading: false });
                return {
                    success: true,
                    message: "Product deleted succesfully",
                    data: response,
                }
            } else {
                return {
                    success: false,
                    message: "ERROR when deleting product",
                    data: null,
                }
            }

        } catch (error) {
            console.error('Failed to delete product', error);
            return {
                success: false,
                message: "ERROR when deleting product",
                data: error,
            }
        }
    }//deleteClientById
}));