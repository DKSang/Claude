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
  title: "The AI for Problem Solvers | Claude by Anthropic",
  description:
    "Claude is Anthropic's AI, built for problem solvers. Tackle complex challenges, analyze data, write code, and think through your hardest work.",
  icons: {
    icon: "/seo/favicon.png",
    apple: "/seo/apple-touch-icon.png",
  },
  openGraph: {
    title: "The AI for Problem Solvers | Claude by Anthropic",
    description:
      "Claude is Anthropic's AI, built for problem solvers. Tackle complex challenges, analyze data, write code, and think through your hardest work.",
    images: ["/seo/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anthropicSans.variable} ${anthropicSerif.variable} ${anthropicMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
