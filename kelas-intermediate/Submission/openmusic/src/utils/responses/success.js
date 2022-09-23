const successResponse = (
  h,
  { data = undefined, statusCode = 200, message = undefined }
) => {
  const response = h
    .response({
      status: 'success',
      data,
      message,
    })
    .code(statusCode);
  return response;
};

module.exports = successResponse;
