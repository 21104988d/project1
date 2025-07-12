#!/bin/bash

# Security Analysis Script for Smart Contracts
# This script runs multiple security analysis tools

echo "🔒 Starting Smart Contract Security Analysis..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m' 
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create reports directory
mkdir -p reports

echo -e "${YELLOW}📋 Compiling contracts...${NC}"
npx hardhat compile

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Compilation failed. Please fix compilation errors first.${NC}"
    exit 1
fi

# Check if Slither is installed
echo -e "${YELLOW}🔍 Checking Slither installation...${NC}"
if ! command -v slither &> /dev/null; then
    echo -e "${YELLOW}⚠️  Slither not found. Installing via pip...${NC}"
    pip3 install slither-analyzer
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install Slither. Please install manually: pip3 install slither-analyzer${NC}"
        exit 1
    fi
fi

# Run Slither analysis
echo -e "${YELLOW}🔍 Running Slither static analysis...${NC}"
slither . --json reports/slither-report.json --print human-summary 2>&1 | tee reports/slither-output.txt

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Slither analysis completed successfully${NC}"
else
    echo -e "${RED}⚠️  Slither analysis completed with findings${NC}"
fi

# Check if Mythril is available (optional)
echo -e "${YELLOW}🔍 Checking Mythril installation...${NC}"
if command -v myth &> /dev/null; then
    echo -e "${YELLOW}🔍 Running Mythril analysis...${NC}"
    myth analyze contracts/ --output reports/mythril-report.txt 2>&1 | tee reports/mythril-output.txt
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Mythril analysis completed${NC}"
    else
        echo -e "${YELLOW}⚠️  Mythril analysis completed with findings${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Mythril not found. Skipping Mythril analysis.${NC}"
    echo -e "${YELLOW}💡 To install: pip3 install mythril${NC}"
fi

# Run custom security checks
echo -e "${YELLOW}🔍 Running custom security checks...${NC}"

# Check for common vulnerabilities patterns
echo "Checking for potential vulnerabilities..."

# Check for reentrancy patterns
echo "📋 Checking for reentrancy patterns..."
grep -r "call\.value\|send\|transfer" contracts/ > reports/external-calls.txt 2>/dev/null || echo "No external calls found"

# Check for unchecked send
echo "📋 Checking for unchecked external calls..."
grep -r "\.call\|\.send" contracts/ | grep -v "require\|assert\|if" > reports/unchecked-calls.txt 2>/dev/null || echo "No unchecked calls found"

# Check for timestamp dependency
echo "📋 Checking for timestamp dependency..."
grep -r "block\.timestamp\|now" contracts/ > reports/timestamp-usage.txt 2>/dev/null || echo "No timestamp usage found"

# Check for tx.origin usage
echo "📋 Checking for tx.origin usage..."
grep -r "tx\.origin" contracts/ > reports/tx-origin-usage.txt 2>/dev/null || echo "No tx.origin usage found"

# Generate summary report
echo -e "${YELLOW}📊 Generating security summary...${NC}"

cat > reports/security-summary.md << EOF
# Smart Contract Security Analysis Report

Generated: $(date)

## Analysis Tools Used

- ✅ Slither Static Analysis
$(if command -v myth &> /dev/null; then echo "- ✅ Mythril Symbolic Execution"; else echo "- ⚠️  Mythril (not installed)"; fi)
- ✅ Custom Pattern Analysis

## Report Files

- \`slither-report.json\` - Detailed Slither findings
- \`slither-output.txt\` - Slither console output
$(if command -v myth &> /dev/null; then echo "- \`mythril-report.txt\` - Mythril findings"; fi)
- \`external-calls.txt\` - External call patterns
- \`unchecked-calls.txt\` - Potentially unchecked calls
- \`timestamp-usage.txt\` - Timestamp dependency usage
- \`tx-origin-usage.txt\` - tx.origin usage patterns

## Quick Security Checklist

- [ ] Review all HIGH and MEDIUM severity findings from Slither
- [ ] Verify all external calls are properly handled
- [ ] Check for reentrancy vulnerabilities
- [ ] Validate input parameters and access controls
- [ ] Review timestamp dependencies
- [ ] Ensure proper error handling

## Next Steps

1. Review detailed reports in the \`reports/\` directory
2. Address any HIGH or MEDIUM severity issues
3. Consider adding additional tests for edge cases
4. Schedule professional security audit before mainnet deployment

EOF

echo -e "${GREEN}✅ Security analysis complete!${NC}"
echo -e "${GREEN}📁 Reports saved in: ./reports/${NC}"
echo -e "${YELLOW}💡 Next: Review reports and address any security findings${NC}"

# Display quick summary
echo -e "\n${YELLOW}📊 Quick Summary:${NC}"
if [ -f "reports/slither-output.txt" ]; then
    SLITHER_ISSUES=$(grep -c "appears to be vulnerable\|Potential vulnerability" reports/slither-output.txt 2>/dev/null || echo "0")
    echo "🔍 Slither Issues Found: $SLITHER_ISSUES"
fi

echo -e "\n${GREEN}🔒 Security analysis completed successfully!${NC}"
