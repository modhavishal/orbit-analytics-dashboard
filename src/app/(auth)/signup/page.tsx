import { AuthForm } from "@/app/(auth)/auth-form";
import {
  AUTH_UNCONFIGURED_MESSAGE,
  getSafeRedirectPath,
} from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase/config";

type SignupPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const isConfigured = Boolean(getSupabaseConfig());

  return (
    <AuthForm
      mode="signup"
      nextPath={getSafeRedirectPath(rawNext)}
      initialError={isConfigured ? undefined : AUTH_UNCONFIGURED_MESSAGE}
    />
  );
}
