@echo off
REM =================================================================
REM THE PROJECT - REVIEW SETUP SCRIPT (Windows)
REM =================================================================
REM Purpose: One-click setup for department reviews of the dapp
REM Usage: scripts\setup-review.bat (run from main repository root)
REM Target: Non-technical departments reviewing Part 1.5 Design Excellence
REM =================================================================

echo.
echo =================================================================
echo   THE PROJECT - DEPARTMENT REVIEW SETUP
echo   Setting up the dapp for easy review and demonstration
echo =================================================================
echo.

echo 🔍 Checking system requirements...

REM Check if we're in the right directory
if not exist "the-project" (
    echo ❌ Please run this script from the main repository root
    echo    Make sure you can see the 'the-project' directory
    pause
    exit /b 1
)

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo ✅ Found project directory

echo.
echo 📦 Installing dependencies...
echo    This may take 2-3 minutes on first run...

cd the-project
npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

echo.
echo 🎭 Setting up demo environment...

REM Create demo environment
echo # Demo Environment Configuration > .env.demo
echo VITE_APP_MODE=demo >> .env.demo
echo VITE_APP_NAME="The Project - Cross-Chain DApp" >> .env.demo
echo VITE_APP_VERSION=1.5.0 >> .env.demo
echo VITE_DEMO_MODE=true >> .env.demo
echo VITE_DEMO_WALLET_ADDRESS=0x742d35Cc6634C0532925a3b8D8693d58E7eb1234 >> .env.demo
echo VITE_DEMO_USDT_BALANCE=10000.00 >> .env.demo
echo VITE_DEMO_USDC_BALANCE=5000.00 >> .env.demo
echo VITE_DEMO_DAI_BALANCE=2500.00 >> .env.demo
echo VITE_ENABLE_DEMO_TRANSACTIONS=true >> .env.demo
echo VITE_DEMO_GAS_ESTIMATION=true >> .env.demo
echo VITE_ENABLE_PERFORMANCE_TRACKING=true >> .env.demo
echo VITE_SHOW_DEBUG_INFO=false >> .env.demo
echo VITE_DEMO_FEATURES_ENABLED=true >> .env.demo
echo VITE_SHOW_TOOLTIPS=true >> .env.demo
echo VITE_GUIDED_TOUR=true >> .env.demo

copy .env.demo .env

echo ✅ Demo environment configured

echo.
echo 🔧 Building the application for review...

npm run build
if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Application built successfully

echo.
echo 📚 Generating review documentation...

cd ..
mkdir review-docs 2>nul

echo # Department Review Guide - The Project > review-docs\REVIEW_GUIDE.md
echo. >> review-docs\REVIEW_GUIDE.md
echo ## Quick Start >> review-docs\REVIEW_GUIDE.md
echo. >> review-docs\REVIEW_GUIDE.md
echo 1. Navigate to project: cd the-project >> review-docs\REVIEW_GUIDE.md
echo 2. Start application: npm run review:start >> review-docs\REVIEW_GUIDE.md
echo 3. Open browser: http://localhost:3000 >> review-docs\REVIEW_GUIDE.md

echo ✅ Review documentation created

echo.
echo =================================================================
echo   🎉 SETUP COMPLETE! Ready for Department Review
echo =================================================================
echo.

echo 📋 Next Steps:
echo 1. Navigate to the project directory:
echo    cd the-project
echo.
echo 2. Start the review application:
echo    npm run review:start
echo.
echo 3. Open your browser to:
echo    http://localhost:3000
echo.
echo 4. Read the review guide:
echo    type ..\review-docs\REVIEW_GUIDE.md
echo.
echo 💡 Pro Tips:
echo • Use demo mode - no real crypto needed
echo • Test on mobile by resizing browser
echo • Check review-docs\ for detailed guides
echo • Report any issues using troubleshooting guide
echo.
echo Happy reviewing! 🚀

pause
