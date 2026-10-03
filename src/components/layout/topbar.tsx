import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { WorkspaceSearch } from "@/components/layout/workspace-search";

export function Topbar({
  user,
}: {
  user: { name: string; email: string };
}) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-border/80 bg-background/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3 lg:hidden">
        <div className="lg:hidden">
          <MobileNav />
        </div>
        <span className="hidden text-sm font-semibold tracking-tight sm:inline">
          Orbit
        </span>
      </div>
      <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
        <WorkspaceSearch />
        <ThemeToggle />
        <span aria-hidden="true" className="hidden h-7 w-px bg-border sm:block" />
        <UserMenu name={user.name} email={user.email} />
      </div>
    </header>
  );
}
