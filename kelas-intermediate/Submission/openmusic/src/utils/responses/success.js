const successResponse = (
  h,
  { data = undefined, statusCode = 200, message = undefined, isCache = false }
) => {
  const response = h
    .response({
      status: 'success',
      data,
      message,
    })
    .code(statusCode);

  if (isCache) {
    response.header('X-Data-Source', 'cache');
  }

  return response;
};

module.exports = successResponse;
