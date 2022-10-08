const failResponse = (h, { message, statusCode = 400 }) => {
  const newResponse = h
    .response({
      status: 'fail',
      message,
    })
    .code(statusCode);
  return newResponse;
};

module.exports = failResponse;
