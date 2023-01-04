const CommentRepository = require('../../../Domains/comments/CommentRepository');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    // arrange
    const useCasePayload = {
      commentId: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };
    const expectedResult = {
      status: 'success',
    };

    /** creating dependencies of use case */
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockCommentRepository.findCommentById = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new AddedComment({
          id: useCasePayload.commentId,
          content: 'ini konten',
          isDeleted: false,
          owner: useCasePayload.owner,
          threadId: useCasePayload.threadId,
          date: '2023-01-04T09:26:00',
        })
      )
    );

    mockCommentRepository.validateCommentOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockCommentRepository.deleteComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedResult));

    /** creating use case instance */
    const getCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
    });

    // action
    const deletedComment = await getCommentUseCase.execute(useCasePayload);

    // assert
    expect(deletedComment).toStrictEqual(expectedResult);
    expect(mockCommentRepository.findCommentById).toBeCalledWith(
      useCasePayload.commentId,
      useCasePayload.threadId
    );
    expect(mockCommentRepository.validateCommentOwner).toBeCalledWith(
      useCasePayload.commentId,
      useCasePayload.owner
    );
    expect(mockCommentRepository.deleteComment).toBeCalledWith(
      useCasePayload.commentId
    );
  });
});
