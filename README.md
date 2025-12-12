# Trade App – User Management & Dashboard (React + TypeScript)

A modern React + TypeScript application built with Vite. It provides a user management interface (list, search, filter, sort, paginate, bulk actions) and a dashboard with basic analytics. The app uses a mock API/data service, so it runs entirely in the browser with no backend required.

## Highlights

- No login required (authentication removed for simplicity)
- User Management: CRUD, bulk actions, search, filter by role/status, sorting, pagination
- Dashboard: quick stats and charts
- Fast dev environment and lightweight state management

## Tech Stack

- React 18 + TypeScript
- Vite (dev/build)
- Tailwind CSS (styling)
- Zustand (state management)
- React Hook Form + Zod (forms and validation)
- TanStack Table (data table)
- Chart.js (charts)
- Lucide React (icons)

## Quick Start

Prerequisites: Node.js 18+ and npm

1) Install dependencies
```
npm install
```

2) Start the development server
```
npm run dev
```
- The console will print the local URL (e.g., http://localhost:5174/ if 5173 is in use).

3) Build and preview a production build
```
npm run build
npm run preview
```
- Preview runs a local server serving the dist folder.

## Available Scripts

- dev: start Vite development server
- build: type-check and build for production
- preview: serve the production build
- lint: run ESLint
- check: TypeScript type-check (no emit)

## Project Structure (simplified)

```
trade-app/
├─ src/
│  ├─ components/       # Reusable UI components
│  ├─ pages/            # Route-level components (UserManagement, UserForm, Dashboard, etc.)
│  ├─ services/         # Mock API and data utilities
│  ├─ stores/           # Zustand stores (e.g., userStore)
│  ├─ types/            # TypeScript types
│  └─ main.tsx, App.tsx # App bootstrap and routing
├─ public/              # Static assets (may include users.json for mock data)
├─ index.html           # Vite HTML entry
├─ package.json         # Scripts and dependencies
└─ vite.config.ts       # Vite configuration
```

## Configuration

- Default setup uses a mock API/data service and does not require environment variables.
- If you later integrate a real API, you can use environment variables like `VITE_API_BASE_URL`. For static deployments, keep using the mock data.

## Deployment

1) Build the app:
```
npm run build
```
2) Deploy the `dist/` folder to any static hosting provider (e.g., Vercel, Netlify, GitHub Pages, S3).
- Optional: a `vercel.json` is included to simplify static hosting on Vercel.

## Features Overview

User Management
- View users with pagination
- Search by name/email
- Filter by role and status
- Sort by supported columns
- Create, edit, delete users
- Bulk actions (activate/deactivate/delete)

Dashboard
- Summary statistics and simple charts

Order Search (Planned)
- Designed to be added later. The UI and data layer are prepared for future extension.

## Pros & Cons

Pros
- Fast development cycle with Vite (instant HMR)
- TypeScript-first setup improves reliability and DX
- Clear modular structure (pages, components, stores, services)
- Lightweight state management using Zustand (simple and scalable)
- Form handling and validation with React Hook Form + Zod
- Tailwind CSS for rapid styling and consistent design
- Easily deployable to static hosts; minimal configuration needed

Cons
- Mock API only; no real backend integration by default
- Basic charting; advanced analytics may require additional setup
- Some features (e.g., Order Search) are planned, not fully implemented
- Limited authentication flows (intentionally simplified)
- Requires Node 18+; older environments need upgrades

## Troubleshooting

- Port already in use: Vite will automatically try another port and print it in the console.
- Node.js version issues: ensure Node 18+ is installed. If using an older version, upgrade and reinstall dependencies.
- Build errors: run `npm run check` and `npm run lint` to spot type or lint issues.
"# trade-app-react" 
"# product-list-demo-react" 
