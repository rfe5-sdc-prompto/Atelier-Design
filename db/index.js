const { Pool } = require('pg');

const pool = new Pool({
  user: 'jordanvillacorta',
  password: 'Villacorta2018',
  database: 'product_overview',
  host: "localhost",
  port: 5432
});

pool.connect((err, data) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  } else {
    console.log(data);
  }
});
// [1] Get server up and running

const getAllProducts = (req, res) => {
  let page = req.query.page || 1;
  let countLimit = req.query.count || 5;
  let limiter = parseInt(page * countLimit);
  const pQuery = `SELECT * FROM products LIMIT ${limiter}`;
  pool.query(pQuery)
    .then((response) => {
      // console.log(response.rows);
      res.status(200).json(response.rows);
    })
    .catch(err => {
      console.log(err);
    })
}

const getSingleProduct = (req, res) => {
  const productId = req.params.product_id;
  const pQuery = `SELECT * FROM products WHERE products.id = ${productId}`;
  const fQuery = `SELECT feature, value FROM features WHERE features.feature_id=${productId}`;
  pool.query(pQuery)
    .then((response) => {
      let productInfo = response.rows;
      pool.query(fQuery)
        .then((featureData) => {
          productInfo[0].features = featureData.rows;
          // console.log(productInfo);
          res.status(200).json(productInfo);
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
    })
}

const getProductStyles = (req, res) => {
  let productId = req.params.product_id;
  let styleInfo = { product_id: productId, results: [] };
  const stylesQuery = `SELECT * FROM product_styles WHERE product_styles.product_id=${productId} LIMIT 5`;
  pool.query(stylesQuery)
    .then((response) => {
      styleInfo.results = response.rows;
      var test = styleInfo.results.map((result) => {
        let styleId = result.style_id;
        const photoQuery = `SELECT thumbnail_url, url FROM style_photos WHERE style_photos.style_id=${styleId} LIMIT 5`;
        const skuQuery = `SELECT sku_id, size, quantity FROM style_skus WHERE style_skus.style_id=${styleId} LIMIT 5`;
        return pool.query(photoQuery)
          .then((photoData) => {
            result.photos = photoData.rows;
            return pool.query(skuQuery)
            .then((skuData) => {
              result.skus = {};
              for (let i = 0; i < skuData.rows.length; i++) {
                let skuId = skuData.rows[i].sku_id;
                result.skus[skuId] = {
                  quantity: skuData.rows[i].quantity,
                  size: skuData.rows[i].size
                };
              }
              return result;
            })
            .catch(err => {
              console.log(err);
            })
          })
          .catch(err => {
            console.log(err);
          })
        })
      Promise.all(test)
        .then((data) => {
          return data;
        })
        .then((data) => {
          res.status(200).send(data);
        })
    })
    .catch(err => {
      console.log('Error:', err)
    });
}

const getRelatedProducts = (req, res) => {
  const productId = req.params.product_id;
  const relatedQuery = `SELECT * FROM related_products WHERE product_id=${productId} LIMIT 5`;
  pool.query(relatedQuery)
    .then((data) => {
      let relatedProductId = data.rows.map((singleRow) => {
        return singleRow.related_product_id;
      })
      // console.log(relatedProductId);
      res.status(200).json(relatedProductId);
    })
    .catch(err => {
      console.log(err);
    });
};

const getCart = (req, res) => {
  let cartQuery = `SELECT * FROM cart LIMIT 5`;
  pool.query(cartQuery)
    .then((data) => {
      console.log(data.rows);
      res.status(200).json(data.rows);
    })
    .catch(err => {
      console.log(err);
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