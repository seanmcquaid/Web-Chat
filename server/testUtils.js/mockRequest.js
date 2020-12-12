const mockRequest = (body = {}, params = {}, header = null, token = {}) => ({
  body,
  headers: () => (header === 'Authorization' ? 'Valid Token' : null),
  params,
  token,
});

module.exports = mockRequest;
