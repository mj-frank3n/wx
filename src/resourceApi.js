const axios = require('axios');

const resourceApiFactory = httpClient => (apiUrl, token) => ({
  products: () => httpClient.get(`${apiUrl}/products?token=${token}`),
  shopperHistory: () => httpClient.get(`${apiUrl}/shopperHistory?token=${token}`),
});

module.exports = resourceApiFactory(axios);
module.exports.factory = resourceApiFactory;