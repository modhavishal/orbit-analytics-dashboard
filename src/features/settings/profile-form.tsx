"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell, Check, Laptop, Moon, Palette, Sun, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import { useForm, useWatch } from "react-hook-form";

import { saveProfile } from "@/app/(dashboard)/settings/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileFormSchema, type ProfileFormValues } from "@/features/settings/schema";
import type { NotificationSettings, ThemeMode } from "@/features/settings/types";

const defaultValues: ProfileFormValues = {
  name: "Jamie Davis",
  email: "jamie@orbit.app",
  company: "Orbit Labs",
  bio: "Product-minded leader focused on clarity, growth, and customer delight.",
};

const themeOptions: Array<{ value: ThemeMode; label: string; icon: typeof Sun }> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
];

export function ProfileSettings() {
  const { setTheme, theme } = useTheme();
  const [notifications, setNotifications] = useState<NotificationSettings>({
    productUpdates: true,
    weeklyDigest: false,
    securityAlerts: true,
  });
  const [saveMessage, setSaveMessage] = useState<string>("");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = form;

  const bioValue = useWatch({ control: form.control, name: "bio" }) ?? "";
  const isSaveDisabled = !isValid || !isDirty || isSubmitting;

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const result = await saveProfile(values);
      setSaveMessage(result.message);
      reset(values, { keepDirty: false });
    } catch {
      setSaveMessage("Unable to save your profile right now. Please try again.");
    }
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Preferences
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
            Settings
          </h1>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="!h-auto self-start mb-5 flex w-fit max-w-full flex-wrap justify-start gap-1 rounded-xl border border-border/70 bg-muted/50 p-1.5 shadow-sm shadow-foreground/[0.03]">
          <TabsTrigger
            value="profile"
            className="h-9 flex-none gap-1 rounded-lg px-2 text-xs text-muted-foreground transition-all data-active:bg-background data-active:text-foreground data-active:shadow-sm data-active:ring-1 data-active:ring-border/70 sm:gap-2 sm:px-3 sm:text-sm"
          >
            <UserRound aria-hidden="true" className="size-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="h-9 flex-none gap-1 rounded-lg px-2 text-xs text-muted-foreground transition-all data-active:bg-background data-active:text-foreground data-active:shadow-sm data-active:ring-1 data-active:ring-border/70 sm:gap-2 sm:px-3 sm:text-sm"
          >
            <Bell aria-hidden="true" className="size-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="h-9 flex-none gap-1 rounded-lg px-2 text-xs text-muted-foreground transition-all data-active:bg-background data-active:text-foreground data-active:shadow-sm data-active:ring-1 data-active:ring-border/70 sm:gap-2 sm:px-3 sm:text-sm"
          >
            <Palette aria-hidden="true" className="size-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-border/80 shadow-sm shadow-slate-950/[0.02]">
            <CardHeader className="pb-4">
              <CardTitle>Profile details</CardTitle>
              <CardDescription>
                Update the details people see when they review your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={onSubmit} noValidate>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jane Smith"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      {...register("name")}
                    />
                    {errors.name ? (
                      <p id="name-error" className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      {...register("email")}
                    />
                    {errors.email ? (
                      <p id="email-error" className="text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-foreground">
                    Company
                  </label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Acme Inc."
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "company-error" : undefined}
                    {...register("company")}
                  />
                  {errors.company ? (
                    <p id="company-error" className="text-xs text-destructive">
                      {errors.company.message}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label htmlFor="bio" className="text-sm font-medium text-foreground">
                      Bio
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {bioValue.length}/160
                    </span>
                  </div>
                  <textarea
                    id="bio"
                    rows={4}
                    maxLength={160}
                    placeholder="Tell people a bit about your work."
                    aria-invalid={Boolean(errors.bio)}
                    aria-describedby={errors.bio ? "bio-error" : undefined}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                    {...register("bio")}
                  />
                  {errors.bio ? (
                    <p id="bio-error" className="text-xs text-destructive">
                      {errors.bio.message}
                    </p>
                  ) : null}
                </div>

                {saveMessage ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200"
                  >
                    <Check aria-hidden="true" className="size-4" />
                    <span>{saveMessage}</span>
                  </div>
                ) : null}

                <div className="flex flex-col-reverse gap-3 border-t border-border/80 pt-4 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSaveMessage("");
                      reset(defaultValues);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaveDisabled}>
                    {isSubmitting ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-border/80 shadow-sm shadow-slate-950/[0.02]">
            <CardHeader className="pb-4">
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose the updates you want to receive about your workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "productUpdates",
                  title: "Product updates",
                  description: "Release notes and new feature announcements.",
                },
                {
                  key: "weeklyDigest",
                  title: "Weekly digest",
                  description: "A summary of your weekly performance highlights.",
                },
                {
                  key: "securityAlerts",
                  title: "Security alerts",
                  description: "Important alerts about account activity and access.",
                },
              ].map(({ key, title, description }) => {
                const enabled = notifications[key as keyof NotificationSettings];

                return (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border/80 bg-muted/30 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-label={title}
                      aria-checked={enabled}
                      onClick={() => toggleNotification(key as keyof NotificationSettings)}
                      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        enabled
                          ? "border-primary bg-primary/15"
                          : "border-border bg-muted"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 rounded-full bg-background shadow-sm transition-transform ${
                          enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="border-border/80 shadow-sm shadow-slate-950/[0.02]">
            <CardHeader className="pb-4">
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Choose how Orbit looks across your devices and sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Theme preferences">
                {themeOptions.map(({ value, label, icon: Icon }) => {
                  const selected = (theme ?? "system") === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setTheme(value)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        selected
                          ? "border-primary bg-primary/8 text-primary"
                          : "border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
                          <Icon aria-hidden="true" className="size-4" />
                        </span>
                        <span className="font-medium">{label}</span>
                      </span>
                      {selected ? <Check aria-hidden="true" className="size-4" /> : null}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
