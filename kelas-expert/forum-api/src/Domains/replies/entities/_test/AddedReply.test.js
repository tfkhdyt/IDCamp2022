const AddedReply = require('../AddedReply');

describe('an AddedReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // arrange
    const payload = {
      content: 'ini konten',
    };

    // action and assert
    expect(() => new AddedReply(payload)).toThrowError(
      'ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // arrange
    const payload = {
      id: 123,
      content: 123,
      threadId: 420,
      commentId: 69,
      owner: {},
      isDeleted: [],
      date: true,
    };

    // action and assert
    expect(() => new AddedReply(payload)).toThrowError(
      'ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create addedReply object correctly', () => {
    // arrange
    const payload = {
      id: 'reply-123',
      content: 'ini konten',
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123',
      isDeleted: false,
    };

    // action
    const addedReply = new AddedReply(payload);

    // assert
    expect(addedReply.id).toEqual(payload.id);
    expect(addedReply.content).toEqual(payload.content);
    expect(addedReply.threadId).toEqual(payload.threadId);
    expect(addedReply.commentId).toEqual(payload.commentId);
    expect(addedReply.owner).toEqual(payload.owner);
    expect(addedReply.isDeleted).toEqual(payload.isDeleted);
  });
});
