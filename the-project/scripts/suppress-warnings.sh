#!/bin/bash

# Comprehensive Warning Suppression Configuration
# Source this file to eliminate all warnings

# Node.js warnings
export NODE_NO_WARNINGS=1
export NODE_ENV=${NODE_ENV:-development}
export SUPPRESS_NO_CONFIG_WARNING=true

# npm configuration
export NPM_CONFIG_AUDIT=false
export NPM_CONFIG_FUND=false
export NPM_CONFIG_UPDATE_NOTIFIER=false
export NPM_CONFIG_LOGLEVEL=error
export NPM_CONFIG_PROGRESS=false
export NPM_CONFIG_TIMING=false
export NPM_CONFIG_WARNINGS=false

# Third-party service notifications
export DISABLE_OPENCOLLECTIVE=1
export ADBLOCK=1
export OPEN_SOURCE_CONTRIBUTOR=false

# TypeScript warnings
export TSC_NONPOLLING_WATCHER=1

# ESLint and linting
export ESLINT_NO_DEV_ERRORS=true

# Development tools
export CHOKIDAR_USEPOLLING=false
export WATCHPACK_POLLING=false

# Suppress husky warnings when .git doesn't exist
export HUSKY=0

echo "✅ Warning suppression configuration loaded"
