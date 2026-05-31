# CLAUDE.md — agile-sapiens

<!-- precommit:allow-ai-mentions -->

Project context for sessions. Keep terse.

## Vault access (per Кочегар always-on owner)

Sops auto-discovers age key at `%APPDATA%\sops\age\keys.txt` on Windows. **No env var setup needed.**

### 30-second health-check (run first thing in new session)

```bash
sops -d /c/JOHNDOE_CLAUDE/vault/secrets/maya-bot.enc.yaml >/dev/null 2>&1 \
  && echo "PASS: vault decrypt operational (v2 key)" \
  || echo "FAIL: see vault/SECRETS-RECOVERY.md"
```

If PASS → sops + age работают, можно работать с vault.
If FAIL → see `vault/SECRETS-RECOVERY.md`.

### Canonical tokens registry (cross-project, all sessions)

**SoT:** `C:\JOHNDOE_CLAUDE\vault\TOKENS-REGISTRY.md` — per-token state, Cooper-safe re-encryption pattern, onboarding ritual. Global rule `~/.claude/rules/vault-tokens-registry.md` ensures every future session loads this knowledge automatically.

### Replicate token (для gen-chapter-plate / gen-gs-viz)

Live under v2 key (re-encrypted 2026-05-31, INC-001 follow-up). Quick health-check:

```bash
sops -d --extract '["replicate"]["api_token"]' /c/JOHNDOE_CLAUDE/vault/secrets/replicate.enc.yaml >/dev/null 2>&1 \
  && echo "PASS: replicate token live" \
  || echo "FAIL: re-encrypt under v2 (see vault/TOKENS-REGISTRY.md)"
```

Usage в скриптах (одной строкой, no env var leak):
```bash
REPLICATE_API_TOKEN="$(sops -d --extract '["replicate"]["api_token"]' /c/JOHNDOE_CLAUDE/vault/secrets/replicate.enc.yaml)" node scripts/gen-gs-viz.cjs all 3
```

### Known dead vault files (INC-001, 2026-05-20)

**v1 recipient `age100aungn0...` PRIVATE KEY LOST.** 35 файлов unrecoverable.
**v2 recipient `age1ql880nmmh...` current key**, 6 файлов live.

Check which key file uses: `grep recipient vault/secrets/FILE.enc.yaml`

When working with vault — **проверь memory first**: `feedback-inc001-v1-secrets-permanently-dead.md` lists known dead patterns. Re-issue from source provider, не trying to recover.

## Project conventions

- **D6 шрифт frozen** — НЕ трогать `scripts/epub-generator.sh:68` + `scripts/pdf-generator.js:152` до lawyer-decision (Times placeholder)
- **BACKLOG.yaml** = local-only by **convention** (not constraint — file is git-tracked, on origin/main since `47bf81b`). Docs-only BACKLOG commits не пушим по соглашению
- **Pre-push hook** = `scripts/constitutional-hooks-simple.ps1` — phantom-msg + secret scan, не блокирует BACKLOG by path
- **Replicate generation** — use `scripts/gen-chapter-plate.cjs` (AGIL-079/190 pattern) или `scripts/gen-gs-viz.cjs` (GS-VIZ pattern). НЕ composing parallel architecture — Lesson #102.

## Forniti always-on (per durable feedback 2026-05-30)

- **Гутенберг** (`/gutenberg`) — book projects planning + post-batch review (трилогия)
- **Кочегар** (`/kochegar`) — infrastructure access (sops/age/tokens/SSH/docker), one-time setup для всех FolkUp проектов

## Key docs

- `vault/README.md` — vault overview
- `vault/SECRETS-RECOVERY.md` — recovery runbook
- `vault/secrets/RECOVERY.md` — age key recovery details
- `BACKLOG.yaml` — active project state + lessons learned
- `PROJECT_CONTEXT.md` — book project context
- Memory: `~/.claude/projects/C--JOHNDOE-CLAUDE-agile-sapiens/memory/` — session reflections + feedbacks
