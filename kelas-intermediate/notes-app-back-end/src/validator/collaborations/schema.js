const Joi = require('joi');

const CollaborationSchemaPayload = Joi.object({
  noteId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = { CollaborationSchemaPayload };
