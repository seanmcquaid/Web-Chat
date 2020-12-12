const mockNext = require('../../testUtils.js/mockNext');
const mockRequest = require('../../testUtils.js/mockRequest');
const mockResponse = require('../../testUtils.js/mockResponse');
const checkAuth = require('../checkAuth');
const jwt = require('jsonwebtoken');

describe('checkAuth', () => {
  it('No token provided', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    await checkAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      errorMessage: 'There is no token, please try again',
    });
  });

  it('Invalid token provided', () => {});

  it('Valid token provided', () => {});
});
