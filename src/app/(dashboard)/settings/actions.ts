"use server";

import type { ProfileFormValues } from "@/features/settings/schema";
import { createClient } from "@/lib/supabase/server";

export async function saveProfile(values: ProfileFormValues) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be signed in to update your profile.");
  }

  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    success: true,
    message: `Profile saved for ${values.name}.`,
  };
}
