#!/bin/bash
# REVP-002 Content Filter for Single Chapter PoC
# Create isolated content structure for Chapter 1 demonstration

echo "Creating content filter for Chapter 1 PoC..."

# Create temporary content directory
rm -rf content-temp
mkdir -p content-temp/chapters
mkdir -p content-temp/_index.md

# Copy only Chapter 1 and essential structure
cp content/chapters/chapter-1-jules-verne.md content-temp/chapters/
cp content/chapters/_index.md content-temp/chapters/
cp content/_index.md content-temp/

# Copy essential static assets if they exist
if [ -d "static" ]; then
    cp -r static content-temp-static
fi

echo "Content filter complete - Chapter 1 isolated"
echo "Files included:"
find content-temp -name "*.md" | head -10