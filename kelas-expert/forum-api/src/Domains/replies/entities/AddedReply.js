class AddedReply {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, content, isDeleted, owner, threadId, commentId } = payload;

    this.id = id;
    this.content = content;
    this.isDeleted = isDeleted;
    this.owner = owner;
    this.threadId = threadId;
    this.commentId = commentId;
  }

  _verifyPayload({ id, content, owner, threadId, commentId, isDeleted }) {
    if (!id || !content || !owner || !threadId || !commentId) {
      throw new Error('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof content !== 'string' ||
      typeof isDeleted !== 'boolean' ||
      typeof owner !== 'string' ||
      typeof threadId !== 'string' ||
      typeof commentId !== 'string'
    ) {
      throw new Error('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedReply;
