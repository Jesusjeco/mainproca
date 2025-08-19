/************************************
 * File with all Fetch calls for the model SellOrder
*************************************/
import { API_SELL_ORDER_URL, SellOrder } from "../interfaces/SellOrder";

//Fetching all sellOrders
export async function fetchAllSellOrders(page: number = 1) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_SELL_ORDER_URL + `/?page=${page}&limit=10`, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch All SellOrders');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  };
}//fetchAllSellOrders

//Fetching single sellOrder by id
export async function fetchSellOrderById(sellOrderId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_SELL_ORDER_URL + "/" + sellOrderId, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch SellOrder by Id');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  };
}//fetchSellOrderById

//Creating a new sellOrder
export async function createSellOrder(newSellOrder: SellOrder) {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newSellOrder), // Serialize the sellOrder object to JSON string
    redirect: "follow"
  };

  try {
    const response = await fetch(API_SELL_ORDER_URL, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
  };
}//createSellOrder

//Edit sellOrder by Id
export async function editSellOrderById(sellOrder: SellOrder) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(sellOrder),
    redirect: "follow"
  };

  try {
    const response = await fetch(API_SELL_ORDER_URL + "/" + sellOrder._id, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
  };
}

//Delete sellOrder by Id
export async function deleteSellOrderById(sellOrderId: string) {
  const requestOptions: RequestInit = {
    method: "DELETE",
    redirect: "follow"
  };

  try {
    return await fetch(API_SELL_ORDER_URL + "/" + sellOrderId, requestOptions);
  } catch (error) {
    console.error(error);
  };
}

//Get sell orders by productId in the ProductOrder
export async function getSellOrderByProductId(productId: string, page: number = 1, limit: number = 5) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_SELL_ORDER_URL + "/product/" + productId + `?page=${page}&limit=${limit}`, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch SellOrder by product Id');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  };
}

//Get sell orders by clientId in the ProductOrder
export async function getSellOrderByClientID(clientId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_SELL_ORDER_URL + "/client/" + clientId, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch SellOrder by client Id');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  };
}