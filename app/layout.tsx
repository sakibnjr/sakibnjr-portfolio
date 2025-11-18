import { ThemeProvider } from "@/components/core/theme-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sakib Nahid | Web Developer Portfolio",
  description:
    "Explore Sakib Nahid's personal portfolio showcasing projects, skills, and experience as a full-Stack web developer.",
  metadataBase: new URL("https://sakibnjr.site"),
  openGraph: {
    title: "Sakib Nahid | Web Developer Portfolio",
    description:
      "Full-Stack Web Developer specializing in React, Next.js, and modern web technologies",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${poppins.className}`}>
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
  );
}
