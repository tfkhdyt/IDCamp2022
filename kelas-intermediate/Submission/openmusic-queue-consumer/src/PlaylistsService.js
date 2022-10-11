import pg from 'pg';

const { Pool } = pg;

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId, owner) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1 AND owner = $2',
      values: [playlistId, owner],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

export default PlaylistsService;
