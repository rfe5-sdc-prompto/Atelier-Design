const axios = require('axios');
const { getRelatedProducts } = require('../db/index.js');

test('should return a 200 response status', async () => {
  const status = await axios.get('http://localhost:3000/products/1/related')
    .then((response) => {
      return response.status;
    })
    expect(status).toBe(200);
});

test('should return related products', async () => {
  const relatedProducts = await axios.get('http://localhost:3000/products/1/related')
    .then((response) => {
      return response.data.length > 0 ? true : false;
    })
    expect(relatedProducts).toBe(true);
});