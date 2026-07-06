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

# 10 фантом-персон + гл.4 де-фактоизация 30.05 канон (S160) — исключение гл.4 снято cont +22
ACTUAL=$(grep -rE "(Соколова|Волков|Воронина|Каримов|Лебедева|Борисов|Кравцов|Зубова|Петрова|Соловьёв|Бородин)" content/chapters/ 2>/dev/null | wc -l)
check "10 фантомов + Бородин (все главы) = 0" "0" "$ACTUAL"

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
echo "=== B7 cont +22 Ивин S160 БАТЧ 3 гл.3 Ф14-Ф23 + Р1-3 ==="

check "Ф14 весна 1886 (не зима)" "1" "$(grep -c 'весна 1886 года' content/chapters/chapter-3-holmes.md)"
check "Ф14 £154 первый год" "1" "$(grep -c 'Доход первого года — £154' content/chapters/chapter-3-holmes.md)"
check "Ф14 £25 за все права" "1" "$(grep -c '£25 — за все права' content/chapters/chapter-3-holmes.md)"
check "STALE зима 1886 = 0" "0" "$(grep -c 'зима 1886' content/chapters/chapter-3-holmes.md)"
check "STALE £40 в год = 0" "0" "$(grep -c '£40 в год' content/chapters/chapter-3-holmes.md)"
check "Ф15 фраза родится позже 1891" "1" "$(grep -c 'скажет Шерлок Холмс доктору Ватсону в «Скандале в Богемии» пять лет спустя' content/chapters/chapter-3-holmes.md)"
check "Р1-3 письмо Дойла Беллу (body+footnote)" "2" "$(grep -c 'Именно вам я обязан Шерлоком Холмсом' content/chapters/chapter-3-holmes.md)"
check "STALE Диагноз ставится Белл fabric = 0" "0" "$(grep -c 'Диагноз ставится на основе точного наблюдения мелких деталей' content/chapters/chapter-3-holmes.md)"
check "ERR-01 dолник раздел удалён" "0" "$(grep -c 'Дольник как поэтическая криптография' content/chapters/chapter-3-holmes.md)"
check "ERR-01 poetic-prosody tag удалён" "0" "$(grep -c 'poetic-prosody' content/chapters/chapter-3-holmes.md)"
check "ERR-01 dolnik-metre tag удалён" "0" "$(grep -c 'dolnik-metre' content/chapters/chapter-3-holmes.md)"
check "ERR-01 cultural-cryptography tag удалён" "0" "$(grep -c 'cultural-cryptography' content/chapters/chapter-3-holmes.md)"
check "ERR-01 Оксимирон в кн.1 body удалён" "0" "$(grep -c 'Оксимирон' content/chapters/chapter-3-holmes.md)"
check "ERR-01 Блок в кн.1 body удалён" "0" "$(grep -c 'Блок' content/chapters/chapter-3-holmes.md)"
check "ERR-01 sноска 15 Гаспаров удалена" "0" "$(grep -c '¹⁵' content/chapters/chapter-3-holmes.md)"
check "ERR-01 sources.md LITERARY-METHOD удалён" "0" "$(grep -c 'LITERARY-METHODOLOGICAL INTEGRATION' content/apparatus/sources.md)"
check "ERR-01 sources.md Оксимирон record удалён" "0" "$(grep -c 'Оксимирон.*Город под подошвой' content/apparatus/sources.md)"
check "Ф18 девять лет Power Peg" "1" "$(grep -c 'не использовавшийся девять лет' content/chapters/chapter-3-holmes.md)"
check "STALE семь лет Power Peg = 0" "0" "$(grep -c 'не использовался семь лет' content/chapters/chapter-3-holmes.md)"
check "Ф19 наличность 365 млн" "1" "$(grep -cF '$365 млн на счетах накануне' content/chapters/chapter-3-holmes.md)"
check "STALE стоившая 365 млн капитализация = 0" "0" "$(grep -c 'накануне стоившая 365 миллионов' content/chapters/chapter-3-holmes.md)"
check "Ф20 lead time от коммита" "1" "$(grep -c 'от коммита до продакшена' content/chapters/chapter-3-holmes.md)"
check "STALE меньше часа DORA = 0" "0" "$(grep -c 'от идеи до продакшена меньше часа' content/chapters/chapter-3-holmes.md)"
check "Ф21 совокупные потери USD" "1" "$(grep -c 'Совокупные потери канадской авантюры' content/chapters/chapter-3-holmes.md)"
check "STALE 7 млрд канадских = 0" "0" "$(grep -c '7 миллиардов канадских' content/chapters/chapter-3-holmes.md)"
check "Ф22 Handelsblatt Lidl" "1" "$(grep -c 'по данным \*Handelsblatt\*' content/chapters/chapter-3-holmes.md)"
check "STALE Business Insider Lidl = 0" "0" "$(grep -c 'по данным \*Business Insider\*' content/chapters/chapter-3-holmes.md)"
check "Ф23 sноска5 Scandal in Bohemia" "1" "$(grep -c 'Точный источник цитаты о теориях без данных' content/chapters/chapter-3-holmes.md)"
check "PREVIEW гл.3→4 Борхес" "1" "$(grep -c 'библиотекарь из Буэнос-Айреса' content/chapters/chapter-3-holmes.md)"
check "П19 Мелвин Конвей unified" "0" "$(grep -c 'Мельвин Конвей' content/chapters/chapter-3-holmes.md)"
check "Шов dольник removed: Признак I после семь признаков" "1" "$(grep -A3 'семь признаков, которые Холмс' content/chapters/chapter-3-holmes.md | grep -c 'Признак I: Собака')"

