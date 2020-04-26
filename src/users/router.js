const express = require('express');

module.exports = user => {

  const router = express.Router();

  router.get('/', (request, response) => {
    response.send(user);
  });

  return router;
};
