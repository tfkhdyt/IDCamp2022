const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedReply = require('../../Domains/replies/entities/AddedReply');
const ReplyRepository = require('../../Domains/replies/ReplyRepository');

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReply(newReply) {
    const { content, owner, threadId, commentId } = newReply;
    const id = `reply-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5) RETURNING id, content, comment_id, owner, thread_id, date, is_deleted',
      values: [id, content, threadId, commentId, owner],
    };

    const result = await this._pool.query(query);

    return new AddedReply({
      ...result.rows[0],
      threadId: result.rows[0].thread_id,
      commentId: result.rows[0].comment_id,
      isDeleted: result.rows[0].is_deleted,
    });
  }

  async verifyReplyAvailability(replyId, commentId, threadId) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1 AND thread_id = $2 AND comment_id = $3 AND is_deleted = FALSE',
      values: [replyId, threadId, commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('reply tidak ditemukan');
    }

    return new AddedReply({
      ...result.rows[0],
      threadId: result.rows[0].thread_id,
      commentId: result.rows[0].comment_id,
      replyId: result.rows[0].reply_id,
      isDeleted: result.rows[0].is_deleted,
    });
  }

  async validateReplyOwner(replyId, commentId, threadId, owner) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1 AND owner = $2 AND thread_id = $3 AND comment_id = $4 AND is_deleted = FALSE',
      values: [replyId, owner, threadId, commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError(
        'anda tidak memiliki akses terhadap reply ini'
      );
    }
  }

  async deleteReply(replyId) {
    const query = {
      text: 'UPDATE replies SET is_deleted = TRUE WHERE id = $1',
      values: [replyId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('gagal menghapus reply');
    }
  }
}

module.exports = ReplyRepositoryPostgres;
