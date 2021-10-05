const axios = require('axios');
const { getSingleProduct } = require('../db/index.js');

test('should return a 200 response status', async () => {
  const status = await axios.get('http://localhost:3000/products/1')
    .then((response) => {
      return response.status;
    })
    expect(status).toBe(200);
});

// TEST --> MUST Finish
test('returns single product', async () => {
  const product = await axios.get('http://localhost:3000/products/1')
    .then((response) => {
      return response.data.length === 1 ? true : false;
    })
  expect(product).toBe(true);
})