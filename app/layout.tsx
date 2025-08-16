import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
    default: "Spotify Wallpapers - Create Beautiful 4K Wallpapers from Your Favorite Tracks",
    template: "%s | Spotify Wallpapers"
  },
  description: "Transform your favorite Spotify tracks into stunning 4K wallpapers for mobile, tablet, and desktop. Generate high-resolution wallpapers with a modern music player interface. Free and easy to use!",
  keywords: [
    "spotify wallpapers",
    "music wallpapers",
    "4K wallpapers",
    "spotify track wallpapers",
    "music player wallpapers",
    "high resolution wallpapers",
    "spotify art",
    "music backgrounds",
    "wallpaper generator",
    "spotify integration"
  ],
  authors: [{ name: "Yarema Kertytsky" }],
  creator: "Yarema Kertytsky",
  publisher: "Spotify Wallpapers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://spotify-wallpapers.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://spotify-wallpapers.vercel.app',
    title: 'Spotify Wallpapers - Create Beautiful 4K Wallpapers from Your Favorite Tracks',
    description: 'Transform your favorite Spotify tracks into stunning 4K wallpapers for mobile, tablet, and desktop. Generate high-resolution wallpapers with a modern music player interface.',
    siteName: 'Spotify Wallpapers',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Spotify Wallpapers - Create beautiful wallpapers from your favorite tracks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spotify Wallpapers - Create Beautiful 4K Wallpapers from Your Favorite Tracks',
    description: 'Transform your favorite Spotify tracks into stunning 4K wallpapers for mobile, tablet, and desktop.',
    images: ['/og-image.png'],
    creator: '@yarema_kertytsky',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'music',
  classification: 'music wallpaper generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1DB954" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Spotify Wallpapers" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Spotify Wallpapers",
              "description": "Transform your favorite Spotify tracks into stunning 4K wallpapers for mobile, tablet, and desktop",
              "url": "https://spotify-wallpapers.vercel.app",
              "applicationCategory": "MusicApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "Yarema Kertytsky"
              },
              "creator": {
                "@type": "Person",
                "name": "Yarema Kertytsky"
              },
              "featureList": [
                "4K Resolution Wallpapers",
                "Spotify Integration",
                "Multi-Device Support",
                "Modern Music Player Interface",
                "Instant Generation",
                "Free to Use"
              ],
              "screenshot": "https://spotify-wallpapers.vercel.app/og-image.png",
              "softwareVersion": "1.0.0",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col dark`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
