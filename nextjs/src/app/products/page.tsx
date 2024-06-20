// pages/products.js
import React from 'react';

async function getAllProducts() {
  const res = await fetch("http://localhost:3001/api/products", { cache: 'force-cache' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Products = ({ data, error }) => {
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>This is Products component</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export async function getServerSideProps() {
  try {
    const data = await getAllProducts();
    return { props: { data } };
  } catch (error) {
    return { props: { data: null, error: error.message } };
  }
}

export default Products;
