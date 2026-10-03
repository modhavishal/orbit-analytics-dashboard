"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Brand } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks } from "@/components/layout/nav-links";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" aria-label="Open navigation" />}
      >
        <Menu aria-hidden="true" className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-sidebar p-5">
        <SheetHeader className="p-0">
          <SheetTitle className="text-left">
            <Brand onNavigate={() => setOpen(false)} />
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Workspace
        </div>
        <div className="mt-3">
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
