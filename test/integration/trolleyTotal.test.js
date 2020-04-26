const createApp = require('../../createApp.js');
const chai = require('chai');

describe('POST /api/trolleyTotal', () => {
  describe('when product quantity is not sufficient for special', () => {
    it('should not apply special', async () => {
      const response = await chai
        .request(createApp({resourceApi: {}, user: {name: 'User 1', token: 'fake-token'}}))
        .post('/api/trolleyTotal')
        .send({
          products: [
            {
              name: 'product 1',
              price: 1
            },
            {
              name: 'product 2',
              price: 4
            }
          ],
          specials: [
            {
              quantities: [
                {
                  name: 'product 1',
                  quantity: 4
                }
              ],
              total: 3
            }
          ],
          quantities: [
            {
              name: 'product 1',
              quantity: 3
            },
            {
              name: 'product 2',
              quantity: 4
            }
          ]
        });

      expect(response.status).to.equal(200);
      expect(response.body.total).to.equal(19);
    });
  });

  describe('when product quantity is sufficient for special', () => {
    it('should apply special', async () => {
      const response = await chai
        .request(createApp({resourceApi: {}, user: {name: 'User 1', token: 'fake-token'}}))
        .post('/api/trolleyTotal')
        .send({
          products: [
            {
              name: 'product 1',
              price: 1
            },
            {
              name: 'product 2',
              price: 4
            }
          ],
          specials: [
            {
              quantities: [
                {
                  name: 'product 2',
                  quantity: 4
                }
              ],
              total: 3
            }
          ],
          quantities: [
            {
              name: 'product 1',
              quantity: 1
            },
            {
              name: 'product 2',
              quantity: 6
            }
          ]
        });

      expect(response.status).to.equal(200);
      expect(response.body.total).to.equal(12);
    });
  });
});