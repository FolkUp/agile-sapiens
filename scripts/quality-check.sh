#!/bin/bash

# AGILE SAPIENS Quality Check Convenience Script
# Enhanced Alice v2.0 L3 Cartouche Autonome Operation

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎯 AGILE SAPIENS Quality Check${NC}"
echo "==============================="
echo "Enhanced Alice v2.0 L3 Constitutional Excellence"
echo ""

# Function to show usage
usage() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  full        Run full integrated quality pipeline (default)"
    echo "  format      Run format consistency gates only"
    echo "  phantom     Run phantom detection gates only"
    echo "  quick       Quick format check (no building)"
    echo "  build       Build formats and run quality gates"
    echo "  status      Show current quality status"
    echo ""
    echo "Examples:"
    echo "  $0              # Full quality pipeline"
    echo "  $0 full         # Same as above"
    echo "  $0 quick        # Quick check without building"
    echo "  $0 format       # Format consistency only"
    echo "  $0 phantom      # Phantom detection only"
    echo "  $0 status       # Show reports summary"
}

# Function to show current status
show_status() {
    echo -e "${BLUE}📊 Current Quality Status${NC}"
    echo "========================"

    # Check format files
    echo "📦 Format Files:"
    [ -d "$PROJECT_ROOT/public" ] && echo "  ✅ Web: $(du -sh "$PROJECT_ROOT/public" | cut -f1)" || echo "  ❌ Web: Missing"
    [ -f "$PROJECT_ROOT/formats/agile-sapiens-v1.0.7.epub" ] && echo "  ✅ ePub: $(du -sh "$PROJECT_ROOT/formats/agile-sapiens-v1.0.7.epub" | cut -f1)" || echo "  ❌ ePub: Missing"
    [ -f "$PROJECT_ROOT/formats/agile-sapiens-v1.0.7.pdf" ] && echo "  ✅ PDF: $(du -sh "$PROJECT_ROOT/formats/agile-sapiens-v1.0.7.pdf" | cut -f1)" || echo "  ❌ PDF: Missing"

    echo ""
    echo "📋 Quality Reports:"
    [ -f "$PROJECT_ROOT/comprehensive-quality-report.json" ] && echo "  ✅ Comprehensive Quality Report" || echo "  ❌ Comprehensive Quality Report: Missing"
    [ -f "$PROJECT_ROOT/format-consistency-report.json" ] && echo "  ✅ Format Consistency Report" || echo "  ❌ Format Consistency Report: Missing"
    [ -f "$PROJECT_ROOT/phantom-detection-report.json" ] && echo "  ✅ Phantom Detection Report" || echo "  ❌ Phantom Detection Report: Missing"

    # Show last report status if available
    if [ -f "$PROJECT_ROOT/comprehensive-quality-report.json" ]; then
        echo ""
        echo "🎯 Last Pipeline Status:"
        local status=$(grep '"status"' "$PROJECT_ROOT/comprehensive-quality-report.json" | head -1 | sed 's/.*"status": *"\([^"]*\)".*/\1/')
        local timestamp=$(grep '"timestamp"' "$PROJECT_ROOT/comprehensive-quality-report.json" | head -1 | sed 's/.*"timestamp": *"\([^"]*\)".*/\1/')
        echo "  Status: $status"
        echo "  Timestamp: $timestamp"
    fi
}

# Function to run quick check
run_quick() {
    echo -e "${BLUE}⚡ Quick Quality Check${NC}"
    echo "==================="

    cd "$PROJECT_ROOT"
    bash "$SCRIPT_DIR/run-format-gates.sh" --gates-only
}

# Function to run format consistency only
run_format() {
    echo -e "${BLUE}📊 Format Consistency Gates${NC}"
    echo "=========================="

    cd "$PROJECT_ROOT"
    node "$SCRIPT_DIR/format-consistency-gates.js"
}

# Function to run phantom detection only
run_phantom() {
    echo -e "${BLUE}👻 Phantom Detection Gates${NC}"
    echo "=========================="

    cd "$PROJECT_ROOT"
    node "$SCRIPT_DIR/phantom-detection-gates.js"
}

# Function to build and run
run_build() {
    echo -e "${BLUE}🔧 Build and Quality Check${NC}"
    echo "========================="

    cd "$PROJECT_ROOT"
    bash "$SCRIPT_DIR/multi-format-publisher.sh"
    echo ""
    bash "$SCRIPT_DIR/integrated-quality-pipeline.sh"
}

# Function to run full pipeline
run_full() {
    echo -e "${BLUE}🏛️  Full Quality Pipeline${NC}"
    echo "======================="

    cd "$PROJECT_ROOT"
    bash "$SCRIPT_DIR/integrated-quality-pipeline.sh"
}

# Main execution
case "${1:-full}" in
    full)
        run_full
        ;;
    format)
        run_format
        ;;
    phantom)
        run_phantom
        ;;
    quick)
        run_quick
        ;;
    build)
        run_build
        ;;
    status)
        show_status
        ;;
    --help|help)
        usage
        ;;
    *)
        echo "Unknown command: $1"
        echo ""
        usage
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Quality check completed${NC}"
echo "📋 Check generated reports for detailed analysis"