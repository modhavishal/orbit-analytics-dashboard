"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { signIn, signUp, type AuthFormState } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthFormProps = {
  mode: "login" | "signup";
  nextPath: string;
};

const initialState: AuthFormState = {};

export function AuthForm({ mode, nextPath }: AuthFormProps) {
  const isSignUp = mode === "signup";
  const [state, formAction, isPending] = useActionState(
    isSignUp ? signUp : signIn,
    initialState,
  );

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.message) {
      toast.success(state.message);
    }
  }, [state.error, state.message]);

  return (
    <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl shadow-foreground/[0.04] sm:p-8">
      <div className="mb-7 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isSignUp
            ? "Start managing your workspace with Orbit."
            : "Sign in to continue to your Orbit workspace."}
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={nextPath} />
        {isSignUp ? (
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full name
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Jamie Davis"
              required
              maxLength={100}
              className="h-10"
            />
          </div>
        ) : null}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            placeholder="At least 8 characters"
            minLength={8}
            required
            className="h-10"
          />
        </div>

        {state.error ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/25 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
          >
            {state.error}
          </p>
        ) : null}
        {state.message ? (
          <p
            role="status"
            className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 px-3 py-2.5 text-sm text-emerald-700 dark:text-emerald-300"
          >
            {state.message}
          </p>
        ) : null}

        <Button className="h-10 w-full" type="submit" disabled={isPending}>
          {isPending
            ? isSignUp
              ? "Creating account..."
              : "Signing in..."
            : isSignUp
              ? "Create account"
              : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isSignUp ? "Already have an account?" : "New to Orbit?"}{" "}
        <Link
          href={`${isSignUp ? "/login" : "/signup"}?next=${encodeURIComponent(nextPath)}`}
          className="font-medium text-primary hover:underline"
        >
          {isSignUp ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </section>
  );
}
