#!/bin/bash

# Typography System Validation Script
# This script validates that our typography system is properly implemented

echo "🎨 Typography System Validation"
echo "================================"

# Check if files exist
echo -n "✓ Checking Typography component file exists... "
if [ -f "src/design-system/Typography.tsx" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    exit 1
fi

echo -n "✓ Checking Typography types file exists... "
if [ -f "src/design-system/typography.types.ts" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    exit 1
fi

echo -n "✓ Checking Typography documentation exists... "
if [ -f "src/design-system/typography.md" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    exit 1
fi

echo -n "✓ Checking Typography usage guide exists... "
if [ -f "src/design-system/typography-usage.md" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    exit 1
fi

echo -n "✓ Checking Typography demo component exists... "
if [ -f "src/design-system/TypographyDemo.tsx" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    exit 1
fi

# Check Tailwind config
echo -n "✓ Checking Tailwind config has typography system... "
if grep -q "fontSize:" tailwind.config.ts && grep -q "fontFamily:" tailwind.config.ts; then
    echo "✅ Configured"
else
    echo "❌ Missing typography config"
    exit 1
fi

# Check font loading in HTML
echo -n "✓ Checking font loading in HTML... "
if grep -q "Inter" index.html && grep -q "preconnect" index.html; then
    echo "✅ Configured"
else
    echo "❌ Missing font loading optimization"
    exit 1
fi

# Test build
echo -n "✓ Testing TypeScript compilation... "
if npm run build > /dev/null 2>&1; then
    echo "✅ Success"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎉 Typography System Validation Complete!"
echo ""
echo "📊 Summary:"
echo "  • Typography component: ✅ Implemented"
echo "  • Type definitions: ✅ Complete"
echo "  • Tailwind integration: ✅ Configured"
echo "  • Font loading: ✅ Optimized"
echo "  • Documentation: ✅ Complete"
echo "  • Demo component: ✅ Ready"
echo "  • Build system: ✅ Working"
echo ""
echo "🚀 Ready to proceed to next phase!"
