'use strict';

const request = require('supertest');
const app = require('../app');

describe('gists', async () => {
  test('should return 401 error with invalid authentication', async () => {
    const response = await request(app.callback())
      .get('/gists')
      .auth('******', '******');
    expect(response.status).toEqual(401);
  });
});
