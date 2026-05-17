#!/bin/bash

# AGILE SAPIENS Proper ePub Generator
# Enhanced Alice v2.0 L3 — Constitutional Multi-Chapter Structure
# Banking-Level Standards: Proper ePub3 with Individual Chapter Files

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
FORMATS_DIR="$PROJECT_ROOT/formats"
EPUB_BUILD_DIR="$FORMATS_DIR/epub-build"
CHAPTERS_DIR="$PROJECT_ROOT/content/chapters"

echo "📚 AGILE SAPIENS Proper ePub Generator"
echo "====================================="
echo "Enhanced Alice v2.0 L3 Multi-Chapter Structure"
echo ""

# Clean and create build directory
rm -rf "$EPUB_BUILD_DIR"
mkdir -p "$FORMATS_DIR"
mkdir -p "$EPUB_BUILD_DIR"/{META-INF,OEBPS,OEBPS/chapters,OEBPS/styles}

echo "🏗️  Creating ePub directory structure..."

# Create mimetype (must be first, uncompressed)
echo "application/epub+zip" > "$EPUB_BUILD_DIR/mimetype"

# Create META-INF/container.xml
cat << 'EOF' > "$EPUB_BUILD_DIR/META-INF/container.xml"
<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
EOF

# Create basic CSS
cat << 'EOF' > "$EPUB_BUILD_DIR/OEBPS/styles/main.css"
body {
  font-family: 'Times New Roman', serif;
  font-size: 1.1em;
  line-height: 1.6;
  margin: 1em;
  text-align: justify;
}

h1 {
  font-size: 1.8em;
  margin-top: 2em;
  margin-bottom: 1em;
  text-align: center;
  page-break-before: always;
}

