"use client"; // Make sure this is a client-side component

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
}

const SearchProducts = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/products/search?query=${query}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#F5F5F7" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products"
        style={{ padding: "0.5rem", borderRadius: "5px", width: "100%", marginBottom: "1rem" }}
      />
      <button
        onClick={handleSearch}
        style={{
          marginBottom: "2rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#705C53",
          color: "#F5F5F7",
          borderRadius: "5px",
        }}
      >
        Search
      </button>

      <div>
        {results.map((product) => (
          <div key={product.id} style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#EDDFE0", borderRadius: "10px" }}>
            <img src={`/images/${product.imageUrl}`} alt={product.name} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProducts;
