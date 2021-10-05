const axios = require('axios');
const { getAllProducts } = require('../db/index.js');

// Promise
// test('returns get request data successfully', () => {
//   axios.get('http://localhost:3000/products')
//     .then((response) => {
//       // console.log(response.data);
//       expect(response).toBe(response);
//     })
// })

// Async / Await
test('should return 5 products', async () => {
  const productsList = await axios.get('http://localhost:3000/products', getAllProducts)
    .then((response) => {
      return response.data.length === 5 ? true : false;
    })
  expect(productsList).toBe(true);
});