const axios = require('axios');
// const { getAllProducts } = require('../db/index.js');

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
  const data = await axios.get('http://localhost:3000/products')
    .then((response) => {
      return response.data.length === 5 ? true : false;
    })
  expect(data).toBe(true);
});