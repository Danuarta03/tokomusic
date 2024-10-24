import mysql from 'mysql2/promise';

// Configure the connection pool for the Ubuntu server
const db = mysql.createPool({
  host: 'localhost', // IP or domain of your Ubuntu server
  user: 'root',
  password: 'moonrayz',
  database: 'music_store', // Database name
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch products from the MySQL database
      const [rows] = await db.query('SELECT * FROM products');
      res.status(200).json(rows);
    } catch (error) {
      // Log the error and send a server error response
      console.error('Error fetching products:', error.message);
      res.status(500).json({ error: 'Error fetching products' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, price, description, stock } = req.body;

      // Check if all required fields are present
      if (!name || !price || !description || !stock) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Insert new product into MySQL database
      const result = await db.query(
        'INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)',
        [name, parseFloat(price), description, parseInt(stock)]
      );

      const insertedProductId = result[0].insertId;

      // Fetch the newly inserted product
      const [insertedProduct] = await db.query('SELECT * FROM products WHERE id = ?', [insertedProductId]);
      
      res.status(201).json(insertedProduct[0]); // Send back the newly added product

    } catch (error) {
      // Log the error and send a server error response
      console.error('Error adding product:', error.message);
      res.status(500).json({ error: 'Error adding product' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      // Check if `id` is provided
      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
      }

      // Delete product from the MySQL database
      const result = await db.query('DELETE FROM products WHERE id = ?', [id]);

      // If no rows were affected, the product doesn't exist
      if (result[0].affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      // Log the error and send a server error response
      console.error('Error deleting product:', error.message);
      res.status(500).json({ error: 'Error deleting product' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
