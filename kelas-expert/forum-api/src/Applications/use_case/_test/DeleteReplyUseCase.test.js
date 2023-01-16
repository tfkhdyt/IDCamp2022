const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');
const DeleteReplyUseCase = require('../DeleteReplyUseCase');

describe('DeleteReplyUseCase', () => {
  it('should orchestrating the delete reply action correctly', async () => {
    // arrange
    const useCasePayload = {
      replyId: 'reply-123',
      commentId: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };
    const expectedResult = {
      status: 'success',
    };

    /** creating dependencies of use case */
    const mockReplyRepository = new ReplyRepository();

    /** mocking needed function */
    mockReplyRepository.verifyReplyAvailability = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(
          new AddedReply({
            id: useCasePayload.replyId,
            content: 'ini konten',
            threadId: useCasePayload.threadId,
            commentId: useCasePayload.commentId,
            owner: useCasePayload.owner,
            isDeleted: false,
            date: '2023-01-04T09:26:00',
          })
        )
      );

    mockReplyRepository.validateReplyOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockReplyRepository.deleteReply = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedResult));

    /** creating use case instance */
    const getReplyUseCase = new DeleteReplyUseCase({
      replyRepository: mockReplyRepository,
    });

    // action
    await getReplyUseCase.execute(useCasePayload);

    // assert
    expect(mockReplyRepository.verifyReplyAvailability).toBeCalledWith(
      useCasePayload.replyId,
      useCasePayload.commentId,
      useCasePayload.threadId
    );
    expect(mockReplyRepository.validateReplyOwner).toBeCalledWith(
      useCasePayload.replyId,
      useCasePayload.commentId,
      useCasePayload.threadId,
      useCasePayload.owner
    );
    expect(mockReplyRepository.deleteReply).toBeCalledWith(
      useCasePayload.replyId
    );
  });
});
