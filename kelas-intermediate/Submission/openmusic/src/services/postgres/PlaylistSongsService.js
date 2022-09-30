const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongsService {
  constructor(playlistsService, songsService) {
    this._playlistsService = playlistsService;
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

  async getPlaylistSongs(id) {
    const playlist = await this._playlistsService.getPlaylistById(id);

    const query = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM songs JOIN playlist_songs ON playlist_songs.song_id = songs.id WHERE playlist_songs.playlist_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    const songs = result.rows;

    return {
      playlist: {
        ...playlist,
        songs,
      },
    };
  }
}

module.exports = PlaylistSongsService;
