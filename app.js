const createApp = require('./createApp');
const resourceApi = require('./src/resourceApi');
const config = require('./config');

module.exports = createApp({
  resourceApi: resourceApi(config.resourceApiUrl, config.user.token),
  user: config.user
});