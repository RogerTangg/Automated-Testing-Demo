#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy all .js files from src to dist
const srcDir = path.join(__dirname, '..', 'src');
const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.js'));

console.log('📦 Building project...');
files.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const distFile = path.join(distDir, file);
    fs.copyFileSync(srcFile, distFile);
    console.log(`✅ Copied ${file}`);
});

console.log(`🎉 Build completed! ${files.length} files copied to dist/`);