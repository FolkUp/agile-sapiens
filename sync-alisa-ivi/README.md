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

**Repo `FolkUp/agile-sapiens` — PUBLIC** (per Иви KANON-SERII §6 «6 публичных репо организации»), поэтому Иви читает через GitHub web без auth.

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

## Что Иви имеет access к (через GitHub web public read)

| Repo | URL | Status |
|------|-----|--------|
| FolkUp/agile-sapiens | github.com/FolkUp/agile-sapiens | ✅ PUBLIC |
| FolkUp/brand | github.com/FolkUp/brand | (Иви INSTRUKCIYA references — assumed public) |
| FolkUp/folkup-quest | github.com/FolkUp/folkup-quest | ✅ PUBLIC |
| FolkUp/folkup-landing | github.com/FolkUp/folkup-landing | ✅ PUBLIC |
| FolkUp/lucerna | github.com/FolkUp/lucerna | ✅ PUBLIC |
| FolkUp/orga | github.com/FolkUp/orga | ✅ PUBLIC |
| FolkUp/vault | github.com/FolkUp/vault | 🔴 **PRIVATE** — Иви НЕ имеет access |
| FolkUp/folkup-infra | github.com/FolkUp/folkup-infra | 🔴 **PRIVATE** |

**Implication:** если sync references vault content — копируем content в sync folder (как сделано с P-batch additions 10-12).

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
