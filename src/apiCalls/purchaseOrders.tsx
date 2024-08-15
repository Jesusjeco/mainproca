/************************************
 * File with all Fetch calls for the model PurchaseOrder
*************************************/
import { API_PURCHASE_ORDER_URL, PurchaseOrder } from "../interfaces/PurchaseOrder";

//Fetching all purchaseOrders
export async function fetchAllPurchaseOrders(page: number = 1) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PURCHASE_ORDER_URL + `/?page=${page}&limit=10`, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch All PurchaseOrders');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  };
}//fetchAllPurchaseOrders

//Fetching single purchaseOrder by id
export async function fetchPurchaseOrderById(purchaseOrderId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PURCHASE_ORDER_URL + "/" + purchaseOrderId, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch PurchaseOrder by Id');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  };
}//fetchPurchaseOrderById

//Creating a new purchaseOrder
export async function createPurchaseOrder(newPurchaseOrder: PurchaseOrder) {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newPurchaseOrder), // Serialize the purchaseOrder object to JSON string
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PURCHASE_ORDER_URL, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
  };
}//createPurchaseOrder

//Edit purchaseOrder by Id
export async function editPurchaseOrderById(purchaseOrder: PurchaseOrder) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(purchaseOrder),
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PURCHASE_ORDER_URL + "/" + purchaseOrder._id, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
  };
}

//Delete purchaseOrder by Id
export async function deletePurchaseOrderById(purchaseOrderId: string) {
  const requestOptions: RequestInit = {
    method: "DELETE",
    redirect: "follow"
  };

  try {
    return await fetch(API_PURCHASE_ORDER_URL + "/" + purchaseOrderId, requestOptions);
  } catch (error) {
    console.error(error);
  };
}

//Get sell orders by productId in the ProductOrder
export async function getPurchaseOrderByProductId(productId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PURCHASE_ORDER_URL + "/product/" + productId, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch PurchaseOrder by product Id');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  };
}

//Get sell orders by clientId in the ProductOrder
export async function getPurchaseOrderByClientID(clientId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PURCHASE_ORDER_URL + "/client/" + clientId, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch PurchaseOrder by client Id');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  };
}