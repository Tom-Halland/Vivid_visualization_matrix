@echo off
REM Quick Start Script for Agentic Pipeline Observability Dashboard (Windows)

echo 🚀 Setting up Agentic Pipeline Observability Integration Example...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

echo ✅ npm version:
npm --version

echo.
echo 📦 Installing dependencies...
call npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully
    echo.
    echo 🎯 Setup complete! Run the following commands:
    echo.
    echo    npm run dev        - Start development server
    echo    npm run build      - Build for production
    echo    npm run lint       - Run ESLint
    echo.
    echo 📖 For detailed setup instructions, see INTEGRATION_SETUP.md
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

pause
