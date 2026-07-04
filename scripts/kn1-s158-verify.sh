#!/bin/bash
# kn1-s158-verify.sh — grep-based regression tests для сводного kn1-PR S156-S158
# Проверяет что все Ивин patches applied + не откатились
# Возвращает 0 если все PASS, non-zero если найдены регрессии
#
# Usage: bash scripts/kn1-s158-verify.sh
# Written cont +18 batch B7 Cartouche L3 (2026-07-05)

set -e

FAIL=0
PASS=0

check() {
    local name="$1"
    local expected="$2"
    local actual="$3"
    if [ "$expected" = "$actual" ]; then
        echo "  PASS  $name ($actual)"
        PASS=$((PASS + 1))
    else
        echo "  FAIL  $name (expected: $expected, actual: $actual)"
        FAIL=$((FAIL + 1))
    fi
}

echo "=== B2 фантомы S133 v2 + Ф8 ==="

# 10 фантом-персон вне chapter-4-borges (виньетка гл.4 остаётся)
ACTUAL=$(grep -rE "(Соколова|Волков|Воронина|Каримов|Лебедева|Борисов|Кравцов|Зубова|Петрова|Соловьёв)" content/chapters/ 2>/dev/null | grep -v "chapter-4-borges" | wc -l)
check "10 фантомов вне гл.4 = 0" "0" "$ACTUAL"

# Литзамены должны присутствовать
check "Гоголь Мёртвые души в гл.3" "1" "$(grep -c 'Мёртвых душ' content/chapters/chapter-3-holmes.md)"
check "Кинг-Пайленд Дойл в гл.3" "1" "$(grep -c 'Кинг-Пайленда' content/chapters/chapter-3-holmes.md)"
check "Верн Пенкроф литзамена в гл.5" "1" "$(grep -c 'Пенкроф попал в неё, потому что умел управлять любым судном' content/chapters/chapter-5-nemo.md)"
check "Бартлби Мелвилл в гл.5" "1" "$(grep -c 'Бартлби' content/chapters/chapter-5-nemo.md)"

echo ""
echo "=== B3 Ф1-Ф7 + П1-П5 гл.0 ==="

check "Ф1 £294 000 (слон стр.175)" "1" "$(grep -c '£294 000' content/chapters/chapter-0-pilot.md)"
check "Ф2 4 ценности 12 принципов" "1" "$(grep -c 'четыре ценности и двенадцать принципов' content/chapters/chapter-0-pilot.md)"
check "Ф3 575 правой 576 левой (Верн канон)" "1" "$(grep -c 'пятьсот семьдесят пять шагов правой ногой и пятьсот семьдесят шесть — левой' content/chapters/chapter-0-pilot.md)"
check "Ф4 твёрдая сумма без роялти" "1" "$(grep -c 'твёрдая сумма за рукопись, без роялти' content/chapters/chapter-0-pilot.md)"
check "Ф5 1.5M community + 2M credentials" "1" "$(grep -c 'полутора миллионах специалистов' content/chapters/chapter-0-pilot.md)"
check "Ф6 За пять месяцев Boeing" "1" "$(grep -c 'За пять месяцев — с октября 2018-го по март 2019-го' content/chapters/chapter-0-pilot.md)"
check "Ф7 no quotes Палата" "1" "$(grep -c 'серия ошибочных технических допущений инженеров Boeing' content/chapters/chapter-0-pilot.md)"
check "П1 Но Верн ещё не знает" "1" "$(grep -c 'Но Верн ещё не знает' content/chapters/chapter-0-pilot.md)"
check "П2 не потому...а потому" "1" "$(grep -c 'не потому, что его попросили по процедуре' content/chapters/chapter-0-pilot.md)"
check "П3 ограничение (constraint), которое" "1" "$(grep -c 'ограничение (constraint), которое существовало' content/chapters/chapter-0-pilot.md)"
check "П5 Реестр рисков в котором" "1" "$(grep -c 'Реестр рисков, в котором учтены' content/chapters/chapter-0-pilot.md)"

