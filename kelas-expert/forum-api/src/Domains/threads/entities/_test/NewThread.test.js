const NewThread = require('../NewThread');

describe('a NewThread entities', () => {
  it('it should throw error when payload did not contain needed property', () => {
    // arrange
    const payload = {
      title: 'abc',
      body: 'cba',
    };

    // action and assert
    expect(() => new NewThread(payload)).toThrowError(
      'NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specs (with id)', () => {
    // arrange
    const payload = {
      id: 123,
      title: 123,
      body: true,
      owner: 'bruh',
    };

    // action and assert
    expect(() => new NewThread(payload)).toThrowError(
      'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should throw error when payload did not meet data type specs (without id)', () => {
    // arrange
    const payload = {
      title: 123,
      body: true,
      owner: 'bruh',
    };

    // action and assert
    expect(() => new NewThread(payload)).toThrowError(
      'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should throw error when title contains more than 50 character', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'inijudulinijudulinijudulinijudulinijudulinijudulinijudulinijudul',
      body: 'ini body',
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrowError(
      'NEW_THREAD.TITLE_LIMIT_CHAR'
    );
  });

  it('should create newThread object correctly (with id)', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'ini judul',
      body: 'ini body',
      owner: 'user-123',
    };

    // Action
    const { id, title, body, owner } = new NewThread(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });

  it('should create newThread object correctly (without id)', () => {
    // Arrange
    const payload = {
      title: 'ini judul',
      body: 'ini body',
      owner: 'user-123',
    };

    // Action
    const { title, body, owner } = new NewThread(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });
});
