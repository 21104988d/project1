#!/bin/bash

# Silent npm install - suppress all warnings
export NODE_NO_WARNINGS=1
export NPM_CONFIG_AUDIT=false
export NPM_CONFIG_FUND=false

# Store original npm warn function and replace with no-op
export NPM_SUPPRESS_WARNINGS=1

# Run npm with suppressed output
npm "$@" 2>/dev/null | grep -v "warn deprecated" | grep -v "npm WARN" | grep -E "(added|removed|audited|packages|vulnerabilities|command exited)"
