// src/sellOrdersStore.ts
import { create } from "zustand";
import {
	createSellOrder,
	deleteSellOrderById,
	editSellOrderById,
	fetchAllSellOrders,
	fetchSellOrderById,
	getSellOrderByClientID,
	getSellOrderByProductId,
} from "../apiCalls/sellOrders";
import { SellOrder } from "../interfaces/SellOrder";
import { ApiResponse } from "../interfaces/ApiResponse";

interface SellOrdersState {
	sellOrders: SellOrder[];
	loading: boolean;
	totalPages: number;
	currentPage: number;
	setLoading: (loading: boolean) => void;
	setPage: (page: number) => void;
	fetchSellOrders: (page?: number) => Promise<void>;
	getSellOrderById: (id: string) => Promise<SellOrder | undefined>;
	createSellOrder: (newSellOrder: SellOrder) => Promise<ApiResponse>;
	editSellOrderById: (newSellOrder: SellOrder) => Promise<ApiResponse>;
	deleteSellOrderById: (id: string) => Promise<ApiResponse>;
	getSellOrderByProductID: (productId: string) => Promise<SellOrder[] | undefined>;
	getSellOrderByClientID: (clientId: string) => Promise<SellOrder[] | undefined>;
}

export const useSellOrdersStore = create<SellOrdersState>((set, get) => ({
	sellOrders: [],
	loading: false,
	totalPages: 0,
	currentPage: 1,
	setLoading: (loading: boolean) => set({ loading }),
	setPage: (page: number) => set({ currentPage: page }),
	fetchSellOrders: async (page = 1) => {
		set({ loading: true });
		try {
			const { sellOrders, totalPages, currentPage } =
				await fetchAllSellOrders(page);
			set({ sellOrders, totalPages, currentPage, loading: false });
		} catch (error) {
			console.error("Failed to fetch sellOrders", error);
		}
	}, //fetchSellOrders
	getSellOrderById: async (id: string): Promise<SellOrder | undefined> => {
		const { sellOrders } = get();
		const sellOrder = sellOrders.find((sellOrder) => sellOrder._id === id);
		if (sellOrder) return sellOrder;

		return await fetchSellOrderById(id);
		
	}, //getSellOrderById
	createSellOrder: async (newSellOrder: SellOrder): Promise<ApiResponse> => {
		set({ loading: true });
		try {
			const sellOrder = await createSellOrder(newSellOrder);
			if (sellOrder) {
				set((state) => ({
					sellOrders: [...state.sellOrders, sellOrder],
				}));
				set({ loading: false });
				return {
					success: true,
					message: "SellOrder created succesfully",
					data: sellOrder,
				};
			} else {
				return {
					success: false,
					message: "ERROR when creating sellOrder",
					data: null,
				};
			}
		} catch (error) {
			console.error("Failed to create sellOrder", error);
			return {
				success: false,
				message: "ERROR when creating sellOrder",
				data: error,
			};
		}
	}, //createSellOrder
	editSellOrderById: async (sellOrder: SellOrder): Promise<ApiResponse> => {
		set({ loading: true });
		try {
			const response = await editSellOrderById(sellOrder);
			if (response) {
				set((state) => ({
					sellOrders: state.sellOrders.map((item) =>
						item._id === sellOrder._id ? sellOrder : item
					),
				}));
				set({ loading: false });
				return {
					success: true,
					message: "SellOrder updated succesfully",
					data: response,
				};
			} else {
				return {
					success: false,
					message: "ERROR when updating sellOrder",
					data: null,
				};
			}
		} catch (error) {
			console.error("Failed to update sellOrder", error);
			return {
				success: false,
				message: "ERROR when updating sellOrder",
				data: error,
			};
		}
	}, //editSellOrderById
	deleteSellOrderById: async (id: string): Promise<ApiResponse> => {
		set({ loading: true });
		try {
			const response = await deleteSellOrderById(id);
			if (response && response.ok) {
				set((state) => ({
					sellOrders: state.sellOrders.filter(
						(sellOrder) => sellOrder._id !== id
					),
				}));
				set({ loading: false });
				return {
					success: true,
					message: "SellOrder deleted succesfully",
					data: response,
				};
			} else {
				return {
					success: false,
					message: "ERROR when deleting sellOrder",
					data: null,
				};
			}
		} catch (error) {
			console.error("Failed to delete sellOrder", error);
			return {
				success: false,
				message: "ERROR when deleting sellOrder",
				data: error,
			};
		}
	}, //deleteSellOrderById
	getSellOrderByProductID: async (productId: string): Promise<SellOrder[] | undefined> => {
		const { sellOrders } = get();
		const foundSelOrders = sellOrders
			.filter((sellOrder) =>
				sellOrder.products.some(
					(product) => product.product_id === productId
				)
			)
			.slice(-5);

		if (foundSelOrders && foundSelOrders.length > 0) return foundSelOrders;

		return await getSellOrderByProductId(productId);
	}, //getSellOrderByProductID
	getSellOrderByClientID: async (clientId: string): Promise<SellOrder[] | undefined> => {
		const { sellOrders } = get();
		const foundSelOrders = sellOrders.filter((sellOrder) => sellOrder.client_id === clientId).slice(-5);

		if (foundSelOrders && foundSelOrders.length > 0) return foundSelOrders;

		return await getSellOrderByClientID(clientId);
	}, //getSellOrderByProductID
}));
