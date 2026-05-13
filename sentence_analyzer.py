#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sentence analyzer for Chapter 6 Jekyll-Hyde optimization
Identifies extra-long sentences (25+ words) that need to be broken down
"""

import re
import sys

def analyze_sentences(file_path):
    """Analyzes sentences in markdown file and identifies extra-long ones"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove YAML front matter
    content = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)

    # Remove markdown formatting but keep content
    content = re.sub(r'^#+\s*(.*?)$', r'\1', content, flags=re.MULTILINE)  # headers
    content = re.sub(r'\*\*(.*?)\*\*', r'\1', content)  # bold
    content = re.sub(r'\*(.*?)\*', r'\1', content)  # italic
    content = re.sub(r'`(.*?)`', r'\1', content)  # inline code
    content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)  # code blocks
    content = re.sub(r'>\s*(.*?)$', r'\1', content, flags=re.MULTILINE)  # quotes
    content = re.sub(r'^\s*[-\*\+]\s+', '', content, flags=re.MULTILINE)  # lists
    content = re.sub(r'^\s*\d+\.\s+', '', content, flags=re.MULTILINE)  # numbered lists
    content = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', content)  # links

    # Split into sentences more carefully
    sentences = []
    # Split on periods, exclamation marks, question marks followed by capital letter or start of line
    raw_sentences = re.split(r'[.!?]+(?=\s+[А-ЯA-Z]|\s*$)', content)

    for sent in raw_sentences:
        clean_sent = sent.strip()
        if clean_sent and len(clean_sent) > 10:  # ignore very short fragments
            sentences.append(clean_sent)

    # Categorize sentences by length
    extra_long_sentences = [] # 25+ words

    total_sentences = len(sentences)

    for sentence in sentences:
        # Clean sentence for word counting (remove footnotes and special chars)
        clean_sentence = re.sub(r'[¹²³⁴⁵⁶⁷⁸⁹⁰ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ]+', '', sentence)
        clean_sentence = re.sub(r'[\d\s\-—]+$', '', clean_sentence)  # remove trailing numbers/dashes

        words = len(clean_sentence.split())

        if words >= 25:
            extra_long_sentences.append((sentence, words))

    return {
        'total': total_sentences,
        'extra_long': extra_long_sentences
    }

def analyze_sentence_length(text):
    """Analyzes length of specific sentence"""
    # Remove markdown and special symbols
    clean_text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)  # bold
    clean_text = re.sub(r'\*(.*?)\*', r'\1', clean_text)  # italic
    clean_text = re.sub(r'[¹²³⁴⁵⁶⁷⁸⁹⁰ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡ]+', '', clean_text)  # footnotes
    clean_text = re.sub(r'[—–]', ' ', clean_text)  # dashes
    clean_text = re.sub(r'[:\(\);,]', ' ', clean_text)  # punctuation

    words = clean_text.split()
    return len(words)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python sentence_analyzer.py <markdown_file>")
        sys.exit(1)

    file_path = sys.argv[1]

    try:
        results = analyze_sentences(file_path)

        total = results['total']
        extra_count = len(results['extra_long'])

        extra_pct = (extra_count / total * 100) if total > 0 else 0

        print(f"=== CHAPTER 6 SENTENCE ANALYSIS ===")
        print(f"Total sentences: {total}")
        print(f"Extra-long (25+ words): {extra_count} ({extra_pct:.1f}%)")
        print(f"")
        print(f"TARGET: Extra-long <15%")
        print(f"CURRENT: Extra-long {extra_pct:.1f}%")
        print(f"")

        if extra_count > 0:
            print(f"=== EXTRA-LONG SENTENCES TO OPTIMIZE ===")
            for i, (sentence, word_count) in enumerate(results['extra_long'], 1):
                print(f"\n{i}. [{word_count} words]")
                print(f"{sentence}")
                print("-" * 80)

        print(f"\n=== OPTIMIZATION NEEDED ===")
        target_extra = int(total * 0.15)  # 15% target
        sentences_to_fix = extra_count - target_extra
        print(f"Need to reduce extra-long sentences by {sentences_to_fix} (from {extra_count} to ~{target_extra})")

    except FileNotFoundError:
        print(f"Error: file {file_path} not found")
        sys.exit(1)
    except Exception as e:
        print(f"Analysis error: {e}")
        sys.exit(1)