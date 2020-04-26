const createApp = require('../../createApp.js');
const chai = require('chai');

describe('GET /health', () => {
  it('should return ok', async () => {
    const response = await chai
      .request(createApp({ resourceApi: {} }))
      .get('/ping')
      .send();

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ health: 'ok' });
  });
});