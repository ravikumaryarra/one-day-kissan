import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("google-site-verification: googleba1a25befc440415.html\n", {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
