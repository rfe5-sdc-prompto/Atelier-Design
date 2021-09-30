const express = require('express');
const app = express();
const db = require('../db');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// ROUTES

// app.get('/products', (req, res) => {
//   res.json(res.rows);
// })

app.get('/products', db.getProducts)

app.listen(PORT, () => {
  console.log('Server is now running at port: ', PORT)
})