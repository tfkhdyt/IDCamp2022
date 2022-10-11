/* eslint-disable object-curly-newline */
const ClientError = require('../exceptions/ClientError');

const handleError = (error, h) => {
  if (error instanceof ClientError) {
    const response = h.response({
      status: 'fail',
      message: error.message,
    });
    response.code(error.statusCode);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Maaf, terjadi kegagalan pada server kami',
  });
  response.code(500);
  console.error(error);
  return response;
};

const mapDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});

const mapDBToModelAlbum = ({ id, name, year, cover }) => ({
  id,
  name,
  year,
  coverUrl: cover,
});

module.exports = { handleError, mapDBToModel, mapDBToModelAlbum };
