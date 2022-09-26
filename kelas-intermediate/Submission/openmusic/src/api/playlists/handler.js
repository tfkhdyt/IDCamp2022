const autoBind = require('auto-bind');
const AuthenticationError = require('../../exceptions/AuthenticationError');

const successResponse = require('../../utils/responses/success');

class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    let credentialId;

    if (request.auth.credentials === null) {
      console.log(request.auth);
      throw new AuthenticationError('Token tidak valid');
    }
    credentialId = request.auth.credentials.id;

    this._validator.validatePlaylistPayload(request.payload);
    const { name } = request.payload;

    const playlistId = await this._service.addPlaylist({
      name,
      owner: credentialId,
    });

    return successResponse(h, {
      data: { playlistId },
      statusCode: 201,
    });
  }
}

module.exports = PlaylistsHandler;
