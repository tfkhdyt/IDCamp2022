const routes = require('./routes');
const UserAlbumLikesHandler = require('./handler');

module.exports = {
  name: 'user-album-likes',
  version: '1.0.0',
  register: async (server, { userAlbumLikesService, albumsService }) => {
    const userAlbumLikesHandler = new UserAlbumLikesHandler(
      userAlbumLikesService,
      albumsService
    );

    server.route(routes(userAlbumLikesHandler));
  },
};
