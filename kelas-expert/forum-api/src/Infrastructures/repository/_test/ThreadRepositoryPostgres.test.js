const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');

const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');

const pool = require('../../database/postgres/pool');

const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
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

  describe('findThreadById function', () => {
    it('should return correct thread', async () => {
      // arrange
      const expectedThread = {
        id: 'thread-123',
        title: 'sebuah thread',
        body: 'sebuah body thread',
        username: 'tfkhdyt',
      };
      await UsersTableTestHelper.addUser({ username: 'tfkhdyt' });
      await ThreadsTableTestHelper.addThread({
        title: 'sebuah thread',
        body: 'sebuah body thread',
      });
      await CommentsTableTestHelper.addComment({ title: 'sebuah comment' });
      await RepliesTableTestHelper.addReply({});
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // action
      const thread = await threadRepositoryPostgres.findThreadById(
        'thread-123'
      );

      // assert
      expect(thread.id).toEqual(expectedThread.id);
      expect(thread.title).toEqual(expectedThread.title);
      expect(thread.body).toEqual(expectedThread.body);
      expect(thread.username).toEqual(expectedThread.username);
      expect(thread.comments).toBeDefined();
      expect(thread.comments[0].content).not.toEqual(
        '**komentar telah dihapus**'
      );
      expect(thread.comments[0].replies[0].content).not.toEqual(
        '**balasan telah dihapus**'
      );
    });

    it('should return correct thread, with deleted comment', async () => {
      // arrange
      const expectedThread = {
        id: 'thread-123',
        title: 'sebuah thread',
        body: 'sebuah body thread',
        username: 'tfkhdyt',
      };
      await UsersTableTestHelper.addUser({ username: 'tfkhdyt' });
      await ThreadsTableTestHelper.addThread({
        title: 'sebuah thread',
        body: 'sebuah body thread',
      });
      await CommentsTableTestHelper.addComment({ title: 'sebuah comment' });
      await RepliesTableTestHelper.addReply({});
      await CommentsTableTestHelper.deleteComment('comment-123');
      await RepliesTableTestHelper.deleteReply('reply-123');
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // action
      const thread = await threadRepositoryPostgres.findThreadById(
        'thread-123'
      );

      // assert
      expect(thread.id).toEqual(expectedThread.id);
      expect(thread.title).toEqual(expectedThread.title);
      expect(thread.body).toEqual(expectedThread.body);
      expect(thread.username).toEqual(expectedThread.username);
      expect(thread.comments).toBeDefined();
      expect(thread.comments[0].content).toEqual('**komentar telah dihapus**');
      expect(thread.comments[0].replies[0].content).toEqual(
        '**balasan telah dihapus**'
      );
    });

    it('should throw not found error', async () => {
      // arrange
      await UsersTableTestHelper.addUser({ username: 'tfkhdyt' });
      await ThreadsTableTestHelper.addThread({
        title: 'sebuah thread',
        body: 'sebuah body thread',
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // action and assert
      await expect(
        threadRepositoryPostgres.findThreadById('thread-xxx')
      ).rejects.toThrow(NotFoundError);
    });
  });
});
