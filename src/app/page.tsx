"use client";  // This must be the first line

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

const Shopfront = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ backgroundColor: "#F5F5F7", padding: "2rem" }}>
      <h1 style={{ color: "#705C53", textAlign: "center" }}>Music Store</h1>
      <div
        className="product-grid"
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: "#EDDFE0",
              padding: "1rem",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h3 style={{ color: "#705C53" }}>{product.name}</h3>
            <p style={{ color: "#B7B7B7" }}>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopfront;
