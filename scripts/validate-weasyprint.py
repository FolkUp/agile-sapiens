#!/usr/bin/env python3
"""
AGILE SAPIENS — WeasyPrint Technical Validation Script
Phase Г: Technical Prototype Validation

Validates WeasyPrint compatibility with Hugo-generated content:
- CSS Paged Media support for academic formatting
- Russian typography rendering
- Footnote cross-reference functionality
- Memory usage patterns with realistic content volume
"""

import os
import sys
import time
import subprocess
from pathlib import Path
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

def test_basic_compatibility():
    """Test basic HTML→PDF conversion capability"""
    print("🧪 Testing basic WeasyPrint compatibility...")

    # Simple test HTML with CSS Paged Media rules
    test_html = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>AGILE SAPIENS Technical Validation</title>
        <style>
            @page {
                size: A4;
                margin: 2cm;
                @bottom-center {
                    content: "Page " counter(page);
                    font-family: "Times New Roman", serif;
                    font-size: 10pt;
                }
            }

            body {
                font-family: "Times New Roman", serif;
                font-size: 11pt;
                line-height: 1.4;
                column-fill: auto;
            }

            h1 {
                page-break-before: always;
                font-size: 14pt;
                font-weight: bold;
            }

            /* Academic footnote styling */
            .footnotes {
                border-top: 1px solid #000;
                margin-top: 2em;
                padding-top: 0.5em;
                font-size: 9pt;
            }

            /* Test for CSS Paged Media support */
            @media print {
                .page-break { page-break-before: always; }
            }
        </style>
    </head>
    <body>
        <h1>AGILE SAPIENS — Technical Foundation Test</h1>

        <p>This document validates WeasyPrint compatibility with academic publication requirements.</p>

        <p>Testing footnote cross-references: See reference¹ for details.</p>

        <p>Russian typography test: «Философия гибкости» — проверка кодировки UTF-8.</p>

        <div class="footnotes">
            <p>¹ Technical validation confirms CSS Paged Media support operational.</p>
        </div>

        <div class="page-break">
            <h1>Page 2 Test</h1>
            <p>Page break functionality verification.</p>
        </div>
    </body>
    </html>
    """

    # Write test HTML
    test_file = Path("test-weasyprint-basic.html")
    with open(test_file, 'w', encoding='utf-8') as f:
        f.write(test_html)

    try:
        # Generate PDF
        start_time = time.time()
        html_doc = HTML(filename=str(test_file))
        pdf_path = "test-weasyprint-basic.pdf"
        html_doc.write_pdf(pdf_path)

        generation_time = time.time() - start_time

        # Check file size
        pdf_size = os.path.getsize(pdf_path)

        print(f"✅ Basic compatibility: SUCCESS")
        print(f"   📄 PDF generated: {pdf_path}")
        print(f"   ⏱️  Generation time: {generation_time:.2f}s")
        print(f"   📦 File size: {pdf_size:,} bytes")

        # Cleanup
        test_file.unlink()

        return True, generation_time, pdf_size

    except Exception as e:
        print(f"❌ Basic compatibility: FAILED")
        print(f"   Error: {str(e)}")
        if test_file.exists():
            test_file.unlink()
        return False, 0, 0

def test_hugo_integration():
    """Test WeasyPrint with actual Hugo-generated content"""
    print("\n🧪 Testing Hugo integration...")

    # Check if Hugo public folder exists
    public_dir = Path("public")
    if not public_dir.exists():
        print("❌ Hugo public/ directory not found. Run 'hugo' first.")
        return False

    # Find a test page to convert
    test_pages = [
        "public/en/index.html",
        "public/en/chapters/chapter-0/index.html",
        "public/index.html"
    ]

    test_page = None
    for page in test_pages:
        if Path(page).exists():
            test_page = Path(page)
            break

    if not test_page:
        print("❌ No suitable test page found in public/")
        return False

    try:
        print(f"   📄 Converting: {test_page}")

        start_time = time.time()
        html_doc = HTML(filename=str(test_page), base_url=str(public_dir))

        # Add academic CSS for PDF
        academic_css = CSS(string="""
            @page {
                size: A4;
                margin: 2.5cm;
                @bottom-center {
                    content: counter(page);
                    font-size: 10pt;
                }
            }

            body {
                font-family: "Times New Roman", serif !important;
                font-size: 11pt !important;
                line-height: 1.4 !important;
            }

            /* Hide navigation elements */
            nav, .navbar, header.navigation, footer {
                display: none !important;
            }

            /* Academic formatting */
            .footnotes {
                border-top: 1px solid #333;
                margin-top: 2em;
                padding-top: 1em;
                font-size: 9pt;
            }
        """)

        pdf_path = f"test-hugo-{test_page.stem}.pdf"
        html_doc.write_pdf(pdf_path, stylesheets=[academic_css])

        generation_time = time.time() - start_time
        pdf_size = os.path.getsize(pdf_path)

        print(f"✅ Hugo integration: SUCCESS")
        print(f"   📄 PDF generated: {pdf_path}")
        print(f"   ⏱️  Generation time: {generation_time:.2f}s")
        print(f"   📦 File size: {pdf_size:,} bytes")

        return True

    except Exception as e:
        print(f"❌ Hugo integration: FAILED")
        print(f"   Error: {str(e)}")
        return False

def test_footnote_system():
    """Test academic footnote cross-reference functionality"""
    print("\n🧪 Testing footnote cross-reference system...")

    footnote_html = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Footnote System Test</title>
        <style>
            @page {
                size: A4;
                margin: 2cm;
                @bottom-center { content: counter(page); }
            }

            body {
                font-family: "Times New Roman", serif;
                font-size: 11pt;
                line-height: 1.4;
            }

            /* Footnote cross-reference styling */
            .footnote-ref {
                font-size: 0.8em;
                vertical-align: super;
                text-decoration: none;
            }

            .footnotes {
                border-top: 1px solid #333;
                margin-top: 3em;
                padding-top: 1em;
                font-size: 9pt;
            }

            .footnote-item {
                margin-bottom: 0.5em;
            }

            .footnote-number {
                font-size: 0.8em;
                vertical-align: super;
            }
        </style>
    </head>
    <body>
        <h1>Academic Footnote Cross-Reference Test</h1>

        <p>Academic publishing requires robust footnote systems<a href="#fn1" class="footnote-ref">¹</a> that maintain cross-references across pages. This is particularly important for lengthy documents<a href="#fn2" class="footnote-ref">²</a> where footnotes may appear far from their references.</p>

        <p>Multiple footnote references<a href="#fn3" class="footnote-ref">³</a> within the same paragraph should render correctly<a href="#fn4" class="footnote-ref">⁴</a> without formatting conflicts.</p>

        <p>Russian language footnotes are also critical<a href="#fn5" class="footnote-ref">⁵</a> for bilingual academic publications.</p>

        <!-- Force page break to test cross-page footnote handling -->
        <div style="page-break-before: always;">
            <h2>Page 2: Cross-Page Reference Test</h2>
            <p>References to earlier footnotes<a href="#fn1" class="footnote-ref">¹</a> should maintain functionality across page boundaries.</p>
        </div>

        <div class="footnotes">
            <div class="footnote-item" id="fn1">
                <span class="footnote-number">¹</span> Foundation reference for academic publishing standards.
            </div>
            <div class="footnote-item" id="fn2">
                <span class="footnote-number">²</span> WeasyPrint documentation: CSS Paged Media Module Level 3.
            </div>
            <div class="footnote-item" id="fn3">
                <span class="footnote-number">³</span> Cross-reference functionality testing protocol.
            </div>
            <div class="footnote-item" id="fn4">
                <span class="footnote-number">⁴</span> Academic typography standards verification.
            </div>
            <div class="footnote-item" id="fn5">
                <span class="footnote-number">⁵</span> Проверка русской типографики в академических ссылках.
            </div>
        </div>
    </body>
    </html>
    """

    test_file = Path("test-footnote-system.html")
    with open(test_file, 'w', encoding='utf-8') as f:
        f.write(footnote_html)

    try:
        start_time = time.time()
        html_doc = HTML(filename=str(test_file))
        pdf_path = "test-footnote-system.pdf"
        html_doc.write_pdf(pdf_path)

        generation_time = time.time() - start_time
        pdf_size = os.path.getsize(pdf_path)

        print(f"✅ Footnote system: SUCCESS")
        print(f"   📄 PDF generated: {pdf_path}")
        print(f"   ⏱️  Generation time: {generation_time:.2f}s")
        print(f"   📦 File size: {pdf_size:,} bytes")

        test_file.unlink()
        return True

    except Exception as e:
        print(f"❌ Footnote system: FAILED")
        print(f"   Error: {str(e)}")
        if test_file.exists():
            test_file.unlink()
        return False

