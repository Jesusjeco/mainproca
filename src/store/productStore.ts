// src/productsStore.ts
import { create } from "zustand";
import {
	createProduct,
	deleteProductById,
	editProductById,
	fetchAllProducts,
	fetchProductById,
} from "../apiCalls/products";
import { Product } from "../interfaces/Product";
import { ApiResponse } from "../interfaces/ApiResponse";

interface ProductsState {
	products: Product[];
	availableProducts: Product[];
	loading: boolean;
	fetchProducts: () => Promise<void>;
	createProduct: (newProduct: Product) => Promise<ApiResponse>;
	getProductById: (id: string) => Promise<Product | undefined>;
	getFetchedProductById: (id: string) => Product | undefined;
	editProductById: (product: Product) => Promise<ApiResponse>;
	deleteProductById: (id: string) => Promise<ApiResponse>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
	products: [],
	availableProducts: [],
	loading: false,
	fetchProducts: async () => {
		set({ loading: true });
		try {
			const products = await fetchAllProducts();
			const availableProducts = products.filter(
				(product) => product.quantity > 0
			);
			set({ products, availableProducts, loading: false });
		} catch (error) {
			console.error("Failed to fetch products", error);
		}
	}, //fetchProducts
	createProduct: async (newProduct: Product): Promise<ApiResponse> => {
		set({ loading: true });
		try {
			const product = await createProduct(newProduct);
			if (product) {
				set((state) => ({
					products: [...state.products, product],
				}));
				set({ loading: false });
				return {
					success: true,
					message: "Product created succesfully",
					data: product,
				};
			} else {
				return {
					success: false,
					message: "ERROR when creating product",
					data: null,
				};
			}
		} catch (error) {
			console.error("Failed to create product", error);
			return {
				success: false,
				message: "ERROR when creating product",
				data: error,
			};
		}
	}, //createProduct
	getProductById: async (id: string): Promise<Product | undefined> => {
		const { products } = get();
		const foundProduct = products.find((product) => product._id === id);
		if (foundProduct) return foundProduct;

		return await fetchProductById(id);
	}, //getProductById
	getFetchedProductById: (id: string): Product | undefined => {
		const { products } = get();
		return products.find((product) => product._id === id);
	}, //getProductById
	editProductById: async (product: Product): Promise<ApiResponse> => {
		set({ loading: true });
		try {
			const response = await editProductById(product);
			if (response && response.ok) {
				set((state) => ({
					products: state.products.map((item) =>
						item._id === product._id ? product : item
					),
				}));
				set({ loading: false });
				return {
					success: true,
					message: "Product updated succesfully",
					data: response,
				};
			} else {
				return {
					success: false,
					message: "ERROR when updating product",
					data: null,
				};
			}
		} catch (error) {
			console.error("Failed to update product", error);
			return {
				success: false,
				message: "ERROR when updating product",
				data: error,
			};
		}
	}, //editProductById
	deleteProductById: async (id: string): Promise<ApiResponse> => {
		set({ loading: true });
		try {
			const response = await deleteProductById(id);
			if (response && response.ok) {
				set((state) => ({
					products: state.products.filter(
						(product) => product._id !== id
					),
				}));
				set({ loading: false });
				return {
					success: true,
					message: "Product deleted succesfully",
					data: response,
				};
			} else {
				return {
					success: false,
					message: "ERROR when deleting product",
					data: null,
				};
			}
		} catch (error) {
			console.error("Failed to delete product", error);
			return {
				success: false,
				message: "ERROR when deleting product",
				data: error,
			};
		}
	}, //deleteClientById
}));
