import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const anthropicSans = localFont({
  src: [
    { path: "../../public/fonts/AnthropicSans-Roman-Web.woff2", weight: "300 800", style: "normal" },
    { path: "../../public/fonts/AnthropicSans-Italic-Web.woff2", weight: "300 800", style: "italic" },
  ],
  variable: "--font-anthropic-sans",
  display: "swap",
});

const anthropicSerif = localFont({
  src: [
    { path: "../../public/fonts/AnthropicSerif-Roman-Web.woff2", weight: "300 800", style: "normal" },
    { path: "../../public/fonts/AnthropicSerif-Italic-Web.woff2", weight: "300 800", style: "italic" },
  ],
  variable: "--font-anthropic-serif",
  display: "swap",
});

const anthropicMono = localFont({
  src: [
    { path: "../../public/fonts/AnthropicMono-Roman-Web.woff2", weight: "300 800", style: "normal" },
    { path: "../../public/fonts/AnthropicMono-Italic-Web.woff2", weight: "300 800", style: "italic" },
  ],
  variable: "--font-anthropic-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Data Engineering Lifecycle — Học lý thuyết DE",
  description:
    "Khóa học lý thuyết Data Engineering: lifecycle, ingestion, modeling, orchestration, streaming, enterprise.",
  icons: {
    icon: "/seo/favicon.png",
    apple: "/seo/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${anthropicSans.variable} ${anthropicSerif.variable} ${anthropicMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
