/************************************
 * File with all Fetch calls for the model PurchaseOrder
*************************************/
import { API_PURCHASE_ORDER_URL, PurchaseOrder } from "../interfaces/PurchaseOrder";

//Fetching all purchaseOrders
export async function fetchAllPurchaseOrders() {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PURCHASE_ORDER_URL, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch All PurchaseOrders');
    }

    const allPurchaseOrders = await response.json();
    //console.log(allPurchaseOrders)
    return allPurchaseOrders;
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

    const singlePurchaseOrder = await response.json();
    return singlePurchaseOrder;
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
    const result = await response.text();

    return {
      success: response.ok,
      message: response.ok ? "PurchaseOrder created successfully" : "Failed to create purchaseOrder",
      data: result,
    };

  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Error creating purchaseOrder",
    };
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
    const result = await response.text();
    return {
      success: response.ok,
      message: response.ok ? "PurchaseOrder updated successfully" : "Failed to update purchaseOrder",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error creating purchaseOrder",
    };
  };
}

//Delete purchaseOrder by Id
export async function deletePurchaseOrderById(purchaseOrderId: string) {
  const requestOptions: RequestInit = {
    method: "DELETE",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PURCHASE_ORDER_URL + "/" + purchaseOrderId, requestOptions);
    //const result = await response.text();

    return response;

  } catch (error) {
    console.error(error);
  };
}