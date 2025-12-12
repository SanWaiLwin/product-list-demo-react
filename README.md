# Product App – Listing & Maintenance (React + TypeScript + Tailwind)

Minimal product management app that satisfies the assignment requirements using React hooks and Tailwind. It includes a Product Listing page and a Product Maintenance form (create/update), plus the extra logic: quantity can be increased or decreased (min 0), and products with quantity 0 are removable.

## Tech Stack

- React 18 + TypeScript
- Vite (dev/build)
- Tailwind CSS (styling)
- Zustand (state management)
- React Hook Form + Zod (form + validation)
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
- Dev server typically runs at `http://localhost:5173/`.

3) Build and preview a production build
```
npm run build
npm run preview
```
- Preview serves the built app at `http://localhost:4173/`.

## Routes

- `/` or `/products`: Product Listing
- `/add`: Product Maintenance (create)
- `/:id/edit`: Product Maintenance (update)

## Features

- Product Listing: shows product name and quantity, with filter, sort, and pagination.
- Quantity controls: “− qty +” inline in the Quantity column.
  - “−” decreases, “+” increases
  - Clamped at 0 (never negative)
- Remove when quantity is 0: a “Remove” button appears only when `quantity === 0`.
- Product Maintenance form:
  - Create new product
  - Edit existing product by id
  - Validation: name ≥ 2 chars, quantity ≥ 0, description ≥ 2 chars

## Data Flow

- Backend-first service with demo fallback:
  - Tries `/api/products` first via `src/services/productApi.ts`.
  - If the backend is unreachable, falls back to a mock service in `src/services/mockApi.ts`.
- Demo persistence:
  - Products are saved to `localStorage` under `mockProducts`.
  - On first load, products are read from `public/products.json` or `localStorage`.
  - Seeding ensures at least 100 products for pagination/sorting tests.

## How To Use

- Listing page:
  - Use filter input to search by name/description.
  - Click column headers to sort; change page size and navigate pages.
  - Use “−” and “+” next to quantity to adjust; quantity stays ≥ 0.
  - If quantity becomes 0, click “Remove” to delete the product.
- Maintenance form:
  - Go to `/add` to create a product.
  - Go to `/:id/edit` to update an existing product.

## Project Structure

```
src/
  components/      Reusable UI components
  pages/           ProductList, ProductMaintenance, etc.
  services/        productApi (backend-first), mockApi (demo fallback)
  stores/          Zustand stores (productStore)
  types/           TypeScript types
  main.tsx, App.tsx
public/
  products.json    Initial demo dataset
```

## Scripts

- `npm run dev`     Start dev server
- `npm run build`   Type-check and build
- `npm run preview` Serve built app
- `npm run check`   TypeScript type-check

## Notes

- If a backend is configured under `/api`, the app will use it.
- If not, it uses the mock service and persists changes in the browser.
