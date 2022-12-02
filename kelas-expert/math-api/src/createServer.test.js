const createServer = require('./createServer');
const MathBasic = require('./MathBasic');
const FigureCalculator = require('./FigureCalculator');

describe('A HTTP Server', () => {
  describe('when GET /add', () => {
    it('should respond with a status code of 200 and the payload value is addition result of a and b correctly', async () => {
      // arrange
      const a = 10;
      const b = 20;
      const spyAdd = jest.spyOn(MathBasic, 'add');
      const server = createServer({ mathBasic: MathBasic });

      // action
      const response = await server.inject({
        method: 'GET',
        url: `/add/${a}/${b}`,
      });

      // assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(30);
      expect(spyAdd).toHaveBeenCalledWith(a, b);
    });
  });

  describe('when GET /subtract', () => {
    it('should respond with a status code of 200 and the payload value is subtraction result of a and b correctly', async () => {
      // arrange
      const a = 12;
      const b = 8;
      const spySubtract = jest.spyOn(MathBasic, 'subtract');
      const server = createServer({ mathBasic: MathBasic });

      // action
      const response = await server.inject({
        method: 'GET',
        url: `/subtract/${a}/${b}`,
      });

      // assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(4);
      expect(spySubtract).toHaveBeenCalledWith(a, b);
    });
  });

  describe('when GET /multiply', () => {
    it('should respond with a status code of 200 and the payload value is multiplication result of a and b correctly', async () => {
      // arrange
      const a = 12;
      const b = 8;
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const server = createServer({ mathBasic: MathBasic });

      // action
      const response = await server.inject({
        method: 'GET',
        url: `/multiply/${a}/${b}`,
      });

      // assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(96);
      expect(spyMultiply).toHaveBeenCalledWith(a, b);
    });
  });

  describe('when GET /divide', () => {
    it('should respond with a status code of 200 and the payload value is division result of a and b correctly', async () => {
      // arrange
      const a = 12;
      const b = 6;
      const spyDivide = jest.spyOn(MathBasic, 'divide');
      const server = createServer({ mathBasic: MathBasic });

      // action
      const response = await server.inject({
        method: 'GET',
        url: `/divide/${a}/${b}`,
      });

      // assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(2);
      expect(spyDivide).toHaveBeenCalledWith(a, b);
    });
  });

  describe('when GET /rectangle/perimeter', () => {
    it('should respond a status code of 200 and the payload value is rectangle perimeter of length and width correctly', async () => {
      // arrange
      const length = 8;
      const width = 4;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateRectanglePerimeter = jest.spyOn(
        figureCalculator,
        'calculateRectanglePerimeter'
      );
      const server = createServer({ figureCalculator });

      // action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/perimeter/${length}/${width}`,
      });

      // assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(24);
      expect(spyCalculateRectanglePerimeter).toHaveBeenCalledWith(
        length,
        width
      );
    });
  });

  describe('when GET /rectangle/area', () => {
    it('should respond a status code of 200 and the payload value is rectangle area of length and width correctly', async () => {
      // arrange
      const length = 8;
      const width = 4;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateRectangleArea = jest.spyOn(
        figureCalculator,
        'calculateRectangleArea'
      );
      const server = createServer({ figureCalculator });

      // action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/area/${length}/${width}`,
      });

      // assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(32);
      expect(spyCalculateRectangleArea).toHaveBeenCalledWith(length, width);
    });
  });

  describe('when GET /triangle/perimeter', () => {
    it('should respond a status code of 200 and the payload value is triangle perimeter of 3 sides correctly', async () => {
      // arrange
      const sideA = 4;
      const sideB = 4;
      const sideC = 4;

      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateTrianglePerimeter = jest.spyOn(
        figureCalculator,
        'calculateTrianglePerimeter'
      );
      const server = createServer({ figureCalculator });

      // action
      const response = await server.inject({
        method: 'GET',
        url: `/triangle/perimeter/${sideA}/${sideB}/${sideC}`,
      });

      // assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(12);
      expect(spyCalculateTrianglePerimeter).toHaveBeenCalledWith(
        sideA,
        sideB,
        sideC
      );
    });
  });

  describe('when GET /triangle/area', () => {
    it('should respond a status code of 200 and the payload value is triangle area of base and height correctly', async () => {
      // arrange
      const base = 8;
      const height = 4;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spyCalculateTriangleArea = jest.spyOn(
        figureCalculator,
        'calculateTriangleArea'
      );
      const server = createServer({ figureCalculator });

      // action
      const response = await server.inject({
        method: 'GET',
        url: `/triangle/area/${base}/${height}`,
      });

      // assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(16);
      expect(spyCalculateTriangleArea).toHaveBeenCalledWith(base, height);
    });
  });
});
