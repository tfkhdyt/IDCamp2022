const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notesPlugin = require('./api/notes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notesPlugin,
    options: { notes: [] },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
