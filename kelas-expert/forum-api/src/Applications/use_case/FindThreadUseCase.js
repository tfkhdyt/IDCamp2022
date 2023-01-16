class FindThreadUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.findThreadById(threadId);

    let comments = await this._commentRepository.findCommentsByThreadId(
      threadId
    );

    comments = comments.map((comment) => {
      const result = {
        ...comment,
        content: comment.is_deleted
          ? '**komentar telah dihapus**'
          : comment.content,
      };
      delete result.is_deleted;

      return result;
    });

    comments = await Promise.all(
      comments.map(async (comment) => {
        let replies = await this._replyRepository.findRepliesByCommentId(
          comment.id
        );
        replies = replies.map((reply) => {
          const result = {
            ...reply,
            content: reply.is_deleted
              ? '**balasan telah dihapus**'
              : reply.content,
          };
          delete result.is_deleted;

          return result;
        });

        return {
          ...comment,
          replies,
        };
      })
    );

    return {
      ...thread,
      comments,
    };
  }
}

module.exports = FindThreadUseCase;
