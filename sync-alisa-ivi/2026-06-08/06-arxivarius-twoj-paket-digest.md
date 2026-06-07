<!-- precommit:allow-ai-mentions -->
---
title: Архивариус — Иви files comprehensive synthesis 2026-06-07
version: 1.0
date: 2026-06-07
classification: REFERENCE — exhaustive synthesis 15 Ивиных canonical документов
authority: Архивариус (V-batch parallel agent #1) — Хорхе/Борхес/Шкловский методология
source: V-batch 2026-06-07, ~30 min agent budget
status: COMPLETE — supplements vault/contexts/INSTRUKCIYA-claude-design-onboarding.md + brand-canon-update-2026-06-07.md
---

# Архивариус: Иви files comprehensive synthesis 2026-06-07

15 файлов прочитано (10 главный пакет + 5 standalone). Structured findings для priority walk завтра.

---

## ⭐ КРИТИЧЕСКИЕ открытия (top-tier impact)

### 1. Мост через API/MCP — НЕ СТРОИТЬ (02-МОСТ)

Главный архитектурный вывод: «Мост» в смысле API/MCP **строить НЕ нужно и пока НЕЛЬЗЯ** — у Claude Design **нет публичного API/MCP**. Это research-preview, web-only.

**Три канала обмена:**
- **A** — git-репо в Claude Design (входной онбординг)
- **B** — кнопка `Export → Handoff to Claude Code` (handoff-бандл: HTML/CSS, токены, скриншоты, PROMPT.md, чат history)
- **C** — ⭐ **DESIGN.md в git как постоянный мост-контракт**

**Рекомендуемая архитектура:** `/brand/DESIGN.md` + `/CLAUDE.md` в репо = единый источник истины. Транспорт = git. **Не нужен публичный TLS+OAuth endpoint как у INF-01.**

Канал B = снимок, C = живая ссылка — кардинальное различие.

### 2. Полные точные HEX Palette D (KANON-SERII)

```
Bordeaux:   #7D4450 (RGB 125,68,80) — main
Sage:       #839E75
Amber:      #E8AD4A
Ivory:      #FEFCF6 — background
Charcoal:   #2A2825
Surface:    #F0EDE8
Text:       #2A2725
Text-muted: #6B6560
Border:     #DCD7D0

Оттенки:
Bordeaux-light: #9E6470 / -dark: #5C3038
Sage-light:     #A3B898 / -dark: #627852
Amber-light:    #F0C574 / -dark: #C08A28
```

**Расхождение с BRIEF:** старые HEX `#5E1414` / `#F2E8CF` = рассинхрон, отброшены в пользу фактического Agile `#7D4450` / `#FEFCF6`. D9 ЗАКРЫТА (Андрей 28.05).

### 3. РАМКА v21 (Андрей 28.05): Claude Design = umbrella для ВСЕХ проектов экосистемы

Решено: общий визуальный канон ВСЕХ проектов экосистемы FolkUp строится в Claude Design. Текущий HEX/шрифты = временный эталон + вход для онбординга, **НЕ финальный канон**.

### 4. Книжные маски ≠ рабочие имена (FRIDA passport)

Ключевой приём от Иви С25: В рабочих файлах Фрида/Алиса = коллеги. В тексте книги — выступают под книжными масками (имена-маски TBD). Сам приём = тема кн.2 «Чужими руками» в действии (мастерская доходит до читателя ЧЕРЕЗ МАСКУ).

Связка Алиса+Фрида в интермедиях кн.2: Алиса задаёт «настоящего Че» (счищает наросты) → Фрида рисует (САМА накладывает новый слой). Мёбиус.

### 5. Шрифты Палитра серии (KANON-SERII)

- **Playfair Display** (variable) — заголовки/обложки/КАПИТЕЛЬ
- **Source Sans 3** (variable) — только веб
- **Pacifico** — только лого
- **D6 ЗАКРЫТА:** для печати фактически Times New Roman (легаси). Долг: выбрать свободную антикву в Claude Design (кандидаты EB Garamond / Literata / PT Serif).

### 6. books@folkup.app errata mail — реальный блокер релизов

SVODKA-v21 line 83: настроить приём почты на `books@folkup.app` — иначе errata-обещание пустое. БЛОКЕР первой публикации.

### 7. Голос Команданте = модель Бэнкси

ПАМЯТЬ-Иви line 30: КНИЖНЫЙ и ПУБЛИЧНЫЙ = регистры одного голоса, не два голоса. Единый спикер = Команданте. Фонарщик = внутренняя функция при Команданте (камертон + сверка), НЕ публичное лицо.

### 8. ART цикл статей (новый формат С24)

~10 статей по обрезкам research-логов трилогии. Статья №1 «Джаз как опен-сорс» написана, ждёт Фриду + Печкина. **Это новый scope мне не было известен.**

### 9. Brand-репо canonical path

`C:/JOHNDOE_CLAUDE/brand/`, GitHub `github.com/FolkUp/brand`. Гайд = `brand/brand-book/index.html`. Вордмарки: `folkup-wordmark.svg` + `-dark.svg` (~15 KB).

### 10. Дефект эталона Agile (НЕ повторять в Согласных)

В публичный README Agile утёк рабочий каркас (тикеты AGIL-190, batch-отчёты, «mono%», «фантомные цитаты»). PDF — печать веб-страницы, A4 вместо книжного 156×234, артефакт «N/226», нет outline. EPUB — хардкод Times в `styles/main.css`. Решение: Vivliostyle / Paged.js / Prince / Typst.

---

## Per-file ключевые findings (10 файлов + standalone)

### 02-МОСТ-консоль-Claude-Design-С26.md
- Главный вывод: API/MCP мост строить НЕ нужно — у Claude Design нет публичного API
- 3 канала обмена: A (git input) / B (handoff snapshot) / C (DESIGN.md live link)
- План внедрения на вечер: DESIGN.md + CLAUDE.md в репо → Create new design system → выверить промптом → handoff бандл
- Ограничения: нет data residency, нет API, недельный лимит per-user (не пулится в Team), не мультиплеер

### KANON-SERII-folkup.md
- РАМКА v21: общий визуальный канон в Claude Design
- Полные HEX Palette D (см. §2 выше)
- D6 + D9 ЗАКРЫТЫ
- 6 публичных репо организации: agile-sapiens (BY 4.0/MIT), orga (Оксимирон), lucerna (OSINT), folkup-quest, folkup-landing, brand
- Дефект эталона Agile

### SHABLON-SERII-v0.md
- Состав репозитория книги: content/, apparatus/, formats/, layouts/, themes/, static/downloads/, assets/
- Композиция гибкая: аналитические (Agile) — 3 акта + интермедии; эссеистические (Согласные) — сквозная нить
- Аппарат: A (поглавный, Agile) ИЛИ B (единый блок в конце, Согласные) — оба = норма
- Errata обязательны, последний раздел книги, приглашение на books@folkup.app
- YAML-фронтматтер 18 полей с группировкой identification/metric/semantic/SEO/Hugo/verification
- Структура заголовков: H1 не используется, H2 крупные, H3 подразделы. H4+ запрещено
- Цифровой слой — переключаемые цветовые схемы. Печать одноцветна
- Прозрачность ИИ = норма серии (видимое заявление в каждой книге)

### BRIEF-oblozhka.md
- Утверждённая концепция: «выпавшие гласные» — бордовое плотными согласными, гласные бледными контурами-призраками
- Канон серии: ivory фон, bordeaux графика, двойная рамка с ромбами, Playfair Display капитель с точкой
- **3 промпта-близнеца ready-to-use** для генерации обложек всех трёх книг
- 2:3 вертикальный, читаемость в миниатюре 200px, только свободные шрифты

### INSTRUKCIYA-verstalshchiku-tipografika-serii.md
- Кегль/leading/measure: 10.5-12pt (стандарт 11pt), leading 120-145% (13.2pt для 11pt), 50-70 знаков (web max-width: 65ch)
- Поля: trim 130×200 OR 150×210мм (TBV), 25мм + 30мм внутреннее
- Justified печать, left-aligned EPUB/Web
- Скрипт качества: Python regex для отлова латиницы в кириллице + U+FFFD

### INSTRUKCIYA-verstalshchiku-terminy.md
- Маркер: `<span class="glossary-term" data-term="КЛЮЧ">слово</span>`
- Web: href с # обратная стрелка + попап на наведении
- Печать: font-variant: small-caps
- Карта 20 терминов: nikkud, masorety, gematria, shruti-smriti, apausheya, varny-dvija и т.д.

### INSTRUKCIYA-oformlenie-agile-sapiens.md
- Главный вывод: содержательно крепко, но **системный дефект во всех 3 форматах**
- В публикацию утёк рабочий каркас (HOOK/CONTROVERSY как H2, англо-русский подстрочник, тикеты AGIL-190)
- PDF — печать веб-страницы, A4, артефакт «N/226», нет outline/закладок
- EPUB — хардкод Times, нужен EPUBCheck
- Веб — Hextra (тема под документацию, узкая мера). Нужны сноски через нативный Hugo `[^1]` + popover

### PREFACE-razbor-paterny-serii.md
- 12 паттернов серии: YAML 18 полей, Preface/Summary блок, H2/H3 без H1, сноски верхним индексом, курсивная подпись личным именем, регистр академически-серьёзный
- Открытие про подпись: «Команданте FolkUp» = бренд-нарратив для обложки. Личное имя = академическая атрибуция внутри книги. Сосуществуют (Харари у Sapiens). **Снимает ложную развилку.**
- 10 слотов для финализации

### RESEARCH-publishing-and-design.md
- Слой 1 типографика: антиква для печати (Garamond/Caslon/Baskerville/Minion Pro)
- Слой 2 четыре модели публикации: традиционное издательство / коммерческое за счёт автора (1-2 млн ₽) / типография под видом издательства / самиздат (Ridero/Литрес)
- Главное препятствие — CC BY-SA: «классическая модель не подходит»
- Гибридная модель: собственный сайт + EPUB/PDF + Internet Archive + Ridero/типография
- Слой 3 кто работает с CC: НЕ работают (АСТ/Эксмо/МИФ) / могут (НЛО/ВШЭ) / прямо работают (Wikimedia Press, Open Book Publishers, punctum books, Lever Press, Ubiquity Press)
- Русскоязычная диаспора: Freedom Letters / Vidim Books / shell (f) / БукМания / Berlin Book Fair
- Топ-3 адресатов: Freedom Letters → Vidim Books → shell (f)

### SVODKA-v21-dlya-Alisy.md
- Главное решение сессии: Андрей выбрал путь Б — собственный MCP-сервер вокруг Git Bridge для моста Иви↔Алиса
- Блокирующий риск №1: remote MCP подключается из облака Anthropic → MCP endpoint обязан быть публичным (TLS+OAuth)
- D6/D9 ЗАКРЫТЫ
- Просьба Алисе: ⭐ настроить приём почты на books@folkup.app — инфраструктурный блокер

### ZAPISKA-litsenzii-seriya.md
- Расхождение лицензий: Согласные = CC BY-SA 4.0, Agile = CC BY 4.0, Lucerna = CC BY-SA 4.0 (TBV)
- Юридические пункты на проверку: необратимость CC, направление BY→BY-SA допустимо, совместимость SA-версий
- Рекомендация: Согласные твёрдо BY-SA. Серию выравнивать после проверки.

### Standalone — ФОРНИТ-Фрида-паспорт-С25.md
- Книжная маска ≠ рабочее имя
- Фрида профиль: старая коллега Джонни, профессиональный иллюстратор, испанский колорит, страстная вне дела/кремень в деле, сальса, ревнива
- Связка Алиса+Фрида в интермедиях кн.2: N→Юля Мёбиус
- Сравнение с нашим Frida SKILL.md: совпадает по визуальной роли, дополняет литературной маской

### ПАМЯТЬ-Иви.md (147 KB, частично)
- Структура: A Метод / B Воздух и стиль / C Аппарат / D Конкуренты / E Процесс / F Контекст проектов
- Метод-актив: верификация ДО аргумента, атрибуция, чистка AI-паттернов
- Голос Команданте: КНИЖНЫЙ и ПУБЛИЧНЫЙ = регистры одного голоса
- 2-я трилогия: кн.1 «Где живёт новое» RC, кн.2 «Чужими руками» планирование, кн.3 «Разоблачение» планирование
- Брендбук Иви считает: канон голосов — Команданте, Дэн, 5 форнитов (Алиса, КиберГонзо, Купер, Фонарщик, Лев)
- **«Джонни» среди форнитов брендбука НЕТ → BL-INF-09**
- Кредо Команданте: мерило = качество, конструктивная критика, верификация, достойная планка

### БЭКЛОГ-FolkUp.md (81 KB, частично)
**11 проектных кодов Иви:**
- GZN (кн.1 в работе) · CHR (кн.2) · RZB (кн.3)
- SOG (Согласные RC) · GOR (Город RC) · AGS (Agile RC)
- DEC (Декларация) · GID (Гайд подросткам)
- INF (инфра) · MTD (метод/канон) · ART (цикл статей)

Горячее за Алисой/инфрой:
- BL-INF-01: мост Иви↔Алиса (MCP путь B) BLOCKED — Кочегар 18-22ч
- BL-INF-02: deploy sapiens.folkup.life (CI 2 reruns fail) BLOCKED
- BL-INF-05: индексация сайтов FolkUp — Андрей дал решение «индексировать публичное, скрыть служебное»
- BL-INF-07: брендбук v2.5 SVEDENO

ART цикл статей — новый формат С24. ~10 статей. Статья №1 «Джаз как опен-сорс» готова, ждёт Фриду + Печкина.

Errata `books@folkup.app` = блокер для всех релизов.

### ПРОБА-интермедия-N-Юля-С26.md
- Первая проба связки масок кн.2
- N (Алиса) → Юля (Фрида) Мёбиус
- 4 флажка Андрею: испанский колорит, финал «но всё-таки слой», ингалятор-вольность, порядок интермедия→глава

---

## Cross-cutting decisions Иви (С21-С26)

1. **Книжная серия = частично isolated** от общего экосистемного брендстиля
2. **Claude Design = umbrella** для финального визуального канона ВСЕХ проектов
3. **Книжные маски ≠ рабочие имена** (С25 решение)
4. **Подпись двухслойная (С23):** обложка «Команданте FolkUp», внутри «Андрей Клеменчёнок»
5. **Лицензии разные пока:** Согласные BY-SA, Agile BY, Город BY-NC-ND. Выравнивание после Льва
6. **Мост Иви↔Алиса = MCP путь Б** (С21). Блокирующий риск проверяет КиберГонзо
7. **Errata books@folkup.app = реальная почта** к первой публикации
8. **Голос Команданте = модель Бэнкси** (анонимность лица ≠ безличность голоса)

---

## Open questions к Андрею (consolidated, 12 пунктов)

1. Имена книжных масок Алисы/Фриды для кн.2 (FRIDA line 35) — Алиса = Науменко+Кэрролл; иллюстратор — живопись/графика + испанский колорит
2. Шрифт печати в Claude Design (D6 долг): EB Garamond / Literata / PT Serif / другой
3. Тон bordeaux в Claude Design (D9 потенциальный пересмотр): остаться на `#7D4450` или более насыщенный
4. Подпись Согласных и Города Солнца — личное имя или псевдоним. Уже С23 решено dual-форма
5. Выравнивание лицензий серии под BY-SA после вердикта Льва (BL-INF-04)
6. Поддомен Согласных на `*.folkup.life` (например `soglasnye.folkup.life`)
7. Trim size печатного Agile (130×200 / 150×210 / иное)
8. Изменения «Согласные»: B7 vs A (мелкие правки вычитки)
9. Художественные вольности Юли в интермедиях (проба С26 флажки A-D)
10. Передача push-доступа Иви к книжным репо (BL-INF-01) ИЛИ держать «Иви правит → Алиса коммитит»
11. Алиса/инфра действия по индексации сайтов FolkUp (BL-INF-05) — допустить ClaudeBot или только Google
12. Где разместить «Джонни» в брендбуке — пока его НЕТ среди 5 канонических форнитов брендбука (BL-INF-09)

---

## Workflow рекомендуемый (Иви + Архивариус синтез)

### Сегодня (на вечер)
1. Положить `/brand/DESIGN.md` в репо с HEX Palette D и шрифтами
2. Положить `/CLAUDE.md` в корень репо: стек, конвенции, запреты, команды тестов
3. Запустить онбординг Claude Design — Create new design system → дать ссылку на репо ИЛИ загрузить DESIGN.md. Выверить 5 промптами из INSTRUKCIYA

### В первой полной сессии Claude Design
4. Сгенерить обложку «Согласных» (готовый промпт 1 в BRIEF lines 97-126)
5. Handoff to Claude Code → Алиса забирает бандл → реализует
6. PR к `/brand/DESIGN.md` = это и есть «обмен данными из консоли»: git pull/push, ревью, история

### Параллельно (Алиса/инфра)
7. Разблокировать BL-INF-01 (мост MCP) — статус-апдейт от Кочегара
8. Поднять `books@folkup.app` (BL-INF-09 errata) до публикации первой книги
9. Свести брендбук v2.5 публичный с эталоном (BL-INF-07/08 уже DONE С24)
10. Решение по индексации (BL-INF-05) — список публично-индексируемого Андрею на сверку

---

## Knowledge gaps (что НЕ нашлось)

1. Точные имена книжных масок для кн.2 — ждут от Андрея
2. Финальный список фирменных цифровых тем для folkup.app + проектов
3. Trim size + кириллица в Playfair Display капитель
4. Полный список значений `status` и `confidence` в YAML
5. Структура `apparatus/sources.md / predmetnyy-ukazatel.md / slovar-terminov.md` — закрыто Алисой в B1 С21, но конкретные format-решения не вычленены
6. Чистый текст аннотации Agile — нужен как референс длины/тона
7. Лицензия Lucerna — TBV
8. Скриншот Hetzner Console / актуальный полный список приватных репо

---

## Recommendation Алисе

**Стратегический приоритет:** разблокировать **BL-INF-01** (мост MCP Иви↔Алиса) и **BL-INF-09** (`books@folkup.app`) — это два главных инфра-блокера. Параллельно — запустить онбординг Claude Design по готовой 5-промптовой инструкции Иви.

**Тактика:** держать DESIGN.md + CLAUDE.md как мост-контракт в git (не строить кастомный сервер как INF-01), использовать handoff-бандл только для разовой передачи макетов в код.

**Ключевые файлы для Андрея завтра при priority walk:**
- `vault/contexts/INSTRUKCIYA-claude-design-onboarding.md` — главный operational doc (canonical)
- `C:\Users\ankle\AppData\Local\Temp\ivi-design-package\02-МОСТ-консоль-Claude-Design-С26.md` — главный архитектурный документ
- `C:\Users\ankle\AppData\Local\Temp\ivi-design-package\KANON-SERII-folkup.md` — точные HEX + шрифты + рамка v21
- `C:\Users\ankle\AppData\Local\Temp\ivi-design-package\SHABLON-SERII-v0.md` — структура серии
- `C:\Users\ankle\AppData\Local\Temp\ivi-design-package\BRIEF-oblozhka.md` — 3 готовых промпта обложек
- `C:\Users\ankle\AppData\Local\Temp\ivi-design-package\SVODKA-v21-dlya-Alisy.md` — что Иви ждёт от нас
- `C:\Users\ankle\AppData\Local\Temp\ivi-s27-extract\БЭКЛОГ-FolkUp.md` — единый журнал Иви parallel к нашему vault/BACKLOG.yaml

---

**Report compiled:** 2026-06-07 by Архивариус (V-batch parallel agent #1).
**Methodology:** Lesson #42 primary-source quotes с line numbers; читала full files (не TOC-only) где size ≤ 41 KB; partial reads (TOC + key sections) для 81 KB БЭКЛОГ + 147 KB ПАМЯТЬ.
**Lesson #51 verify applied:** все references — incoming Ивины files через `agile-sapiens/tmp/from-ivi/` + Downloads + Telegram.
**Anti-busy-work check PASS:** structured synthesis с actionable workflow + open questions для Андрея.
