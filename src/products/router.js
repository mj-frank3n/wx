const express = require('express');
const createError = require('http-errors');
const sortProducts = require('./sortProducts');
const sortByPopularity = require('./sortByPopularity');
const sortOptions = require('./sortOptions');
const asyncErrorHandler = require('express-async-handler');

const allowedOptions = Object.values(sortOptions);

module.exports = resourceApi => {
  const router = express.Router();

  router.get('/', asyncErrorHandler(async (request, response, next) => {
    const sortOption = request.query.sortOption;

    if (!sortOption) {
      return next(createError(400, 'Missing sortOption'));
    }

    if (!allowedOptions.includes(sortOption)) {
      return next(createError(400, `Provided sorting option is incorrect, allowed sorting options (case sensitive) are: ${allowedOptions.join(', ')}`));
    }

    if (sortOption === sortOptions.RECOMMENDED) {
      const productsEndpointResponse = await resourceApi.products();
      const shopperHistoryEndpointResponse = await resourceApi.shopperHistory();
      const productsSortedByPopularity = sortByPopularity(shopperHistoryEndpointResponse.data);
      const missingProducts = productsEndpointResponse.data
        .filter(({ name }) => !productsSortedByPopularity.some(popularProduct => name === popularProduct.name));

      return response.send(productsSortedByPopularity.concat(missingProducts));
    } else {
      const productsEndpointResponse = await resourceApi.products();
      return response.send(sortProducts(sortOption, productsEndpointResponse.data));
    }
  }));

  return router;
};
