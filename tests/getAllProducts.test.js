const axios = require('axios');
const { getAllProducts } = require('../db');

// Promise
// test('returns get request data successfully', () => {
//   axios.get('http://localhost:3000/products')
//     .then((response) => {
//       // console.log(response.data);
//       expect(response).toBe(response);
//     })
// })

// Async / Await
test('returns get request data successfully', async () => {
  const data = await axios.get('http://localhost:3000/products')
    .then((response) => {
      // console.log(response.data);
      return response;
    })
  expect(data).toBe(data);
});