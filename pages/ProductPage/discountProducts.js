import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Components/ProductCard";
import Layout from "../Components/Layout";

export default function DiscountProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => setProducts(response.data));
  }, []);
  const discountProducts = products.filter(
    (product) => product.discountRate != null
  );
  return (
    <Layout>
      {Array.isArray(discountProducts) ? (
        <Card>{discountProducts}</Card>
      ) : (
        <h2>No discount products available</h2>
      )}
    </Layout>
  );
}
