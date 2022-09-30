const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../../../../notes-app-back-end/src/exceptions/InvariantError');

class PlaylistSongsService {
  constructor(songsService) {
    this._songsService = songsService;
    this._pool = new Pool();
  }

  async addPlaylistSong(playlistId, songId) {
    await this._songsService.getSongById(songId);

    const id = `playlistSong-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Playlist song gagal ditambahkan');
    }

    return result.rows[0].id;
  }
}

module.exports = PlaylistSongsService;
