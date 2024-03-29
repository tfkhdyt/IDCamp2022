const autoBind = require('auto-bind');

const successResponse = require('../../utils/responses/success');

/* eslint-disable no-underscore-dangle */
class CollaborationsHandler {
  constructor(collaborationsService, notesService, validator) {
    this._collaborationsService = collaborationsService;
    this._notesService = notesService;
    this._validator = validator;

    autoBind(this);
  }

  async postCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { noteId, userId } = request.payload;

    await this._notesService.verifyNoteOwner(noteId, credentialId);
    // eslint-disable-next-line operator-linebreak
    const collaborationId = await this._collaborationsService.addCollaboration(
      noteId,
      userId
    );

    return successResponse(h, {
      message: 'Kolaborasi berhasil ditambahkan',
      data: { collaborationId },
      code: 201,
    });
  }

  async deleteCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { noteId, userId } = request.payload;

    await this._notesService.verifyNoteOwner(noteId, credentialId);
    // eslint-disable-next-line operator-linebreak
    await this._collaborationsService.deleteCollaboration(noteId, userId);

    return successResponse(h, {
      message: 'Kolaborasi berhasil dihapus',
    });
  }
}

module.exports = CollaborationsHandler;
