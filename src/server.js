/**
 * Express Server Setup
 * Provides REST API endpoints for the application
 */

const express = require('express');
const Calculator = require('./calculator');
const UserService = require('./userService');

class Server {
  constructor() {
    this.app = express();
    this.userService = new UserService();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // CORS middleware
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });

    // Request logging
    this.app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }

  setupRoutes() {
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      });
    });

    // Calculator endpoints
    this.app.post('/api/calculate/add', (req, res) => {
      try {
        const { a, b } = req.body;
        const result = Calculator.add(Number(a), Number(b));
        res.json({ result, operation: 'addition', inputs: { a, b } });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    this.app.post('/api/calculate/subtract', (req, res) => {
      try {
        const { a, b } = req.body;
        const result = Calculator.subtract(Number(a), Number(b));
        res.json({ result, operation: 'subtraction', inputs: { a, b } });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    this.app.post('/api/calculate/multiply', (req, res) => {
      try {
        const { a, b } = req.body;
        const result = Calculator.multiply(Number(a), Number(b));
        res.json({ result, operation: 'multiplication', inputs: { a, b } });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    this.app.post('/api/calculate/divide', (req, res) => {
      try {
        const { a, b } = req.body;
        const result = Calculator.divide(Number(a), Number(b));
        res.json({ result, operation: 'division', inputs: { a, b } });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // User management endpoints
    this.app.post('/api/users', (req, res) => {
      try {
        const user = this.userService.registerUser(req.body);
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    this.app.get('/api/users', (req, res) => {
      const users = this.userService.getAllUsers();
      res.json(users);
    });

    this.app.get('/api/users/:id', (req, res) => {
      const user = this.userService.getUserById(Number(req.params.id));
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    });

    this.app.put('/api/users/:id', (req, res) => {
      try {
        const user = this.userService.updateUser(Number(req.params.id), req.body);
        res.json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    this.app.delete('/api/users/:id', (req, res) => {
      const deleted = this.userService.deleteUser(Number(req.params.id));
      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).send();
    });

    this.app.get('/api/users-stats', (req, res) => {
      const stats = this.userService.getUserStats();
      res.json(stats);
    });

    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({ error: 'Endpoint not found' });
    });

    // Error handler
    this.app.use((error, req, res, next) => {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
  }

  start(port = 3000) {
    return new Promise((resolve) => {
      this.server = this.app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        resolve(this.server);
      });
    });
  }

  stop() {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          console.log('Server stopped');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  getApp() {
    return this.app;
  }
}

module.exports = Server;