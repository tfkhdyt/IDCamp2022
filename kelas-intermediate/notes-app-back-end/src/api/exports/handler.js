const autoBind = require('auto-bind');

const successResponse = require('../../utils/responses/success');

class ExportsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postExportNotesHandler(request, h) {
    this._validator.validateExportNotesPayload(request.payload);

    const message = {
      userId: request.auth.credentials.id,
      targetEmail: request.payload.targetEmail,
    };

    await this._service.sendMessage('export:notes', JSON.stringify(message));

    return successResponse(h, {
      message: 'Permintaan Anda dalam antrean',
      code: 201,
    });
  }
}

module.exports = ExportsHandler;
