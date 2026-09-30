# Isaac S. — Portfolio

Public dossier for Isaac S. ([GitHub](https://github.com/Revo445)). Static HTML, CSS, and a small script. No build step, no backend.

The page is a case file: floor ops → NetSuite / UFSP → AI red team. It is meant for junior AI red team and offensive security roles.

## Run locally

From the repo root:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000.

Fonts are self-hosted (Space Grotesk, IBM Plex Sans, JetBrains Mono; SIL Open Font License, see `fonts/licenses/`). Nothing is fetched from a font CDN.

## GitHub Pages

The site is the repo root (`index.html`, `styles.css`, `app.js`, `fonts/`, `favicon.svg`). `.nojekyll` is present so Pages serves the files as-is.

Use one source, not both.

### Actions (workflow included)

1. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Merge to `main`. `.github/workflows/pages.yml` publishes the repository root.

### Branch

1. Settings → Pages → Deploy from a branch.
2. Branch: `main`, folder: `/` (root).
3. Leave the Actions source off if you use this path.

## What’s on the page

- Career arc filters the case file by era: `floor`, `erp`, `redteam`.
- Each case expands in place (Case notes). No separate blog.
- Availability is a static flag in `app.js`: `available: true` shows a mint “Available for red-team roles”. Set it to `false` for a coral “Engaged”.

## What’s left

- Replace the three enterprise placeholders with sanitized screenshots (NetSuite, SuiteScript, UniFi). Do not commit confidential UI.
- Add a repository link on each case once those repos are public. None are linked yet except the GitHub profile and hauntstack.xyz, which is named in the source copy.
- Add Gray Swan proof and write-ups.
- Add a public email on the contact line if you want one. The draft has no email; GitHub is the only contact.
