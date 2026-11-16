/**
 * Dynamically resolves the base URL for canonical tags, sitemaps, OpenGraph previews,
 * and structured data across local, preview, and production Vercel deployments.
 */
export const SITE_URL = "https://onedaykissan.vercel.app";

export function getSiteUrl(): string {
  // 1. Explicit custom domain or environment variable
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  // 2. Default production Vercel domain
  return SITE_URL;
}
