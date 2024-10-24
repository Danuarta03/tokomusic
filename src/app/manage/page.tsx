"use client"; // Pastikan ini adalah komponen client-side

import { useState, useEffect } from "react";
import Image from 'next/image'; // Import komponen Image dari Next.js

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
}

const ManageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    imageFile: null as File | null,
    description: "",
    stock: 0,
  });

  // Fetch products dari API dengan tambahan log error ke terminal
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error(`Failed to fetch products. Status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Menambah produk baru dengan log yang lebih baik untuk melihat kesalahan di terminal
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi data input
    if (!newProduct.name || newProduct.price <= 0 || !newProduct.imageFile || newProduct.stock < 0) {
      alert("Please fill all fields correctly");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price.toString());
    formData.append("description", newProduct.description);
    formData.append("stock", newProduct.stock.toString());

    if (newProduct.imageFile) {
      formData.append("image", newProduct.imageFile);
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error(`Error adding product: ${res.status} - ${res.statusText}`);
        throw new Error('Failed to add product');
      }

      const addedProduct = await res.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ name: "", price: 0, imageFile: null, description: "", stock: 0 });
      alert('Product added successfully!'); // Success alert

    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.'); // Error alert
    }
  };

  // Menghapus produk dengan log yang lebih jelas
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (!res.ok) {
        console.error(`Error deleting product with ID ${id}: ${res.status} - ${res.statusText}`);
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter((product) => product.id !== id));
      alert('Product deleted successfully!'); // Success alert

    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      alert('Failed to delete product. Please try again.'); // Error alert
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#F5F5F7" }}>
      <h1 style={{ color: "#705C53", textAlign: "center" }}>Manage Products</h1>

      {/* Form untuk menambah produk baru */}
      <form
        onSubmit={handleAddProduct}
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          backgroundColor: "#EDDFE0",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ color: "#705C53", marginBottom: "1rem" }}>Add New Product</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            style={{ padding: "0.5rem", borderRadius: "5px", width: "100%" }}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Price:</label>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            style={{ padding: "0.5rem", borderRadius: "5px", width: "100%" }}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setNewProduct({ ...newProduct, imageFile: e.target.files ? e.target.files[0] : null })}
            style={{ padding: "0.5rem", borderRadius: "5px", width: "100%" }}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Description:</label>
          <textarea
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            style={{ padding: "0.5rem", borderRadius: "5px", width: "100%" }}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Stock:</label>
          <input
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
            style={{ padding: "0.5rem", borderRadius: "5px", width: "100%" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#705C53",
            color: "#F5F5F7",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>

      {/* Daftar produk */}
      <table style={{ width: "100%", backgroundColor: "#EDDFE0", borderRadius: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#705C53", color: "#F5F5F7" }}>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Image
                  src={`/images/${product.imageUrl}`} // Menggunakan Next.js Image untuk optimasi gambar
                  alt={product.name}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleDelete(product.id)} style={{ color: "#B7B7B7" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
