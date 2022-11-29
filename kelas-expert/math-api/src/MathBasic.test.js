const MathBasic = require('./MathBasic');

describe('A MathBasic', () => {
  it('should contains add, substract, multiply, and divide function', () => {
    expect(MathBasic).toHaveProperty('add');
    expect(MathBasic).toHaveProperty('substract');
    expect(MathBasic).toHaveProperty('multiply');
    expect(MathBasic).toHaveProperty('divide');

    expect(MathBasic.add).toBeInstanceOf(Function);
    expect(MathBasic.substract).toBeInstanceOf(Function);
    expect(MathBasic.multiply).toBeInstanceOf(Function);
    expect(MathBasic.divide).toBeInstanceOf(Function);
  });
});

describe('An add function', () => {
  it('should throw error when not given 2 parameter', () => {
    expect(() => MathBasic.add()).toThrow();
    expect(() => MathBasic.add(1)).toThrow();
    expect(() => MathBasic.add(1, 2, 3)).toThrow();
    expect(() => MathBasic.add(1, 2, 3, 4)).toThrow();
  });

  it('should throw error when given non-number parameters', () => {
    expect(() => MathBasic.add('1', '2')).toThrow();
    expect(() => MathBasic.add(true, {})).toThrow();
    expect(() => MathBasic.add(null, false)).toThrow();
  });

  it('should return a + b when given two number parameters', () => {
    expect(MathBasic.add(2, 2)).toEqual(4);
    expect(MathBasic.add(16, 8)).toEqual(24);
    expect(MathBasic.add(3, 7)).toEqual(10);
  });
});

describe('A substract function', () => {
  it('should throw error when not given 2 parameter', () => {
    expect(() => MathBasic.substract()).toThrow();
    expect(() => MathBasic.substract(1)).toThrow();
    expect(() => MathBasic.substract(1, 2, 3)).toThrow();
    expect(() => MathBasic.substract(1, 2, 3, 4)).toThrow();
  });

  it('should throw error when given non-number parameters', () => {
    expect(() => MathBasic.substract('1', '2')).toThrow();
    expect(() => MathBasic.substract(true, {})).toThrow();
    expect(() => MathBasic.substract(null, false)).toThrow();
  });

  it('should return a - b when given two number parameters', () => {
    expect(MathBasic.substract(2, 2)).toEqual(0);
    expect(MathBasic.substract(16, 8)).toEqual(8);
    expect(MathBasic.substract(3, 7)).toEqual(-4);
  });
});

describe('A multiply function', () => {
  it('should throw error when not given 2 parameter', () => {
    expect(() => MathBasic.multiply()).toThrow();
    expect(() => MathBasic.multiply(1)).toThrow();
    expect(() => MathBasic.multiply(1, 2, 3)).toThrow();
    expect(() => MathBasic.multiply(1, 2, 3, 4)).toThrow();
  });

  it('should throw error when given non-number parameters', () => {
    expect(() => MathBasic.multiply('1', '2')).toThrow();
    expect(() => MathBasic.multiply(true, {})).toThrow();
    expect(() => MathBasic.multiply(null, false)).toThrow();
  });

  it('should return a * b when given two number parameters', () => {
    expect(MathBasic.multiply(2, 2)).toEqual(4);
    expect(MathBasic.multiply(16, 8)).toEqual(128);
    expect(MathBasic.multiply(3, 7)).toEqual(21);
  });
});

describe('A divide function', () => {
  it('should throw error when not given 2 parameter', () => {
    expect(() => MathBasic.divide()).toThrow();
    expect(() => MathBasic.divide(1)).toThrow();
    expect(() => MathBasic.divide(1, 2, 3)).toThrow();
    expect(() => MathBasic.divide(1, 2, 3, 4)).toThrow();
  });

  it('should throw error when given non-number parameters', () => {
    expect(() => MathBasic.divide('1', '2')).toThrow();
    expect(() => MathBasic.divide(true, {})).toThrow();
    expect(() => MathBasic.divide(null, false)).toThrow();
  });

  it('should return a / b when given two number parameters', () => {
    expect(MathBasic.divide(2, 2)).toEqual(1);
    expect(MathBasic.divide(16, 8)).toEqual(2);
    expect(MathBasic.divide(30, 10)).toEqual(3);
  });
});
