import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SEOStructuredData from "@/components/SEOStructuredData";
import Analytics from "@/components/Analytics";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onedaykisan.com"),
  title: {
    default: "One Day Kisan — India's Premier Farm-Based Edutainment Destination | Hyderabad",
    template: "%s | One Day Kisan",
  },
  description:
    "Experience authentic rural farming, hands-on paddy transplantation, ancient Persian wheel water systems, pottery, and 360° virtual farm tours. Telangana's #1 farm field trip destination near Hyderabad (Bhongir & Moinabad) for schools, families, and corporate outings.",
  applicationName: "One Day Kisan",
  authors: [{ name: "One Day Kisan Team", url: "https://www.onedaykisan.com" }],
  generator: "Next.js",
  keywords: [
    // Brand Keywords
    "One Day Kisan",
    "One Day Kisan Hyderabad",
    "One Day Kisan Bhongir",
    "One Day Kisan Moinabad",
    "One Day Kisan reviews",
    "One Day Kisan ticket price",
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
  creator: "One Day Kisan",
  publisher: "One Day Kisan",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "One Day Kisan — India's Premier Farm-Based Edutainment Destination",
    description:
      "Give your children the childhood you had. Hands-on paddy transplantation, working Persian water wheels, walk-in aviary, pottery, and 360° virtual farm tours near Hyderabad (Bhongir & Moinabad).",
    url: "https://www.onedaykisan.com",
    siteName: "One Day Kisan",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "One Day Kisan - Experiential Farm Tour & Edutainment Destination Hyderabad",
      },
      {
        url: "/gallery/gallery-01.webp",
        width: 1200,
        height: 800,
        type: "image/webp",
        alt: "School children experiencing hands-on farming at One Day Kisan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "One Day Kisan — Experience Life. Learn Real Farming.",
    description:
      "India's #1 farm-based edutainment destination near Hyderabad. Hands-on paddy sowing, ancient water wheels, pottery, and interactive 360° virtual farm view.",
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
  other: {
    "geo.region": "IN-TG",
    "geo.placename": "Hyderabad, Telangana",
    "geo.position": "17.5117;78.8889",
    ICBM: "17.5117, 78.8889",
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
        <SEOStructuredData />
        <Analytics />
      </head>
      <body className="bg-[#faf7f0] text-[#1e2617] antialiased selection:bg-[#3d6027] selection:text-white">
        {children}
      </body>
    </html>
  );
}
