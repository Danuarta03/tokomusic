"use client"; // Pastikan ini adalah komponen client-side

import { useState } from "react";
import Image from 'next/image'; // Import komponen Image

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
    try {
      const res = await fetch(`/api/products/search?query=${query}`);
      if (!res.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
      alert('Failed to fetch search results. Please try again.'); // Error alert
    }
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
            <Image
              src={`/images/${product.imageUrl}`} // Menggunakan Next.js Image untuk optimasi gambar
              alt={product.name}
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
            />
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
