# 🚀 GitHub Upload Guide — ROTIS Web App

> **Project:** ROTIS — Rotis Tech (Private) Limited
> **Developed by:** dotwasi | **CEO & Owner:** Usman Yaseen

A complete, step-by-step guide to publishing this web application to GitHub — from zero to a live repository — plus how to keep it updated and connect it to Netlify.

---

## Table of Contents

1. [What is GitHub (in 30 seconds)](#1-what-is-github-in-30-seconds)
2. [Prerequisites](#2-prerequisites)
3. [One-time Git setup](#3-one-time-git-setup)
4. [Step 1 — Verify the local repository](#4-step-1--verify-the-local-repository)
5. [Step 2 — Create the repository on GitHub](#5-step-2--create-the-repository-on-github)
6. [Step 3 — Connect and push](#6-step-3--connect-and-push)
7. [Alternative: GitHub CLI (fastest)](#7-alternative-github-cli-fastest)
8. [Alternative: GitHub Desktop (no commands)](#8-alternative-github-desktop-no-commands)
9. [Everyday workflow — updating the repo](#9-everyday-workflow--updating-the-repo)
10. [Connecting GitHub to Netlify (auto-deploy)](#10-connecting-github-to-netlify-auto-deploy)
11. [Important: secrets & what NOT to upload](#11-important-secrets--what-not-to-upload)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. What is GitHub (in 30 seconds)

- **Git** is a version-control system that tracks every change to your code locally.
- **GitHub** is a website that hosts your Git repository online, so it's backed up, shareable, and can trigger automatic deployments (e.g., Netlify).
- You **commit** changes locally, then **push** them to GitHub.

---

## 2. Prerequisites

| Tool | Check | Get it |
|---|---|---|
| Git | `git --version` | https://git-scm.com/downloads |
| GitHub account | — | https://github.com/signup |
| (Optional) GitHub CLI | `gh --version` | https://cli.github.com |
| (Optional) GitHub Desktop | — | https://desktop.github.com |

---

## 3. One-time Git setup

Tell Git who you are (used in commit history). Run once on your machine:

```bash
git config --global user.name "dotwasi"
git config --global user.email "dotwasi@gmail.com"
```

---

## 4. Step 1 — Verify the local repository

This project is **already a Git repository** with commit history. Open a terminal in the project folder and confirm:

```bash
cd F:\rotis-tech-website-main

git status          # should say "On branch main"
git log --oneline   # shows existing commits
```

If you ever start from a fresh copy without Git, initialize it with:

```bash
git init
git add .
git commit -m "Initial commit: ROTIS web app"
```

Before uploading, commit any pending changes (e.g., the new docs and file headers):

```bash
git add .
git commit -m "Add copyright headers and project documentation"
```

> ✅ `.gitignore` already excludes `node_modules/`, `dist/`, and `.env.local` — these should never be uploaded.

---

## 5. Step 2 — Create the repository on GitHub

1. Go to **https://github.com/new** (log in first).
2. Fill in:
   - **Repository name:** `rotis-tech-website` (or any name you like)
   - **Description:** `Official corporate website & portfolio of Rotis Tech (Private) Limited — AI-powered hospitality platform ROTIS`
   - **Visibility:** choose **Private** (recommended for proprietary code) or **Public**
3. ⚠️ **Do NOT check** "Add a README", ".gitignore", or "license" — the project already has all three, and adding them on GitHub would create conflicts.
4. Click **Create repository**.

GitHub now shows you a page with setup commands — you'll use the "push an existing repository" section, covered next.

---

## 6. Step 3 — Connect and push

In the project folder, link your local repo to GitHub and upload it (replace `<your-username>` with your GitHub username):

```bash
# 1. Add GitHub as the remote called "origin"
git remote add origin https://github.com/<your-username>/rotis-tech-website.git

# 2. Make sure the branch is named main
git branch -M main

# 3. Push everything to GitHub
git push -u origin main
```

**Authentication:** the first push opens a browser window (Git Credential Manager) — sign in to GitHub and approve. If you're asked for a password in the terminal instead, you must use a **Personal Access Token**, not your account password:
- Create one at **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token** with the `repo` scope, and paste it as the password.

🎉 **Done!** Refresh your GitHub repository page — all files, the README (rendered on the front page), and the docs are now online. Future pushes only need `git push`.

---

## 7. Alternative: GitHub CLI (fastest)

If you have the [GitHub CLI](https://cli.github.com) installed, steps 2 and 3 become two commands:

```bash
gh auth login                 # one-time login (choose GitHub.com → HTTPS → browser)

# Creates the repo on GitHub AND pushes in one step:
gh repo create rotis-tech-website --private --source=. --remote=origin --push
```

Use `--public` instead of `--private` for a public repository.

---

## 8. Alternative: GitHub Desktop (no commands)

1. Install [GitHub Desktop](https://desktop.github.com) and sign in.
2. **File → Add local repository** → select `F:\rotis-tech-website-main`.
3. Write a commit summary if there are pending changes → **Commit to main**.
4. Click **Publish repository** → choose the name and Private/Public → **Publish**.

---

## 9. Everyday workflow — updating the repo

After the initial upload, whenever you change the code:

```bash
git status                          # 1. See what changed
git add .                           # 2. Stage the changes
git commit -m "Describe the change" # 3. Commit with a clear message
git push                            # 4. Upload to GitHub
```

Good commit message examples:
- `Fix: WhatsApp button number updated`
- `Feature: add pricing section to RotisSolution page`
- `Docs: update deployment instructions`

To download changes made elsewhere (another machine / collaborator): `git pull`.

---

## 10. Connecting GitHub to Netlify (auto-deploy)

Once the repo is on GitHub, every push can automatically deploy the live site:

1. Log in at **https://app.netlify.com**.
2. **Add new site → Import an existing project → GitHub** → authorize → select `rotis-tech-website`.
3. Confirm the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. **Site settings → Environment variables** → add `VITE_GEMINI_API_KEY` with your Gemini key.
5. Click **Deploy site**.

From now on: `git push` → Netlify builds and publishes automatically. The contact and survey forms (Netlify Forms) work only on this Netlify deployment.

---

## 11. Important: secrets & what NOT to upload

| Item | Upload? | Why |
|---|---|---|
| `src/`, `public/`, configs, docs | ✅ Yes | The application itself |
| `.gitignore`, `README.md`, `LICENSE` | ✅ Yes | Repo hygiene |
| `node_modules/` | ❌ Never | Huge; recreated by `npm install` (already git-ignored) |
| `dist/` | ❌ No | Build output; Netlify rebuilds it (already git-ignored) |
| `.env.local` (API keys) | ❌ **NEVER** | Secret! Already git-ignored — keep it that way |

**If you ever accidentally commit an API key:** treat it as compromised. Revoke/regenerate the key at [Google AI Studio](https://aistudio.google.com/app/apikey) immediately — removing it from a later commit does not erase it from history.

> Note: files in `public/documents/` (CV, certificates, transcripts) will be publicly downloadable if the repo — or the deployed site — is public. Keep the repo **Private** if that matters.

---

## 12. Troubleshooting

| Error / Problem | Fix |
|---|---|
| `remote origin already exists` | The remote is already set. Check it with `git remote -v`; change it with `git remote set-url origin <new-url>`. |
| `Authentication failed` | Use a Personal Access Token instead of your password (see Step 3), or run `gh auth login`. |
| `Updates were rejected because the remote contains work you do not have` | You initialized the GitHub repo with a README/license. Run `git pull origin main --allow-unrelated-histories`, resolve, then push. Avoid by leaving the GitHub repo empty at creation. |
| `src refers to unknown ref` / wrong branch name | Run `git branch -M main` before pushing. |
| Push is very slow / huge | You're probably committing `node_modules` — confirm `.gitignore` contains it and run `git rm -r --cached node_modules` if it was ever added. |
| Repo shows no README on front page | The file must be named exactly `README.md` in the repo root (it is). |

---

**Copyright © 2026 Rotis Tech (Private) Limited. All Rights Reserved.**
*Project ROTIS — Developed by dotwasi — CEO & Owner: Usman Yaseen*
