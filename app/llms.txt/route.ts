import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/siteUrl";

export async function GET() {
  const siteUrl = getSiteUrl();

  const content = `# One Day Kissan (One Day Kisan / ODK)
> India's Premier Farm-Based Edutainment & Agritourism Destination
> Locations: Bhongir Main Farm & Moinabad Agro-Sanctuary, Telangana, India.
> Official Website: ${siteUrl}

## Overview
One Day Kissan (also known as One Day Kisan) is a 15-acre experiential farm sanctuary operating across two campuses near Hyderabad, Telangana. It bridges urban youth, school students, corporate organizations, and families with genuine Indian agricultural heritage, water hydraulics, cattle care, and living soil stewardship through 24 curriculum-linked hands-on learning modules.

## Campuses & Directions
- **Bhongir Main Farm (Flagship Campus, 15+ Acres)**: Near Hotel Vivera, Hyderabad - Warangal Highway (NH 163), Bhongir Bypass, Yadadri Bhuvanagiri District, Telangana - 508 116. Drive time: ~45–50 Mins from Hyderabad via ORR Exit 9 / Uppal.
- **Moinabad Agro-Sanctuary (12+ Acres)**: Kapil Agro Farms, Sriramnagar, Chilkur Balaji Corridor, Chevella Road, Telangana - 501 504. Drive time: ~30–35 Mins from Gachibowli / HITEC City via ORR Exit 18.

## The 4 Daily Experiential Acts
1. **Act I (09:30 AM) • Soil Awakening & Mud Arena**: Barefoot paddy transplantation, soil ecosystem science, scarecrow assembly, and joyful mud puddling arena.
2. **Act II (11:30 AM) • Ancient Water Hydraulics**: Live demonstrations of the wooden Persian Wheel (Rahat), Archimedes screw water lift, and traditional Mota Bavi stone wells.
3. **Act III (01:30 PM) • Animal Kinship & Village Feast**: Interactive cattle care (Desi Gir cows/calves), walk-in free-flight aviary, and piping-hot traditional Telangana vegetarian lunch.
4. **Act IV (03:30 PM) • Twilight Joy & Rural Crafts**: Potter's wheel sculpting (take your clay pot home), tractor trolley rides across farm borders, and village games.

## Institutional Offerings & Packages
- **Schools & Educational Excursions**: CBSE, ICSE, and IB curriculum-mapped practical field trips. Strict 1:25 instructor-to-student supervision ratio, dedicated bus parking for up to 30 buses, and FSSAI-compliant child nutrition.
- **Corporate Offsites & Leadership Retreats**: Unplugged team building, collaborative farming challenges, village obstacle relays, rustic outdoor canopies, and evening campfire arrangements.
- **Family Weekend Day Passes**: All-inclusive day passes for parents, children, and grandparents open Saturdays, Sundays, and public holidays (9:00 AM – 6:00 PM).

## Legal, Safety & Governance Documentation
- **360° Virtual Horizon Tour**: ${siteUrl}#tour360
- **Farm Safety & Child Protection Standards**: ${siteUrl}/safety
- **Privacy Policy & DPDP Act Data Governance**: ${siteUrl}/privacy
- **Terms & Conditions of Entry**: ${siteUrl}/terms
- **Cancellation, Rescheduling & Weather Refund Policy**: ${siteUrl}/cancellation-refunds
- **XML Sitemap**: ${siteUrl}/sitemap.xml

## Contact & Grievance Redressal
- **Official Helpline**: +91 98497 98674 / +91 93983 57618
- **Official Email**: info@onedaykisan.com
- **Operating Hours**: 9:00 AM – 6:00 PM (All 7 Days)
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
