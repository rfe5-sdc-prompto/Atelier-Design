const express = require('express');
const app = express();
const pool = require('../db');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// ROUTES

app.get('/products', (req, res) => {
  res.status(200).json(res.rows);
})

app.listen(PORT, () => {
  console.log('Server is now running at port: ', PORT)
})