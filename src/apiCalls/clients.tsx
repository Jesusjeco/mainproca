/************************************
 * File with all Fetch calls for the model Client
*************************************/
import { API_CLIENTS_URL, Client } from "../interfaces/Client";

//Fetching all clients
export async function fetchAllClients(): Promise<Client[]> {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(API_CLIENTS_URL, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch All Clients');
    }

    const allClients = await response.json();
    // console.log('Respuesta de fetchAllClients');
    // console.log(allClients);
    return allClients;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of error
  }
}//fetchAllClients

//Fetching single client by id
export async function fetchClientById(clientId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_CLIENTS_URL + "/" + clientId, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch Client by Id');
    }

    const singleClient = await response.json();
    return singleClient;
  } catch (error) {
    console.error(error);
  };
}//fetchClientById

//Creating a new client
export async function createClient(newClient: Client): Promise<Client | undefined> {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newClient), // Serialize the client object to JSON string
    redirect: "follow"
  };

  try {
    const response = await fetch(API_CLIENTS_URL, requestOptions)
    return await response.json();
  } catch (error) {
    console.error(error);
  };
}//createClient

//Edit client by Id
export async function editClientById(client: Client) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(client),
    redirect: "follow"
  };

  try {
    return await fetch(API_CLIENTS_URL + "/" + client._id, requestOptions);
  } catch (error) {
    console.error(error);
  };
}

//Delete client by Id
export async function deleteClientById(clientId: string) {
  const requestOptions: RequestInit = {
    method: "DELETE",
    redirect: "follow"
  };

  try {
    return await fetch(API_CLIENTS_URL + "/" + clientId, requestOptions);
  } catch (error) {
    console.error(error);
  };
}
