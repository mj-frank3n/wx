const aggregateProductsQuantity = (aggregatedProducts, product) => {
  if (aggregatedProducts[product.name]) {
    aggregatedProducts[product.name].quantity = aggregatedProducts[product.name].quantity + product.quantity;
  } else {
    aggregatedProducts[product.name] = product;
  }

  return aggregatedProducts;
};

module.exports = shoppingHistory => Object.values(
  shoppingHistory
    .flatMap(({products}) => products)
    .reduce(aggregateProductsQuantity, {})
).sort((productA, productB) => productB.quantity - productA.quantity);