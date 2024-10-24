"use client"; // Ensure this is a client component for hooks

import { useState, useEffect } from "react";

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

  // Fetch products from the MySQL database via the API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Add a new product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a FormData object to send product data including the image
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price.toString());
    formData.append("description", newProduct.description);
    formData.append("stock", newProduct.stock.toString());

    if (newProduct.imageFile) {
      formData.append("image", newProduct.imageFile);
    }

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    const addedProduct = await res.json();

    // Update product list
    setProducts([...products, addedProduct]);
    setNewProduct({ name: "", price: 0, imageFile: null, description: "", stock: 0 }); // Reset form
  };

  // Delete a product
  const handleDelete = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#F5F5F7" }}>
      <h1 style={{ color: "#705C53", textAlign: "center" }}>Manage Products</h1>

      {/* Add Product Form */}
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

        {/* Product Name */}
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Name:</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            style={{ padding: "0.5rem", borderRadius: "5px", width: "100%" }}
            required
          />
        </div>

        {/* Product Price */}
        <div style={{ marginTop: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Price:</label>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            style={{ padding: "0.5rem", borderRadius: "5px", width: "100%" }}
            required
          />
        </div>

        {/* Product Image */}
        <div style={{ marginTop: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Image:</label>
          <input
            type="file"
            onChange={(e) => setNewProduct({ ...newProduct, imageFile: e.target.files ? e.target.files[0] : null })}
            style={{ padding: "0.5rem", borderRadius: "5px", width: "100%" }}
            required
          />
        </div>

        {/* Product Description */}
        <div style={{ marginTop: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Description:</label>
          <textarea
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            style={{ padding: "0.5rem", borderRadius: "5px", width: "100%" }}
            required
          />
        </div>

        {/* Product Stock */}
        <div style={{ marginTop: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Stock:</label>
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

      {/* Products List */}
      <table
        style={{
          width: "100%",
          backgroundColor: "#EDDFE0",
          borderRadius: "10px",
        }}
      >
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
                <img
                  src={`/images/${product.imageUrl}`} // Using the public/images folder
                  alt={product.name}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  onClick={() => handleDelete(product.id)}
                  style={{ color: "#B7B7B7" }}
                >
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
