import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { ThemeProvider } from "next-themes";

const zen = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "JLPTDojo",
  description: "Train, test, and master every JLPT level.",
  icons: {
    icon: [
      { url: "public/favicon.png", type: "image/png", sizes: "any" },
      { url: "public/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: ["/favicon.png"],
 },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={zen.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const finalTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
                  document.documentElement.classList.add(finalTheme);
                  document.documentElement.style.colorScheme = finalTheme;
                } catch (_) {}
              })();
            `,
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
