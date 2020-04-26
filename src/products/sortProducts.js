const sortOptions = require('./sortOptions');

const sortingStrategies = {
  [sortOptions.LOW]: (productA, productB) => productA.price - productB.price,
  [sortOptions.HIGH]: (productA, productB) => productB.price - productA.price,
  [sortOptions.DESCENDING]: (productA, productB) => {
    if (productA.name < productB.name) {
      return 1;
    }
    if (productA.name > productB.name) {
      return -1;
    }
    return 0;
  },
  [sortOptions.ASCENDING]: (productA, productB) => {
    if (productA.name > productB.name) {
      return 1;
    }
    if (productA.name < productB.name) {
      return -1;
    }
    return 0;
  },
};

module.exports = (sortOption, products) => products.sort(sortingStrategies[sortOption]);