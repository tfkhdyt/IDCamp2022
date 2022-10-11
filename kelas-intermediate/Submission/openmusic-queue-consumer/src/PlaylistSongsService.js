import pg from 'pg';

const { Pool } = pg;

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: 'SELECT s.id, s.title, s.performer FROM playlist_songs ps JOIN songs s ON s.id = ps.song_id WHERE ps.playlist_id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

export default PlaylistSongsService;
