#!/bin/bash

# Dev Container Setup Script for The Project
set -e

echo "🚀 Setting up development environment..."

# Update package lists
sudo apt-get update

# Install additional tools that might be useful
sudo apt-get install -y \
    curl \
    wget \
    git \
    vim \
    htop \
    tree \
    jq \
    unzip

# Install Docker Compose (latest version)
echo "📦 Installing Docker Compose..."

# First check if docker-compose is already available (e.g., from Docker-in-Docker feature)
if command -v docker-compose >/dev/null 2>&1; then
    echo "✅ Docker Compose already available: $(docker-compose --version)"
else
    echo "Installing Docker Compose manually..."
    DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)
    echo "Installing Docker Compose version: $DOCKER_COMPOSE_VERSION"

    # Download Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

    # Make it executable
    sudo chmod +x /usr/local/bin/docker-compose

    # Ensure /usr/local/bin is in PATH for all users
    echo 'export PATH="/usr/local/bin:$PATH"' | sudo tee -a /etc/environment
    export PATH="/usr/local/bin:$PATH"

    # Also add to current user's bashrc
    echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bashrc

    # Create a symlink in /usr/bin as backup (this is usually in PATH)
    sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
fi

# Verify installations
echo "✅ Verifying installations..."
echo "Current user: $(whoami)"
echo "Current PATH: $PATH"

node --version
npm --version
git --version
docker --version

# Verify Docker Compose with explicit path and fallback
echo "Verifying Docker Compose..."
echo "Checking if docker-compose is in PATH..."
if command -v docker-compose >/dev/null 2>&1; then
    docker-compose --version
    echo "✅ docker-compose is available in PATH"
elif [ -f "/usr/local/bin/docker-compose" ]; then
    echo "docker-compose not in PATH, but found at /usr/local/bin/docker-compose"
    /usr/local/bin/docker-compose --version
    echo "✅ docker-compose found at /usr/local/bin/docker-compose"
elif [ -f "/usr/bin/docker-compose" ]; then
    echo "docker-compose found at /usr/bin/docker-compose"
    /usr/bin/docker-compose --version
    echo "✅ docker-compose found at /usr/bin/docker-compose"
else
    echo "❌ docker-compose not found. Debugging information:"
    echo "Files in /usr/local/bin:"
    ls -la /usr/local/bin/docker-compose* 2>/dev/null || echo "No docker-compose binary found in /usr/local/bin"
    echo "Files in /usr/bin:"
    ls -la /usr/bin/docker-compose* 2>/dev/null || echo "No docker-compose binary found in /usr/bin"
    echo "PATH: $PATH"
    exit 1
fi

# Set up git configuration (if not already set)
if [ -z "$(git config --global user.name)" ]; then
    echo "📝 Setting up git configuration..."
    git config --global user.name "Developer"
    git config --global user.email "developer@theproject.local"
    git config --global init.defaultBranch main
fi

# Create useful aliases
echo "📋 Setting up development aliases..."
cat >> ~/.bashrc << 'EOF'

# The Project Development Aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias dc='docker-compose'
alias dcu='docker-compose up -d'
alias dcd='docker-compose down'
alias dcl='docker-compose logs -f'
alias dcp='docker-compose ps'
alias rebuild='./rebuild-containers.sh'
alias quick-rebuild='./quick-rebuild.sh'
alias logs='docker-compose logs -f'
alias status='docker-compose ps'

# Navigation shortcuts
alias project='cd /workspaces/project1/the-project'
alias api='cd /workspaces/project1/the-project/packages/api'
alias frontend='cd /workspaces/project1/the-project/packages/frontend'
alias routing='cd /workspaces/project1/the-project/packages/routing-engine'
alias contracts='cd /workspaces/project1/the-project/packages/contracts'

# Development shortcuts
alias dev='npm run dev'
alias build='npm run build'
alias test='npm run test'
alias lint='npm run lint'
alias format='npm run format'

EOF

echo "🎉 Dev container setup completed successfully!"
echo "🔗 Available aliases:"
echo "   - dc, dcu, dcd, dcl, dcp (docker-compose shortcuts)"
echo "   - rebuild, quick-rebuild (container management)"
echo "   - project, api, frontend, routing, contracts (navigation)"
echo "   - dev, build, test, lint, format (development)"
echo ""
echo "🚀 Ready to start development!"
echo "   Run 'project' to navigate to the main project directory"
echo "   Run 'rebuild' to build and start all containers"