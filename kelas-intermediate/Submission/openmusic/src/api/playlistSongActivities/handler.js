const autoBind = require('auto-bind');
const successResponse = require('../../utils/responses/success');

class PlaylistSongActivitiesHandler {
  constructor(playlistSongActivitiesService, playlistsService, validator) {
    this._playlistSongActivitiesService = playlistSongActivitiesService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    autoBind(this);
  }

  async getPlaylistSongActivitiesHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    const data =
      await this._playlistSongActivitiesService.getPlaylistSongActivities(
        playlistId
      );

    return successResponse(h, { data });
  }
}

module.exports = PlaylistSongActivitiesHandler;
