// console.log('Halo, kita akan belajar membuat server');
const http = require('http');

const PORT = 5000;
const HOST = 'localhost';

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.statusCode = 200;

  const { method } = request;

  switch (method) {
    case 'GET':
      response.end('<h1>Hello!</h1>');
      break;
    case 'POST':
      response.end('<h1>Hai!</h1>');
      break;
    case 'PUT':
      response.end('<h1>Bonjour!</h1>');
      break;
    case 'DELETE':
      response.end('<h1>Salam!</h1>');
      break;
    default:
      console.error('Method tidak valid!');
  }
};

const server = http.createServer(requestListener);

server.listen(PORT, HOST, () => {
  console.log(`Server berjalan pada http://${HOST}:${PORT}`);
});
