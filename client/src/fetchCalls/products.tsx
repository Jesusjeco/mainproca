/************************************
 * File with all Fetch calls for the model Product
*************************************/

//Fetching all products
export async function fetchAllProducts() {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(process.env.API_URL_PRODUCTS, requestOptions);

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

  console.log(process.env.API_URL_PRODUCTS + "/" + productId);

  try {
    const response = await fetch(process.env.API_URL_PRODUCTS + "/" + productId, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch Product by Id');
    }

    const singleProduct = await response.json();
    //console.log(singleProduct)
    return singleProduct;
  } catch (error) {
    console.error(error);
  };
}//fetchProductById