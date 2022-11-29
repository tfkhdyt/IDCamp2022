class FigureCalculator {
  constructor(mathBasic) {
    this._mathBasic = mathBasic;
  }

  calculateRectanglePerimeter(...args) {
    if (args.length !== 2) {
      throw new Error('fungsi hanya menerima dua parameter');
    }

    const [length, width] = args;

    if (typeof length !== 'number' || typeof width !== 'number') {
      throw new Error('fungsi hanya menerima parameter number');
    }

    return this._mathBasic.multiply(2, this._mathBasic.add(length, width));
  }

  calculateRectangleArea(...args) {
    if (args.length !== 2) {
      throw new Error('fungsi hanya menerima 2 parameter');
    }

    const [length, width] = args;

    if (typeof length !== 'number' || typeof width !== 'number') {
      throw new Error('fungsi hanya menerima parameter number');
    }

    return this._mathBasic.multiply(length, width);
  }

  calculateTrianglePerimeter(...args) {
    if (args.length !== 3) {
      throw new Error('fungsi hanya menerima 3 parameter');
    }

    const [a, b, c] = args;

    if (
      typeof a !== 'number' ||
      typeof b !== 'number' ||
      typeof c !== 'number'
    ) {
      throw new Error('fungsi hanya menerima parameter number');
    }

    const sumOfAB = this._mathBasic.add(a, b);
    return this._mathBasic.add(sumOfAB, c);
  }
  calculateTriangleArea() {}
}

module.exports = FigureCalculator;
