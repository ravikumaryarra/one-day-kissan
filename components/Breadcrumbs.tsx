import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { getSiteUrl } from "@/lib/siteUrl";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href ? { "item": `${siteUrl}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-2.5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#526048]">
          <li className="inline-flex items-center">
            <Link
              href="/"
              prefetch={true}
              className="inline-flex items-center gap-1 hover:text-[#14230e] text-[#2b4c1c] font-medium transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label} className="inline-flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-[#8a4724]/60 flex-shrink-0" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="hover:text-[#14230e] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-[#14230e]" aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
