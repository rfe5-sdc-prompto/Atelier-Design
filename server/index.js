const express = require('express');
const app = express();
const db = require('../db');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ROUTES

app.get('/products', db.getAllProducts);
app.get('/products/:product_id', db.getSingleProduct);
app.get('/products/:product_id/styles', db.getProductStyles);
app.get('/products/:product_id/related', db.getRelatedProducts);
app.get('/cart', db.getCart);
app.post('/cart', db.createCart);


app.listen(PORT, () => {
  console.log('Server is now running at port: ', PORT)
});