const NewComment = require('../NewComment');

describe('a NewThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // arrange
    const payload = { konten: 'abc' };

    // action and assert
    expect(() => new NewComment(payload)).toThrowError(
      'NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // arrange
    const payload = {
      content: true,
    };

    // Action and Assert
    expect(() => new NewComment(payload)).toThrowError(
      'NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create newComment object correctly', () => {
    // arrange
    const payload = {
      content: 'ini komentar',
    };

    // action
    const { content } = new NewComment(payload);

    // assert
    expect(content).toEqual(payload.content);
  });
});
