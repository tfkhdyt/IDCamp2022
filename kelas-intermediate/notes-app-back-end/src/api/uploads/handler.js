const autoBind = require('auto-bind');

const successResponse = require('../../utils/responses/success');

class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postUploadImageHandler(request, h) {
    const { data } = request.payload;
    this._validator.validateImageHeaders(data.hapi.headers);

    const fileLocation = await this._service.writeFile(data, data.hapi);

    return successResponse(h, {
      data: {
        fileLocation,
      },
      code: 201,
    });
  }
}

module.exports = UploadsHandler;
