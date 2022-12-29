const AddedComment = require('../AddedComment');

describe('an AddedComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // arrange
    const payload = {
      content: 'ini konten',
      isDeleted: false,
    };

    // action and assert
    expect(() => new AddedComment(payload)).toThrowError(
      'ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // arrange
    const payload = {
      id: 123,
      content: 'ini konten',
      isDeleted: [],
      owner: {},
      threadId: 420,
      date: true,
    };

    // action and assert
    expect(() => new AddedComment(payload)).toThrowError(
      'ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create addedComment object correctly', () => {
    // arrange
    const payload = {
      id: 'comment-123',
      content: 'ini konten',
      isDeleted: false,
      owner: 'user-123',
      threadId: 'thread-123',
      date: '2022-12-29T09:24:00',
    };

    // action
    const addedComment = new AddedComment(payload);

    // assert
    expect(addedComment.id).toEqual(payload.id);
    expect(addedComment.content).toEqual(payload.content);
    expect(addedComment.isDeleted).toEqual(payload.isDeleted);
    expect(addedComment.owner).toEqual(payload.owner);
    expect(addedComment.threadId).toEqual(payload.threadId);
    expect(addedComment.date).toEqual(payload.date);
  });
});
