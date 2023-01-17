const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');

const NewReply = require('../../../Domains/replies/entities/NewReply');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');

const ReplyRepositoryPostgres = require('../ReplyRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const InvariantError = require('../../../Commons/exceptions/InvariantError');

describe('ReplyRepositoryPostgres', () => {
  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addReply function', () => {
    it('should persist new reply', async () => {
      // arrange
      await UsersTableTestHelper.addUser({ username: 'tfkhdyt' });
      await ThreadsTableTestHelper.addThread({ title: 'sebuah thread' });
      await CommentsTableTestHelper.addComment({});
      const newReply = new NewReply({
        content: 'ini konten',
        threadId: 'thread-123',
        commentId: 'comment-123',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action
      await replyRepositoryPostgres.addReply(newReply);

      // assert
      const replies = await RepliesTableTestHelper.findReplyById('reply-123');
      expect(replies).toHaveLength(1);
    });

    it('should return added reply correctly', async () => {
      // arrange
      await UsersTableTestHelper.addUser({ username: 'tfkhdyt' });
      await ThreadsTableTestHelper.addThread({ title: 'sebuah thread' });
      await CommentsTableTestHelper.addComment({});
      const newReply = new NewReply({
        content: 'ini konten',
        threadId: 'thread-123',
        commentId: 'comment-123',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action
      const addedReply = await replyRepositoryPostgres.addReply(newReply);

      // assert
      expect(addedReply).toStrictEqual(
        new AddedReply({
          id: 'reply-123',
          content: 'ini konten',
          threadId: 'thread-123',
          commentId: 'comment-123',
          owner: 'user-123',
          isDeleted: false,
          date: expect.any(Date),
        })
      );
    });
  });

  describe('verifyReplyAvailability function', () => {
    it('should return correct reply', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});
      const replyId = 'reply-123';
      const commentId = 'comment-123';
      const threadId = 'thread-123';
      const owner = 'user-123';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action
      const reply = await replyRepositoryPostgres.verifyReplyAvailability(
        replyId,
        commentId,
        threadId
      );

      // assert
      expect(reply).toStrictEqual(
        new AddedReply({
          id: replyId,
          content: 'ini balasan',
          threadId,
          commentId,
          owner,
          isDeleted: false,
          date: expect.any(Date),
        })
      );
    });

    it('should throw not found error', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});
      const replyId = 'reply-xxx';
      const commentId = 'comment-xxx';
      const threadId = 'thread-xxx';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action & assert
      await expect(
        replyRepositoryPostgres.verifyReplyAvailability(
          replyId,
          commentId,
          threadId
        )
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('validateReplyOwner function', () => {
    it('should not throw authorization error', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});
      const replyId = 'reply-123';
      const commentId = 'comment-123';
      const threadId = 'thread-123';
      const owner = 'user-123';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action & assert
      await expect(
        replyRepositoryPostgres.validateReplyOwner(
          replyId,
          commentId,
          threadId,
          owner
        )
      ).resolves.not.toThrow(AuthorizationError);
    });

    it('should throw authorization error', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});
      const replyId = 'reply-123';
      const commentId = 'comment-123';
      const threadId = 'thread-123';
      const owner = 'user-xxx';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action & assert
      await expect(
        replyRepositoryPostgres.validateReplyOwner(
          replyId,
          commentId,
          threadId,
          owner
        )
      ).rejects.toThrow(AuthorizationError);
    });
  });

  describe('deleteReply function', () => {
    it('should delete reply successfully', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});
      const replyId = 'reply-123';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action & assert
      await expect(
        replyRepositoryPostgres.deleteReply(replyId)
      ).resolves.not.toThrow(InvariantError);

      const reply = await RepliesTableTestHelper.findReplyById(replyId);

      expect(reply[0].is_deleted).toEqual(true);
    });

    it('should throw InvariantError', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});
      const replyId = 'reply-xxx';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action & assert
      await expect(
        replyRepositoryPostgres.deleteReply(replyId)
      ).rejects.toThrow(InvariantError);
    });
  });

  describe('findRepliesByCommentId function', () => {
    it('should return correct comments', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});
      const commentId = 'comment-123';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action
      const replies = await replyRepositoryPostgres.findRepliesByCommentId(
        commentId
      );

      // assert
      expect(replies.length).toEqual(1);
      expect(replies[0].id).toEqual('reply-123');
    });

    it('should return empty array', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});
      const commentId = 'comment-xxx';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action
      const replies = await replyRepositoryPostgres.findRepliesByCommentId(
        commentId
      );

      expect(replies.length).toEqual(0);
    });
  });
});
