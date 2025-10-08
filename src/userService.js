/**
 * User Service Module
 * Handles user registration, validation, and management
 */

const _ = require('lodash');

class UserService {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  /**
   * Register a new user
   * @param {Object} userData - User data
   * @param {string} userData.username - Username
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @returns {Object} Created user object
   */
  registerUser(userData) {
    const { username, email, password } = userData;

    // Validate input
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }

    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    if (!this.isValidPassword(password)) {
      throw new Error('Password must be at least 8 characters long and contain at least one number');
    }

    // Check if user already exists
    if (this.findUserByUsername(username)) {
      throw new Error('Username already exists');
    }

    if (this.findUserByEmail(email)) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser = {
      id: this.nextId++,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: this.hashPassword(password),
      createdAt: new Date(),
      isActive: true
    };

    this.users.push(newUser);
    return _.omit(newUser, ['password']); // Return user without password
  }

  /**
   * Find user by username
   * @param {string} username - Username to search for
   * @returns {Object|null} User object or null if not found
   */
  findUserByUsername(username) {
    return _.find(this.users, user => user.username === username.toLowerCase());
  }

  /**
   * Find user by email
   * @param {string} email - Email to search for
   * @returns {Object|null} User object or null if not found
   */
  findUserByEmail(email) {
    return _.find(this.users, user => user.email === email.toLowerCase());
  }

  /**
   * Get all users
   * @returns {Array} Array of user objects without passwords
   */
  getAllUsers() {
    return this.users.map(user => _.omit(user, ['password']));
  }

  /**
   * Get user by ID
   * @param {number} id - User ID
   * @returns {Object|null} User object or null if not found
   */
  getUserById(id) {
    const user = _.find(this.users, user => user.id === id);
    return user ? _.omit(user, ['password']) : null;
  }

  /**
   * Update user
   * @param {number} id - User ID
   * @param {Object} updateData - Data to update
   * @returns {Object|null} Updated user object or null if not found
   */
  updateUser(id, updateData) {
    const userIndex = _.findIndex(this.users, user => user.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Validate email if provided
    if (updateData.email && !this.isValidEmail(updateData.email)) {
      throw new Error('Invalid email format');
    }

    // Update user
    this.users[userIndex] = { ...this.users[userIndex], ...updateData };
    return _.omit(this.users[userIndex], ['password']);
  }

  /**
   * Delete user
   * @param {number} id - User ID
   * @returns {boolean} True if user was deleted, false if not found
   */
  deleteUser(id) {
    const userIndex = _.findIndex(this.users, user => user.id === id);
    
    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {boolean} True if password meets requirements
   */
  isValidPassword(password) {
    return password.length >= 8 && /\d/.test(password);
  }

  /**
   * Hash password (simple implementation for demo)
   * @param {string} password - Password to hash
   * @returns {string} Hashed password
   */
  hashPassword(password) {
    // Simple hash for demo purposes - in real apps use bcrypt
    return Buffer.from(password).toString('base64');
  }

  /**
   * Get user statistics
   * @returns {Object} User statistics
   */
  getUserStats() {
    return {
      totalUsers: this.users.length,
      activeUsers: this.users.filter(user => user.isActive).length,
      inactiveUsers: this.users.filter(user => !user.isActive).length
    };
  }
}

module.exports = UserService;