class DeleteReplyUseCase {
  constructor({ replyRepository }) {
    this._replyRepository = replyRepository;
  }

  async execute(useCasePayload) {
    const { replyId, commentId, threadId, owner } = useCasePayload;

    await this._replyRepository.findReplyById(replyId, commentId, threadId);
    await this._replyRepository.validateReplyOwner(
      replyId,
      commentId,
      threadId,
      owner
    );

    await this._replyRepository.deleteReply(replyId);
  }
}

module.exports = DeleteReplyUseCase;
