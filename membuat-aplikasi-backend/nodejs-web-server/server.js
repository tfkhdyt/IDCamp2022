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
          response.end('<h1>Ini adalah homepage</h1>');
          break;
        default:
          response.statusCode = 400;
          response.end(
            `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
          );
      }
      break;
    case '/about':
      switch (method) {
        case 'GET':
          response.statusCode = 200;
          response.end('<h1>Halo! Ini adalah halaman about.</h1>');
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
            response.end(`<h1>Halo, ${name}! Ini adalah halaman about.</h1>`);
          });
          break;
        default:
          response.statusCode = 400;
          response.end(
            `<h1>Halaman tidak dapat diakses dengan ${method} request.</h1>`
          );
          break;
      }
      break;
    default:
      response.statusCode = 404;
      response.end('<h1>Halaman tidak ditemukan!</h1>');
      break;
  }
};

const server = http.createServer(requestListener);

server.listen(PORT, HOST, () => {
  console.log(`Server berjalan pada http://${HOST}:${PORT}`);
});
