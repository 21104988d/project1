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
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)
sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create symlink for docker compose (modern syntax)
sudo ln -sf /usr/local/bin/docker-compose /usr/local/bin/docker-compose

# Verify installations
echo "✅ Verifying installations..."
node --version
npm --version
git --version
docker --version
docker-compose --version

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