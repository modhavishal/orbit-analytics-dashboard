# Orbit

Orbit is an analytics dashboard built with Next.js.

Dashboard metrics, activity, and customer profiles shown in Orbit are mock data for demo purposes only.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Supabase Authentication

Orbit uses Supabase email/password authentication. Copy `.env.example` to
`.env.local` and set these values from **Supabase Dashboard → Project
Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The legacy Supabase anon key is also accepted as
`NEXT_PUBLIC_SUPABASE_ANON_KEY`. Never put a Supabase service-role key in a
`NEXT_PUBLIC_` variable.

In **Authentication → URL Configuration**, add
`http://localhost:3000/auth/callback` to the allowed redirect URLs. Set
`NEXT_PUBLIC_SITE_URL` and add the corresponding callback URL for production.
Restart the dev server after changing environment variables. Dashboard pages
and data API routes require a signed-in user; use `/login` to sign in or `/signup`
to create an account. If email confirmation is enabled, follow the link sent by
Supabase to finish registration.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
