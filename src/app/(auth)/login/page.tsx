import { AuthForm } from "@/app/(auth)/auth-form";
import {
  AUTH_UNCONFIGURED_MESSAGE,
  getSafeRedirectPath,
} from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase/config";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const rawError = Array.isArray(params.error) ? params.error[0] : params.error;
  const isConfigured = Boolean(getSupabaseConfig());
  const initialError =
    rawError === "auth_unconfigured" || !isConfigured
      ? AUTH_UNCONFIGURED_MESSAGE
      : rawError === "auth_callback_failed"
        ? "That confirmation link is invalid or expired. Please sign in or create a new account."
        : undefined;

  return (
    <AuthForm
      mode="login"
      nextPath={getSafeRedirectPath(rawNext)}
      initialError={initialError}
    />
  );
}
