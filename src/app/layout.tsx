import type { Metadata } from "next";
import { Inter, Noto_Serif, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ColorThemeProvider } from "@/context/ColorContext";
import { FontProvider } from "@/context/FontContext";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Note Taker",
  description: "Note Taker App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${sourceCodePro.variable} antialiased bg-white dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50 h-screen w-full`}
      >
        <NuqsAdapter>
          <Providers>
            <ColorThemeProvider>
              <FontProvider>{children}</FontProvider>
            </ColorThemeProvider>
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
