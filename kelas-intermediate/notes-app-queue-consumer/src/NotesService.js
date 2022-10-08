import pg from 'pg';

const { Pool } = pg;

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async getNotes(userId) {
    const query = {
      text: 'SELECT n.* FROM notes n LEFT JOIN collaborations c ON c.note_id = n.id WHERE n.owner = $1 OR c.user_id = $1 GROUP BY n.id ',
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

export default NotesService;
