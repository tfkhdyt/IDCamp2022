const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const InvariantError = require('../../exceptions/InvariantError');

class PlaylistSongActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongActivities(id) {
    const query = {
      text: 'SELECT u.username, s.title, psa.action, psa.time FROM playlist_song_activities psa JOIN users u ON u.id = psa.user_id JOIN songs s ON s.id = psa.song_id WHERE psa.playlist_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal mendapatkan aktivitas playlist');
    }

    return {
      playlistId: id,
      activities: result.rows,
    };
  }

  async addPlaylistSongActivity({ playlistId, songId, userId, action }) {
    const id = `playlistSongActivity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, time],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Activity gagal ditambahkan');
    }

    return result.rows[0].id;
  }
}

module.exports = PlaylistSongActivitiesService;
