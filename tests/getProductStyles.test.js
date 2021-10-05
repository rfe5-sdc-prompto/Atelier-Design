const axios = require('axios');
const { getProductStyles } = require('../db/index.js');

test('should return a 200 response status', async () => {
  const status = await axios.get('http://localhost:3000/products/1/styles')
    .then((response) => {
      return response.status;
    })
    expect(status).toBe(200);
});

test('returns 5 styles for product selected', () => {
  return axios.get('http://localhost:3000/products/1/styles')
    .then((response) => {
      return response.data.length === 5 ? true : false;
    })
})
