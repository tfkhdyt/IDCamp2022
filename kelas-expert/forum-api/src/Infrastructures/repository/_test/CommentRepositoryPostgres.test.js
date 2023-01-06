const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const pool = require('../../database/postgres/pool');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const InvariantError = require('../../../Commons/exceptions/InvariantError');

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist new comment', async () => {
      // arrange
      await UsersTableTestHelper.addUser({ username: 'tfkhdyt' });
      await ThreadsTableTestHelper.addThread({ title: 'sebuah thread' });
      const newComment = new NewComment({
        content: 'ini konten',
        owner: 'user-123',
        threadId: 'thread-123',
      });
      const fakeIdGenerator = () => '123'; // stub
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action
      await commentRepositoryPostgres.addComment(newComment);

      // assert
      const comments = await CommentsTableTestHelper.findCommentById(
        'comment-123'
      );
      expect(comments).toHaveLength(1);
    });

    it('should return added comment correctly', async () => {
      // arrange
      await UsersTableTestHelper.addUser({ username: 'tfkhdyt' });
      await ThreadsTableTestHelper.addThread({ title: 'sebuah thread' });
      const newComment = new NewComment({
        content: 'ini konten',
        owner: 'user-123',
        threadId: 'thread-123',
      });
      const fakeIdGenerator = () => '123'; // stub
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action
      const addedComment = await commentRepositoryPostgres.addComment(
        newComment
      );

      // assert
      expect(addedComment).toMatchObject(
        new AddedComment({
          id: 'comment-123',
          content: 'ini konten',
          isDeleted: false,
          owner: 'user-123',
          threadId: 'thread-123',
        })
      );
    });
  });

  describe('findCommentById function', () => {
    it('should return correct comment', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      const commentId = 'comment-123';
      const threadId = 'thread-123';
      const owner = 'user-123';
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action
      const comment = await commentRepositoryPostgres.findCommentById(
        commentId,
        threadId
      );

      // assert
      expect(comment).toMatchObject(
        new AddedComment({
          id: commentId,
          content: 'ini komentar',
          isDeleted: false,
          threadId,
          owner,
        })
      );
    });

    it('should throw not found error', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      const commentId = 'comment-xxx';
      const threadId = 'thread-xxx';
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action & assert
      await expect(
        commentRepositoryPostgres.findCommentById(commentId, threadId)
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('validateCommentOwner function', () => {
    it('should not throw authorization error', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      const commentId = 'comment-123';
      const threadId = 'thread-123';
      const owner = 'user-123';
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action & assert
      await expect(
        commentRepositoryPostgres.validateCommentOwner(
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
      const commentId = 'comment-123';
      const owner = 'user-xxx';
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action & assert
      await expect(
        commentRepositoryPostgres.validateCommentOwner(commentId, owner)
      ).rejects.toThrow(AuthorizationError);
    });
  });

  describe('deleteComment function', () => {
    it('should delete comment successfully', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      const commentId = 'comment-123';
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action & assert
      await expect(
        commentRepositoryPostgres.deleteComment(commentId)
      ).resolves.not.toThrow(InvariantError);

      const comment = await CommentsTableTestHelper.findCommentById(commentId);

      expect(comment[0].is_deleted).toEqual(true);
    });

    it('should throw InvariantError', async () => {
      // arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      const commentId = 'comment-xxx';
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action & assert
      await expect(
        commentRepositoryPostgres.deleteComment(commentId)
      ).rejects.toThrow(InvariantError);
    });
  });
});
