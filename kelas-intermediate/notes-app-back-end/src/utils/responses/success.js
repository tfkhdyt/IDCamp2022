const successResponse = (h, { message, data = undefined, code = 200 }) =>
  h
    .response({
      status: 'success',
      message,
      data,
    })
    .code(code);

module.exports = successResponse;
