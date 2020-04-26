const express = require('express');
const Big = require('big.js');


//this is super naive implementation
//implementing this calculation correctly requires clarification around multiple potential issues
const calculateTotal = trolleyContents => {
  const productsWithQuantityAndSpecials = trolleyContents.quantities.map(product => ({
    ...product,
    special: trolleyContents.specials.find(({ quantities }) => quantities.some(quantity => quantity.name === product.name)),
    price: trolleyContents.products.find(({ name }) => name === product.name).price
  }));

  return productsWithQuantityAndSpecials.reduce((total, product) => {
    if (product.special) {
      const quantityOnSpecial = Math.floor(product.quantity / product.special.quantities[0].quantity);
      const quantityWithoutSpecial = product.quantity - (quantityOnSpecial * product.special.quantities[0].quantity);
      return total.plus(new Big(product.special.total).times(quantityOnSpecial)).plus(new Big(product.price).times(quantityWithoutSpecial));
    } else {
      return total.plus(new Big(product.price).times(product.quantity));
    }
  }, new Big(0));
};

module.exports = () => {
  const router = express.Router();

  router.post('/', (request, response) => {
    const trolleyContents = request.body;
    const total = calculateTotal(trolleyContents);

    response.send({ total: parseFloat(total.toFixed(2)) });
  });

  return router;
};
