class AddedComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, content, isDeleted, owner, threadId, date } = payload;

    this.id = id;
    this.content = content;
    this.isDeleted = isDeleted;
    this.owner = owner;
    this.threadId = threadId;
    this.date = date;
  }

  _verifyPayload({ id, content, isDeleted, owner, threadId }) {
    if (!id || !content || !owner || !threadId) {
      throw new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof content !== 'string' ||
      typeof isDeleted !== 'boolean' ||
      typeof owner !== 'string' ||
      typeof threadId !== 'string'
    ) {
      throw new Error('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedComment;
