const Hapi = require('@hapi/hapi');

const createServer = ({ mathBasic, figureCalculator }) => {
  const server = Hapi.server({
    host: 'localhost',
    port: 5000,
    router: {
      stripTrailingSlash: true,
    },
  });

  server.route([
    {
      method: 'GET',
      path: '/add/{a}/{b}',
      handler: (req) => {
        const { a, b } = req.params;
        const value = mathBasic.add(Number(a), Number(b));
        console.log({ value });
        return { value };
      },
    },
    {
      method: 'GET',
      path: '/subtract/{a}/{b}',
      handler: (req) => {
        const { a, b } = req.params;
        const value = mathBasic.subtract(Number(a), Number(b));
        return { value };
      },
    },
    {
      method: 'GET',
      path: '/multiply/{a}/{b}',
      handler: (req) => {
        const { a, b } = req.params;
        const value = mathBasic.multiply(Number(a), Number(b));
        return { value };
      },
    },
    {
      method: 'GET',
      path: '/divide/{a}/{b}',
      handler: (req) => {
        const { a, b } = req.params;
        const value = mathBasic.divide(Number(a), Number(b));
        return { value };
      },
    },
    {
      method: 'GET',
      path: '/rectangle/perimeter/{a}/{b}',
      handler: (req) => {
        const { a, b } = req.params;
        const value = figureCalculator.calculateRectanglePerimeter(
          Number(a),
          Number(b)
        );
        return { value };
      },
    },
    {
      method: 'GET',
      path: '/rectangle/area/{a}/{b}',
      handler: (req) => {
        const { a, b } = req.params;
        const value = figureCalculator.calculateRectangleArea(
          Number(a),
          Number(b)
        );
        return { value };
      },
    },
    {
      method: 'GET',
      path: '/triangle/perimeter/{a}/{b}/{c}',
      handler: (req) => {
        const { a, b, c } = req.params;
        const value = figureCalculator.calculateTrianglePerimeter(
          Number(a),
          Number(b),
          Number(c)
        );
        return { value };
      },
    },
    {
      method: 'GET',
      path: '/triangle/area/{a}/{b}',
      handler: (req) => {
        const { a, b } = req.params;
        const value = figureCalculator.calculateTriangleArea(
          Number(a),
          Number(b)
        );
        return { value };
      },
    },
  ]);

  return server;
};

module.exports = createServer;
