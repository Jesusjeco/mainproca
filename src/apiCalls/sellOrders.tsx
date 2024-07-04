/************************************
 * File with all Fetch calls for the model SellOrder
*************************************/
import { API_PURCHASE_ORDER_URL, SellOrder } from "../interfaces/SellOrder";

//Fetching all sellOrders
export async function fetchAllSellOrders() {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PURCHASE_ORDER_URL, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch All SellOrders');
    }

    const allSellOrders = await response.json();
    //console.log(allSellOrders)
    return allSellOrders;
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
    const response = await fetch(API_PURCHASE_ORDER_URL + "/" + sellOrderId, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch SellOrder by Id');
    }

    const singleSellOrder = await response.json();
    return singleSellOrder;
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
    const response = await fetch(API_PURCHASE_ORDER_URL, requestOptions);
    const result = await response.text();

    return {
      success: response.ok,
      message: response.ok ? "SellOrder created successfully" : "Failed to create sellOrder",
      data: result,
    };

  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Error creating sellOrder",
    };
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
    const response = await fetch(API_PURCHASE_ORDER_URL + "/" + sellOrder._id, requestOptions);
    const result = await response.text();
    return {
      success: response.ok,
      message: response.ok ? "SellOrder updated successfully" : "Failed to update sellOrder",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error creating sellOrder",
    };
  };
}

//Delete sellOrder by Id
export async function deleteSellOrderById(sellOrderId: string) {
  const requestOptions: RequestInit = {
    method: "DELETE",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PURCHASE_ORDER_URL + "/" + sellOrderId, requestOptions);
    //const result = await response.text();

    return response;

  } catch (error) {
    console.error(error);
  };
}