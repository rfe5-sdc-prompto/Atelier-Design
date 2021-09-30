const { Pool } = require('pg');

const pool = new Pool({
  user: 'jordanvillacorta',
  password: 'Villacorta2018',
  database: 'product_overview',
  host: "localhost",
  port: 5432
});

pool.connect();

const getProducts = (request, response) => {
  pool.query('SELECT * FROM products LIMIT 5', (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      response.status(200).json(data.rows);
    }
    pool.end();
  });
}

module.exports = {
  getProducts
};