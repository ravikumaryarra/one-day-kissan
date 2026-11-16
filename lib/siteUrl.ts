/**
 * Dynamically resolves the base URL for canonical tags, sitemaps, OpenGraph previews,
 * and structured data across local, preview, and production Vercel deployments.
 */
export function getSiteUrl(): string {
  // 1. Explicit custom domain or environment variable
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  // 2. Vercel production deployment URL (e.g., onedaykissan.vercel.app)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }

  // 3. Vercel preview branch deployment URL (e.g., one-day-kissan-git-main-....vercel.app)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  // 4. Fallback default production domain
  return "https://onedaykissan.vercel.app";
}