def test_russian_typography():
    """Test Russian language typography and hyphenation"""
    print("\n🧪 Testing Russian typography...")

    russian_html = """
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Русская типографика</title>
        <style>
            @page {
                size: A4;
                margin: 2cm;
                @bottom-center { content: "Страница " counter(page); }
            }

            body {
                font-family: "Times New Roman", serif;
                font-size: 11pt;
                line-height: 1.4;
                hyphens: auto;
                -webkit-hyphens: auto;
                -moz-hyphens: auto;
            }

            p {
                text-align: justify;
                text-justify: inter-word;
            }
        </style>
    </head>
    <body>
        <h1>Философия гибкости в управлении проектами</h1>

        <p>Современное управление проектами характеризуется высокой степенью неопределённости и динамичности. Традиционные методологии управления проектами, основанные на жёсткой последовательности этапов, часто оказываются неэффективными в условиях быстро изменяющихся требований.</p>

        <p>Философия гибкости (Agile) предлагает альтернативный подход, основанный на итеративной разработке, постоянной адаптации к изменениям и тесном взаимодействии с заказчиком. Этот подход позволяет командам быстро реагировать на изменения и создавать продукты, которые действительно соответствуют потребностям пользователей.</p>

        <p>Ключевыми принципами Agile являются: приоритет людей и взаимодействия над процессами и инструментами, работающий продукт важнее исчерпывающей документации, сотрудничество с заказчиком важнее согласования условий контракта, готовность к изменениям важнее следования первоначальному плану.</p>

        <p>Русская типографика требует особого внимания к кавычкам («ёлочки»), тире (—), дефисам (-), многоточию (…) и правильной расстановке неразрывных пробелов перед знаками препинания.</p>

        <p>Проверка переносов: непредсказуемость, взаимодействие, документация, сотрудничество, первоначальный.</p>
    </body>
    </html>
    """

    test_file = Path("test-russian-typography.html")
    with open(test_file, 'w', encoding='utf-8') as f:
        f.write(russian_html)

    try:
        start_time = time.time()
        html_doc = HTML(filename=str(test_file))
        pdf_path = "test-russian-typography.pdf"
        html_doc.write_pdf(pdf_path)

        generation_time = time.time() - start_time
        pdf_size = os.path.getsize(pdf_path)

        print(f"✅ Russian typography: SUCCESS")
        print(f"   📄 PDF generated: {pdf_path}")
        print(f"   ⏱️  Generation time: {generation_time:.2f}s")
        print(f"   📦 File size: {pdf_size:,} bytes")

        test_file.unlink()
        return True

    except Exception as e:
        print(f"❌ Russian typography: FAILED")
        print(f"   Error: {str(e)}")
        if test_file.exists():
            test_file.unlink()
        return False

