const AddedThread = require('../AddedThread');

describe('a AddedThread entities', () => {
  it('it should throw error when payload did not contain needed property', () => {
    // arrange
    const payload = {
      title: 'abc',
      body: 'cba',
    };

    // action and assert
    expect(() => new AddedThread(payload)).toThrowError(
      'ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specs', () => {
    // arrange
    const payload = {
      id: 69,
      title: 123,
      body: true,
      owner: 'bruh',
      date: true,
    };

    // action and assert
    expect(() => new AddedThread(payload)).toThrowError(
      'ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should throw error when title contains more than 50 character', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'inijudulinijudulinijudulinijudulinijudulinijudulinijudulinijudul',
      body: 'ini body',
      owner: 'user-123',
      date: '2022-12-23T16:12:00',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError(
      'ADDED_THREAD.TITLE_LIMIT_CHAR'
    );
  });

  it('should create addedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'ini judul',
      body: 'ini body',
      owner: 'user-123',
      date: '2022-12-23T16:12:00',
    };

    // Action
    const { id, title, body, owner, date } = new AddedThread(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
    expect(date).toEqual(payload.date);
  });
});
