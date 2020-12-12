const mockRequest = (body = {}, params = {}, header = null) => ({
  body,
  headers: () => (header === 'Authorization' ? 'Valid Token' : null),
  params,
});

module.exports = mockRequest;
