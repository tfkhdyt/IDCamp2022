const AddedThread = require('../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(newThread) {
    const { title, body, owner } = newThread;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, body, owner, date',
      values: [id, title, body, owner],
    };

    const result = await this._pool.query(query);

    return new AddedThread({ ...result.rows[0] });
  }

  async validate(threadId) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Thread tidak ditemukan');
    }
  }

  async findThreadById(threadId) {
    const threadQuery = {
      text: 'SELECT t.id, t.title, t.body, t.date, u.username FROM threads t JOIN users u ON u.id = t.owner WHERE t.id = $1',
      values: [threadId],
    };
    const threadResult = await this._pool.query(threadQuery);
    if (!threadResult.rowCount) {
      throw new NotFoundError('Thread tidak ditemukan');
    }

    const commentsQuery = {
      text: 'SELECT c.id, u.username, c.date, c.content, c.is_deleted FROM comments c JOIN users u ON u.id = c.owner WHERE c.thread_id = $1 ORDER BY c.date ASC',
      values: [threadId],
    };
    let commentsResult = await this._pool.query(commentsQuery);

    commentsResult = commentsResult.rows.map((comment) => ({
      ...comment,
      content: comment.is_deleted
        ? '**komentar telah dihapus**'
        : comment.content,
      is_deleted: undefined,
    }));

    return {
      ...threadResult.rows[0],
      comments: commentsResult,
    };
  }
}

module.exports = ThreadRepositoryPostgres;
