import Link from "next/link";
import { AuthForm } from "@/app/(auth)/auth-form";
import { getSafeRedirectPath } from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase/config";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const rawError = Array.isArray(params.error) ? params.error[0] : params.error;
  const isConfigured = Boolean(getSupabaseConfig());

  return (
    <>
      {rawError === "auth_unconfigured" || !isConfigured ? (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground"
        >
          <p className="font-semibold">Connect your Supabase project</p>
          <p className="mt-1 text-muted-foreground">
            Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to{" "}
            <code>.env.local</code>, then restart the dev server.
          </p>
          <Link
            href="https://supabase.com/dashboard"
            className="mt-2 inline-block font-medium text-primary hover:underline"
          >
            Open Supabase dashboard
          </Link>
        </div>
      ) : null}
      {rawError === "auth_callback_failed" ? (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-sm text-destructive"
        >
          That confirmation link is invalid or expired. Please sign in or create a new account.
        </p>
      ) : null}
      <AuthForm mode="login" nextPath={getSafeRedirectPath(rawNext)} />
    </>
  );
}
