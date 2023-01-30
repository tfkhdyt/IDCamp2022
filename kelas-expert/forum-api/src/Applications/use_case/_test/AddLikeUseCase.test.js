const LikeRepository = require('../../../Domains/likes/LikeRepository');
const AddLikeUseCase = require('../AddLikeUseCase');

describe('AddLikeUseCase', () => {
  it('should orchestrating the add like action correctly', async () => {
    // arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123',
    };
    const expectedResult = {
      status: 'success',
    };
    /** creating dependency of use case */
    const mockLikeRepository = new LikeRepository();

    /** mocking needed function */
    mockLikeRepository.likeComment = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 'success',
      })
    );

    /** creating use case instance */
    const getLikeUseCase = new AddLikeUseCase({
      likeRepository: mockLikeRepository,
    });

    // action
    const addedLike = await getLikeUseCase.execute(useCasePayload);

    // assert
    expect(addedLike).toStrictEqual(expectedResult);
  });
});
