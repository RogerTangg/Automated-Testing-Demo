/**
 * Integration Tests for Server API Endpoints
 * Tests the complete HTTP API functionality
 */

const request = require('supertest');
const Server = require('../../src/server');

describe('Server API Integration Tests', () => {
  let server;
  let app;

  beforeAll(async () => {
    server = new Server();
    app = server.getApp();
  });

  afterAll(async () => {
    if (server) {
      await server.stop();
    }
  });

  describe('Health Check Endpoint', () => {
    test('GET /health should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('version', '1.0.0');
    });
  });

  describe('Calculator API Endpoints', () => {
    test('POST /api/calculate/add should perform addition', async () => {
      const response = await request(app)
        .post('/api/calculate/add')
        .send({ a: 5, b: 3 })
        .expect(200);

      expect(response.body).toEqual({
        result: 8,
        operation: 'addition',
        inputs: { a: 5, b: 3 }
      });
    });

    test('POST /api/calculate/subtract should perform subtraction', async () => {
      const response = await request(app)
        .post('/api/calculate/subtract')
        .send({ a: 10, b: 4 })
        .expect(200);

      expect(response.body).toEqual({
        result: 6,
        operation: 'subtraction',
        inputs: { a: 10, b: 4 }
      });
    });

    test('POST /api/calculate/multiply should perform multiplication', async () => {
      const response = await request(app)
        .post('/api/calculate/multiply')
        .send({ a: 6, b: 7 })
        .expect(200);

      expect(response.body).toEqual({
        result: 42,
        operation: 'multiplication',
        inputs: { a: 6, b: 7 }
      });
    });

    test('POST /api/calculate/divide should perform division', async () => {
      const response = await request(app)
        .post('/api/calculate/divide')
        .send({ a: 15, b: 3 })
        .expect(200);

      expect(response.body).toEqual({
        result: 5,
        operation: 'division',
        inputs: { a: 15, b: 3 }
      });
    });

    test('POST /api/calculate/divide should handle division by zero', async () => {
      const response = await request(app)
        .post('/api/calculate/divide')
        .send({ a: 10, b: 0 })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Division by zero is not allowed');
    });

    test('Calculator endpoints should handle invalid inputs', async () => {
      const response = await request(app)
        .post('/api/calculate/add')
        .send({ a: 'invalid', b: 3 })
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Both arguments must be numbers');
    });
  });

  describe('User Management API Endpoints', () => {
    let userId;

    test('POST /api/users should create a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.username).toBe('testuser');
      expect(response.body.email).toBe('test@example.com');
      expect(response.body).not.toHaveProperty('password');
      expect(response.body.isActive).toBe(true);

      userId = response.body.id;
    });

    test('POST /api/users should reject invalid user data', async () => {
      const invalidUserData = {
        username: 'test',
        email: 'invalid-email',
        password: 'weak'
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUserData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('GET /api/users should return all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      
      // Verify no passwords are returned
      response.body.forEach(user => {
        expect(user).not.toHaveProperty('password');
      });
    });

    test('GET /api/users/:id should return specific user', async () => {
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('username', 'testuser');
      expect(response.body).not.toHaveProperty('password');
    });

    test('GET /api/users/:id should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });

    test('PUT /api/users/:id should update user', async () => {
      const updateData = { username: 'updateduser' };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.username).toBe('updateduser');
      expect(response.body).not.toHaveProperty('password');
    });

    test('PUT /api/users/:id should reject invalid update data', async () => {
      const invalidUpdateData = { email: 'invalid-email' };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send(invalidUpdateData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid email format');
    });

    test('GET /api/users-stats should return user statistics', async () => {
      const response = await request(app)
        .get('/api/users-stats')
        .expect(200);

      expect(response.body).toHaveProperty('totalUsers');
      expect(response.body).toHaveProperty('activeUsers');
      expect(response.body).toHaveProperty('inactiveUsers');
      expect(typeof response.body.totalUsers).toBe('number');
    });

    test('DELETE /api/users/:id should delete user', async () => {
      const response = await request(app)
        .delete(`/api/users/${userId}`)
        .expect(204);

      expect(response.body).toEqual({});

      // Verify user is deleted
      await request(app)
        .get(`/api/users/${userId}`)
        .expect(404);
    });

    test('DELETE /api/users/:id should return 404 for non-existent user', async () => {
      const response = await request(app)
        .delete('/api/users/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });
  });

  describe('Error Handling', () => {
    test('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Endpoint not found');
    });

    test('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send('{ invalid json }')
        .expect(400);
    });
  });

  describe('CORS Headers', () => {
    test('should include CORS headers in responses', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBe('*');
      expect(response.headers['access-control-allow-methods']).toBe('GET, POST, PUT, DELETE');
      expect(response.headers['access-control-allow-headers']).toBe('Content-Type');
    });
  });
});