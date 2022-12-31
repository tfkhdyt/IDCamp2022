const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const AddCommentUseCase = require('../AddCommentUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    // arrange
    const useCasePayload = {
      content: 'ini konten',
      owner: 'user-123',
      threadId: 'thread-123',
    };
    const expectedAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      isDeleted: false,
      owner: useCasePayload.owner,
      threadId: useCasePayload.threadId,
    });

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockCommentRepository.addComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedAddedComment));
    mockThreadRepository.validate = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const getCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // action
    const addedComment = await getCommentUseCase.execute(useCasePayload);

    // assert
    expect(addedComment).toMatchObject(expectedAddedComment);
    expect(mockCommentRepository.addComment).toBeCalledWith(
      new NewComment({
        content: useCasePayload.content,
        owner: useCasePayload.owner,
        threadId: useCasePayload.threadId,
      })
    );
  });
});