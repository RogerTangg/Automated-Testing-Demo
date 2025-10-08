/**
 * Calculator utility functions
 * Provides basic arithmetic operations for the application
 */

class Calculator {
  /**
   * Add two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Sum of a and b
   */
  static add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return a + b;
  }

  /**
   * Subtract two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Difference of a and b
   */
  static subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return a - b;
  }

  /**
   * Multiply two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Product of a and b
   */
  static multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return a * b;
  }

  /**
   * Divide two numbers
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @returns {number} Quotient of a and b
   */
  static divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  /**
   * Calculate percentage
   * @param {number} value - The value
   * @param {number} percentage - The percentage
   * @returns {number} Percentage of the value
   */
  static percentage(value, percentage) {
    if (typeof value !== 'number' || typeof percentage !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return (value * percentage) / 100;
  }

  /**
   * Calculate power
   * @param {number} base - Base number
   * @param {number} exponent - Exponent
   * @returns {number} Base raised to the power of exponent
   */
  static power(base, exponent) {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
      throw new Error('Both arguments must be numbers');
    }
    return Math.pow(base, exponent);
  }
}

module.exports = Calculator;