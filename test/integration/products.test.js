const createApp = require('../../createApp.js');
const chai = require('chai');

describe('GET /api/sort', () => {
  let productsResponse;

  beforeEach(() => {
    productsResponse = [
      {
        name: 'Test Product A',
        price: 99.99,
        quantity: 0
      },
      {
        name: 'Test Product B',
        price: 101.99,
        quantity: 0
      },
      {
        name: 'Test Product C',
        price: 10.99,
        quantity: 0
      },
      {
        name: 'Test Product D',
        price: 5,
        quantity: 0
      },
      {
        name: 'Test Product F',
        price: 999999999999,
        quantity: 0
      }
    ];
  });

  describe('when no sortOption is provided', () => {
    it('should return 400', async () => {
      const response = await chai
        .request(createApp({ resourceApi: {} }))
        .get('/api/sort')
        .send();

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('Missing sortOption');
    });
  });

  describe('when provided sortOption is invalid', () => {
    it('should return 400', async () => {
      const response = await chai
        .request(createApp({ resourceApi: {} }))
        .get('/api/sort?sortOption=low')
        .send();

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('Provided sorting option is incorrect, allowed sorting options (case sensitive) are: Recommended, Low, High, Ascending, Descending');
    });
  });

  describe('when sortOption is Low', () => {
    it('should return products sorted by price - low to high', async () => {
      const resourceApiStub = {
        products: () => Promise.resolve({ data: productsResponse } )
      };
      const response = await chai
        .request(createApp({ resourceApi: resourceApiStub }))
        .get('/api/sort?sortOption=Low')
        .send();

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([
        {
          name: 'Test Product D',
          price: 5,
          quantity: 0
        },
        {
          name: 'Test Product C',
          price: 10.99,
          quantity: 0
        },
        {
          name: 'Test Product A',
          price: 99.99,
          quantity: 0
        },
        {
          name: 'Test Product B',
          price: 101.99,
          quantity: 0
        },
        {
          name: 'Test Product F',
          price: 999999999999,
          quantity: 0
        }
      ]);
    });
  });

  describe('when sortOption is High', () => {
    it('should return products sorted by price - high to low', async () => {
      const resourceApiStub = {
        products: () => Promise.resolve({ data: productsResponse } )
      };
      const response = await chai
        .request(createApp({ resourceApi: resourceApiStub }))
        .get('/api/sort?sortOption=High')
        .send();

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([
        {
          name: 'Test Product F',
          price: 999999999999,
          quantity: 0
        },
        {
          name: 'Test Product B',
          price: 101.99,
          quantity: 0
        },
        {
          name: 'Test Product A',
          price: 99.99,
          quantity: 0
        },
        {
          name: 'Test Product C',
          price: 10.99,
          quantity: 0
        },
        {
          name: 'Test Product D',
          price: 5,
          quantity: 0
        },
      ]);
    });
  });

  describe('when sortOption is Descending', () => {
    it('should return products sorted by name - descending', async () => {
      const resourceApiStub = {
        products: () => Promise.resolve({ data: productsResponse } )
      };
      const response = await chai
        .request(createApp({ resourceApi: resourceApiStub }))
        .get('/api/sort?sortOption=Descending')
        .send();

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([
        {
          name: 'Test Product F',
          price: 999999999999,
          quantity: 0
        },
        {
          name: 'Test Product D',
          price: 5,
          quantity: 0
        },
        {
          name: 'Test Product C',
          price: 10.99,
          quantity: 0
        },
        {
          name: 'Test Product B',
          price: 101.99,
          quantity: 0
        },
        {
          name: 'Test Product A',
          price: 99.99,
          quantity: 0
        },
      ]);
    });
  });

  describe('when sortOption is Ascending', () => {
    it('should return products sorted by name - ascending', async () => {
      const resourceApiStub = {
        products: () => Promise.resolve({ data: productsResponse } )
      };
      const response = await chai
        .request(createApp({ resourceApi: resourceApiStub }))
        .get('/api/sort?sortOption=Ascending')
        .send();

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([
        {
          name: 'Test Product A',
          price: 99.99,
          quantity: 0
        },
        {
          name: 'Test Product B',
          price: 101.99,
          quantity: 0
        },
        {
          name: 'Test Product C',
          price: 10.99,
          quantity: 0
        },
        {
          name: 'Test Product D',
          price: 5,
          quantity: 0
        },
        {
          name: 'Test Product F',
          price: 999999999999,
          quantity: 0
        }
      ]);
    });
  });

  describe('when sortOption is Recommended', () => {
    it('should return products by popularity', async () => {
      const shopperHistoryResponse = [
        {
          'customerId': 123,
          'products': [
            {
              name: 'Test Product A',
              price: 99.99,
              quantity: 3
            },
            {
              name: 'Test Product B',
              price: 101.99,
              quantity: 1
            },
            {
              name: 'Test Product F',
              price: 999999999999,
              quantity: 1
            }
          ]
        },
        {
          'customerId': 23,
          'products': [
            {
              name: 'Test Product A',
              price: 99.99,
              quantity: 2
            },
            {
              name: 'Test Product B',
              price: 101.99,
              quantity: 3
            },
            {
              name: 'Test Product F',
              price: 999999999999,
              quantity: 1
            }
          ]
        },
        {
          'customerId': 23,
          'products': [
            {
              name: 'Test Product C',
              price: 10.99,
              quantity: 2
            },
            {
              name: 'Test Product F',
              price: 999999999999,
              quantity: 2
            }
          ]
        },
        {
          'customerId': 23,
          'products': [
            {
              name: 'Test Product A',
              price: 99.99,
              quantity: 1
            },
            {
              name: 'Test Product B',
              price: 101.99,
              quantity: 1
            },
            {
              name: 'Test Product C',
              price: 10.99,
              quantity: 1
            }
          ]
        }
      ];
      
      const resourceApiStub = {
        shopperHistory: () => Promise.resolve({ data: shopperHistoryResponse } ),
        products: () => Promise.resolve({ data: productsResponse } )
      };
      const response = await chai
        .request(createApp({ resourceApi: resourceApiStub }))
        .get('/api/sort?sortOption=Recommended')
        .send();

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([
        {
          name: 'Test Product A',
          price: 99.99,
          quantity: 6
        },
        {
          name: 'Test Product B',
          price: 101.99,
          quantity: 5
        },
        {
          name: 'Test Product F',
          price: 999999999999,
          quantity: 4
        },
        {
          name: 'Test Product C',
          price: 10.99,
          quantity: 3
        },
        {
          name: 'Test Product D',
          price: 5,
          quantity: 0
        }
      ]);
    });
  });
});