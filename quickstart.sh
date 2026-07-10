#!/bin/bash
# Quick Start Script for Agentic Pipeline Observability Dashboard

echo "🚀 Setting up Agentic Pipeline Observability Integration Example..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
    echo ""
    echo "🎯 Setup complete! Run the following commands:"
    echo ""
    echo "   npm run dev        - Start development server"
    echo "   npm run build      - Build for production"
    echo "   npm run lint       - Run ESLint"
    echo ""
    echo "📖 For detailed setup instructions, see INTEGRATION_SETUP.md"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
