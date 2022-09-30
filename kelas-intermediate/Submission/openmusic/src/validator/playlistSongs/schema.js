const Joi = require('joi');

const PlaylistSongSchemaPayload = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { PlaylistSongSchemaPayload };
