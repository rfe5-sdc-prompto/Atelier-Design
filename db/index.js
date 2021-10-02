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
  const pQuery = `SELECT * FROM products LIMIT ${limiter}`;
  // pool.query(pQuery, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     throw err;
  //   } else {
  //     res.status(200).json(data.rows);
  //   }
  // });
  pool.query(pQuery)
    .then((response) => {
      console.log(response.rows);
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
  // pool.query(pQuery, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     throw err;
  //   } else {
  //     const fQuery = `SELECT feature, value FROM features WHERE features.feature_id=${productId}`;
  //     // singleProduct data
  //     const productInfo = data.rows;
  //     pool.query(fQuery, (err, data) => {
  //       if (err) {
  //         console.log(err);
  //         throw err;
  //       } else {
  //         // create features array of fQuery's object and add to product Info
  //         productInfo[0].features = data.rows;
  //         res.status(200).json(productInfo);
  //       }
  //     })
  //   }
  // })
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
// pool.query(stylesQuery, (err, data) => {
//   if (err) {
//     console.log(err);
//     throw err;
//   } else {
//     console.log('name', data.rows);
//     res.status(200).json(data.rows);
//   }
//   if (err) {
//     console.log(err);
//     throw err;
//   } else {
//     console.log('name', data.rows);
//     res.status(200).json(data.rows);
//   }
// });

const getProductStyles = (req, res) => {
  let productId = req.params.product_id;
  // console.log(req.params);
  // NEED TO JOIN/MERGE PHOTOS & SKUS TABLE
  const stylesQuery = `SELECT * FROM product_styles WHERE product_styles.product_id=${productId} LIMIT 5`;
  pool.query(stylesQuery)
    .then((response) => {
      let stylesData = response.rows;
      return stylesData;
    })
      // let object = {
      //   product_id: productId,
      //   results: stylesData
      // }
      // console.log(object);
      // for (let i = 0; i < stylesData.length; i++) {
      //   let photoRow = stylesData[i];
      //   let resultStyleId = stylesData[i].style_id;
      //   console.log(resultStyleId);
      //   return resultStyleId;
      // }
      // const photoQuery = `SELECT thumbnail_url, url FROM style_photos WHERE style_photos.style_id=${resultStyleId} LIMIT 5`;
      // // console.log(photoQuery);
      // pool.query(photoQuery)
      // .then((photoData) => {
      //   res.status(200).json('hi');
      // })
      // .catch(err => {
      //   console.log(err);
      // })
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
  // if (err) {
  //   console.log(err);
  //   throw err;
  // } else {
  //   console.log(data.rows);
  //   res.status(200).json(data.rows);
  // }
};

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