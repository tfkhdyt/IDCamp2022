class FindThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  execute({ threadId }) {
    return this._threadRepository.findThreadById(threadId);
  }
}

module.exports = FindThreadUseCase;
