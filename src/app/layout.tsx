import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orbit.example.com"),
  title: {
    default: "Orbit | Analytics Dashboard",
    template: "%s | Orbit",
  },
  description: "A clear view of your business, all in one place.",
  openGraph: {
    title: "Orbit | Analytics Dashboard",
    description: "A clear view of your business, all in one place.",
    siteName: "Orbit",
    locale: "en_US",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Orbit analytics dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit | Analytics Dashboard",
    description: "A clear view of your business, all in one place.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
