import type { Metadata } from "next";
import { AxiomWebVitals } from "next-axiom";
import { Inter } from "next/font/google";
import "./globals.css";
import BaseLayout from "@/components/base-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/tdlm.svg",
        href: "/tdlm.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/tdlm-white.svg",
        href: "/tdlm-white.svg",
      },
    ],
    shortcut: { url: "/tdlm.svg", type: "image/png" },
  },
  title: {
    template: "%s | Weaver Tools",
    default: "Weaver Tools",
  },
  description: "Dev/QA tools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BaseLayout>{children}</BaseLayout>
        <AxiomWebVitals />
      </body>
    </html>
  );
}
