#!/bin/bash

# AGILE SAPIENS Format Consistency Quality Gates Runner
# Enhanced Alice v2.0 L3 Cartouche Autonome Operation
# Constitutional Excellence: Banking-Level Standards Integration

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🏛️  AGILE SAPIENS FORMAT CONSISTENCY QUALITY GATES"
echo "=================================================="
echo "Enhanced Alice v2.0 L3 Constitutional Excellence"
echo "Banking-Level Standards for Multi-Format Publishing"
echo ""

# Function to check if Node.js is available
check_nodejs() {
    if ! command -v node >/dev/null 2>&1; then
        echo "❌ Node.js is required but not installed"
        echo "   Please install Node.js to run format consistency gates"
        exit 1
    fi

    echo "✅ Node.js available: $(node --version)"
}

# Function to ensure formats exist before quality gates
ensure_formats_built() {
    echo "📋 [PRE-CHECK] Ensuring formats are built..."

    local web_exists=false
    local epub_exists=false
    local pdf_exists=false

    # Check web format
    if [ -d "$PROJECT_ROOT/public" ] && [ -f "$PROJECT_ROOT/public/index.html" ]; then
        web_exists=true
        echo "  ✅ Web format exists"
    else
        echo "  ❌ Web format missing"
    fi

    # Check ePub format
    if [ -f "$PROJECT_ROOT/formats/agile-sapiens-v1.0.7.epub" ]; then
        epub_exists=true
        echo "  ✅ ePub format exists"
    else
        echo "  ❌ ePub format missing"
    fi

    # Check PDF format
    if [ -f "$PROJECT_ROOT/formats/agile-sapiens-v1.0.7.pdf" ]; then
        pdf_exists=true
        echo "  ✅ PDF format exists"
    else
        echo "  ❌ PDF format missing"
    fi

    # If any formats are missing, attempt to build them
    if [ "$web_exists" = false ] || [ "$epub_exists" = false ] || [ "$pdf_exists" = false ]; then
        echo ""
        echo "⚠️  Missing formats detected - attempting to build..."

        # Check if multi-format publisher exists
        if [ -f "$SCRIPT_DIR/multi-format-publisher.sh" ]; then
            echo "🔧 Running multi-format publisher..."
            chmod +x "$SCRIPT_DIR/multi-format-publisher.sh"
            "$SCRIPT_DIR/multi-format-publisher.sh"

            if [ $? -eq 0 ]; then
                echo "✅ Multi-format build completed"
            else
                echo "❌ Multi-format build failed"
                echo "   Quality gates cannot run without built formats"
                exit 1
            fi
        else
            echo "❌ Multi-format publisher not found"
            echo "   Cannot automatically build missing formats"
            exit 1
        fi
    fi

    echo "✅ All required formats verified"
}

# Function to run the quality gates
run_quality_gates() {
    echo ""
    echo "🚀 [EXECUTION] Running Format Consistency Quality Gates..."
    echo ""

    cd "$PROJECT_ROOT"

    # Run the Node.js quality gates script
    node "$SCRIPT_DIR/format-consistency-gates.js"

    local exit_code=$?

    echo ""
    if [ $exit_code -eq 0 ]; then
        echo "🎉 Format Consistency Quality Gates: PASSED"
        echo "✅ All constitutional requirements met"
        echo "✅ Banking-level standards verified"
        echo "✅ Hostile verification completed"
    else
        echo "❌ Format Consistency Quality Gates: FAILED"
        echo "⚠️  Constitutional requirements not met"
        echo "📋 Check format-consistency-report.json for details"
    fi

    return $exit_code
}

# Function to generate summary report
generate_summary() {
    echo ""
    echo "📊 [SUMMARY] Format Consistency Quality Gates Results"
    echo "==================================================="

    local report_file="$PROJECT_ROOT/format-consistency-report.json"

    if [ -f "$report_file" ]; then
        echo "📄 Report generated: $report_file"

        # Extract key metrics using simple grep/sed (portable)
        local status=$(grep '"status"' "$report_file" | head -1 | sed 's/.*"status": *"\([^"]*\)".*/\1/')
        local errors=$(grep '"errors"' "$report_file" | head -1 | sed 's/.*"errors": *\[\([^]]*\)\].*/\1/' | wc -w)
        local warnings=$(grep '"warnings"' "$report_file" | head -1 | sed 's/.*"warnings": *\[\([^]]*\)\].*/\1/' | wc -w)

        echo "🎯 Overall Status: $status"
        echo "📊 Total Errors: $errors"
        echo "⚠️  Total Warnings: $warnings"

        # Show format sizes if available
        echo ""
        echo "📦 Format Sizes:"
        if [ -d "$PROJECT_ROOT/public" ]; then
            echo "  🌐 Web: $(du -sh "$PROJECT_ROOT/public" | cut -f1)"
        fi
        if [ -f "$PROJECT_ROOT/formats/agile-sapiens-v1.0.7.epub" ]; then
            echo "  📖 ePub: $(du -sh "$PROJECT_ROOT/formats/agile-sapiens-v1.0.7.epub" | cut -f1)"
        fi
        if [ -f "$PROJECT_ROOT/formats/agile-sapiens-v1.0.7.pdf" ]; then
            echo "  📄 PDF: $(du -sh "$PROJECT_ROOT/formats/agile-sapiens-v1.0.7.pdf" | cut -f1)"
        fi

        echo ""
        echo "🔗 Integration with CI/CD:"
        echo "  • Use exit code $? for automated pipeline decisions"
        echo "  • Parse $report_file for detailed analysis"
        echo "  • Monitor constitutional compliance metrics"

    else
        echo "❌ Report file not found"
    fi
}

# Function to display usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --build-first    Build formats before running gates (default)"
    echo "  --gates-only     Run gates without building (assumes formats exist)"
    echo "  --help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                 # Run with format building if needed"
    echo "  $0 --build-first   # Explicitly build first"
    echo "  $0 --gates-only    # Run gates only (fast)"
}

# Main execution
main() {
    local build_first=true
    local gates_only=false

    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --build-first)
                build_first=true
                shift
                ;;
            --gates-only)
                gates_only=true
                build_first=false
                shift
                ;;
            --help)
                usage
                exit 0
                ;;
            *)
                echo "Unknown option: $1"
                usage
                exit 1
                ;;
        esac
    done

    # Execute pipeline
    check_nodejs

    if [ "$build_first" = true ]; then
        ensure_formats_built
    fi

    run_quality_gates
    local gates_result=$?

    generate_summary

    echo ""
    echo "🏛️  Constitutional Framework Status:"
    if [ $gates_result -eq 0 ]; then
        echo "  ✅ Banking-level standards: COMPLIANT"
        echo "  ✅ Evidence-first methodology: OPERATIONAL"
        echo "  ✅ Hostile verification: PASSED"
        echo "  ✅ Quality over efficiency: VERIFIED"
    else
        echo "  ❌ Banking-level standards: NON-COMPLIANT"
        echo "  ⚠️  Constitutional requirements not met"
        echo "  📋 Review report for compliance restoration"
    fi

    exit $gates_result
}

# Execute main function with all arguments
main "$@"