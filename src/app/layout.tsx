import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// Setup Manrope for headings
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope', // Provides the CSS variable
});

// Setup Inter for body text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Provides the CSS variable
});

export const metadata: Metadata = {
  title: "WebinarAI - Automated Webinar Sales",
  description: "The Future of Automated Webinar Sales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        {/*
          - The `inter.variable` and `manrope.variable` classes make the fonts available as CSS variables.
          - The `font-body` class applies Inter as the default font for the whole app.
        */}
        <body
          className={`${inter.variable} ${manrope.variable} font-body antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}