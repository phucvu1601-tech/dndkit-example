# RR7 Biome Starter

A minimal React Router 7 starter with essential tooling preconfigured for a clean development workflow.

## Stack

- React Router v7
- TypeScript + Vite
- Biome
- EditorConfig
- Commitlint + Lefthook
- shadcn/ui + setup theme

## Setup

### 1. Init React Router

This project is built with React Router 7 and Vite using the app folder structure.

### 2. Biome

Linting, formatting, and quality checks are handled by Biome:

- `biome.json`

Biome provides a fast, unified toolchain for linting and formatting across the repo.

### 3. EditorConfig

Editor-level formatting rules are defined in `.editorconfig`.

Ensures consistent indentation, line endings, and encoding across editors.

### 4. Commitlint + Lefthook

Commit messages follow Conventional Commits.

- `commitlint.config.mjs`
- `lefthook.yml`

Git hooks run checks before committing.

Example:

```bash
feat: add home route
fix: update theme selector
chore: upgrade dependencies
```

### 5. shadcn/ui + theme switching

UI components are built with `shadcn/ui`, and theme switching is handled by a custom provider.

- `app/shared/components/providers/theme-provider.tsx`
- `app/shared/components/header/theme-selector.tsx`

## Project Structure

```text
.
├── app/
│   ├── app.css
│   ├── root.tsx
│   ├── routes.ts
│   ├── features/home/
│   │   ├── assets/
│   │   └── components/home.tsx
│   └── shared/
│       ├── components/header/theme-selector.tsx
│       ├── components/providers/theme-provider.tsx
│       └── ui/
├── public/
├── biome.json
├── commitlint.config.mjs
├── lefthook.yml
├── .editorconfig
├── package.json
├── tsconfig.json
├── vite.config.ts
└── Dockerfile
```

## 🚀 Quick Start

You can start your project using one of the following "flavors" (branches):

- `main`: Minimal setup (Standard).
- `feat/i18n`: Main + Multi-language configuration.

Pick one of the following options to get started:

### Option 1 — Use this template ⭐ (Recommended)

Click **"Use this template"** on GitHub to create a new repo on your account — no commit history included.

### Option 2 — Clone by branch

```bash
# Clone the default branch
git clone https://github.com/phucvu1601-tech/rr7-biome-starter.git

# Or clone a specific branch
git clone -b <branch-name> https://github.com/phucvu1601-tech/rr7-biome-starter.git
```

### Option 3 — Download ZIP by branch

Go to the repo on GitHub → select a branch → click **Code** → **Download ZIP**.

---

### Then run:

```bash
# Skip this if you used Option 1
git init

npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and you're good to go. 🎉