echo ""
echo "=== B8 cont +22 Ивин S160 БАТЧ 4 гл.4 де-фактоизация + Ф24-Ф29 ==="

check "Де-факт Продакт-менеджер (не Денис)" "1" "$(grep -c 'Продакт-менеджер мобильного банкинга' content/chapters/chapter-4-borges.md)"
check "Де-факт Тимлид (не Лена)" "1" "$(grep -c 'Тимлид финтех-стартапа' content/chapters/chapter-4-borges.md)"
check "Де-факт HR-директор (не Марта)" "1" "$(grep -c 'HR-директор крупного банка' content/chapters/chapter-4-borges.md)"
check "Де-факт CPO (не Александр)" "1" "$(grep -c 'CPO e-commerce-компании' content/chapters/chapter-4-borges.md)"
check "Де-факт Скрам-мастер (не Анастасия)" "1" "$(grep -c 'Скрам-мастер геймдев-студии' content/chapters/chapter-4-borges.md)"
check "STALE Денис Бородин = 0" "0" "$(grep -c 'Денис Бородин' content/chapters/chapter-4-borges.md)"
check "STALE Лена Орлова = 0" "0" "$(grep -c 'Лена Орлова' content/chapters/chapter-4-borges.md)"
check "STALE Марта Соколова = 0" "0" "$(grep -c 'Марта Соколова' content/chapters/chapter-4-borges.md)"
check "STALE Александр Кравцов = 0" "0" "$(grep -c 'Александр Кравцов' content/chapters/chapter-4-borges.md)"
check "STALE Анастасия Волкова = 0" "0" "$(grep -c 'Анастасия Волкова' content/chapters/chapter-4-borges.md)"
check "STALE €47,000 = 0" "0" "$(grep -c '€47,000' content/chapters/chapter-4-borges.md)"
check "STALE Белорусская = 0" "0" "$(grep -c 'офис на «Белорусской»' content/chapters/chapter-4-borges.md)"
check "Марио переговорная беречь (стилевая деталь)" "1" "$(grep -c 'переговорная «Марио»' content/chapters/chapter-4-borges.md)"
check "Ф25 Стрэтерн отчеканила формулу" "1" "$(grep -c 'Стрэтерн отчеканила ту же мысль в короткую формулу' content/chapters/chapter-4-borges.md)"
check "Ф26 Ли jeremiahlee (не Sundén)" "1" "$(grep -c 'jeremiahlee.com, April 2020' content/chapters/chapter-4-borges.md)"
check "STALE Sundén Sведенвал Chalmers = 0" "0" "$(grep -c 'Sundén, Jeremiah & Svedenwall' content/chapters/chapter-4-borges.md)"
check "Ф27 семьдесят лет до SAFe" "1" "$(grep -c 'За семьдесят лет до появления SAFe' content/chapters/chapter-4-borges.md)"
check "STALE шестьдесят до SAFe = 0" "0" "$(grep -c 'За шестьдесят лет до появления SAFe' content/chapters/chapter-4-borges.md)"
check "Ф28 SAFe 4 конфигурации" "1" "$(grep -c 'четыре конфигурации (Essential, Large Solution, Portfolio, Full)' content/chapters/chapter-4-borges.md)"
check "STALE SAFe семь уровней = 0" "0" "$(grep -c 'семь уровней, четыре конфигурации' content/chapters/chapter-4-borges.md)"
check "Ф29 Nokia Laanti восприятие" "1" "$(grep -c 'Laanti, Salo, Abrahamsson (2011) описывают восприятие' content/chapters/chapter-4-borges.md)"
check "Ф24 фантом-цитата 1 удалена" "0" "$(grep -c 'Я не знаю, сколько этажей у лотереи' content/chapters/chapter-4-borges.md)"
check "Ф24 фантом-цитата 2 удалена" "0" "$(grep -c 'Та лотерея отличалась тем, что не была последней' content/chapters/chapter-4-borges.md)"
check "Ф24 фантом-цитата 3 удалена" "0" "$(grep -c 'Эта функционирующая лотерея есть часть реальности' content/chapters/chapter-4-borges.md)"
check "Р1-4 тираж за обедом косвенно" "1" "$(grep -c 'знали как разговор о тираже за обедом' content/chapters/chapter-4-borges.md)"
check "П24 Вот вавилонская лотерея" "1" "$(grep -c 'Вот вавилонская лотерея в действии' content/chapters/chapter-4-borges.md)"
check "STALE Здесь наблюдается вавилонская = 0" "0" "$(grep -c 'Здесь наблюдается вавилонская лотерея в действии' content/chapters/chapter-4-borges.md)"
check "Книберг verbatim цитата" "1" "$(grep -c 'Эта статья — лишь снимок нашего текущего способа работы' content/chapters/chapter-4-borges.md)"
check "PREVIEW гл.4→5 Наутилус" "1" "$(grep -c 'капитан, не проведший ни одного собеседования по регламенту' content/chapters/chapter-4-borges.md)"

