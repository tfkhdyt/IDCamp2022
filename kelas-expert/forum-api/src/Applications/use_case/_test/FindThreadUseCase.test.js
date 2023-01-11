const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const FindThreadUseCase = require('../FindThreadUseCase');

describe('FindCommentUseCase', () => {
  it('should orchestrating the find thread action correctly', async () => {
    // arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };
    const expectedThread = new AddedThread({
      id: 'thread-123',
      title: 'ini title',
      body: 'ini body',
      owner: 'user-123',
    });

    /* creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /* mocking needed function */
    mockThreadRepository.findThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedThread));

    /* creating use case instance */
    const getThreadUseCase = new FindThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // action
    const thread = await getThreadUseCase.execute(useCasePayload);

    // assert
    expect(thread).toMatchObject(expectedThread);
    expect(mockThreadRepository.findThreadById).toBeCalledWith(
      useCasePayload.threadId
    );
  });
});
