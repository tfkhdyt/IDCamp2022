const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(req, h) {
    req.payload.owner = req.auth.credentials.id;

    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(req.payload);

    const response = h
      .response({
        status: 'success',
        data: {
          addedThread: {
            id: addedThread.id,
            title: addedThread.title,
            owner: addedThread.owner,
          },
        },
      })
      .code(201);

    return response;
  }
}

module.exports = ThreadsHandler;
