# Nikhil's Kitchen — Cafe Website

A React + TypeScript + Vite website for Nikhil's Kitchen Pav Bhaji & Cafe in Ravet, Pune.

## Getting Started

### 1. Environment Variables

Copy the example env file and fill in your Supabase credentials:

```sh
cp .env.example .env.local
```

Edit `.env.local`:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Never commit `.env.local` or any file containing real credentials.

### 2. Production Domain

Before deploying, replace the `YOUR_DOMAIN` placeholder in `index.html` with your actual production domain. Search for `YOUR_DOMAIN` in that file and update:
- The `<link rel="canonical">` tag
- Open Graph `og:url` and `og:image` meta tags
- Twitter Card `twitter:image` meta tag
- The JSON-LD structured data `url` and `hasMap` fields

Also add a `1200×630` Open Graph image at `public/og-image.jpg`.

### 3. Install and Run

```sh
npm install
npm run dev
```

### 4. Build

```sh
npm run build
```

### 5. Lint

```sh
npm run lint
```

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Supabase (database + auth for admin panel)
- React Router v7

