const failResponse = (h, response) => {
  const newResponse = h
    .response({
      status: 'fail',
      message: response.message,
    })
    .code(response.statusCode);
  return newResponse;
};

module.exports = failResponse;
