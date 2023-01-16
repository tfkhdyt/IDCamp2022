class AddedThread {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, title, body, owner, date } = payload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.owner = owner;
    this.date = date;
  }

  _verifyPayload({ id, title, body, owner }) {
    if (!id || !title || !body || !owner) {
      throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof title !== 'string' ||
      typeof body !== 'string' ||
      typeof owner !== 'string'
    ) {
      throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (title.length > 50) {
      throw new Error('ADDED_THREAD.TITLE_LIMIT_CHAR');
    }
  }
}

module.exports = AddedThread;
