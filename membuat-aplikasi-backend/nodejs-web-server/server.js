// console.log('Halo, kita akan belajar membuat server');
const http = require('http');

const PORT = 5000;
const HOST = 'localhost';

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.statusCode = 200;
  response.end('<h1>Halo HTTP Server!</h1>');
};

const server = http.createServer(requestListener);

server.listen(PORT, HOST, () => {
  console.log(`Server berjalan pada http://${HOST}:${PORT}`);
});
