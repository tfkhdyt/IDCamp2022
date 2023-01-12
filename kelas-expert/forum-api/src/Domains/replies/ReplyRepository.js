class ReplyRepository {
  async addReply(newReply) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async findReplyById(replyId, commentId, threadId) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async validateReplyOwner(replyId, owner) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteReply(replyId) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ReplyRepository;
