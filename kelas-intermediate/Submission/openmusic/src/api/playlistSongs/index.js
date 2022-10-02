const routes = require('./routes');
const PlaylistSongsHandler = require('./handler');

module.exports = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (
    server,
    {
      playlistSongsService,
      playlistsService,
      playlistSongActivitiesService,
      validator,
    }
  ) => {
    const playlistSongsHandler = new PlaylistSongsHandler(
      playlistSongsService,
      playlistsService,
      playlistSongActivitiesService,
      validator
    );

    server.route(routes(playlistSongsHandler));
  },
};
