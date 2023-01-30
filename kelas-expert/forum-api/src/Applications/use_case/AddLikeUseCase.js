const NewLike = require('../../Domains/likes/entities/NewLike');

class AddLikeUseCase {
  constructor({ likeRepository }) {
    this._likeRepository = likeRepository;
  }

  async execute(useCasePayload) {
    const newLike = new NewLike(useCasePayload);
    return this._likeRepository.likeComment(newLike);
  }
}

module.exports = AddLikeUseCase;
