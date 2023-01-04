const AddedComment = require('../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(newComment) {
    const { content, owner, threadId } = newComment;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id, content, owner, thread_id, date, is_deleted',
      values: [id, content, owner, threadId],
    };

    const result = await this._pool.query(query);

    return new AddedComment({
      ...result.rows[0],
      threadId: result.rows[0].thread_id,
      isDeleted: result.rows[0].is_deleted,
    });
  }

  async findCommentById(commentId, threadId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1 AND thread_id = $2',
      values: [commentId, threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('comment tidak ditemukan');
    }

    return new AddedComment({
      ...result.rows[0],
      threadId: result.rows[0].thread_id,
      isDeleted: result.rows[0].is_deleted,
    });
  }

  async validateCommentOwner(commentId, owner) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1 AND owner = $2',
      values: [commentId, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError(
        'anda tidak memiliki akses terhadap comment ini'
      );
    }
  }
}

module.exports = CommentRepositoryPostgres;
