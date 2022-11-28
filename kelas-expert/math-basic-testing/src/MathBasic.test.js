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
    expect(() => MathBasic.add()).toThrowError();
    expect(() => MathBasic.add(1)).toThrowError();
    expect(() => MathBasic.add(1, 2, 3)).toThrowError();
    expect(() => MathBasic.add(1, 2, 3, 4)).toThrowError();
  });

  it('should throw error when given non-number parameters', () => {
    expect(() => MathBasic.add('1', '2')).toThrowError();
    expect(() => MathBasic.add(true, {})).toThrowError();
    expect(() => MathBasic.add(null, false)).toThrowError();
  });

  it('should return a + b when given two number parameters', () => {
    expect(MathBasic.add(2, 2)).toEqual(4);
    expect(MathBasic.add(16, 8)).toEqual(24);
    expect(MathBasic.add(3, 7)).toEqual(10);
  });
});

describe('An substract function', () => {
  it('should throw error when not given 2 parameter', () => {
    expect(() => MathBasic.substract()).toThrowError();
    expect(() => MathBasic.substract(1)).toThrowError();
    expect(() => MathBasic.substract(1, 2, 3)).toThrowError();
    expect(() => MathBasic.substract(1, 2, 3, 4)).toThrowError();
  });

  it('should throw error when given non-number parameters', () => {
    expect(() => MathBasic.substract('1', '2')).toThrowError();
    expect(() => MathBasic.substract(true, {})).toThrowError();
    expect(() => MathBasic.substract(null, false)).toThrowError();
  });

  it('should return a - b when given two number parameters', () => {
    expect(MathBasic.substract(2, 2)).toEqual(0);
    expect(MathBasic.substract(16, 8)).toEqual(8);
    expect(MathBasic.substract(3, 7)).toEqual(-4);
  });
});
