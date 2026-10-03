# Project: Orbit (analytics dashboard)

Stack: Next.js (App Router), React, TypeScript (strict), Tailwind CSS, shadcn/ui, Recharts, TanStack Table, React Hook Form + Zod, next-themes, lucide-react.

## Rules
- Use server components by default. Add "use client" only when a component needs state, effects, event handlers or browser APIs. Keep client components small and push them to the leaves.
- TypeScript strict. No `any`. Define types in a `types.ts` next to the feature. Use `import type`.
- Folder structure:
  src/app/(dashboard)/...     routes, loading.tsx, error.tsx, not-found.tsx
  src/app/api/...             route handlers (mock API)
  src/components/ui/          shadcn components (do not edit)
  src/components/layout/      Sidebar, Topbar, ThemeToggle, MobileNav
  src/components/charts/      chart components
  src/features/<name>/        feature components, types, schema
  src/lib/                    utils, formatters, mock data
- Use the `@/` import alias. Use `next/link` and `next/image`. Use `next/font` (Inter).
- Styling: Tailwind utility classes, shadcn components, design tokens from CSS variables. Support light and dark mode. Mobile first, responsive down to 360px.
- Accessibility: semantic HTML, labels for inputs, aria-labels for icon buttons, visible focus states, sufficient color contrast.
- Data is mocked. Create realistic fake data in `src/lib/mock-data.ts` and expose it through route handlers in `src/app/api`. Add a short note in the README that data is mock.
- Keep files small and readable. Add short comments only where logic is not obvious. No unused code, no console.log.
- After each task, make sure `npm run build` and `npm run lint` pass.