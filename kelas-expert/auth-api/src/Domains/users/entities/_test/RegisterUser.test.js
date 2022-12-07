const RegisterUser = require('../RegisterUser');

describe('a RegisterUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // arrange
    const payload = {
      username: 'abc',
      password: 'abc',
    };

    // action and assert
    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // arrange
    const payload = {
      username: 123,
      password: 'abc',
      fullname: true,
    };

    // action and assert
    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should throw error when username contains more than 50 characters', () => {
    // arrange
    const payload = {
      username: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
      password: 'abc',
      fullname: 'Dicoding Indonesia',
    };

    // action and assert
    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.USERNAME_LIMIT_CHAR'
    );
  });

  it('should throw error when username contains restricted character', () => {
    // arrange
    const payload = {
      username: 'dico ding',
      password: 'abc',
      fullname: 'dicoding',
    };

    // action and assert
    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.USERNAME_CONTAINS_RESTRICTED_CHARACTER'
    );
  });

  it('should create registerUser object correctly', () => {
    // arrange
    const payload = {
      username: 'dicoding',
      password: 'abc',
      fullname: 'Dicoding Indonesia',
    };

    // action
    const { username, password, fullname } = new RegisterUser(payload);

    // assert
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
    expect(password).toEqual(payload.password);
  });
});
