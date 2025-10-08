#!/bin/bash

# Automated Testing Demo - Development Setup Script
# This script helps set up the development environment

echo "🚀 Setting up Automated Testing Demo Project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📋 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please update with your actual values."
else
    echo "✅ .env file already exists."
fi

# Create dist directory if it doesn't exist
if [ ! -d "dist" ]; then
    echo "📁 Creating dist directory..."
    mkdir dist
fi

# Build the application
echo "🏗️ Building application..."
npm run build

# Run tests to verify setup
echo "🧪 Running tests to verify setup..."
npm test

echo ""
echo "🎉 Setup complete! You can now:"
echo "   📚 npm start          - Start the application"
echo "   🧪 npm test           - Run all tests"
echo "   🔍 npm run test:unit  - Run unit tests only"
echo "   🔗 npm run test:integration - Run integration tests only"
echo "   📊 npm run test:coverage - Run tests with coverage"
echo "   🏗️ npm run build      - Build the application"
echo ""
echo "🌐 Application will be available at: http://localhost:3000"
echo "💡 Health check endpoint: http://localhost:3000/health"