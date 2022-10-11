const autoBind = require('auto-bind');

const successResponse = require('../../utils/responses/success');

class ExportsHandler {
  constructor(producerService, playlistsService, validator) {
    this._producerService = producerService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    autoBind(this);
  }

  async postExportPlaylistHandler(request, h) {
    const { id: playlistId } = request.params;
    const { targetEmail } = request.payload;
    const { id: userId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, userId);
    this._validator.validateExportPlaylistPayload(request.payload);

    const message = { userId, playlistId, targetEmail };

    await this._producerService.sendMessage(
      'export:playlist',
      JSON.stringify(message)
    );

    return successResponse(h, {
      message: 'Permintaan Anda sedang kami proses',
      statusCode: 201,
    });
  }
}

module.exports = ExportsHandler;
