const createError = require('http-errors');
const express = require('express');
const env = process.env.NODE_ENV || 'prod';

const usersRouter = require('./src/users/router');
const productsRouter = require('./src/products/router');
const trolleyRouter = require('./src/trolley/router');

const isDevEnvironment = env.toLowerCase() === 'dev';

module.exports = ({ resourceApi, user }) => {
  const app = express();
  const apiRouter = express.Router();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/ping', (request, response) => response.send({ health: 'ok' }));

  apiRouter.use('/user', usersRouter(user));
  apiRouter.use('/sort', productsRouter(resourceApi));
  apiRouter.use('/trolleyTotal', trolleyRouter());

  app.use('/api', apiRouter);
  app.use((request, response, next) => {
    next(createError(404));
  });

  app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.send(isDevEnvironment ? error : { error: error.message });
  });
  if (process.env.PORT) {
    app.listen(process.env.PORT);
  }

  return app;
};
