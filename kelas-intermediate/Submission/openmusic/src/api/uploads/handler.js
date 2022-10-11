const autoBind = require('auto-bind');
const config = require('../../utils/config');

const successResponse = require('../../utils/responses/success');

class UploadsHandler {
  constructor(storageService, albumsService, validator) {
    this._storageService = storageService;
    this._albumsService = albumsService;
    this._validator = validator;

    autoBind(this);
  }

  async postUploadImageHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;

    this._validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const fileLocation = `http://${config.app.host}:${config.app.port}/images/covers/${filename}`;

    await this._albumsService.editAlbumCoverById(id, fileLocation);

    return successResponse(h, {
      message: 'Sampul berhasil diunggah',
      statusCode: 201,
    });
  }
}

module.exports = UploadsHandler;
