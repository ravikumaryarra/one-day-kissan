import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SEOStructuredData from "@/components/SEOStructuredData";
import Analytics from "@/components/Analytics";
import { getSiteUrl } from "@/lib/siteUrl";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2b4c1c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "One Day Kissan | Explore Authentic Farm Experiences",
    template: "%s | One Day Kissan",
  },
  description:
    "Discover One Day Kissan, an immersive farm tourism experience offering authentic rural activities, agricultural experiences and memorable visits near Hyderabad, Telangana.",
  applicationName: "One Day Kissan",
  authors: [{ name: "One Day Kissan Team", url: `${siteUrl}/` }],
  generator: "Next.js",
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    shortcut: "/images/logo.png",
  },
  keywords: [
    // Brand Keywords (Primary & Alternate)
    "One Day Kissan",
    "One Day Kisan",
    "One Day Kissan Hyderabad",
    "One Day Kisan Hyderabad",
    "One Day Kissan Bhongir",
    "One Day Kissan Moinabad",
    "One Day Kissan reviews",
    "One Day Kissan ticket price",
    // Agritourism & Day Outings
    "Agri tourism Hyderabad",
    "agri tourism Telangana",
    "farm picnic spots in Hyderabad",
    "farm experience near Hyderabad",
    "rural village experience Hyderabad",
    "organic farm visit near Hyderabad",
    "weekend day outing near Hyderabad",
    "day outings for families near Hyderabad",
    // School Field Trips & Education
    "school field trip places in Hyderabad",
    "educational farm trips Telangana",
    "CBSE approved field trips Hyderabad",
    "ICSE science field trips Hyderabad",
    "botany agriculture school tour",
    "EVS practical field trip Hyderabad",
    "student excursion places in Hyderabad",
    "best school picnic spots near Hyderabad",
    // Corporate Outings
    "corporate day outing places near Hyderabad",
    "team building farm retreat Hyderabad",
    "unplugged corporate outing Telangana",
    "rustic corporate offsite Hyderabad",
    // Specific Farm Attractions & Heritage
    "paddy transplantation experience Hyderabad",
    "Persian wheel working model India",
    "Archimedes screw farm model",
    "Mota Bavi traditional well Telangana",
    "walk in birds aviary Hyderabad",
    "Desi Gir cow farm visit Hyderabad",
    "traditional pottery workshop Hyderabad",
    // Location & Corridor Keywords
    "farm visit Warangal highway",
    "places to visit near Bhongir fort",
    "places to visit near Chilkur Balaji",
    "Kapil Agro Farms Moinabad"
  ],
  creator: "One Day Kissan",
  publisher: "One Day Kissan",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: "One Day Kissan | Explore Authentic Farm Experiences",
    description:
      "Discover One Day Kissan, an immersive farm tourism experience offering authentic rural activities, agricultural experiences and memorable visits near Hyderabad, Telangana.",
    url: `${siteUrl}/`,
    siteName: "One Day Kissan",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "One Day Kissan - Experiential Farm Tour & Edutainment Destination Hyderabad",
      },
      {
        url: "/gallery/gallery-01.webp",
        width: 1200,
        height: 800,
        type: "image/webp",
        alt: "School children experiencing hands-on farming at One Day Kissan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "One Day Kissan | Explore Authentic Farm Experiences",
    description:
      "Discover One Day Kissan, an immersive farm tourism experience offering authentic rural activities, agricultural experiences and memorable visits near Hyderabad, Telangana.",
    images: ["/images/hero-bg.jpg"],
    creator: "@onedaykisan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "ba1a25befc440415",
  },
  other: {
    "geo.region": "IN-TG",
    "geo.placename": "Hyderabad, Telangana",
    "geo.position": "17.5117;78.8889",
    ICBM: "17.5117, 78.8889",
    "apple-mobile-web-app-title": "One Day Kissan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="preload" href="/gallery/gallery-01.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <SEOStructuredData />
        <Analytics />
      </head>
      <body className="bg-[#faf7f0] text-[#1e2617] antialiased selection:bg-[#3d6027] selection:text-white">
        {children}
      </body>
    </html>
  );
}
