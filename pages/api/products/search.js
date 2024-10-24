// pages/api/products/search.js
import mysql from 'mysql2/promise';

// Configure the connection pool for the Ubuntu server
const db = mysql.createPool({
  host: 'your-ubuntu-server-ip', // Replace with your actual IP or domain
  user: 'your-username',
  password: 'your-password',
  database: 'music_store', // Your database name
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { query } = req.query;

    // Validate that the query parameter exists
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
      // Search products by name in MySQL
      const [rows] = await db.query('SELECT * FROM products WHERE name LIKE ?', [`%${query}%`]);
      res.status(200).json(rows);
    } catch (error) {
      // Log and return server error
      console.error('Error searching products:', error.message);
      res.status(500).json({ error: 'Error searching products' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
