@echo off
REM Automated Testing Demo - Development Setup Script for Windows
REM This script helps set up the development environment on Windows

echo 🚀 Setting up Automated Testing Demo Project...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm version:
npm --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Create environment file if it doesn't exist
if not exist .env (
    echo 📋 Creating .env file from template...
    copy .env.example .env
    echo ✅ .env file created. Please update with your actual values.
) else (
    echo ✅ .env file already exists.
)

REM Create dist directory if it doesn't exist
if not exist dist (
    echo 📁 Creating dist directory...
    mkdir dist
)

REM Build the application
echo 🏗️ Building application...
npm run build

REM Run tests to verify setup
echo 🧪 Running tests to verify setup...
npm test

echo.
echo 🎉 Setup complete! You can now:
echo    📚 npm start          - Start the application
echo    🧪 npm test           - Run all tests
echo    🔍 npm run test:unit  - Run unit tests only
echo    🔗 npm run test:integration - Run integration tests only
echo    📊 npm run test:coverage - Run tests with coverage
echo    🏗️ npm run build      - Build the application
echo.
echo 🌐 Application will be available at: http://localhost:3000
echo 💡 Health check endpoint: http://localhost:3000/health

pause