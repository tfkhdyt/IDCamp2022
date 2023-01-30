const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const LikeRepository = require('../../Domains/likes/LikeRepository');

class LikeRepositoryPostgres extends LikeRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async likeComment(newLike) {
    const { owner, threadId, commentId } = newLike;
    const id = `like-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO likes VALUES($1, $2, $3, $4)',
      values: [id, threadId, commentId, owner],
    };

    await this._pool.query(query);
  }

  async unlikeComment(newLike) {
    const { owner, threadId, commentId } = newLike;

    const query = {
      text: 'DELETE FROM likes WHERE thread_id = $1 AND comment_id = $2 AND owner = $3',
      values: [threadId, commentId, owner],
    };

    await this._pool.query(query);
  }

  async checkLikeStatus(newLike) {
    const { owner, threadId, commentId } = newLike;

    const query = {
      text: 'SELECT * FROM likes WHERE thread_id = $1 AND comment_id = $2 AND owner = $3',
      values: [threadId, commentId, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('like tidak ditemukan');
    }
  }
}

module.exports = LikeRepositoryPostgres;