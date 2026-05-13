#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Анализатор фрагментации текста для враждебной верификации.
Измеряет процент коротких предложений как индикатор фрагментации.
"""

import re
import sys

def analyze_fragmentation(file_path):
    """Анализирует фрагментацию текста в markdown файле"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Удаляем YAML front matter
    content = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)

    # Удаляем markdown разметку
    content = re.sub(r'^\#.*$', '', content, flags=re.MULTILINE)  # заголовки
    content = re.sub(r'\*\*(.*?)\*\*', r'\1', content)  # bold
    content = re.sub(r'\*(.*?)\*', r'\1', content)  # italic
    content = re.sub(r'`(.*?)`', r'\1', content)  # inline code
    content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)  # code blocks
    content = re.sub(r'>\s*(.*?)$', r'\1', content, flags=re.MULTILINE)  # quotes
    content = re.sub(r'^\s*[-\*\+]\s+', '', content, flags=re.MULTILINE)  # lists
    content = re.sub(r'^\s*\d+\.\s+', '', content, flags=re.MULTILINE)  # numbered lists
    content = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', content)  # links

    # Разбиваем на предложения
    sentences = re.split(r'[.!?]+\s+', content)
    sentences = [s.strip() for s in sentences if s.strip()]

    if not sentences:
        return 0, 0, 0

    total_sentences = len(sentences)

    # Считаем короткие предложения (≤10 слов)
    short_sentences = 0
    word_counts = []

    for sentence in sentences:
        # Удаляем сноски и специальные символы
        clean_sentence = re.sub(r'[¹²³⁴⁵⁶⁷⁸⁹⁰ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡ]+', '', sentence)
        words = len(clean_sentence.split())
        word_counts.append(words)

        if words <= 10:
            short_sentences += 1

    fragmentation_pct = (short_sentences / total_sentences) * 100
    avg_sentence_length = sum(word_counts) / len(word_counts) if word_counts else 0

    return fragmentation_pct, total_sentences, avg_sentence_length

def analyze_specific_sections(file_path):
    """Анализирует конкретные исправленные разделы"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Найдем примеры исправлений из задания
    examples = [
        "Хайд эффективен — принимает решения мгновенно, не тратит время на внутренний диалог, работает как идеальный алгоритм без подушки сомнений: быстрый, беспринципный, по-инженерному эффективный.",
        "метрики Джекила измеряли *симптомы*, а не *причину*: он отслеживал частоту трансформаций, но не деградацию своей способности контролировать процесс"
    ]

    example_analysis = []
    for example in examples:
        if example in content:
            words = len(example.split())
            example_analysis.append((example[:50] + "...", words))
        else:
            # Ищем похожие фрагменты
            pattern = re.escape(example[:20])
            match = re.search(pattern, content)
            if match:
                example_analysis.append((example[:50] + "...", "FOUND_SIMILAR"))

    return example_analysis

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python fragmentacia_analyzer.py <markdown_file>")
        sys.exit(1)

    file_path = sys.argv[1]

    try:
        fragmentation, total, avg_length = analyze_fragmentation(file_path)

        print(f"=== FRAGMENTATION VERIFICATION ===")
        print(f"File: {file_path}")
        print(f"Total fragmentation: {fragmentation:.1f}%")
        print(f"Target range: 30-35%")
        print(f"Total sentences: {total}")
        print(f"Average sentence length: {avg_length:.1f} words")

        if fragmentation > 50:
            print(f"CRITICAL FAILURE: {fragmentation:.1f}% > 50%")
        elif fragmentation > 35:
            print(f"TARGET EXCEEDED: {fragmentation:.1f}% > 35%")
        elif fragmentation < 30:
            print(f"INSUFFICIENT FRAGMENTATION: {fragmentation:.1f}% < 30%")
        else:
            print(f"TARGET ACHIEVED: {fragmentation:.1f}% in 30-35% range")

        print(f"\n=== ANALYSIS OF CORRECTED FRAGMENTS ===")
        examples = analyze_specific_sections(file_path)
        for i, (text, words) in enumerate(examples, 1):
            print(f"{i}. {text}")
            if isinstance(words, int):
                print(f"   Length: {words} words")
            else:
                print(f"   Status: {words}")

    except FileNotFoundError:
        print(f"Error: file {file_path} not found")
        sys.exit(1)
    except Exception as e:
        print(f"Analysis error: {e}")
        sys.exit(1)