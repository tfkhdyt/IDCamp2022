const errorResponse = (h) => {
  const newResponse = h.response({
    status: 'error',
    message: 'terjadi kegagalan pada server kami',
  });
  newResponse.code(500);
  return newResponse;
};

module.exports = errorResponse;
