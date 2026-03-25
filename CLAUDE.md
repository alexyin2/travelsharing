# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TravelSharing is a bilingual (Chinese/English) travel attraction guide for Norway, built with React + Vite and backed by Sanity CMS. It displays attractions with filtering by region, type, and search, presented in a card-based UI.

## Commands

- `npm run dev` — start dev server with HMR
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run preview` — preview production build

## Architecture

Single-page React app (no routing). All UI lives in `src/App.jsx` as one component.

**Data flow:** Sanity CMS → `src/lib/sanityClient.js` (client config) → `src/lib/queries.js` (GROQ queries) → `src/hooks/useSanityData.js` (React hook) → `App.jsx`

**Sanity document types:** `attraction`, `region`, `transportRoute`

**Environment variables** (required in `.env`):
- `VITE_SANITY_PROJECT_ID` — Sanity project ID
- `VITE_SANITY_DATASET` — dataset name (defaults to `production`)

## Key Conventions

- Bilingual fields use `nameZh`/`nameEn`, `descriptionZh`/`descriptionEn` suffixes
- Attraction types are keyed as snake_case strings (e.g., `aurora_spot`, `day_trip`) with Chinese labels and color mappings defined in `App.jsx`
- CSS is plain CSS (`src/App.css`, `src/index.css`), no CSS framework
- ESLint rule: unused vars starting with uppercase or `_` are allowed (`varsIgnorePattern: '^[A-Z_]'`)
