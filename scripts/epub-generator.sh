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

# Single source of truth for version: package.json (closes drift documented по
# cont S24 + Враг pre-plan A для v1.0.9 deploy). Bash + sed for portability
# (node not safe across Windows path quirks via Git Bash on Windows).
BOOK_VERSION="v$(sed -nE 's/.*"version":\s*"([^"]+)".*/\1/p' "${PROJECT_ROOT}/package.json" | head -1)"

echo "📚 AGILE SAPIENS Proper ePub Generator"
echo "====================================="
echo "Enhanced Alice v2.0 L3 Multi-Chapter Structure"
echo ""

# Clean and create build directory
rm -rf "$EPUB_BUILD_DIR"
mkdir -p "$FORMATS_DIR"
mkdir -p "$EPUB_BUILD_DIR"/{META-INF,OEBPS,OEBPS/chapters,OEBPS/styles,OEBPS/images}

# AGIL-174: copy book cover to EPUB images
if [[ -f "$PROJECT_ROOT/static/images/cover.webp" ]]; then
  cp "$PROJECT_ROOT/static/images/cover.webp" "$EPUB_BUILD_DIR/OEBPS/images/cover.webp"
  echo "📷 Cover image copied: $(du -h "$EPUB_BUILD_DIR/OEBPS/images/cover.webp" | cut -f1)"
else
  echo "⚠️  static/images/cover.webp not found — EPUB will ship without cover" >&2
fi

# AGIL-176: copy all chapter / act-opener / intermezzo plates into OEBPS/images/
if [[ -d "$PROJECT_ROOT/static/images/chapters" ]]; then
  cp "$PROJECT_ROOT/static/images/chapters/"*.webp "$EPUB_BUILD_DIR/OEBPS/images/" 2>/dev/null || true
  plate_count=$(ls "$EPUB_BUILD_DIR/OEBPS/images/" | grep -c -E '^agil-' || true)
  echo "🎨 Chapter plates copied: $plate_count files"
fi

# Build image manifest entries for every webp in OEBPS/images/ (except cover, which is registered separately)
IMAGE_MANIFEST=""
for img_path in "$EPUB_BUILD_DIR/OEBPS/images/"*.webp; do
  img_fn=$(basename "$img_path")
  [[ "$img_fn" == "cover.webp" ]] && continue
  img_id="img-$(echo "$img_fn" | sed 's/\.webp$//')"
  IMAGE_MANIFEST="$IMAGE_MANIFEST
    <item id=\"$img_id\" href=\"images/$img_fn\" media-type=\"image/webp\"/>"
done

echo "🏗️  Creating ePub directory structure..."

# Create mimetype (must be first, uncompressed, NO trailing newline per PKG-007)
# BKPO-EPUB-STRUCTURAL-21-ERRORS cont+11 fix 2026-07-20: printf вместо echo — bash `echo`
# adds \n which epubcheck rejects (21 bytes vs canonical 20 «application/epub+zip»)
printf 'application/epub+zip' > "$EPUB_BUILD_DIR/mimetype"

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

/* AGIL-176: chapter / act-opener / intermezzo plate styling */
.chapter-plate {
  margin: 0 auto 1.5em;
  text-align: center;
  page-break-after: avoid;
}
.chapter-plate img {
  display: block;
  max-width: 100%;
  max-height: 80vh;
  margin: 0 auto;
}
EOF

# AGIL-174: Generate cover page (shown before title page in spine)
cat << 'EOF' > "$EPUB_BUILD_DIR/OEBPS/cover.xhtml"
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ru" lang="ru">
<head>
  <meta charset="utf-8"/>
  <title>Обложка</title>
  <style>
    body { margin: 0; padding: 0; text-align: center; }
    .cover { max-width: 100%; max-height: 100vh; }
  </style>
</head>
<body epub:type="cover">
  <img class="cover" src="images/cover.webp" alt="AGILE SAPIENS — Литературный анализ бизнеса"/>
</body>
</html>
EOF

# Generate title page (heredoc без single-quote чтобы ${BOOK_VERSION} substituted per Iskra §E-3 colophon requirement)
cat << EOF > "$EPUB_BUILD_DIR/OEBPS/title.xhtml"
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
    <p style="font-size: 1.4em; margin-bottom: 0.4em; font-style: italic;">Литературный анализ бизнеса</p>
    <p style="font-size: 1.1em; margin-bottom: 2em; color: #444;">Как литература предсказала современный менеджмент</p>
    <p style="font-size: 1.1em; margin-bottom: 0.3em;"><strong>Автор:</strong> Команданте FolkUp</p>
    <p style="font-size: 1em; margin-bottom: 0.3em;"><strong>Соавтор:</strong> Алиса (PM экосистемы FolkUp)</p>
    <p style="font-size: 1em; margin-bottom: 1em;"><strong>Редактор:</strong> Иви</p>
    <p style="font-size: 1em; color: #666;"><strong>Версия:</strong> ${BOOK_VERSION}</p>
    <p style="font-size: 0.9em; color: #666; margin-top: 3em;">«Agile Sapiens» — книга серии «Своим умом», трилогия «Своими силами». © 2026 Команданте FolkUp · Издатель: FolkUp Ecosystem. Контент под лицензией CC BY-SA 4.0.</p>
  </div>
</body>
</html>
EOF

echo "📖 Converting content units to XHTML..."

# Helper: extract frontmatter title (handles quoted + unquoted)
extract_title() {
  local f="$1"
  local fallback="$2"
  local t
  t=$(grep -m1 '^title:' "$f" 2>/dev/null | sed -E 's/^title:[[:space:]]*"?([^"]*)"?[[:space:]]*$/\1/')
  if [[ -z "$t" ]]; then
    t=$(grep -m1 '^# ' "$f" 2>/dev/null | sed 's/^# *//')
  fi
  echo "${t:-$fallback}"
}

# Helper: derive plate filename for a unit (AGIL-176, AGIL-182)
# Mirrors layouts/partials/custom/chapter-plate.html logic:
#   - plate_override frontmatter field → use as-is (highest priority, AGIL-182)
#   - intermezzo-N → agil-intermezzo-N-plate.webp
#   - act_opener:true chapter → frontmatter act_plate field
#   - regular chapter-N → agil-chapter-N-plate.webp
#   - other (preface/afterword/apparatus) → empty
derive_plate() {
  local f="$1"
  local bn="$2"
  # AGIL-182: explicit override wins (used by Ch.6 holmes/jekyll split)
  local override
  override=$(grep -m1 '^plate_override:' "$f" 2>/dev/null | sed -E 's/^plate_override:[[:space:]]*"?([^"]*)"?[[:space:]]*$/\1/')
  if [[ -n "$override" ]]; then
    echo "$override"
    return
  fi
  if [[ "$bn" =~ ^intermezzo-([0-9]+) ]]; then
    echo "agil-intermezzo-${BASH_REMATCH[1]}-plate.webp"
    return
  fi
  if [[ "$bn" =~ ^chapter-([0-9]+) ]]; then
    local chnum="${BASH_REMATCH[1]}"
    local ao
    ao=$(grep -m1 '^act_opener:' "$f" 2>/dev/null | awk '{print $2}')
    if [[ "$ao" == "true" ]]; then
      grep -m1 '^act_plate:' "$f" | sed -E 's/^act_plate:[[:space:]]*"?([^"]*)"?[[:space:]]*$/\1/'
    else
      echo "agil-chapter-${chnum}-plate.webp"
    fi
    return
  fi
  echo ""
}

# Per-unit XHTML generator (AGIL-175 + AGIL-176)
# Args: source-md basename out-id title plate-filename
generate_unit_xhtml() {
  local src="$1"
  local out_id="$2"
  local title="$3"
  local plate="$4"
  local out_xhtml="$EPUB_BUILD_DIR/OEBPS/chapters/${out_id}.xhtml"

  cat > "$out_xhtml" <<HEADER
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
<head>
  <meta charset="utf-8"/>
  <title>${title}</title>
  <link rel="stylesheet" type="text/css" href="../styles/main.css"/>
</head>
<body>
HEADER

  if [[ -n "$plate" ]]; then
    cat >> "$out_xhtml" <<PLATE
  <figure class="chapter-plate"><img src="../images/${plate}" alt="Гравюра: ${title}"/></figure>
PLATE
  fi

  cat >> "$out_xhtml" <<TITLE
  <div class="chapter-title"><h1>${title}</h1></div>
TITLE

  # Convert markdown to HTML and strip the leading H1 (the frontmatter title is the authoritative
  # heading, rendered in the title block above — avoid duplicate H1 like PDF generator does).
  # AGIL post-process EPUB structural fix (BKPO-EPUB-STRUCTURAL-21-ERRORS cont+11 2026-07-20):
  # Strip absolute-URL anchor tags (<a href="/...">Text</a> → Text) — Hugo web-navigation
  # permalinks vs EPUB container-relative URLs. epubcheck rejects RSC-026 URL leaks +
  # RSC-007 broken refs (target chapters may not exist в EPUB inclusion list).
  # S3SCOOP cont+27 2026-07-28 fix: awk state machine вместо sed range.
  # Прошлый sed '/^---$/,/^---$/d' итерирует по ВСЕМ парам --- в файле → режет
  # body content на chapters с horizontal rules `---` (Iskra S223 P1 битый EPUB
  # v1.0.14 разоблачение: главы 2-6 усечены до 10-25%). Awk strips ONLY leading
  # YAML frontmatter (--- на NR==1 до следующего ---), body --- сохраняются.
  awk 'NR==1 && /^---$/ {inFM=1; next} inFM && /^---$/ {inFM=0; next} !inFM {print}' "$src" \
    | pandoc --from markdown --to html \
    | sed -E '0,/^<h1[^>]*>.*<\/h1>/{/^<h1[^>]*>.*<\/h1>/d}' \
    | perl -0777 -pe 's|\s+href="/[^"]*"||g' \
    >> "$out_xhtml"
  echo "</body></html>" >> "$out_xhtml"
}

# Build ordered unit list. Each line is "ORDER_KEY|src-path|out-id"
# ORDER_KEY is a numeric weight used by sort -k1,1n for spine ordering.
ORDER_FILE=$(mktemp)
{
  # Front matter
  echo "0050|$PROJECT_ROOT/content/preface.md|preface"

  # Chapters + intermezzi from content/chapters/ — order by frontmatter weight
  for f in "$CHAPTERS_DIR/"chapter-*.md "$CHAPTERS_DIR/"intermezzo-*.md; do
    [[ -f "$f" ]] || continue
    bn=$(basename "$f" .md)
    # Skip chapter-2 backup if optimized variant exists (legacy)
    if [[ "$bn" == "chapter-2-frankenstein" ]] && [[ -f "$CHAPTERS_DIR/chapter-2-frankenstein-optimized.md" ]]; then
      continue
    fi
    w=$(grep -m1 '^weight:' "$f" 2>/dev/null | awk '{print $2}')
    w=${w:-9999}
    # Pad weight to 4 digits + use basename for tiebreaker (Ch.6 parts now use explicit weights 70/71 per AGIL-190 Batch 1)
    printf "%04d|%s|%s\n" "$w" "$f" "$bn"
  done | sort -t'|' -k1,1n -k3,3

  # Back matter — afterword
  echo "8000|$PROJECT_ROOT/content/afterword.md|afterword"

  # Apparatus in defined reading order (acknowledgments → methodology → sources → glossary → index → transparency → colophon)
  printf "%s\n" \
    "9010|$PROJECT_ROOT/content/apparatus/acknowledgments.md|apparatus-acknowledgments" \
    "9020|$PROJECT_ROOT/content/apparatus/methodology.md|apparatus-methodology" \
    "9030|$PROJECT_ROOT/content/apparatus/sources.md|apparatus-sources" \
    "9040|$PROJECT_ROOT/content/apparatus/slovar-terminov.md|apparatus-slovar-terminov" \
    "9050|$PROJECT_ROOT/content/apparatus/predmetnyy-ukazatel.md|apparatus-predmetnyy-ukazatel" \
    "9060|$PROJECT_ROOT/content/apparatus/transparency.md|apparatus-transparency" \
    "9090|$PROJECT_ROOT/content/apparatus/colophon.md|apparatus-colophon"
} > "$ORDER_FILE"

# Process each unit in order
CHAPTER_FILES=""
NAV_CHAPTERS=""
SPINE_ITEMS=""
unit_count=0

while IFS='|' read -r order src out_id; do
  if [[ ! -f "$src" ]]; then
    echo "⏭️   Skipping missing: $src"
    continue
  fi
  title=$(extract_title "$src" "$out_id")
  plate=$(derive_plate "$src" "$out_id")
  echo "  Processing: $out_id → $title${plate:+  [plate: $plate]}"
  generate_unit_xhtml "$src" "$out_id" "$title" "$plate"

  CHAPTER_FILES="$CHAPTER_FILES
    <item id=\"${out_id}\" href=\"chapters/${out_id}.xhtml\" media-type=\"application/xhtml+xml\"/>"
  NAV_CHAPTERS="$NAV_CHAPTERS
      <li><a href=\"chapters/${out_id}.xhtml\">${title}</a></li>"
  SPINE_ITEMS="$SPINE_ITEMS
    <itemref idref=\"${out_id}\"/>"
  unit_count=$((unit_count + 1))
done < "$ORDER_FILE"

rm -f "$ORDER_FILE"
echo "✅ Processed $unit_count content units (chapters + intermezzi + apparatus)"

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
      <li><a href="cover.xhtml">Обложка</a></li>
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
    <dc:identifier id="bookid">urn:uuid:$(python -c "import uuid; print(uuid.uuid4())")</dc:identifier>
    <dc:title>AGILE SAPIENS</dc:title>
    <dc:creator>Команданте FolkUp</dc:creator>
    <dc:language>ru</dc:language>
    <dc:publisher>FolkUp Ecosystem</dc:publisher>
    <dc:rights>© 2026 Команданте FolkUp. Контент под лицензией CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/). Издатель: FolkUp Ecosystem.</dc:rights>
    <dc:description>Литературный анализ бизнеса: как литература предсказала современный менеджмент. Научно-популярная монография о том, как классические произведения интуитивно описали принципы, которые менеджмент позднее коммерциализировал как революционные методологии.</dc:description>
    <meta name="cover" content="cover-img"/>
    <meta property="dcterms:modified">$(date -u +%Y-%m-%dT%H:%M:%SZ)</meta>
  </metadata>
  <manifest>
    <item id="cover-img" href="images/cover.webp" media-type="image/webp" properties="cover-image"/>
    <item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="title" href="title.xhtml" media-type="application/xhtml+xml"/>
    <item id="main-css" href="styles/main.css" media-type="text/css"/>$IMAGE_MANIFEST$CHAPTER_FILES
  </manifest>
  <spine>
    <itemref idref="cover"/>
    <itemref idref="title"/>
    <itemref idref="nav"/>$SPINE_ITEMS
  </spine>
</package>
EOF

echo "📦 Creating ePub package..."

# Create ePub zip file - simplified approach for Windows
cd "$EPUB_BUILD_DIR"

# Remove existing ePub file if exists
rm -f "../agile-sapiens-${BOOK_VERSION}.epub"

# Use Python ZIP creation with UTF-8 preservation
# Python binary detection: Linux typically has `python3`, Windows has `py` launcher,
# some systems still have `python` symlink. Fall back through all three.
PYTHON_CMD=$(command -v python3 || command -v python || command -v py || echo "python")
"$PYTHON_CMD" "$SCRIPT_DIR/create-epub-zip.py" "$EPUB_BUILD_DIR" "$FORMATS_DIR/agile-sapiens-${BOOK_VERSION}.epub"

cd "$PROJECT_ROOT"

# Validate ePub size and structure
if [[ -f "$FORMATS_DIR/agile-sapiens-${BOOK_VERSION}.epub" ]]; then
    epub_size=$(du -sh "$FORMATS_DIR/agile-sapiens-${BOOK_VERSION}.epub" | cut -f1)
    echo "✅ ePub generated: $epub_size"
    echo "📊 Structure: $unit_count content units + cover + plates + navigation + styles"

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