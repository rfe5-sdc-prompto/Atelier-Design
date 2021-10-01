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
  // console.log(req.query);
  let page = req.query.page || 1;
  let countLimit = req.query.count || 5;
  let limiter = parseInt(page * countLimit);
  pool.query(`SELECT * FROM products LIMIT ${limiter}`, (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(data.rows);
      res.status(200).send(data.rows);
    }
  });
  // const text = 'SELECT * FROM products VALUES($1, $2)';
  // const values = ['3', '10']
  // pool.query(text, values)
  //   .then(res => {
  //     console.log(res.rows)
  //   })
  //   .catch(e => console.error(e.stack))
}

const getSingleProduct = (req, res) => {
  const productId = req.params.product_id;
  console.log(productId);
  pool.query('SELECT * FROM products WHERE product_id = $1', [productId], (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(data.rows[0]);
      res.status(200).json(data.rows[0]);
    }
  });
}

const getProductStyles = (req, res) => {
  // console.log(req.params.product_id);
  // NEED TO JOIN/MERGE PHOTOS & SKUS TABLE
  pool.query('SELECT * FROM product_styles LIMIT 5', (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log('name', data.rows);
      res.status(200).json(data.rows);
    }
    // let productStyles = data.rows.map((singleRow) => {
    //   return {
    //     name: singleRow.name
    //   };
    // });
    // console.log('PRODUCT STYLE', productStyle);
    // return productStyles;
  });

  // });
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

const createCart = (req, res) => {
  const productId = req.body.product_id;
  // const query = {
  //   text: `INSERT INTO cart(product_id) VALUES($1)`,
  //   values: ["test"]
  // };
  pool.query(`INSERT INTO cart(product_id) VALUES($1)`, [productId], (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log('POSTED:', data.rows);
      res.status(201).send(data.rows);
    }
  });
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  getProductStyles,
  getRelatedProducts,
  getCart,
  createCart
};