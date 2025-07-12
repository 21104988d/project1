@echo off
REM 🚀 Complete Setup Script for The Project Review (Windows)
REM This script installs ALL prerequisites and sets up the review environment

echo 🚀 Starting Complete Setup for The Project Review (Windows)...
echo ===========================================================

REM Colors are not easily supported in batch, so we'll use simple output

REM Check if running in Admin mode
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [INFO] Running with Administrator privileges
) else (
    echo [WARNING] Not running as Administrator. Some installations may fail.
    echo [WARNING] Consider running as Administrator for automatic installs.
)

echo.
echo [STEP] 1/4 Checking Git installation...

REM Check if Git is installed
git --version >nul 2>&1
if %errorLevel% == 0 (
    echo [INFO] Git is already installed
    git --version
) else (
    echo [INFO] Git not found. Installing Git...
    echo [INFO] Trying winget install...
    
    winget install Git.Git
    if %errorLevel% == 0 (
        echo [INFO] Git installed successfully via winget
    ) else (
        echo [ERROR] Failed to install Git via winget
        echo [INFO] Please install Git manually from https://git-scm.com/downloads
        echo [INFO] Then restart this script.
        pause
        exit /b 1
    )
)

echo.
echo [STEP] 2/4 Checking Node.js installation...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorLevel% == 0 (
    echo [INFO] Node.js is already installed
    node --version
    npm --version
) else (
    echo [INFO] Node.js not found. Installing Node.js...
    echo [INFO] Trying winget install...
    
    winget install OpenJS.NodeJS
    if %errorLevel% == 0 (
        echo [INFO] Node.js installed successfully via winget
        echo [INFO] Please restart your terminal/VS Code and run this script again
        pause
        exit /b 0
    ) else (
        echo [ERROR] Failed to install Node.js via winget
        echo [INFO] Please install Node.js manually from https://nodejs.org/
        echo [INFO] Then restart this script.
        pause
        exit /b 1
    )
)

echo.
echo [STEP] 3/4 Cloning The Project repository...

set REPO_URL=https://github.com/21104988d/project1
set TARGET_DIR=project1

if exist "%TARGET_DIR%" (
    echo [WARNING] Directory %TARGET_DIR% already exists
    set /p "choice=Do you want to remove it and clone fresh? (y/N): "
    if /i "%choice%"=="y" (
        rmdir /s /q "%TARGET_DIR%"
    ) else (
        echo [INFO] Using existing directory...
        cd "%TARGET_DIR%"
        goto :setup_app
    )
)

echo [INFO] Cloning repository from %REPO_URL%...
git clone "%REPO_URL%" "%TARGET_DIR%"
if %errorLevel% == 0 (
    echo [INFO] Repository cloned successfully!
    cd "%TARGET_DIR%"
) else (
    echo [ERROR] Failed to clone repository
    pause
    exit /b 1
)

:setup_app
echo.
echo [STEP] 4/4 Setting up the application...

REM Navigate to frontend directory
echo [INFO] Navigating to frontend directory...
cd the-project\packages\frontend

REM Install dependencies
echo [INFO] Installing npm dependencies...
npm install
if %errorLevel% == 0 (
    echo [INFO] Dependencies installed successfully!
) else (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🎉 Setup completed successfully!
echo =================================
echo.
echo [INFO] To start the application, run:
echo cd %cd%
echo npm run dev
echo.
echo [INFO] Or use the direct command:
echo npx vite --host 0.0.0.0 --port 5173
echo.
echo [INFO] The application will be available at: http://localhost:5173
echo.

set /p "choice=Do you want to start the application now? (Y/n): "
if /i not "%choice%"=="n" (
    echo [INFO] Starting the application...
    npm run dev
)

pause
