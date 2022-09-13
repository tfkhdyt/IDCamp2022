const handleError = require('../../utils/handleError');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload);
      const { name, year } = request.payload;
      const albumId = await this._service.addAlbum({ name, year });
      const response = h.response({
        status: 'success',
        // message: 'Album berhasil ditambahkan',
        data: { albumId },
      });
      response.code(201);
      return response;
    } catch (error) {
      return handleError(error, h);
    }
  }
}

module.exports = AlbumsHandler;