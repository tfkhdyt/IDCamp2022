const failResponse = (h, { message, statusCode = 400 }) => {
  const newResponse = h
    .response({
      status: 'fail',
      message: message,
    })
    .code(statusCode);
  return newResponse;
};

module.exports = failResponse;