echo ""
echo "=== B9 cont +22 гл.5 S134 T3 F-35 GAO 2024 ==="

check "F-35 >2 трлн GAO 2024" "1" "$(grep -c 'общая стоимость программы за жизненный цикл превысит 2 триллиона' content/chapters/chapter-5-nemo.md)"
check "F-35 GAO-24 sноска (body+footnote)" "2" "$(grep -c 'GAO-24-106909' content/chapters/chapter-5-nemo.md)"
check "STALE 1.1-1.7 триллионов = 0" "0" "$(grep -c 'от 1.1 до 1.7 триллионов долларов на протяжении жизненного цикла' content/chapters/chapter-5-nemo.md)"

echo ""
echo "=== B10 cont +25 гл.5 PROGON-5 (Ф30-Ф38 + П27+П29-П33) ==="

check "Ф30 HOOK Амьен 1873 (не 1874)" "1" "$(grep -c 'Амьен, 1873 год' content/chapters/chapter-5-nemo.md)"
check "Ф30 роман о химии Верн→Этцель" "1" "$(grep -c 'Это будет роман о химии' content/chapters/chapter-5-nemo.md)"
check "STALE Амьен весна 1874 = 0" "0" "$(grep -c 'Амьен, весна 1874 года' content/chapters/chapter-5-nemo.md)"
check "STALE Мишель 13 лет = 0" "0" "$(grep -c 'Сыну Мишелю 13 лет' content/chapters/chapter-5-nemo.md)"
check "STALE 18 стран одновременно = 0" "0" "$(grep -c 'в 18 странах одновременно' content/chapters/chapter-5-nemo.md)"
check "Ф32 фельетонами 1874-1875" "1" "$(grep -c 'печатал «Таинственный остров» фельетонами в 1874' content/chapters/chapter-5-nemo.md)"
check "STALE 1875 через три года = 0" "0" "$(grep -c 'в 1875 году, через три года' content/chapters/chapter-5-nemo.md)"
check "Ф33 Герберт (не Гарберт)" "1" "$(grep -c 'Герберт: пятнадцатилетний воспитанник Пенкрофа' content/chapters/chapter-5-nemo.md)"
check "STALE Гарберт воспитанник Спилета = 0" "0" "$(grep -c 'Гарберт: пятнадцатилетний воспитанник Спилета' content/chapters/chapter-5-nemo.md)"
check "Ф34 Пентленд 35% HBR 2012" "1" "$(grep -c 'до 35% вариативности' content/chapters/chapter-5-nemo.md)"
check "Ф34 HBR April 2012 canonical cite" "1" "$(grep -c 'Harvard Business Review, April 2012' content/chapters/chapter-5-nemo.md)"
check "STALE до 40% вариативности = 0" "0" "$(grep -c 'до 40% вариативности' content/chapters/chapter-5-nemo.md)"
check "Ф35 Аллен 50 метров" "1" "$(grep -c 'дистанции более 50 метров' content/chapters/chapter-5-nemo.md)"
check "STALE более 30 метров = 0" "0" "$(grep -c 'дистанции более 30 метров' content/chapters/chapter-5-nemo.md)"
check "Ф36 около сотни Macintosh" "1" "$(grep -c 'Около сотни человек в изначальной команде Macintosh' content/chapters/chapter-5-nemo.md)"
check "STALE менее ста пятидесяти = 0" "0" "$(grep -c 'Менее ста пятидесяти человек в изначальной команде' content/chapters/chapter-5-nemo.md)"
check "Ф37 SR-71 воздушно-реактивный" "1" "$(grep -c 'самый быстрый воздушно-реактивный пилотируемый' content/chapters/chapter-5-nemo.md)"
check "Ф38 Эдмондсон 2018 (не 2019)" "2" "$(grep -c 'The Fearless Organization\* (2018)' content/chapters/chapter-5-nemo.md)"
check "П27 фельетон гл.5→6 Мина Харкер" "1" "$(grep -c 'Мина Харкер сводит дневники, письма и газетные вырезки' content/chapters/chapter-5-nemo.md)"
check "STALE Стивенсон опубликовал Джекила = 0" "0" "$(grep -c 'Роберт Льюис Стивенсон опубликовал' content/chapters/chapter-5-nemo.md)"
check "П29 держите эту мысль removed" "0" "$(grep -c 'Держите эту мысль. Теперь доказательства' content/chapters/chapter-5-nemo.md)"
check "П30 метафора заслуживает removed" "0" "$(grep -c 'Метафора заслуживает развёртывания, потому что она точна' content/chapters/chapter-5-nemo.md)"
check "П32 разгадать интеллект" "1" "$(grep -c 'разгадать интеллект — и его руками решить всё остальное' content/chapters/chapter-5-nemo.md)"
check "STALE миссия решить intelligence = 0" "0" "$(grep -c 'миссией решить intelligence' content/chapters/chapter-5-nemo.md)"
check "П33 корпоративный псевдоним артефакт removed" "0" "$(grep -c 'корпоративный псевдоним' content/chapters/chapter-5-nemo.md)"
check "П33 Bryar Carr Working Backwards источник" "1" "$(grep -c 'Bryar, Colin & Carr, Bill' content/chapters/chapter-5-nemo.md)"
check "K1 sources.md XP-80 мемуары 180/37 + Lockheed 150/7" "1" "$(grep -c 'XP-80 timeline per источнику' content/apparatus/sources.md)"

