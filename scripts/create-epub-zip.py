#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
AGILE SAPIENS ePub ZIP Creator
Enhanced Alice v2.0 L3 — UTF-8 Preserving Compression
Banking-Level Standards: Proper Unicode handling for Russian content
"""

import os
import sys
import zipfile
from pathlib import Path

def create_epub_zip(build_dir, output_file):
    """Create ePub ZIP file with proper UTF-8 handling"""

    build_path = Path(build_dir)
    output_path = Path(output_file)

    if not build_path.exists():
        print(f"[ERROR] Build directory not found: {build_path}")
        return False

    # Remove existing ePub file
    if output_path.exists():
        output_path.unlink()

    try:
        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as epub_zip:
            # Add mimetype first (uncompressed as per ePub spec)
            mimetype_path = build_path / 'mimetype'
            if mimetype_path.exists():
                epub_zip.write(mimetype_path, 'mimetype', compress_type=zipfile.ZIP_STORED)

            # Add all other files in sorted order
            all_files = []
            for file_path in build_path.rglob('*'):
                if file_path.is_file() and file_path.name != 'mimetype':
                    all_files.append(file_path)

            # Sort files to ensure consistent order (especially for chapters)
            all_files.sort(key=lambda x: str(x))

            for file_path in all_files:
                # Calculate relative path for ZIP
                arc_path = file_path.relative_to(build_path)

                # Add to ZIP with compression
                epub_zip.write(file_path, arc_path, compress_type=zipfile.ZIP_DEFLATED)
                print(f"  Added: {arc_path}")

        # Verify the created file
        if output_path.exists():
            size = output_path.stat().st_size
            print(f"[OK] ePub created successfully: {size} bytes")
            return True
        else:
            print("[ERROR] ePub file not created")
            return False

    except Exception as e:
        print(f"[ERROR] Error creating ePub: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python create-epub-zip.py <build_directory> <output_file.epub>")
        sys.exit(1)

    build_dir = sys.argv[1]
    output_file = sys.argv[2]

    print("[INFO] Creating ePub ZIP with UTF-8 preservation...")
    success = create_epub_zip(build_dir, output_file)

    if success:
        print("[SUCCESS] ePub ZIP creation complete!")
        sys.exit(0)
    else:
        print("[FAILED] ePub ZIP creation failed!")
        sys.exit(1)