const LikeRepository = require('../LikeRepository');

describe('LikeRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // arrange
    const likeRepository = new LikeRepository();

    // action and assert
    await expect(likeRepository.likeComment({})).rejects.toThrowError(
      'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(likeRepository.unlikeComment('')).rejects.toThrowError(
      'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(likeRepository.checkLikeStatus({})).rejects.toThrowError(
      'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
