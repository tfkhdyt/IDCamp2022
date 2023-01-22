const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const FindThreadUseCase = require('../FindThreadUseCase');

describe('FindCommentUseCase', () => {
  it('should orchestrating the find thread action correctly', async () => {
    // arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };
    const expectedThread = {
      ...new AddedThread({
        id: 'thread-123',
        title: 'ini title',
        body: 'ini body',
        owner: 'user-123',
        date: '2023-01-18T21:50:00',
      }),
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding',
          content: 'ini konten',
          date: '2023-01-18T21:50:00',
          replies: [
            {
              id: 'reply-123',
              username: 'dicoding',
              content: 'ini konten',
              date: '2023-01-18T21:50:00',
            },
          ],
        },
      ],
    };

    /* creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    /* mocking needed function */
    mockThreadRepository.findThreadById = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new AddedThread({
          id: 'thread-123',
          title: 'ini title',
          body: 'ini body',
          owner: 'user-123',
          date: '2023-01-18T21:50:00',
        })
      )
    );
    mockCommentRepository.findCommentsByThreadId = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: 'comment-123',
            username: 'dicoding',
            content: 'ini konten',
            date: '2023-01-18T21:50:00',
            is_deleted: false,
          },
        ])
      );

    mockReplyRepository.findRepliesByCommentId = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: 'reply-123',
            username: 'dicoding',
            content: 'ini konten',
            date: '2023-01-18T21:50:00',
            is_deleted: false,
          },
        ])
      );

    /* creating use case instance */
    const getThreadUseCase = new FindThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // action
    const thread = await getThreadUseCase.execute(useCasePayload.threadId);

    // assert
    expect(thread).toStrictEqual(expectedThread);
    expect(thread.comments[0].content).not.toEqual(
      '**komentar telah dihapus**'
    );
    expect(thread.comments[0].replies[0].content).not.toEqual(
      '**balasan telah dihapus**'
    );
    expect(mockThreadRepository.findThreadById).toBeCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.findCommentsByThreadId).toBeCalledWith(
      useCasePayload.threadId
    );
    expect(mockReplyRepository.findRepliesByCommentId).toBeCalledWith(
      'comment-123'
    );
  });

  it('should orchestrating the find thread action correctly, with deleted comment and reply', async () => {
    // arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };
    const expectedThread = {
      ...new AddedThread({
        id: 'thread-123',
        title: 'ini title',
        body: 'ini body',
        owner: 'user-123',
        date: '2023-01-18T21:52:00',
      }),
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding',
          content: '**komentar telah dihapus**',
          date: '2023-01-18T21:52:00',
          replies: [
            {
              id: 'reply-123',
              username: 'dicoding',
              content: '**balasan telah dihapus**',
              date: '2023-01-18T21:52:00',
            },
          ],
        },
      ],
    };

    /* creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    /* mocking needed function */
    mockThreadRepository.findThreadById = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new AddedThread({
          id: 'thread-123',
          title: 'ini title',
          body: 'ini body',
          owner: 'user-123',
          date: '2023-01-18T21:52:00',
        })
      )
    );
    mockCommentRepository.findCommentsByThreadId = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: 'comment-123',
            username: 'dicoding',
            content: 'ini konten',
            date: '2023-01-18T21:52:00',
            is_deleted: true,
          },
        ])
      );

    mockReplyRepository.findRepliesByCommentId = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: 'reply-123',
            username: 'dicoding',
            content: 'ini konten',
            date: '2023-01-18T21:52:00',
            is_deleted: true,
          },
        ])
      );

    /* creating use case instance */
    const getThreadUseCase = new FindThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // action
    const thread = await getThreadUseCase.execute(useCasePayload.threadId);

    // assert
    expect(thread).toStrictEqual(expectedThread);
    expect(thread.comments[0].content).toEqual('**komentar telah dihapus**');
    expect(thread.comments[0].replies[0].content).toEqual(
      '**balasan telah dihapus**'
    );
    expect(mockThreadRepository.findThreadById).toBeCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.findCommentsByThreadId).toBeCalledWith(
      useCasePayload.threadId
    );
    expect(mockReplyRepository.findRepliesByCommentId).toBeCalledWith(
      'comment-123'
    );
  });
});
