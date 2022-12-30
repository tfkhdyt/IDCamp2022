const AddedComment = require('../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../Domains/comments/CommentRepository');

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

    console.log({ result: result.rows[0] });

    return new AddedComment({
      ...result.rows[0],
      threadId: result.rows[0].thread_id,
      isDeleted: result.rows[0].is_deleted,
    });
  }
}

module.exports = CommentRepositoryPostgres;
