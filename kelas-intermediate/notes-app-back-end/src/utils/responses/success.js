const successResponse = (
  h,
  { message = undefined, data = undefined, code = 200 }
) =>
  h
    .response({
      status: 'success',
      message,
      data,
    })
    .code(code);

module.exports = successResponse;
