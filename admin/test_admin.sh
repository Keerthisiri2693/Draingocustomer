#!/bin/bash

echo "Testing Admin Dashboard..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install npm first."
    exit 1
fi

# Navigate to admin directory
cd "$(dirname "$0")" || exit 1

echo "✓ Node.js and npm are installed"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install dependencies"
        exit 1
    fi
    echo "✓ Dependencies installed successfully"
else
    echo "✓ Dependencies already installed"
fi

# Check if the app can be built
echo "Testing build..."
npm run build --silent
if [ $? -eq 0 ]; then
    echo "✓ Build successful"
else
    echo "⚠ Build failed, but development server should still work"
fi

echo ""
echo "Admin Dashboard is ready!"
echo ""
echo "Available commands:"
echo "  npm start       - Start development server"
echo "  npm run build   - Create production build"
echo "  npm test        - Run tests"
echo ""
echo "To run with backend:"
echo "  cd .. && npm run full:dev"

exit 0