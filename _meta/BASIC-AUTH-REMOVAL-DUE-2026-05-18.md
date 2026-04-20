# Basic Auth Removal — Scheduled 2026-05-18

**Soft launch window:** 2026-04-20 → 2026-05-18 (4 weeks)
**Domain:** sapiens.folkup.life

## What to remove when window ends

### 1. agile-sapiens repo

Flip softLaunch flag in both configs:

```toml
# hugo.toml line ~8
[params.launch]
softLaunch = false  # was: true

# hugo.ru.toml line ~16
[params.launch]
softLaunch = false  # was: true
```

Impact:
- `layouts/robots.txt` template switches from `Disallow: /` to `Allow: /` + Sitemap
- `layouts/partials/custom/head-end.html` stops emitting `<meta name="robots" content="noindex, nofollow">`

### 2. folkup-infra repo

Remove Basic Auth from `docker/nginx-sapiens.conf`:

```nginx
# Remove these directives from `location /` and static asset block:
auth_basic "AGILE SAPIENS — soft launch preview";
auth_basic_user_file /etc/nginx/htpasswd;

# limit_req_zone and limit_req can stay (general rate limiting still good)
# ACME exception location stays
```

Then re-apply:
```bash
# GitHub Actions dispatch: apply.yaml → component=docker, stack=agile-sapiens, dry_run=false
```

### 3. GitHub Secrets cleanup (optional)

In `FolkUp/agile-sapiens` repo Settings → Secrets:
- `PREVIEW_USER` and `PREVIEW_PASS` — can be removed (workflow smoke-test will fall back to HSTS header check)

### 4. Post-removal verification

```bash
# Expect 200 without credentials
curl -I https://sapiens.folkup.life/

# Expect Allow: / in robots.txt
curl https://sapiens.folkup.life/robots.txt

# Expect no noindex meta
curl -s https://sapiens.folkup.life/ | grep -i 'robots'
```

## Then: submit sitemap to search engines

- Google Search Console: add sapiens.folkup.life property, submit sitemap.xml
- Yandex Webmaster: same
- (Not before removal — noindex would confuse signals)

## Who owns

Андрей. Alice reminds on next session after 2026-05-18.

## Related

- Initial soft launch: PR #2 in agile-sapiens + PR #5 in folkup-infra (merged 2026-04-20)
- Password file: `C:\Transit\sapiens-basic-auth-20260420_040939.txt`
- Rotation policy: rotate password after public launch regardless of leak suspicion
