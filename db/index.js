const { Pool } = require('pg');

const pool = new Pool({
  user: 'jordanvillacorta',
  password: 'Villacorta2018',
  database: 'product_overview',
  host: "localhost",
  port: 5432
});

pool.connect();

const getAllProducts = (req, res) => {
  pool.query('SELECT * FROM products LIMIT 5', (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.status(200).json(data.rows);
    }
  });
}

const getSingleProduct = (req, res) => {
  // console.log(req);
  pool.query('SELECT * FROM products LIMIT 1', (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log('PRODUCT ID:', data.rows[0].product_id);
      res.status(200).json(data.rows);
    }
  });
}

const getProductStyles = (req, res) => {
  // NEED TO JOIN/MERGE PHOTOS & SKUS TABLE
  pool.query('SELECT * FROM product_styles LIMIT 5', (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(data.rows);
      res.status(200).json(data.rows);
    }
  });
}

const getRelatedProducts = (req, res) => {
  pool.query('SELECT * FROM related_products LIMIT 5', (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(data.rows);
      res.status(200).json(data.rows);
    }
  });
}

const getCart = (req, res) => {
  pool.query('SELECT * FROM cart LIMIT 5', (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(data.rows);
      res.status(200).json(data.rows);
    }
  });
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  getProductStyles,
  getRelatedProducts,
  getCart
};