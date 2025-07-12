#!/bin/bash

# Complete npm warning suppression script
# Usage: ./scripts/npm-silent.sh [npm-command] [args...]

# Set environment variables to suppress warnings
export NODE_NO_WARNINGS=1
export NPM_CONFIG_AUDIT=false
export NPM_CONFIG_FUND=false
export NPM_CONFIG_UPDATE_NOTIFIER=false
export NPM_CONFIG_LOGLEVEL=error
export DISABLE_OPENCOLLECTIVE=1
export ADBLOCK=1

# Function to filter npm output
filter_npm_output() {
    grep -v "npm warn" | \
    grep -v "npm WARN" | \
    grep -v "deprecated" | \
    grep -v "looking for funding" | \
    grep -v "npm fund" | \
    grep -v "New major version" | \
    grep -v "Changelog:" | \
    grep -v "To update run:" | \
    grep -v "npm notice" | \
    grep -v "⠙⠹⠸⠼⠴⠦⠧⠇⠏⠋" || true
}

# Run npm command with output filtering
if [ $# -eq 0 ]; then
    echo "Usage: $0 [npm-command] [args...]"
    exit 1
fi

# Execute npm command and filter output
npm "$@" 2>&1 | filter_npm_output

# Capture exit code
exit_code=${PIPESTATUS[0]}
exit $exit_code
