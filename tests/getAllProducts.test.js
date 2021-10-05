const axios = require('axios');
const { getAllProducts } = require('../db/index.js');

test('should return a 200 response status', async () => {
  const status = await axios.get('http://localhost:3000/products')
    .then((response) => {
      return response.status;
    })
    expect(status).toBe(200);
});

test('should return 5 products', async () => {
  const productsList = await axios.get('http://localhost:3000/products')
    .then((response) => {
      return response.data.length === 5 ? true : false;
    })
  expect(productsList).toBe(true);
});