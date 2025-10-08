/**
 * Unit Tests for Calculator Module
 * Tests all arithmetic operations and edge cases
 */

const Calculator = require('../../src/calculator');

describe('Calculator', () => {
  describe('Addition', () => {
    test('should add two positive numbers correctly', () => {
      expect(Calculator.add(2, 3)).toBe(5);
      expect(Calculator.add(10, 15)).toBe(25);
    });

    test('should add negative numbers correctly', () => {
      expect(Calculator.add(-2, -3)).toBe(-5);
      expect(Calculator.add(-10, 5)).toBe(-5);
    });

    test('should add decimal numbers correctly', () => {
      expect(Calculator.add(2.5, 3.7)).toBeCloseTo(6.2);
      expect(Calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => Calculator.add('2', 3)).toThrow('Both arguments must be numbers');
      expect(() => Calculator.add(2, '3')).toThrow('Both arguments must be numbers');
      expect(() => Calculator.add('a', 'b')).toThrow('Both arguments must be numbers');
    });
  });

  describe('Subtraction', () => {
    test('should subtract two positive numbers correctly', () => {
      expect(Calculator.subtract(5, 3)).toBe(2);
      expect(Calculator.subtract(10, 7)).toBe(3);
    });

    test('should subtract negative numbers correctly', () => {
      expect(Calculator.subtract(-5, -3)).toBe(-2);
      expect(Calculator.subtract(5, -3)).toBe(8);
    });

    test('should subtract decimal numbers correctly', () => {
      expect(Calculator.subtract(5.5, 2.3)).toBeCloseTo(3.2);
      expect(Calculator.subtract(0.5, 0.3)).toBeCloseTo(0.2);
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => Calculator.subtract('5', 3)).toThrow('Both arguments must be numbers');
      expect(() => Calculator.subtract(5, '3')).toThrow('Both arguments must be numbers');
    });
  });

  describe('Multiplication', () => {
    test('should multiply two positive numbers correctly', () => {
      expect(Calculator.multiply(3, 4)).toBe(12);
      expect(Calculator.multiply(7, 8)).toBe(56);
    });

    test('should multiply negative numbers correctly', () => {
      expect(Calculator.multiply(-3, 4)).toBe(-12);
      expect(Calculator.multiply(-3, -4)).toBe(12);
    });

    test('should multiply by zero correctly', () => {
      expect(Calculator.multiply(5, 0)).toBe(0);
      expect(Calculator.multiply(0, 10)).toBe(0);
    });

    test('should multiply decimal numbers correctly', () => {
      expect(Calculator.multiply(2.5, 4)).toBeCloseTo(10);
      expect(Calculator.multiply(0.5, 0.4)).toBeCloseTo(0.2);
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => Calculator.multiply('3', 4)).toThrow('Both arguments must be numbers');
      expect(() => Calculator.multiply(3, null)).toThrow('Both arguments must be numbers');
    });
  });

  describe('Division', () => {
    test('should divide two positive numbers correctly', () => {
      expect(Calculator.divide(12, 4)).toBe(3);
      expect(Calculator.divide(15, 3)).toBe(5);
    });

    test('should divide negative numbers correctly', () => {
      expect(Calculator.divide(-12, 4)).toBe(-3);
      expect(Calculator.divide(-12, -4)).toBe(3);
    });

    test('should divide decimal numbers correctly', () => {
      expect(Calculator.divide(7.5, 2.5)).toBeCloseTo(3);
      expect(Calculator.divide(1, 3)).toBeCloseTo(0.3333333333333333);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => Calculator.divide(5, 0)).toThrow('Division by zero is not allowed');
      expect(() => Calculator.divide(-5, 0)).toThrow('Division by zero is not allowed');
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => Calculator.divide('12', 4)).toThrow('Both arguments must be numbers');
      expect(() => Calculator.divide(12, undefined)).toThrow('Both arguments must be numbers');
    });
  });

  describe('Percentage', () => {
    test('should calculate percentage correctly', () => {
      expect(Calculator.percentage(100, 50)).toBe(50);
      expect(Calculator.percentage(200, 25)).toBe(50);
      expect(Calculator.percentage(150, 20)).toBe(30);
    });

    test('should calculate percentage of zero', () => {
      expect(Calculator.percentage(0, 50)).toBe(0);
      expect(Calculator.percentage(100, 0)).toBe(0);
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => Calculator.percentage('100', 50)).toThrow('Both arguments must be numbers');
      expect(() => Calculator.percentage(100, '50')).toThrow('Both arguments must be numbers');
    });
  });

  describe('Power', () => {
    test('should calculate power correctly', () => {
      expect(Calculator.power(2, 3)).toBe(8);
      expect(Calculator.power(5, 2)).toBe(25);
      expect(Calculator.power(10, 0)).toBe(1);
    });

    test('should calculate negative exponents correctly', () => {
      expect(Calculator.power(2, -2)).toBe(0.25);
      expect(Calculator.power(5, -1)).toBe(0.2);
    });

    test('should calculate decimal bases and exponents', () => {
      expect(Calculator.power(2.5, 2)).toBeCloseTo(6.25);
      expect(Calculator.power(4, 0.5)).toBeCloseTo(2);
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => Calculator.power('2', 3)).toThrow('Both arguments must be numbers');
      expect(() => Calculator.power(2, '3')).toThrow('Both arguments must be numbers');
    });
  });
});