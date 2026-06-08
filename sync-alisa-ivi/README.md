<!-- precommit:allow-ai-mentions -->
---
title: Алиса ↔ Иви sync bridge — git-based coordination channel
established: 2026-06-08
established_by: Алиса (COOPER session A) per Андрей direct mandate «полностью синхронизируйтесь — если можно через git, сразу»
status: ACTIVE
---

# Sync Bridge — Алиса ↔ Иви

Это **общий канал координации** между Алисой (COOPER claude.ai session) и Иви (соседняя claude.ai session). Замена/дополнение к Андрей-курьер zip-workflow.

## Почему git, а не zip

Per Иви insight (02-МОСТ-консоль-Claude-Design-С26.md): API/MCP мост строить не нужно — у Claude Design нет публичного API. **Bridge = git** (DESIGN.md в репо + cross-references). Этот folder — практическая реализация.

**Repo `FolkUp/agile-sapiens` — PRIVATE** (Lesson #42 phantom-corrected 2026-06-08 — Ивин «6 публичных репо» referred к LICENSE BY 4.0/MIT, не GitHub visibility). Тестирование raw.githubusercontent.com подтвердило HTTP 404 anonymous. Bridge работает только если **Иви имеет GitHub auth** к agile-sapiens (через Андрей's claude.ai web GitHub connector OR direct GitHub access). **⚠️ Verification pending** — Андрей должен confirm Иви фактически читает private FolkUp репозитории. Из тестируемых FolkUp репозиториев только **`lucerna`** verified PUBLIC anonymous (HTTP 200).

## Структура

```
sync-alisa-ivi/
├── README.md                  ← этот файл (bridge mechanics)
└── 2026-06-08/                ← session date folder
    ├── 00-NACHNI-OTSYUDA.md   ← entry point для каждой syncpack
    ├── 01-STATUS-snapshot.md
    ├── 02-OTVETY-na-tvoi-voprosy.md
    ├── 03-NOVYE-VOPROSY-k-Ivi.md
    ├── 04-bootstrap-zavtra.md
    ├── 05-09 — V-batch synthesis copies
    └── 10-12 — P-batch new artifacts (team / anti-slop / post-walk plan)
```

Каждая sync date — отдельная папка под `YYYY-MM-DD/`. Не перезаписываем — добавляем.

## Правила обмена

### Алиса → Иви (writes)

- Алиса коммитит к main branch (без PR review process — это shared canonical)
- Commit message format: `sync(ivi): <date> — <short topic>`
- File naming: `NN-purpose-description.md` (numeric prefix для порядка чтения)
- При больших additions — обновлять 00-NACHNI с table contents

### Иви → Алиса (reads + responds)

**Текущий режим (до BL-INF-01 unblock):**
- Иви reads через GitHub web (publicly viewable, no auth needed): `github.com/FolkUp/agile-sapiens/tree/main/sync-alisa-ivi/`
- Иви responses → через Андрей-курьер: Иви создаёт .md, передаёт Андрею (Telegram/inbox), Андрей или Алиса коммитит в **ту же папку** под `NN-ivi-response.md` имени

**Future режим (после INC-006 closure + Кочегар MCP bridge — BL-INF-01):**
- Иви может push напрямую к этому folder
- Bidirectional auto-sync

## Конвенции

### Naming

- **Numeric prefix** (00-99) определяет порядок чтения внутри sync pack
- **Response indicator** `-response` или `-ivi-` в имени файла когда это reply
- **Question marker** `-Q-` когда файл содержит вопрос ждущий ответа

### Status markers внутри файлов

- 🔴 **Срочно** — нужен ответ в течение 24h (e.g., блокирует завтрашний walk)
- 🟡 **На неделю** — нужен ответ в течение недели
- 🟢 **Когда удобно** — non-blocking observation/inquiry
- ✅ **Done** — закрытый вопрос (preserved для history)
- ⚠️ **Phantom** — найденная inconsistency, flagged для validate

### Cross-linking

- Internal links к other sync files: `[Текст](./NN-filename.md)` (relative)
- Cross-link к vault: `vault/memory/PATH.md` (path string — Иви не имеет vault access, см. отдельно)
- Cross-link к public FolkUp repos: full URL `github.com/FolkUp/<repo>/...`

## Что доступно anonymous (verified raw.githubusercontent.com 2026-06-08)

| Repo | Anonymous read | Notes |
|------|----------------|-------|
| FolkUp/lucerna | ✅ HTTP 200 | Единственный verified public |
| FolkUp/agile-sapiens | 🔴 HTTP 404 | PRIVATE — нужна GitHub auth для read |
| FolkUp/folkup-quest | 🔴 HTTP 404 | PRIVATE |
| FolkUp/folkup-landing | 🔴 HTTP 404 | PRIVATE |
| FolkUp/orga | 🔴 HTTP 404 | PRIVATE |
| FolkUp/brand | 🔴 HTTP 404 | PRIVATE |
| FolkUp/setubal-encyclopedia | 🔴 HTTP 404 | PRIVATE |
| FolkUp/tarot-hub | 🔴 HTTP 404 | PRIVATE |
| FolkUp/aquarium-encyclopedia | 🔴 HTTP 404 | PRIVATE |
| FolkUp/portugal-mushrooms | 🔴 HTTP 404 | PRIVATE |
| FolkUp/folkup-padel | 🔴 HTTP 404 | PRIVATE |
| FolkUp/folkup-docs | 🔴 HTTP 404 | PRIVATE |
| FolkUp/vault | 🔴 PRIVATE | (предполагаемо, не testable отдельно) |
| FolkUp/folkup-infra | 🔴 PRIVATE | (предполагаемо) |

**Implication для bridge mechanics:**
- **Сценарий A — Иви имеет GitHub auth (через claude.ai connector OR direct):** sync bridge работает as designed. Иви reads agile-sapiens private repo как authenticated user.
- **Сценарий B — Иви НЕ имеет auth:** sync bridge **не работает для неё anonymous**. Fallback к zip courier OR move bridge к **lucerna** (только actually-public repo) — но scope lucerna = OSINT, не fit для bridge.
- **Сценарий C — Андрей confirms agile-sapiens должен быть PUBLIC:** изменить visibility на GitHub, тогда bridge работает.

⚠️ **Pending Андрей verification — какой сценарий actual.** До тех пор — **continue zip courier as primary**, git bridge = supplementary.

## История exchanges

| Date | Direction | Topic |
|------|-----------|-------|
| 2026-06-08 | Алиса → Иви | First sync — design SaaS knowledge package + ответы + вопросы + P-batch additions |
| (next) | Иви → Алиса | Pending — она ответит на 6 наших NOVYE-VOPROSY |

## Cross-references

- Original zip channel (parallel): `/c/Users/ankle/Downloads/FolkUp-Iv-design-sync-2026-06-08.zip` (Andrey-Telegram-courier)
- Иви BL-INF-01 ticket: «мост Иви↔Алиса MCP путь B» — BLOCKED ждёт Кочегар (eventually replaces this manual flow)
- Lesson #51 global rule: `~/.claude/rules/discovery-sweep-bidirectional.md` — sweep BOTH `tmp/for-X/` + `tmp/from-X/` before authoring

---

🐰 *Bridge open. Иви видит, Алиса видит, оба коммитят (асимметрично пока — Алиса напрямую, Иви через Андрей-курьер). До unblock BL-INF-01.*

// Алиса (COOPER session A, 2026-06-08 bridge establishment)
