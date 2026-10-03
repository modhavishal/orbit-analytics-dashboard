import Link from "next/link";
import { AuthForm } from "@/app/(auth)/auth-form";
import { getSafeRedirectPath } from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase/config";

type SignupPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;

  return (
    <>
      {!getSupabaseConfig() ? (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground"
        >
          <p className="font-semibold">Connect your Supabase project</p>
          <p className="mt-1 text-muted-foreground">
            Add your Supabase URL and publishable key to <code>.env.local</code>,
            then restart the dev server.
          </p>
          <Link
            href="https://supabase.com/dashboard"
            className="mt-2 inline-block font-medium text-primary hover:underline"
          >
            Open Supabase dashboard
          </Link>
        </div>
      ) : null}
      <AuthForm mode="signup" nextPath={getSafeRedirectPath(rawNext)} />
    </>
  );
}
