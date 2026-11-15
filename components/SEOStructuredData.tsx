import React from "react";
import { faqs } from "@/data/faqs";

export default function SEOStructuredData() {
  // 1. LocalBusiness / TouristAttraction Schema for both locations
  const locationsSchema = [
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "LocalBusiness"],
      "@id": "https://www.onedaykisan.com/#bhongir-farm",
      "name": "One Day Kisan — Bhongir Main Farm",
      "alternateName": "One Day Kisan Hyderabad Warangal Highway",
      "description": "India's First Farm-Based Edutainment Destination. 15+ acres of hands-on agricultural experiences, ancient Persian wheel water systems, paddy transplantation, and rural living near Hyderabad.",
      "url": "https://www.onedaykisan.com",
      "telephone": "+91-9849798674",
      "email": "info@onedaykisan.com",
      "priceRange": "₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, UPI, Credit Card, Bank Transfer",
      "image": [
        "https://www.onedaykisan.com/gallery/gallery-01.webp",
        "https://www.onedaykisan.com/images/hero-bg.jpg",
        "https://www.onedaykisan.com/images/logo.png"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Near Hotel Vivera, Hyderabad - Warangal Highway, Bhongir Bypass",
        "addressLocality": "Bhongir",
        "addressRegion": "Telangana",
        "postalCode": "508116",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 17.5117,
        "longitude": 78.8889
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "664",
        "bestRating": "5",
        "worstRating": "1"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "30+ Bus Parking Bay", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Sanitised Showers & Dressing Rooms", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "RO Purified Drinking Water", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Hygienic Farm Dining Area", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "360 Virtual Tour", "value": true }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "LocalBusiness"],
      "@id": "https://www.onedaykisan.com/#moinabad-farm",
      "name": "One Day Kisan — Moinabad Agro-Sanctuary",
      "alternateName": "One Day Kisan Kapil Agro Farms",
      "description": "Lush agro-sanctuary featuring the Walk-In Birds Aviary, Desi Gir cattle dairy, polyhouse greenhouse cultivation, and hands-on pottery workshops near Chilkur Balaji, Hyderabad.",
      "url": "https://www.onedaykisan.com",
      "telephone": "+91-9849798674",
      "email": "info@onedaykisan.com",
      "priceRange": "₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, UPI, Credit Card, Bank Transfer",
      "image": [
        "https://www.onedaykisan.com/gallery/gallery-02.webp",
        "https://www.onedaykisan.com/images/23.png"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kapil Agro Farms, Sriramnagar, Chilkur Balaji Corridor",
        "addressLocality": "Moinabad",
        "addressRegion": "Telangana",
        "postalCode": "501504",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 17.332,
        "longitude": 78.273
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "240",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  ];

  // 2. FAQPage Schema (Google Rich Snippets)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.onedaykisan.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Farm Experiences",
        "item": "https://www.onedaykisan.com#act1-mud"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "360° Virtual Farm Tour",
        "item": "https://www.onedaykisan.com#tour360"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "School Field Trips",
        "item": "https://www.onedaykisan.com#schools"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Plan Your Visit & FAQ",
        "item": "https://www.onedaykisan.com#planner"
      }
    ]
  };

  // 4. EducationalOrganization Schema
  const educationalSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "One Day Kisan Farm School Academy",
    "url": "https://www.onedaykisan.com",
    "description": "Experiential hands-on agricultural and environmental education for K-12 students aligned with CBSE, ICSE, and NCERT guidelines.",
    "educationalCredentialAwarded": "Certificate of Agri-Literacy",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Experiential Farm Learning Modules",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Paddy Lifecycle & Sowing Practicum",
            "description": "Barefoot paddy seedling transplantation, seed germination, and soil microbiology."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Heritage Hydraulic Engineering",
            "description": "Operating the ancient Persian wheel (Rahat), Archimedes screw, and stone well."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Indigenous Dairy & Avian Ethology",
            "description": "Desi Gir cattle biology, A2 milk science, and walk-in aviary interaction."
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalSchema) }}
      />
    </>
  );
}
