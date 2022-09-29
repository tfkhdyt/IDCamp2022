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
    if (request.auth.credentials === null) {
      throw new AuthenticationError('Token tidak valid');
    }
    const { id: credentialId } = request.auth.credentials;

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

  async getPlaylistsHandler(request, h) {
    if (request.auth.credentials === null) {
      throw new AuthenticationError('Token tidak valid');
    }

    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists({ owner: credentialId });

    return successResponse(h, {
      data: { playlists },
    });
  }
}

module.exports = PlaylistsHandler;
