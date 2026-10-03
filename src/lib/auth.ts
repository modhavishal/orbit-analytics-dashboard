export function getSafeRedirectPath(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  const destination = new URL(value, "http://localhost");
  return destination.origin === "http://localhost" ? `${destination.pathname}${destination.search}${destination.hash}` : "/";
}