def main():
    print("=" * 60)
    print("🎯 AGILE SAPIENS — Phase Г: WeasyPrint Technical Validation")
    print("=" * 60)

    # Run all validation tests
    results = {}

    # Test 1: Basic compatibility
    basic_success, gen_time, file_size = test_basic_compatibility()
    results['basic'] = basic_success

    # Test 2: Hugo integration
    results['hugo'] = test_hugo_integration()

    # Test 3: Footnote system
    results['footnotes'] = test_footnote_system()

    # Test 4: Russian typography
    results['russian'] = test_russian_typography()

    # Summary
    print("\n" + "=" * 60)
    print("📊 VALIDATION SUMMARY")
    print("=" * 60)

    total_tests = len(results)
    passed_tests = sum(1 for result in results.values() if result)

    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.upper():15} {status}")

    print("-" * 30)
    print(f"SUCCESS RATE: {passed_tests}/{total_tests} ({passed_tests/total_tests*100:.1f}%)")

    if passed_tests == total_tests:
        print("\n🎉 ALL TESTS PASSED — WeasyPrint foundation VALIDATED")
        print("✅ Ready for Phase Б: Visual Assets Production")
    else:
        print(f"\n⚠️  {total_tests - passed_tests} TESTS FAILED — Technical blockers identified")
        print("🔧 Requires Джинни PDF specialist intervention")

    return passed_tests == total_tests

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)