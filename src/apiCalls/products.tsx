/************************************
 * File with all Fetch calls for the model Product
*************************************/
import { API_PRODUCTS_URL, Product } from "../interfaces/Product";

//Fetching all products
export async function fetchAllProducts(): Promise<Product[]> {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PRODUCTS_URL, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch All Products');
    }

    const allProducts = await response.json();
    // console.log('Respuesta de fetchAllProducts');
    //console.log(allProducts)
    return allProducts;
  } catch (error) {
    console.error(error);
    return [];
  };
}//fetchAllProducts

//Fetching single product by id
export async function fetchProductById(productId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(API_PRODUCTS_URL + "/" + productId, requestOptions);

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
    const response = await fetch(API_PRODUCTS_URL, requestOptions);
    return await response.json();
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
    const response = await fetch(API_PRODUCTS_URL + "/" + product._id, requestOptions);
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
    return await fetch(API_PRODUCTS_URL + "/" + productId, requestOptions);
  } catch (error) {
    console.error(error);
  };
}