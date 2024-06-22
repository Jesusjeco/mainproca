/************************************
 * File with all Fetch calls for the model Product
*************************************/
import { Product } from "../interfaces/Product";

//Fetching all products
export async function fetchAllProducts() {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(import.meta.env.VITE_API_URL_PRODUCTS, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch All Products');
    }

    const allProducts = await response.json();
    //console.log(allProducts)
    return allProducts;
  } catch (error) {
    console.error(error);
  };
}//fetchAllProducts

//Fetching single product by id
export async function fetchProductById(productId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(import.meta.env.VITE_API_URL_PRODUCTS + "/" + productId, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch Product by Id');
    }

    const singleProduct = await response.json();
    return singleProduct;
  } catch (error) {
    console.error(error);
  };
}//fetchProductById

//Creating a new product
export async function createProduct(newProduct: Product) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newProduct), // Serialize the product object to JSON string
    redirect: "follow"
  };

  try {
    const response = await fetch(import.meta.env.VITE_API_URL_PRODUCTS, requestOptions);
    const result = await response.text();

    return {
      success: response.ok,
      message: response.ok ? "Product created successfully" : "Failed to create product",
      data: result,
    };

  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Error creating product",
    };
  };
}//createProduct

//Edit product by Id
export async function editProductById(product: Product) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(product),
    redirect: "follow"
  };

  try {
    const response = await fetch(import.meta.env.VITE_API_URL_PRODUCTS + "/" + product._id, requestOptions);
    const result = await response.text();
    return {
      success: response.ok,
      message: response.ok ? "Product updated successfully" : "Failed to update product",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error creating product",
    };
  };
}

//Delete product by Id
export async function deleteProductById(productId: string) {
  const requestOptions: RequestInit = {
    method: "DELETE",
    redirect: "follow"
  };

  try {
    const response = await fetch(import.meta.env.VITE_API_URL_PRODUCTS + "/" + productId, requestOptions);
    //const result = await response.text();

    return response;

  } catch (error) {
    console.error(error);
  };
}