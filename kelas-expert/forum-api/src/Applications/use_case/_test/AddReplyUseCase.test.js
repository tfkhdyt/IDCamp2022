const NewReply = require('../../../Domains/replys/entities/NewReply');
const AddedReply = require('../../../Domains/replys/entities/AddedReply');
const ReplyRepository = require('../../../Domains/replys/ReplyRepository');
const AddReplyUseCase = require('../AddReplyUseCase');

describe('AddReplyUseCase', () => {
  it('should orchestrating the add reply action correctly', async () => {
    // arrange
    const useCasePayload = {
      content: 'ini balasan',
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123',
    };
    const expectedAddedReply = new AddedReply({
      id: 'reply-123',
      content: useCasePayload.content,
      threadId: useCasePayload.threadId,
      commentId: useCasePayload.commentId,
      owner: useCasePayload.owner,
      isDeleted: false,
    });

    /** creating dependency of use case */
    const mockReplyRepository = new ReplyRepository();

    /** mocking needed function */
    mockReplyRepository.addReply = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedAddedReply));

    /** creating use case instance */
    const getReplyUseCase = new AddReplyUseCase({
      replyRepository: mockReplyRepository,
    });

    // action
    const addedReply = await getReplyUseCase.execute(useCasePayload);

    // assert
    expect(addedReply).toMatchObject(expectedAddedReply);
    expect(mockReplyRepository.addReply).toBeCalledWith(
      new NewReply({
        content: useCasePayload.content,
        threadId: useCasePayload.threadId,
        commentId: useCasePayload.commentId,
        owner: useCasePayload.owner,
      })
    );
  });
});
