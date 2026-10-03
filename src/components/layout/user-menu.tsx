"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronDown, LogOut, Settings2, UserRound } from "lucide-react";
import { signOut } from "@/app/(auth)/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserMenu({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isSigningOut, startSigningOut] = useTransition();

  return (
    <Dialog.Root open={isSignOutOpen} onOpenChange={setIsSignOutOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Open account menu"
          className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar className="size-8 ring-2 ring-background">
            <AvatarFallback className="bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-left sm:block">
            <span className="block max-w-36 truncate text-xs font-semibold leading-4">
              {name}
            </span>
            <span className="block text-[10px] leading-4 text-muted-foreground">
              Workspace member
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="hidden size-3.5 text-muted-foreground sm:block"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-2 py-1.5">
              <span className="block text-sm font-medium">{name}</span>
              <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                {email}
              </span>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href="/settings" />}>
            <UserRound aria-hidden="true" />
            Your profile
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/settings" />}>
            <Settings2 aria-hidden="true" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsSignOutOpen(true)}>
            <LogOut aria-hidden="true" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl shadow-black/20 outline-none transition duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-7">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <LogOut aria-hidden="true" className="size-5" />
          </div>
          <Dialog.Title className="mt-5 text-lg font-semibold tracking-tight">
            Sign out of Orbit?
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
            You will need to sign in again to access your workspace.
          </Dialog.Description>
          <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Dialog.Close
              render={
                <Button variant="outline" className="h-10 sm:min-w-24">
                  Cancel
                </Button>
              }
            />
            <Button
              variant="destructive"
              className="h-10 sm:min-w-28"
              disabled={isSigningOut}
              onClick={() =>
                startSigningOut(async () => {
                  await signOut();
                })
              }
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