# Stale strings should be 0
check "STALE 1,925 франков = 0" "0" "$(grep -c '1,925 франков' content/chapters/chapter-0-pilot.md)"
check "STALE 4 принципа 12 ценностей = 0" "0" "$(grep -c 'четыре принципа и двенадцать ценностей' content/chapters/chapter-0-pilot.md)"

echo ""
echo "=== B4 Дополнение №2 (интермедии) ==="

check "И2 В1 прямая речь 237 задач" "1" "$(grep -c 'У нас двести тридцать семь задач висит в продакшене, — ответила Маргарита' content/chapters/intermezzo-2.md)"
check "И2 В6 прямая речь спринт" "1" "$(grep -c 'Следующий спринт, — кивнула Маргарита' content/chapters/intermezzo-2.md)"
check "И2-П5 Алиса спросила" "1" "$(grep -c 'Алиса спросила, почему максимальную' content/chapters/intermezzo-2.md)"
check "И3-Р1 маскарад строка" "1" "$(grep -c 'имена свиты тут разбирают, как бейджи на конференции' content/chapters/intermezzo-3.md)"

echo ""
echo "=== B5 Дополнение №3 (каркас + фельетон) ==="

# All каркас должны быть сняты
ACTUAL=$(grep -E "^## (HOOK|CONTROVERSY|CORE|BRIDGE|PREVIEW):" content/chapters/*.md 2>/dev/null | wc -l)
check "Каркас-заголовки во всех главах = 0" "0" "$ACTUAL"

# Гл.0 фельетон Верна
check "Гл.0 эталон Верн Le Temps" "1" "$(grep -c 'газета \*Le Temps\* печатает главы кругосветки' content/chapters/chapter-0-pilot.md)"

echo ""
echo "=== B6 свод S157 (Двенадцать вопросов) ==="

check "Afterword title Двенадцать вопросов" "1" "$(grep -c 'title: \"Послесловие. Двенадцать вопросов\"' content/afterword.md)"
check "Afterword линз = 0" "0" "$(grep -c 'линз' content/afterword.md)"
check "Afterword секция 1 Фогг" "1" "$(grep -c '### 1. Фогг. Карта и территория' content/afterword.md)"
check "Afterword секция 12 Чума" "1" "$(grep -c '### 12. Чума. Длящийся кризис' content/afterword.md)"
check "Preface F1 IDC 4 триллиона" "1" "$(grep -c 'к 2027 году они приблизятся к четырём триллионам' content/preface.md)"
check "Preface F2 180 лет" "1" "$(grep -c 'Спустя 180 лет' content/preface.md)"
check "Preface П1 не продаёт" "1" "$(grep -c 'не продаёт решения' content/preface.md)"
check "Preface STALE 179 лет = 0" "0" "$(grep -c '179 лет' content/preface.md)"
check "Указатель добавлен вопрос" "1" "$(grep -c 'вопрос, диагностический' content/apparatus/predmetnyy-ukazatel.md)"
check "Указатель удалена линза" "0" "$(grep -c 'линза, диагностическая' content/apparatus/predmetnyy-ukazatel.md)"
check "Colophon URL books.folkup.life/kn1/" "1" "$(grep -c 'books.folkup.life/kn1/' content/apparatus/colophon.md)"
check "Colophon STALE sapiens = 0" "0" "$(grep -c 'sapiens.folkup.life' content/apparatus/colophon.md)"
check "_meta slovar-terminov" "1" "$(ls content/apparatus/_meta/slovar-terminov.md 2>/dev/null | wc -l)"
check "_meta chapter-7-research-clearance" "1" "$(ls content/apparatus/_meta/chapter-7-research-clearance.md 2>/dev/null | wc -l)"
check "apparatus/_index nav Предметный указатель" "1" "$(grep -c 'Предметный указатель' content/apparatus/_index.md)"

echo ""
echo "=== SUMMARY ==="
TOTAL=$((PASS + FAIL))
echo "  Total tests: $TOTAL"
echo "  PASS: $PASS"
echo "  FAIL: $FAIL"

if [ "$FAIL" -gt 0 ]; then
    echo ""
    echo "REGRESSION DETECTED. See failing tests above."
    exit 1
else
    echo ""
    echo "ALL PASS. Сводный kn1-PR S156-S158 clean."
    exit 0
fi
