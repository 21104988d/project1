#!/bin/bash

# 🚀 Complete Setup Script for The Project Review
# This script installs ALL prerequisites and sets up the review environment
# Works on: Windows (Git Bash/WSL), macOS, Linux

set -e  # Exit on any error

echo "🚀 Starting Complete Setup for The Project Review..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Detect OS
OS="unknown"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    OS="windows"
fi

print_status "Detected OS: $OS"

# Check if running in Codespaces
if [ -n "$CODESPACES" ]; then
    print_status "Running in GitHub Codespaces - prerequisites should already be installed"
    SKIP_INSTALLS=true
else
    SKIP_INSTALLS=false
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Step 1: Install Git
install_git() {
    print_step "1/4 Checking Git installation..."
    
    if command_exists git; then
        print_status "Git is already installed: $(git --version)"
        return
    fi
    
    if [ "$SKIP_INSTALLS" = true ]; then
        print_warning "Skipping Git installation in Codespaces"
        return
    fi
    
    print_status "Installing Git..."
    
    case $OS in
        "linux")
            if command_exists apt-get; then
                sudo apt update && sudo apt install git -y
            elif command_exists yum; then
                sudo yum install git -y
            elif command_exists dnf; then
                sudo dnf install git -y
            else
                print_error "Cannot install Git automatically. Please install manually from https://git-scm.com/"
                exit 1
            fi
            ;;
        "macos")
            if command_exists brew; then
                brew install git
            else
                print_warning "Homebrew not found. Installing Homebrew first..."
                /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
                brew install git
            fi
            ;;
        "windows")
            print_warning "On Windows, please install Git manually from https://git-scm.com/downloads"
            print_warning "Or use: winget install Git.Git"
            print_warning "Then restart this script."
            exit 1
            ;;
        *)
            print_error "Unsupported OS for automatic Git installation"
            print_error "Please install Git manually from https://git-scm.com/"
            exit 1
            ;;
    esac
    
    print_status "Git installed successfully: $(git --version)"
}

# Step 2: Install Node.js
install_nodejs() {
    print_step "2/4 Checking Node.js installation..."
    
    if command_exists node; then
        NODE_VERSION=$(node --version)
        print_status "Node.js is already installed: $NODE_VERSION"
        
        # Check if version is 18+
        NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$NODE_MAJOR" -ge 18 ]; then
            print_status "Node.js version is compatible (18+)"
            return
        else
            print_warning "Node.js version is too old. Need 18+, found $NODE_VERSION"
        fi
    fi
    
    if [ "$SKIP_INSTALLS" = true ]; then
        print_warning "Skipping Node.js installation in Codespaces"
        return
    fi
    
    print_status "Installing Node.js 18..."
    
    case $OS in
        "linux")
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt-get install -y nodejs
            ;;
        "macos")
            if command_exists brew; then
                brew install node@18
            else
                print_warning "Homebrew not found. Installing Homebrew first..."
                /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
                brew install node@18
            fi
            ;;
        "windows")
            print_warning "On Windows, please install Node.js manually from https://nodejs.org/"
            print_warning "Or use: winget install OpenJS.NodeJS"
            print_warning "Then restart this script."
            exit 1
            ;;
        *)
            print_error "Unsupported OS for automatic Node.js installation"
            print_error "Please install Node.js 18+ manually from https://nodejs.org/"
            exit 1
            ;;
    esac
    
    print_status "Node.js installed successfully: $(node --version)"
    print_status "npm version: $(npm --version)"
}

# Step 3: Clone repository
clone_repository() {
    print_step "3/4 Cloning The Project repository..."
    
    REPO_URL="https://github.com/21104988d/project1"
    TARGET_DIR="project1"
    
    if [ -d "$TARGET_DIR" ]; then
        print_warning "Directory $TARGET_DIR already exists"
        read -p "Do you want to remove it and clone fresh? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rm -rf "$TARGET_DIR"
        else
            print_status "Using existing directory..."
            cd "$TARGET_DIR"
            return
        fi
    fi
    
    print_status "Cloning repository from $REPO_URL..."
    git clone "$REPO_URL" "$TARGET_DIR"
    cd "$TARGET_DIR"
    
    print_status "Repository cloned successfully!"
    print_status "Current directory after clone: $(pwd)"
    print_status "Contents of current directory:"
    ls -la
}