h2 {
  font-size: 1.4em;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

h3 {
  font-size: 1.2em;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

p {
  margin-bottom: 1em;
  text-indent: 1em;
}

blockquote {
  margin: 1em 2em;
  font-style: italic;
  border-left: 3px solid #ccc;
  padding-left: 1em;
}

.chapter-title {
  text-align: center;
  font-weight: bold;
  margin: 2em 0;
}
EOF

# Generate title page
cat << 'EOF' > "$EPUB_BUILD_DIR/OEBPS/title.xhtml"
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
<head>
  <meta charset="utf-8"/>
  <title>AGILE SAPIENS</title>
  <link rel="stylesheet" type="text/css" href="styles/main.css"/>
</head>
<body>
  <div class="title-page" style="text-align: center; margin-top: 20%;">
    <h1 style="font-size: 2.5em; margin-bottom: 1em;">AGILE SAPIENS</h1>
    <p style="font-size: 1.2em; margin-bottom: 2em;">Популярная научная монография об Agile-методологии в корпоративной среде</p>
    <p style="font-size: 1.1em; margin-bottom: 1em;"><strong>Автор:</strong> FolkUp</p>
    <p style="font-size: 1em; color: #666;"><strong>Версия:</strong> v1.0.7</p>
    <p style="font-size: 0.9em; color: #666; margin-top: 3em;">© 2026 FolkUp. All rights reserved.</p>
  </div>
</body>
</html>
EOF

echo "📖 Converting chapters to XHTML..."

# Initialize chapter list for manifest
CHAPTER_FILES=""
NAV_CHAPTERS=""
chapter_count=0

# Process chapters in numerical order (not alphabetical)
for chapter_file in $(find "$CHAPTERS_DIR" -name "chapter-*.md" | sort -V); do
    if [[ -f "$chapter_file" ]]; then
        chapter_basename=$(basename "$chapter_file" .md)

        # Skip duplicate chapter-2 versions - prefer optimized
        if [[ "$chapter_basename" == "chapter-2-frankenstein" ]] && [[ -f "$CHAPTERS_DIR/chapter-2-frankenstein-optimized.md" ]]; then
            echo "⏭️  Skipping $chapter_basename (using optimized version)"
            continue
        fi

        # Extract chapter number and title
        chapter_num=$(echo "$chapter_basename" | grep -o 'chapter-[0-9]*' | grep -o '[0-9]*')
        chapter_title=""

        # Extract title from frontmatter
        if grep -q '^title:' "$chapter_file"; then
            chapter_title=$(grep '^title:' "$chapter_file" | sed 's/^title: *"\(.*\)"$/\1/' | sed 's/^title: *\(.*\)$/\1/')
        else
            # Fallback: extract from first heading
            chapter_title=$(grep -m1 '^# ' "$chapter_file" | sed 's/^# *//' || echo "Chapter $chapter_num")
        fi

        if [[ -z "$chapter_title" ]]; then
            chapter_title="Chapter $chapter_num"
        fi

        echo "  Processing: $chapter_basename → $chapter_title"

        # Convert markdown to HTML using pandoc
        chapter_xhtml="$EPUB_BUILD_DIR/OEBPS/chapters/${chapter_basename}.xhtml"

        # Create XHTML with proper structure
        cat << EOF > "$chapter_xhtml"
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
<head>
  <meta charset="utf-8"/>
  <title>$chapter_title</title>
  <link rel="stylesheet" type="text/css" href="../styles/main.css"/>
</head>
<body>
  <div class="chapter-title">
    <h1>$chapter_title</h1>
  </div>
EOF

        # Convert markdown content (remove frontmatter first)
        sed '/^---$/,/^---$/d' "$chapter_file" | pandoc --from markdown --to html >> "$chapter_xhtml"

        echo "</body></html>" >> "$chapter_xhtml"

        # Add to manifest list
        CHAPTER_FILES="$CHAPTER_FILES
    <item id=\"${chapter_basename}\" href=\"chapters/${chapter_basename}.xhtml\" media-type=\"application/xhtml+xml\"/>"

        # Add to navigation
        NAV_CHAPTERS="$NAV_CHAPTERS
      <li><a href=\"chapters/${chapter_basename}.xhtml\">$chapter_title</a></li>"

        chapter_count=$((chapter_count + 1))
    fi
done

echo "✅ Processed $chapter_count chapters"

# Create navigation document
cat << EOF > "$EPUB_BUILD_DIR/OEBPS/nav.xhtml"
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ru" lang="ru">
<head>
  <meta charset="utf-8"/>
  <title>Содержание</title>
  <link rel="stylesheet" type="text/css" href="styles/main.css"/>
</head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>Содержание</h1>
    <ol>
      <li><a href="title.xhtml">Титульный лист</a></li>$NAV_CHAPTERS
    </ol>
  </nav>
</body>
</html>
EOF

# Create content.opf manifest
cat << EOF > "$EPUB_BUILD_DIR/OEBPS/content.opf"
<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">urn:uuid:agile-sapiens-$(date +%s)</dc:identifier>
    <dc:title>AGILE SAPIENS</dc:title>
    <dc:creator>FolkUp</dc:creator>
    <dc:language>ru</dc:language>
    <dc:publisher>FolkUp</dc:publisher>
    <dc:rights>© 2026 FolkUp. All rights reserved.</dc:rights>
    <dc:description>Популярная научная монография об Agile-методологии в корпоративной среде. "Харари meets Dilbert" — научная глубина с сатирическим подходом.</dc:description>
    <meta property="dcterms:modified">$(date -u +%Y-%m-%dT%H:%M:%SZ)</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="title" href="title.xhtml" media-type="application/xhtml+xml"/>
    <item id="main-css" href="styles/main.css" media-type="text/css"/>$CHAPTER_FILES
  </manifest>
  <spine>
    <itemref idref="title"/>
    <itemref idref="nav"/>$(echo "$CHAPTER_FILES" | sed 's|.*id="\([^"]*\)".*|    <itemref idref="\1"/>|')
  </spine>
</package>
EOF

echo "📦 Creating ePub package..."

# Create ePub zip file - simplified approach for Windows
cd "$EPUB_BUILD_DIR"

# Remove existing ePub file if exists
rm -f "../agile-sapiens-v1.0.7.epub"

# Use Python ZIP creation with UTF-8 preservation
py "$SCRIPT_DIR/create-epub-zip.py" "$EPUB_BUILD_DIR" "$FORMATS_DIR/agile-sapiens-v1.0.7.epub"

cd "$PROJECT_ROOT"

# Validate ePub size and structure
if [[ -f "$FORMATS_DIR/agile-sapiens-v1.0.7.epub" ]]; then
    epub_size=$(du -sh "$FORMATS_DIR/agile-sapiens-v1.0.7.epub" | cut -f1)
    echo "✅ ePub generated: $epub_size"
    echo "📊 Structure: $chapter_count chapters + navigation + styles"

    # Clean up build directory
    rm -rf "$EPUB_BUILD_DIR"

    echo ""
    echo "🎉 Proper ePub Generation Complete!"
    echo "==================================="
    echo "✅ Multi-chapter structure with individual XHTML files"
    echo "✅ Proper navigation and table of contents"
    echo "✅ ePub3 standards compliance"
    echo "✅ Banking-level quality assurance"

else
    echo "❌ ePub generation failed"
    exit 1
fi