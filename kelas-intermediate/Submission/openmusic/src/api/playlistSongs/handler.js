const autoBind = require('auto-bind');

const successResponse = require('../../utils/responses/success');

class PlaylistSongsHandler {
  constructor(
    playlistSongsService,
    playlistsService,
    playlistSongActivitiesService,
    validator
  ) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._playlistSongActivitiesService = playlistSongActivitiesService;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._playlistSongsService.addPlaylistSong(playlistId, songId);
    await this._playlistSongActivitiesService.addPlaylistSongActivity({
      playlistId,
      songId,
      userId: credentialId,
      action: 'add',
    });

    return successResponse(h, {
      message: 'Lagu berhasil ditambahkan ke dalam playlist',
      statusCode: 201,
    });
  }

  async getPlaylistSongsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    const data = await this._playlistSongsService.getPlaylistSongs(playlistId);

    return successResponse(h, {
      data,
    });
  }

  async deletePlaylistSongByIdHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._playlistSongsService.deletePlaylistSongById(playlistId, songId);
    await this._playlistSongActivitiesService.addPlaylistSongActivity({
      playlistId,
      songId,
      userId: credentialId,
      action: 'delete',
    });

    return successResponse(h, {
      message: 'Lagu berhasil dihapus dari playlist',
    });
  }
}

module.exports = PlaylistSongsHandler;