echo ""
echo "=== B11 cont +25 гл.6 PROGON-6 (Ф39-Ф41 + П35+П36+П39-П41) ==="

check "Ф39 Грегг Ливерпуль 1888 США 1893" "1" "$(grep -c 'закрепилась в Америке, куда её автор перебрался в 1893' content/chapters/chapter-6-mina-harker.md)"
check "STALE Грегг была американской = 0" "0" "$(grep -c 'система Грегга (1888) была американской' content/chapters/chapter-6-mina-harker.md)"
check "Ф40 мать снимает ужасные пахучие цветы" "1" "$(grep -c 'ужасные пахучие цветы' content/chapters/chapter-6-mina-harker.md)"
check "Ф40 мать умирает на постели дочери" "1" "$(grep -c 'умирает на её постели' content/chapters/chapter-6-mina-harker.md)"
check "Ф40 рефрен Мать сняла чеснок Пациент умер" "1" "$(grep -c 'Мать сняла чеснок. Пациент умер' content/chapters/chapter-6-mina-harker.md)"
check "STALE Прислуга снимает странные растения = 0" "0" "$(grep -c 'Прислуга снимает «странные растения»' content/chapters/chapter-6-mina-harker.md)"
check "STALE портят вид комнаты = 0" "0" "$(grep -c 'портят вид комнаты' content/chapters/chapter-6-mina-harker.md)"
check "STALE Прислуга сняла чеснок = 0" "0" "$(grep -c 'Прислуга сняла чеснок' content/chapters/chapter-6-mina-harker.md)"
check "Ф41 Джонатан с Годалмингом катер" "1" "$(grep -c 'Джонатан с Годалмингом на паровом катере' content/chapters/chapter-6-mina-harker.md)"
check "Ф41 Сьюард с Моррисом верхом" "1" "$(grep -c 'Сьюард с Моррисом верхом по берегу' content/chapters/chapter-6-mina-harker.md)"
check "STALE Сьюард с Холмвудом = 0" "0" "$(grep -c 'Сьюард с Холмвудом' content/chapters/chapter-6-mina-harker.md)"
check "STALE Моррис с Джонатаном = 0" "0" "$(grep -c 'Моррис с Джонатаном' content/chapters/chapter-6-mina-harker.md)"
check "П35 фельетон гл.6→7 Лондон 1886 Джекил" "1" "$(grep -c 'Лондон, 1886-й — доктор Джекил, которого видят все' content/chapters/chapter-6-mina-harker.md)"
check "П36 наставнической выучке (не enabling)" "1" "$(grep -c 'наставнической выучке' content/chapters/chapter-6-mina-harker.md)"
check "STALE enabling-склонностях = 0" "0" "$(grep -c 'enabling-склонностях' content/chapters/chapter-6-mina-harker.md)"
check "П37 сводка без трайбы хвоста" "0" "$(grep -c 'переименовывая отделы в «трайбы»' content/chapters/chapter-6-mina-harker.md)"
check "П39 модель угроз (не threat-model)" "1" "$(grep -c 'модель угроз в собственной голове' content/chapters/chapter-6-mina-harker.md)"
check "П39 взлом (не breach)" "1" "$(grep -c 'получает взлом через дыру' content/chapters/chapter-6-mina-harker.md)"
check "П40 прорыв понимания (не эпистемический)" "1" "$(grep -c 'прорыв понимания происходит' content/chapters/chapter-6-mina-harker.md)"
check "STALE эпистемический прорыв = 0" "0" "$(grep -c 'эпистемический прорыв' content/chapters/chapter-6-mina-harker.md)"
check "П41 асинхронность по умолчанию" "1" "$(grep -c 'асинхронность по умолчанию (async-first)' content/chapters/chapter-6-mina-harker.md)"

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
