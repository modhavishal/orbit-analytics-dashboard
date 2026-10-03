"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_UNCONFIGURED_MESSAGE, getSafeRedirectPath } from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = {
  error?: string;
  message?: string;
};

const credentialsSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  next: z.string().optional(),
});

const signUpSchema = credentialsSchema.extend({
  fullName: z.string().trim().min(2, "Enter your name.").max(100),
});

function getFormValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function signIn(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!getSupabaseConfig()) {
    return { error: AUTH_UNCONFIGURED_MESSAGE };
  }

  const parsed = credentialsSchema.safeParse({
    email: getFormValue(formData, "email"),
    password: getFormValue(formData, "password"),
    next: getFormValue(formData, "next"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: "Email or password is incorrect. Please try again." };
  }

  redirect(getSafeRedirectPath(parsed.data.next));
}

export async function signUp(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  if (!getSupabaseConfig()) {
    return { error: AUTH_UNCONFIGURED_MESSAGE };
  }

  const parsed = signUpSchema.safeParse({
    fullName: getFormValue(formData, "fullName"),
    email: getFormValue(formData, "email"),
    password: getFormValue(formData, "password"),
    next: getFormValue(formData, "next"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details." };
  }

  const requestHeaders = await headers();
  const origin =
    requestHeaders.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!origin) {
    return {
      error:
        "Set NEXT_PUBLIC_SITE_URL so Supabase can return here after email confirmation.",
    };
  }

  const emailRedirectTo = new URL(
    `/auth/callback?next=${encodeURIComponent(getSafeRedirectPath(parsed.data.next))}`,
    origin,
  ).toString();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName },
      emailRedirectTo,
    },
  });

  if (error) {
    return {
      error:
        error.code === "user_already_exists"
          ? "An account with this email already exists. Try signing in."
          : "We couldn't create your account. Please check your details and try again.",
    };
  }

  if (!data.session) {
    return {
      message: "Check your email for a confirmation link to finish creating your account.",
    };
  }

  redirect(getSafeRedirectPath(parsed.data.next));
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Unable to sign out: ${error.message}`);
  }

  redirect("/login");
}
