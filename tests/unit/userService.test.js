/**
 * Unit Tests for UserService Module
 * Tests user registration, validation, and management functionality
 */

const UserService = require('../../src/userService');

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('User Registration', () => {
    test('should register a valid user successfully', () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const user = userService.registerUser(userData);

      expect(user).toHaveProperty('id');
      expect(user.username).toBe('testuser');
      expect(user.email).toBe('test@example.com');
      expect(user).not.toHaveProperty('password'); // Password should be excluded
      expect(user.isActive).toBe(true);
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    test('should convert username and email to lowercase', () => {
      const userData = {
        username: 'TestUser',
        email: 'TEST@EXAMPLE.COM',
        password: 'password123'
      };

      const user = userService.registerUser(userData);

      expect(user.username).toBe('testuser');
      expect(user.email).toBe('test@example.com');
    });

    test('should throw error for missing required fields', () => {
      expect(() => userService.registerUser({})).toThrow('Username, email, and password are required');
      expect(() => userService.registerUser({ username: 'test' })).toThrow('Username, email, and password are required');
      expect(() => userService.registerUser({ username: 'test', email: 'test@example.com' })).toThrow('Username, email, and password are required');
    });

    test('should throw error for invalid email format', () => {
      const userData = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123'
      };

      expect(() => userService.registerUser(userData)).toThrow('Invalid email format');
    });

    test('should throw error for weak password', () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'weak' // Too short and no numbers
      };

      expect(() => userService.registerUser(userData)).toThrow('Password must be at least 8 characters long and contain at least one number');
    });

    test('should throw error for duplicate username', () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      userService.registerUser(userData);

      const duplicateUser = {
        username: 'testuser',
        email: 'different@example.com',
        password: 'password456'
      };

      expect(() => userService.registerUser(duplicateUser)).toThrow('Username already exists');
    });

    test('should throw error for duplicate email', () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      userService.registerUser(userData);

      const duplicateUser = {
        username: 'differentuser',
        email: 'test@example.com',
        password: 'password456'
      };

      expect(() => userService.registerUser(duplicateUser)).toThrow('Email already registered');
    });
  });

  describe('User Retrieval', () => {
    beforeEach(() => {
      userService.registerUser({
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123'
      });
      userService.registerUser({
        username: 'user2',
        email: 'user2@example.com',
        password: 'password456'
      });
    });

    test('should find user by username', () => {
      const user = userService.findUserByUsername('user1');
      expect(user).toBeTruthy();
      expect(user.username).toBe('user1');
    });

    test('should find user by email', () => {
      const user = userService.findUserByEmail('user2@example.com');
      expect(user).toBeTruthy();
      expect(user.email).toBe('user2@example.com');
    });

    test('should return null for non-existent username', () => {
      const user = userService.findUserByUsername('nonexistent');
      expect(user).toBeUndefined();
    });

    test('should return null for non-existent email', () => {
      const user = userService.findUserByEmail('nonexistent@example.com');
      expect(user).toBeUndefined();
    });

    test('should get all users without passwords', () => {
      const users = userService.getAllUsers();
      expect(users).toHaveLength(2);
      users.forEach(user => {
        expect(user).not.toHaveProperty('password');
      });
    });

    test('should get user by ID', () => {
      const user = userService.getUserById(1);
      expect(user).toBeTruthy();
      expect(user.id).toBe(1);
      expect(user).not.toHaveProperty('password');
    });

    test('should return null for non-existent ID', () => {
      const user = userService.getUserById(999);
      expect(user).toBeNull();
    });
  });

  describe('User Update', () => {
    let userId;

    beforeEach(() => {
      const user = userService.registerUser({
        username: 'updateuser',
        email: 'update@example.com',
        password: 'password123'
      });
      userId = user.id;
    });

    test('should update user successfully', () => {
      const updateData = { username: 'updateduser' };
      const updatedUser = userService.updateUser(userId, updateData);

      expect(updatedUser.username).toBe('updateduser');
      expect(updatedUser).not.toHaveProperty('password');
    });

    test('should validate email when updating', () => {
      const updateData = { email: 'invalid-email' };
      expect(() => userService.updateUser(userId, updateData)).toThrow('Invalid email format');
    });

    test('should throw error for non-existent user', () => {
      expect(() => userService.updateUser(999, { username: 'newname' })).toThrow('User not found');
    });
  });

  describe('User Deletion', () => {
    let userId;

    beforeEach(() => {
      const user = userService.registerUser({
        username: 'deleteuser',
        email: 'delete@example.com',
        password: 'password123'
      });
      userId = user.id;
    });

    test('should delete user successfully', () => {
      const deleted = userService.deleteUser(userId);
      expect(deleted).toBe(true);

      const user = userService.getUserById(userId);
      expect(user).toBeNull();
    });

    test('should return false for non-existent user', () => {
      const deleted = userService.deleteUser(999);
      expect(deleted).toBe(false);
    });
  });

  describe('Validation Methods', () => {
    test('should validate email format correctly', () => {
      expect(userService.isValidEmail('test@example.com')).toBe(true);
      expect(userService.isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(userService.isValidEmail('invalid-email')).toBe(false);
      expect(userService.isValidEmail('test@')).toBe(false);
      expect(userService.isValidEmail('@example.com')).toBe(false);
    });

    test('should validate password strength correctly', () => {
      expect(userService.isValidPassword('password123')).toBe(true);
      expect(userService.isValidPassword('strongpass1')).toBe(true);
      expect(userService.isValidPassword('weak')).toBe(false); // Too short
      expect(userService.isValidPassword('longenoughbutnonumber')).toBe(false); // No number
      expect(userService.isValidPassword('short1')).toBe(false); // Too short
    });
  });

  describe('User Statistics', () => {
    test('should return correct user statistics', () => {
      userService.registerUser({
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123'
      });
      userService.registerUser({
        username: 'user2',
        email: 'user2@example.com',
        password: 'password456'
      });

      const stats = userService.getUserStats();
      expect(stats.totalUsers).toBe(2);
      expect(stats.activeUsers).toBe(2);
      expect(stats.inactiveUsers).toBe(0);
    });

    test('should return zero statistics for empty service', () => {
      const stats = userService.getUserStats();
      expect(stats.totalUsers).toBe(0);
      expect(stats.activeUsers).toBe(0);
      expect(stats.inactiveUsers).toBe(0);
    });
  });
});