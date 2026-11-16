import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Operations & Gate Portal | One Day Kissan",
  description: "Internal operations dashboard for One Day Kissan farm managers, lead management, and gate check-in.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
