# Bagco Website

## Overview
A modern, professional website for Bagco - a paper bag manufacturing business. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Project Architecture
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Structure**:
  - `app/` - Next.js App Router pages (home, about, catalog, gallery, contact)
  - `components/` - Shared components (Navbar, Footer)
  - `public/` - Static assets (catalog images, gallery images)

## Development
- Dev server: `npm run dev` (binds to 0.0.0.0:5000)
- Build: `npm run build`
- Production: `npm run start`

## Deployment
- Target: Autoscale
- Build command: `npm run build`
- Run command: `npm run start`
