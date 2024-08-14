// src/purchaseOrdersStore.ts
import { create } from "zustand";
import {
	createPurchaseOrder,
	deletePurchaseOrderById,
	editPurchaseOrderById,
	fetchAllPurchaseOrders,
} from "../apiCalls/purchaseOrders";
import { PurchaseOrder } from "../interfaces/PurchaseOrder";
import { ApiResponse } from "../interfaces/ApiResponse";

interface PurchaseOrdersState {
	purchaseOrders: PurchaseOrder[];
	loading: boolean;
	totalPages: number;
	currentPage: number;
	setLoading: (loading: boolean) => void;
	setPage: (page: number) => void;
	fetchPurchaseOrders: (page?: number) => Promise<void>;
	getPurchaseOrderById: (id: string) => PurchaseOrder | undefined;
	createPurchaseOrder: (
		newPurchaseOrder: PurchaseOrder
	) => Promise<ApiResponse>;
	editPurchaseOrderById: (
		newPurchaseOrder: PurchaseOrder
	) => Promise<ApiResponse>;
	deletePurchaseOrderById: (id: string) => Promise<ApiResponse>;
	getPurchaseOrderByProductID: (productId: string) => PurchaseOrder[];
}

export const usePurchaseOrdersStore = create<PurchaseOrdersState>(
	(set, get) => ({
		purchaseOrders: [],
		loading: false,
		totalPages: 0,
		currentPage: 1,
		setLoading: (loading: boolean) => set({ loading }),
		setPage: (page: number) => set({ currentPage: page }),
		fetchPurchaseOrders: async (page = 1) => {
			set({ loading: true });
			try {
				const { purchaseOrders, totalPages, currentPage } =
					await fetchAllPurchaseOrders(page);
				set({
					purchaseOrders,
					totalPages,
					currentPage,
					loading: false,
				});
			} catch (error) {
				console.error("Failed to fetch purchaseOrders", error);
			}
		}, //fetchPurchaseOrders
		getPurchaseOrderById: (id: string): PurchaseOrder | undefined => {
			const { purchaseOrders } = get();
			const purchaseOrder = purchaseOrders.find(
				(purchaseOrder) => purchaseOrder._id === id
			);
			if (purchaseOrder) return purchaseOrder;
			else return undefined;
		}, //getPurchaseOrderById
		createPurchaseOrder: async (
			newPurchaseOrder: PurchaseOrder
		): Promise<ApiResponse> => {
			set({ loading: true });
			try {
				const purchaseOrder =
					await createPurchaseOrder(newPurchaseOrder);
				if (purchaseOrder) {
					set((state) => ({
						purchaseOrders: [
							...state.purchaseOrders,
							purchaseOrder,
						],
					}));
					set({ loading: false });
					return {
						success: true,
						message: "PurchaseOrder created succesfully",
						data: purchaseOrder,
					};
				} else {
					return {
						success: false,
						message: "ERROR when creating purchaseOrder",
						data: null,
					};
				}
			} catch (error) {
				console.error("Failed to create purchaseOrder", error);
				return {
					success: false,
					message: "ERROR when creating purchaseOrder",
					data: error,
				};
			}
		}, //createPurchaseOrder
		editPurchaseOrderById: async (
			purchaseOrder: PurchaseOrder
		): Promise<ApiResponse> => {
			set({ loading: true });
			try {
				const response = await editPurchaseOrderById(purchaseOrder);
				if (response) {
					set((state) => ({
						purchaseOrders: state.purchaseOrders.map((item) =>
							item._id === purchaseOrder._id
								? purchaseOrder
								: item
						),
					}));
					set({ loading: false });
					return {
						success: true,
						message: "PurchaseOrder updated succesfully",
						data: response,
					};
				} else {
					return {
						success: false,
						message: "ERROR when updating purchaseOrder",
						data: null,
					};
				}
			} catch (error) {
				console.error("Failed to update purchaseOrder", error);
				return {
					success: false,
					message: "ERROR when updating purchaseOrder",
					data: error,
				};
			}
		}, //editPurchaseOrderById
		deletePurchaseOrderById: async (id: string): Promise<ApiResponse> => {
			set({ loading: true });
			try {
				const response = await deletePurchaseOrderById(id);
				if (response && response.ok) {
					set((state) => ({
						purchaseOrders: state.purchaseOrders.filter(
							(purchaseOrder) => purchaseOrder._id !== id
						),
					}));
					set({ loading: false });
					return {
						success: true,
						message: "PurchaseOrder deleted succesfully",
						data: response,
					};
				} else {
					return {
						success: false,
						message: "ERROR when deleting purchaseOrder",
						data: null,
					};
				}
			} catch (error) {
				console.error("Failed to delete purchaseOrder", error);
				return {
					success: false,
					message: "ERROR when deleting purchaseOrder",
					data: error,
				};
			}
		}, //deletePurchaseOrderById
		getPurchaseOrderByProductID: (productId: string): PurchaseOrder[] => {
			const { purchaseOrders } = get();
			return purchaseOrders
				.filter((purchaseOrder) =>
					purchaseOrder.productsOrder.some(
						(productOrder) => productOrder.product_id === productId
					)
				)
				.slice(-5);
		},
	})
);
