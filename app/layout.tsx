import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bimlesh - Full Stack Developer",
    template: "%s | Bimlesh",
  },
  description: "Full Stack Developer • Software Engineer • AI Explorer",
  keywords: ["Full Stack Developer", "Software Engineer", "AI", "Web Development", "React", "Next.js", "Node.js"],
  authors: [{ name: "Bimlesh" }],
  creator: "Bimlesh",
  metadataBase: new URL('https://bimlesh.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bimlesh.xyz',
    title: 'Bimlesh - Full Stack Developer',
    description: 'Full Stack Developer • Software Engineer • AI Explorer',
    siteName: 'Bimlesh',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bimlesh - Full Stack Developer',
    description: 'Full Stack Developer • Software Engineer • AI Explorer',
    creator: '@bimlesh',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-1364506068858027',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

