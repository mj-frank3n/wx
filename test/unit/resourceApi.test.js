const resourceApiFactory = require('../../src/resourceApi').factory;
const sinon = require('sinon');

describe('resourceApi', () => {
  describe('product', () => {
    it('should call api using provided url and token', async () => {
      const httpClientStub = {
        get: sinon.stub().returns(Promise.resolve({ data: 'fake products list' }))
      };

      const resourceApi = resourceApiFactory(httpClientStub)('http://fake-url', 'fake-token');
      const response = await resourceApi.products();
      expect(httpClientStub.get).to.have.been.calledWith('http://fake-url/products?token=fake-token');
      expect(response.data).to.equal('fake products list');
    });
  });

  describe('shopperHistory', () => {
    it('should call api using provided url and token', async () => {
      const httpClientStub = {
        get: sinon.stub().returns(Promise.resolve({ data: 'fake history' }))
      };

      const resourceApi = resourceApiFactory(httpClientStub)('http://fake-url', 'fake-token');
      const response = await resourceApi.shopperHistory();
      expect(httpClientStub.get).to.have.been.calledWith('http://fake-url/shopperHistory?token=fake-token');
      expect(response.data).to.equal('fake history');
    });
  });
});