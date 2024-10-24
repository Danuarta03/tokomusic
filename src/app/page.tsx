"use client";  // Pastikan ini adalah komponen client-side

import { useEffect, useState } from "react";
import Image from 'next/image'; // Import komponen Image

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
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
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
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              style={{ borderRadius: "8px", objectFit: 'cover' }}
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
