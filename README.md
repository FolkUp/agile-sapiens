# Agile Sapiens · Литературный бизнес-анализ

[![License MIT (code)](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![License CC BY-SA 4.0 (content)](https://img.shields.io/badge/content-CC%20BY--SA%204.0-green.svg)](LICENSE-CONTENT)
[![Site](https://img.shields.io/badge/live-books.folkup.life%2Fkn1-blue.svg)](https://books.folkup.life/kn1/)

**Монография о том, как литература XIX–XX веков предсказала современный менеджмент. Verne, Shelley, Conan Doyle, Borges, the Strugatsky brothers — каждый автор диагностировал управленческие патологии за 50–100 лет до появления consulting industry.**

## About

Книга родилась из вопроса: почему великие писатели раньше HR-консультантов увидели дисфункции команд, ловушки лидерства, парадоксы делегирования?

Одиннадцать глав (0–10), три интермедии, послесловие «Одиннадцать линз», аппарат. Каждая глава читается как эссе и может собираться в диагностический toolkit для практикующего менеджера.

Первое издание — 2026, LIVE at [books.folkup.life/kn1/](https://books.folkup.life/kn1/). Deep URLs preserved via 301 redirect от `sapiens.folkup.life`. CC BY-SA 4.0 — читай, цитируй, распространяй под тем же лицензионным режимом.

Автор — Команданте FolkUp (Команданте FolkUp is a literary pseudonym; legal identification and AI-use disclosure: [books.folkup.life/ai-disclosure](https://books.folkup.life/ai-disclosure)).

## Contents

- **Одиннадцать глав (0–10)** — по одному литературному произведению-линзе + разбор parallel modern management case (глава 6 в двух частях)
- **Три интермедии** — короткие мосты между актами (Origins → Present → Future)
- **Preface + Afterword** — послесловие «Одиннадцать линз» concept toolkit
- **Apparatus** — библиография, глоссарий терминов, предметный указатель, colophon, acknowledgments
- **Formats** — EPUB + PDF (доступны в `formats/` + опубликованы на `books.folkup.life/kn1/downloads/`)

## Development

Static site (Hugo Hextra theme). Русскоязычный контент, RU-primary policy.

```bash
hugo server -D                 # local dev
hugo --minify                  # production build
scripts/epub-generator.sh      # regenerate EPUB
node scripts/pdf-generator.js  # regenerate PDF (Puppeteer full asset)
```

## Repository layout

```
agile-sapiens/
├── content/
│   ├── chapters/**           # 11 глав + intermezzi
│   ├── apparatus/**          # bibliography / glossary / index / colophon
│   ├── preface.md
│   ├── afterword.md
│   └── legal/**              # privacy / terms / cookies
├── formats/                  # source EPUB / PDF generation output
├── static/downloads/         # published EPUB / PDF versions (historical + current)
├── assets/images/            # chapter plates, cover art
├── layouts/                  # Hugo Hextra customizations
├── scripts/                  # epub-generator.sh, pdf-generator.js, build tooling
├── data/                     # site data files
├── hugo.toml
└── README.md
```

## Related projects (FolkUp Ecosystem)

- [folkup-books-portal](https://github.com/FolkUp/folkup-books-portal) — portal семикнижной серии, где эта монография = kn.1
- [orga (underground.folkup.life)](https://github.com/FolkUp/orga) — longform research + essay platform
- [folkup-landing](https://github.com/FolkUp/folkup-landing) — FolkUp ecosystem entry point

Full ecosystem map: [folkup.app](https://folkup.app).

## Licensing

Dual-licensed following the FolkUp ecosystem canon:

- **Code (build scripts, Hugo layouts, generators, config)** — MIT.
  See [`LICENSE`](./LICENSE).
- **Content (chapters, apparatus, preface, afterword, intermezzi, illustrations, compiled EPUB/PDF)** —
  Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
  See [`LICENSE-CONTENT`](./LICENSE-CONTENT).

Attribution format for CC BY-SA content:

> «Chapter/Article Title» by Команданте FolkUp, licensed under CC BY-SA 4.0.
> Source: https://github.com/FolkUp/agile-sapiens/blob/main/content/<path>
> Modifications: [describe if any].

Content license history: previously CC BY 4.0, relicensed к CC BY-SA 4.0 on 2026-06-25 (все книги серии под единым copyleft standard). Prior recipients of v1.0.9 (LIVE since 2026-06-22) retain CC BY 4.0 rights per CC license irrevocability (creativecommons.org/faq).

Copyright infringement notices → [`DMCA.md`](./DMCA.md) (GitHub referral +
direct contact `info@folkup.app`, subject: DMCA).

## Contributing

Pull requests welcomed. Content edits: DCO Signed-off-by required. Code contributions: same. See `CONTRIBUTING.md` when opening.

## Contact

- Editorial / content: `info@folkup.app`
- DMCA / copyright: `info@folkup.app` (subject: DMCA) — see [`DMCA.md`](./DMCA.md)
- Publisher: Команданте FolkUp / FolkUp Ecosystem

---

**© 2026 Команданте FolkUp · Publisher: FolkUp Ecosystem · Content CC BY-SA 4.0 · Code MIT**
