const mockRequest = (body = {}, params = {}, header = null, token = {}) => ({
  body,
  headers: {
    authorization: header ?? null,
  },
  params,
  token,
});

module.exports = mockRequest;