# Step 4: Setup application
setup_application() {
    print_step "4/4 Setting up the application..."
    
    # Navigate to frontend directory
    print_status "Navigating to frontend directory..."
    print_status "Current working directory: $(pwd)"
    
    # Check if we're already in the cloned repository
    if [ -d "the-project/packages/frontend" ]; then
        print_status "Found the-project/packages/frontend in current directory"
        cd the-project/packages/frontend
    elif [ -d "../the-project/packages/frontend" ]; then
        print_status "Found the-project/packages/frontend in parent directory"
        cd ../the-project/packages/frontend
    else
        print_warning "Could not find the-project/packages/frontend directory"
        
        # Check if the-project directory exists but is empty
        if [ -d "the-project" ]; then
            if [ -z "$(ls -A the-project)" ]; then
                print_warning "Found the-project directory but it's empty"
                print_status "This is likely due to a Git submodule or nested repository issue"
                print_status "Attempting to fix this automatically..."
                
                # Try to initialize submodules
                print_status "Trying git submodule initialization..."
                if git submodule update --init --recursive 2>/dev/null; then
                    print_status "Submodule initialization successful"
                    if [ -d "the-project/packages/frontend" ]; then
                        cd the-project/packages/frontend
                        print_status "Successfully navigated to: $(pwd)"
                    else
                        print_error "Submodule initialization didn't create the expected directory structure"
                        show_manual_setup_instructions
                        return 1
                    fi
                else
                    print_warning "Submodule initialization failed or no submodules configured"
                    print_status "This repository may need manual setup"
                    show_manual_setup_instructions
                    return 1
                fi
            else
                print_status "the-project directory exists but doesn't contain packages/frontend"
                print_status "Contents of the-project:"
                ls -la the-project/
                show_manual_setup_instructions
                return 1
            fi
        else
            print_error "the-project directory not found at all"
            print_status "Available directories:"
            ls -la
            show_manual_setup_instructions
            return 1
        fi
    fi
    
    print_status "Successfully navigated to: $(pwd)"
    
    # Install dependencies
    print_status "Installing npm dependencies..."
    if npm install; then
        print_status "Dependencies installed successfully!"
    else
        print_error "Failed to install dependencies"
        print_status "You may need to run 'npm install' manually from: $(pwd)"
        return 1
    fi
    
    print_status "Setup completed successfully!"
}

# Function to show manual setup instructions
show_manual_setup_instructions() {
    echo ""
    print_status "MANUAL SETUP REQUIRED"
    print_status "===================="
    echo ""
    print_status "The automated setup cannot complete due to repository structure issues."
    print_status "Please try the following manual steps:"
    echo ""
    print_status "1. Navigate to the cloned repository:"
    echo -e "   ${BLUE}cd $(pwd)${NC}"
    echo ""
    print_status "2. Check current directory contents:"
    echo -e "   ${BLUE}ls -la${NC}"
    echo ""
    print_status "3. If you see 'the-project' directory, check its contents:"
    echo -e "   ${BLUE}ls -la the-project/${NC}"
    echo ""
    print_status "4. Try initializing git submodules:"
    echo -e "   ${BLUE}git submodule update --init --recursive${NC}"
    echo ""
    print_status "5. Alternative: If the-project should be cloned separately:"
    echo -e "   ${BLUE}rm -rf the-project${NC}"
    echo -e "   ${BLUE}git clone [THE-PROJECT-REPO-URL] the-project${NC}"
    echo ""
    print_status "6. Once the-project/packages/frontend exists:"
    echo -e "   ${BLUE}cd the-project/packages/frontend${NC}"
    echo -e "   ${BLUE}npm install${NC}"
    echo -e "   ${BLUE}npm run dev${NC}"
    echo ""
    print_status "For support, please check the repository documentation or contact the project maintainers."
}

# Main execution
main() {
    print_status "Starting complete setup process..."
    
    install_git
    install_nodejs
    clone_repository
    
    # Try to setup application, but handle failure gracefully
    if ! setup_application; then
        echo ""
        print_error "Automated setup could not be completed"
        print_status "This usually means the repository structure needs manual setup"
        echo ""
        print_status "MANUAL SETUP INSTRUCTIONS:"
        echo "=========================="
        print_status "1. Check if you're in the right directory:"
        echo -e "   ${BLUE}pwd${NC}"
        echo ""
        print_status "2. Look for existing project structure:"
        echo -e "   ${BLUE}ls -la${NC}"
        echo ""
        print_status "3. If you see the-project directory, try:"
        echo -e "   ${BLUE}cd the-project${NC}"
        echo -e "   ${BLUE}ls -la${NC}"
        echo ""
        print_status "4. Check if this is a git submodule:"
        echo -e "   ${BLUE}git submodule status${NC}"
        echo -e "   ${BLUE}git submodule update --init --recursive${NC}"
        echo ""
        print_status "5. If the-project has packages/frontend, navigate there:"
        echo -e "   ${BLUE}cd packages/frontend${NC}"
        echo -e "   ${BLUE}npm install${NC}"
        echo -e "   ${BLUE}npm run dev${NC}"
        echo ""
        print_status "Please refer to the project documentation for more details"
        exit 1
    fi
    
    echo ""
    echo "🎉 Setup completed successfully!"
    echo "=================================================="
    echo ""
    print_status "You are now in the frontend directory: $(pwd)"
    print_status "To start the application, run:"
    echo -e "${BLUE}npm run dev${NC}"
    echo ""
    print_status "Or use the direct command:"
    echo -e "${BLUE}npx vite --host 0.0.0.0 --port 5173${NC}"
    echo ""
    print_status "The application will be available at: http://localhost:5173"
    echo ""
    
    # Ask if user wants to start immediately
    read -p "Do you want to start the application now? (Y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        print_status "Starting the application..."
        npm run dev
    fi
}

# Run main function
main "$@"
