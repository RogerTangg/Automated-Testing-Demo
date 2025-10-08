/**
 * Application Entry Point
 * Starts the Express server
 */

const Server = require('./server');

const PORT = process.env.PORT || 3000;

async function startApp() {
  try {
    const server = new Server();
    await server.start(PORT);
    
    console.log('🚀 Automated Testing Demo Application Started');
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log('🔍 Health check: http://localhost:3000/health');
    console.log('📊 API endpoints available:');
    console.log('   - POST /api/calculate/add');
    console.log('   - POST /api/calculate/subtract');
    console.log('   - POST /api/calculate/multiply'); 
    console.log('   - POST /api/calculate/divide');
    console.log('   - GET/POST /api/users');
    console.log('   - GET/PUT/DELETE /api/users/:id');
    console.log('   - GET /api/users-stats');
    
    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('📥 SIGTERM received, shutting down gracefully');
      await server.stop();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      console.log('📥 SIGINT received, shutting down gracefully');
      await server.stop();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

// Start the application if this file is run directly
if (require.main === module) {
  startApp();
}

module.exports = { startApp };