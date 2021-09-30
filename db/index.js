const { Pool } = require('pg');

const pool = new Pool({
  user: 'jordanvillacorta',
  password: 'Villacorta2018',
  database: 'product_overview',
  host: "localhost",
  port: 5432
});

pool.connect();

pool.query('SELECT * FROM products LIMIT 5', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('5 products', res.rows);
  }
  pool.end();
});

// const client = new Client();






module.exports = pool;