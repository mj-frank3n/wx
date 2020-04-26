const createApp = require('../../createApp.js');
const chai = require('chai');

describe('GET /api/user', () => {
  it('should return configured user', async () => {
    const response = await chai
      .request(createApp({ resourceApi: {}, user: { name: 'User 1', token: 'fake-token' } }))
      .get('/api/user')
      .send();

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ name: 'User 1', token: 'fake-token' });
  });
});