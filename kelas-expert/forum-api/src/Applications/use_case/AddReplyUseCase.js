const NewReply = require('../../Domains/comments/entities/NewReply');

class AddReplyUseCase {
  constructor({ commentRepository }) {
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const newReply = new NewReply(useCasePayload);
    return this._commentRepository.addReply(newReply);
  }
}

module.exports = AddReplyUseCase;
