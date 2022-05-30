const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Homepage';
    },
  },
  {
    method: '*',
    path: '/',
    handler: () => {
      return 'Halaman tidak dapat diakses dengan method tersebut';
    },
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request, h) => {
      return 'About page';
    },
  },
  {
    method: '*',
    path: '/about',
    handler: () => {
      return 'Halaman tidak dapat diakses dengan method tersebut';
    },
  },
  {
    method: 'GET',
    path: '/hello/{name?}',
    handler: (req) => {
      let { name = 'stranger' } = req.params;
      if (!name) name = 'stranger';

      const { lang } = req.query;

      if (lang.toLowerCase() === 'id') return `Hai, ${name}`;
      return `Hello, ${name}!`;
    },
  },
  {
    method: 'POST',
    path: '/user',
    handler: (req, h) => {
      return h.response('created').code(201);
    },
  },
  {
    method: '*',
    path: '/{any*}',
    handler: () => {
      return 'Halaman tidak ditemukan';
    },
  },
];

module.exports = routes;
