# Orbit | Analytics Dashboard

A modern, responsive analytics dashboard built with Next.js (App Router), TypeScript, Tailwind CSS and Supabase Auth.

**Live demo:** https://orbit-analytics-dashboard-orpin.vercel.app

**Demo login:**
- Email: demo@example.com
- Password: 12345678

## Screenshots

<img width="1911" height="910" alt="Screenshot 2026-10-03 193719" src="https://github.com/user-attachments/assets/7c140287-c81d-437c-8007-306f6f74c3f5" />
<img width="1901" height="907" alt="Screenshot 2026-10-03 193754" src="https://github.com/user-attachments/assets/6d2d1258-d76f-489b-93ce-5c375e00df1a" />
<img width="1912" height="906" alt="Screenshot 2026-10-03 193738" src="https://github.com/user-attachments/assets/5c1781ed-a543-4513-8af4-928a847ce16e" />


## Features

- Supabase authentication: login, register, protected routes, logout
- Overview with KPI cards, revenue chart, traffic chart and recent orders
- Customers table with search, filters, sorting and pagination stored in the URL
- Customer detail pages, orders and analytics pages
- Settings form with React Hook Form and Zod validation
- Light and dark themes, responsive layout
- Loading skeletons, error and not-found pages

## Tech Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Recharts, TanStack Table, React Hook Form, Zod, Supabase Auth

## Run locally

```bash
git clone https://github.com/modhavishal/nextjs-dashboard.git
cd nextjs-dashboard
npm install
cp .env.example .env.local
npm run dev
```

Add your own Supabase URL and anon key in `.env.local`.

## Notes

- Dashboard data is mock data. Only authentication uses a real backend (Supabase).
- Built with the help of GitHub Copilot. I reviewed, customized and tested the code.

## Author

Built by [Vishal Modha](https://github.com/modhavishal), React, Next.js and TypeScript developer.
