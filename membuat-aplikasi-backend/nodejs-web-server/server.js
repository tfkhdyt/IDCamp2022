// console.log('Halo, kita akan belajar membuat server');
const http = require('http');

const PORT = 5000;
const HOST = 'localhost';

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Powered-By', 'Node.js');

  const { method, url } = request;

  switch (url) {
    case '/':
      switch (method) {
        case 'GET':
          response.statusCode = 200;
          response.end(
            JSON.stringify({
              message: 'Ini adalah homepage',
            })
          );
          break;
        default:
          response.statusCode = 400;
          response.end(
            JSON.stringify({
              message: `Halaman tidak dapat diakses dengan ${method} request`,
            })
          );
      }
      break;
    case '/about':
      switch (method) {
        case 'GET':
          response.statusCode = 200;
          response.end(
            JSON.stringify({
              message: 'Halo! Ini adalah halaman about.',
            })
          );
          break;
        case 'POST':
          let body = [];

          request.on('data', (chunk) => {
            body.push(chunk);
          });

          request.on('end', () => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body);
            response.statusCode = 200;
            response.end(
              JSON.stringify({
                message: `Halo, ${name}! Ini adalah halaman about.`,
              })
            );
          });
          break;
        default:
          response.statusCode = 400;
          response.end(
            JSON.stringify({
              message: `Halaman tidak dapat diakses dengan ${method} request.`,
            })
          );
          break;
      }
      break;
    default:
      response.statusCode = 404;
      response.end(
        JSON.stringify({
          message: 'Halaman tidak ditemukan!',
        })
      );
      break;
  }
};

const server = http.createServer(requestListener);

server.listen(PORT, HOST, () => {
  console.log(`Server berjalan pada http://${HOST}:${PORT}`);
});
