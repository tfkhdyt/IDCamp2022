const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist new thread', async () => {
      // arrange
      await UsersTableTestHelper.addUser({ username: 'tfkhdyt' });
      const newThread = new NewThread({
        title: 'ini judul',
        body: 'ini body',
        owner: 'user-123',
      });

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action
      await threadRepositoryPostgres.addThread(newThread);

      // assert
      const threads = await ThreadsTableTestHelper.findThreadById('thread-123');
      expect(threads).toHaveLength(1);
    });

    it('should return new thread correctly', async () => {
      // arrange
      await UsersTableTestHelper.addUser({ username: 'tfkhdyt' });
      const newThread = new NewThread({
        title: 'ini judul',
        body: 'ini body',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action
      const result = await threadRepositoryPostgres.addThread(newThread);

      // assert
      expect(result).toMatchObject(
        new AddedThread({
          id: 'thread-123',
          title: 'ini judul',
          body: 'ini body',
          owner: 'user-123',
        })
      );
    });
  });

  describe('validate function', () => {
    it('should throw not found error when thread id is not exist', async () => {
      // arrange
      await UsersTableTestHelper.addUser({ username: 'tfkhdyt' });
      await ThreadsTableTestHelper.addThread({ title: 'sebuah thread' });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // action and assert
      await expect(
        threadRepositoryPostgres.validate('xxx')
      ).rejects.toThrowError(NotFoundError);
    });

    it('should not throw not found error when thread id is not exist', async () => {
      // arrange
      await UsersTableTestHelper.addUser({ username: 'tfkhdyt' });
      await ThreadsTableTestHelper.addThread({ title: 'sebuah thread' });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // action and assert
      await expect(
        threadRepositoryPostgres.validate('thread-123')
      ).resolves.not.toThrowError(NotFoundError);
    });
  });
});
