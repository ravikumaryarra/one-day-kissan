# One Day Kissan — Recommended Features & Strategic Product Roadmap
**Document ID:** `ODK-AUDIT-05-RECOMMENDED-FEATURES`  
**Date:** November 2026  
**Author:** Principal Product Architect & Agritourism Experience Strategist  
**Scope:** Pragmatic High-Value Feature Recommendations & Strategic Product Thinking (Phases 6 & 7)  

---

## Executive Summary

Agritourism is fundamentally about **trust, sensory memory, and seamless logistics**. Urban visitors escaping Hyderabad's concrete tech corridors seek pastoral serenity, tactile connection with soil, wholesome ancestral food, and meaningful nature education for their children. 

However, rural logistics are inherently fragile: weather fluctuates, city families worry about safety and sanitation, and schools require ironclad administrative compliance. 

This document outlines **24 strategic features** across 6 operational domains, paired with high-impact product thinking to elevate One Day Kissan from an aesthetic showcase into the premier experiential agritourism platform in Southern India.

---

## 1. Phase 6 — Recommended Feature Catalog Across 6 Domains

```
                                  ONE DAY KISSAN
                           RECOMMENDED FEATURE MATRIX
                                        |
    +---------------+---------------+---+-----------+---------------+---------------+
    |               |               |               |               |               |
1. Visitor      2. Booking      3. Farm         4. Growth &     5. Immersive    6. BI &
   Experience      & Payments      Operations      Retention       Innovation      Reporting
```

### Domain 1: Visitor Experience & On-Farm Delight

| Feature Name | Description | Value to Business & Visitor | Complexity | Dependencies | Priority Tier |
| :--- | :--- | :--- | :---: | :--- | :---: |
| **Interactive Live Farm Map & GPS Audio Guide** | Progressive Web App (PWA) interactive map with GPS-triggered 60-second audio snippets as visitors walk through paddy fields, cattle sheds, and herbal gardens. | Eliminates visitor disorientation; delivers self-guided education without requiring human tour guides at every station. | **Medium** | Leaflet / Mapbox, static audio files, PWA manifest. | **Essential** |
| **Live Weather & Farm Advisory Ticker** | Real-time weather widget showing temperature, rain probability, mud advisory, and recommended attire (e.g. *"Red soil path damp today — rubber boots recommended"*). | Sets clear expectations; reduces complaints and footwear mishaps on rainy days. | **Small** | OpenWeatherMap API, frontend banner. | **Essential** |
| **Kids Farm Passport & Activity Stamp Card** | Digital or printable passport where children collect physical or QR stamps for completing activities (milking, potter wheel, paddy planting) to earn a "Junior Kissan Certificate". | Gamifies the visit; drives deep child engagement; parents proudly share certificates on WhatsApp & Instagram. | **Small** | PDF generation engine or client-side canvas badge generator. | **High Value** |
| **Dietary & Traditional Food Pre-Order** | In-wizard selection of authentic Telangana village buffet options (e.g. Jowar Roti, Natu Kodi Pulusu, Bagara Rice, Clay-pot Curd, Jain/Vegan alternatives). | Minimizes food waste for farm kitchens; guarantees dietary satisfaction for multi-generational families. | **Medium** | `meal_preferences` DB column, kitchen summary report. | **Essential** |

---

### Domain 2: Booking, Pricing & Financial Transactions

| Feature Name | Description | Value to Business & Visitor | Complexity | Dependencies | Priority Tier |
| :--- | :--- | :--- | :---: | :--- | :---: |
| **Razorpay Direct Payment Gateway** | Native checkout modal supporting UPI (Google Pay, PhonePe, Paytm), Netbanking, and Credit Cards for 20% advance deposits or 100% full prepayments. | Converts high-intent traffic immediately; eliminates manual WhatsApp bank transfer verification. | **Medium** | Razorpay Node SDK, webhooks, `payments` table. | **Essential (P0)** |
| **School & Institutional Custom Quotation Engine** | Dedicated portal for school principals and tour coordinators to input student count (100–1,000), grade levels, bus logistics, and download an instant formal PDF quotation. | Solves the #1 friction for educational institutions; speeds up school board purchase order approvals. | **Medium** | PDFKit / Puppeteer, `school_inquiries` table, pricing rules. | **Essential (P1)** |
| **Dynamic Tiered Pricing (Weekend vs Weekday)** | Automated calendar pricing engine offering lower rates for Tuesday–Thursday visits and premium rates for Saturday–Sunday and festival holidays. | Maximizes revenue on peak weekends while driving occupancy during empty weekdays. | **Medium** | `pricing_rules` DB table, calendar price badges. | **Important (P2)** |
| **Self-Service Rescheduling & Cancellation Portal** | Visitor portal accessible via SMS/WhatsApp magic link to reschedule their visit up to 48 hours prior with zero penalty. | Dramatically reduces support call volume; offers peace of mind to parents booking weeks in advance. | **Medium** | Secure token lookup, booking update API, capacity validation. | **Essential (P1)** |

---

### Domain 3: Farm Operations & Gate Management

| Feature Name | Description | Value to Business & Visitor | Complexity | Dependencies | Priority Tier |
| :--- | :--- | :--- | :---: | :--- | :---: |
| **Mobile Gate Scanner & Fast Check-In** | Lightweight web app for farm gate security staff to scan QR tickets in <2 seconds, verify headcount, and mark attendance. | Eliminates entry bottlenecks at 09:30 AM arrival rush; prevents ticket reuse and fraud. | **Small** | HTML5 Camera QR scanner, `POST /api/check-in` endpoint. | **Essential (P0)** |
| **Gate Balance POS Collection Logger** | 1-tap gate interface to log remaining 80% balance collected via cash or on-spot UPI QR code. | Prevents gate revenue shrinkage; ensures 100% financial reconciliation between booked and realized revenue. | **Small** | Cash collection schema, daily settlement report. | **Essential (P0)** |
| **Admin Blackout & Capacity Manager** | Interactive calendar for farm owners to click any date to block it (private retreat / plowing) or adjust session caps from 300 to 150. | Puts complete operational control into the hands of non-technical farm owners without modifying code. | **Medium** | Admin auth, `blackout_dates` & `capacities` tables. | **Essential (P0)** |
| **Staff Roster & Activity Guide Assignment** | Daily dashboard assigning specific farm guides (stewards) to specific activities (Pottery station: Ramesh; Tractor ride: Suresh). | Ensures smooth station coverage; prevents unattended activity points. | **Medium** | `staff` table, daily dispatch board. | **Optional (P3)** |

---

### Domain 4: Marketing, Growth & Retention

| Feature Name | Description | Value to Business & Visitor | Complexity | Dependencies | Priority Tier |
| :--- | :--- | :--- | :---: | :--- | :---: |
| **Automated WhatsApp Journey Engine** | Automated server-driven WhatsApp sequence: 1. Instant PDF confirmation; 2. T-24h weather & attire guide + Google Map pin; 3. T+2h photo upload link. | 98% open rate compared to email; eliminates lost drivers calling for directions on arrival morning. | **Medium** | Meta WhatsApp Business Cloud API or Gupshup webhook. | **Essential (P1)** |
| **Seasonal Crop Subscription Passes** | Multi-visit seasonal pass (e.g. "Kharif Sowing in July + Harvest in November + Pongal Harvest Festival in January"). | Increases customer lifetime value (LTV); creates predictable recurring revenue. | **Medium** | Pass code validation, multi-redemption tracking. | **Important (P2)** |
| **Farm-Fresh Harvest Pre-Booking (Take-Home Basket)** | Option during booking checkout to pre-order a 5kg basket of organic vegetables and cold-pressed sesame/groundnut oil harvested on visit morning. | Adds high-margin ancillary revenue (₹500–₹800 per booking); reinforces agricultural authenticity. | **Small** | Add-on line items in booking schema. | **High Value** |
| **Refer-a-Friend / School Ambassador Program** | Referral code generating a ₹200 discount for a friend and a free harvest hamper for the referring parent. | Drives viral word-of-mouth growth across Hyderabad gated community WhatsApp groups. | **Medium** | Referral attribution tracking, promo code validation. | **Optional (P3)** |

---

### Domain 5: Immersive & Sensory Innovation

| Feature Name | Description | Value to Business & Visitor | Complexity | Dependencies | Priority Tier |
| :--- | :--- | :--- | :---: | :--- | :---: |
| **Dual-Farm 360° VR Tour Switcher** | Upgrade the Three.js 360° tour to allow instant toggling between Bhongir (granite rock hills, paddy) and Moinabad (mango orchards, palms). | Eliminates confusion between the two locations; showcases the distinct topography of both farms. | **Small** | Second equirectangular 360° panorama image, scene switcher. | **Important (P2)** |
| **Seasonal Panorama Progression** | Showcase the farm across 3 seasons (Monsoon lush green, Winter harvest gold, Summer flowering) in the 360° viewer. | Educates visitors that agriculture is a living cycle; drives bookings outside the narrow winter window. | **Medium** | 3 seasonal equirectangular panoramas. | **Enhancement** |
| **Interactive Deccan Soil & Crop Simulator** | Educational canvas widget showing how Deccan red loamy soil, rainwater harvesting, and drip irrigation nourish millets and heirloom rice. | High pedagogical value for school curriculum integration; establishes thought leadership. | **Medium** | HTML5 Canvas animation or interactive SVG. | **Optional (P3)** |

---

### Domain 6: Business Intelligence & Executive Reporting

| Feature Name | Description | Value to Business & Visitor | Complexity | Dependencies | Priority Tier |
| :--- | :--- | :--- | :---: | :--- | :---: |
| **Executive Daily Operations & Revenue Dashboard** | High-level metrics view: Today's arrivals, monthly revenue, average group size, weekend occupancy %, and school conversion pipeline. | Enables farm leadership to make data-backed operational and marketing investment decisions. | **Medium** | SQL aggregations, Chart.js / Recharts. | **Essential (P1)** |
| **Gate Check-in Reconciler & No-Show Tracker** | Real-time tracking of booked vs checked-in visitors with automated follow-up for no-shows. | Recovers abandoned revenue; tracks operational throughput accurately. | **Small** | Real-time check-in status listener. | **Important (P2)** |
| **Customer Feedback & Net Promoter Score (NPS)** | Automated WhatsApp survey sent at 06:00 PM on visit day: *"Rate your farm day 1-10 + 1-tap Google Review redirect"*. | Generates hundreds of verified 5-star Google Reviews, bolstering organic search ranking. | **Small** | Webhook trigger, Google Place Review deep link. | **Essential (P1)** |

---

## 2. Phase 7 — Product Thinking & Strategic Alignment

### 1. The Core Psychology: Why Do City Families Book One Day Kissan?
1. **The "Concrete Guilt" of Urban Parents:** Hyderabad tech professionals (HITEC City, Gachibowli) work 10-hour days in air-conditioned glass towers. Their children spend 6+ hours daily on iPads and smartphones. Parents feel deep emotional guilt about disconnect from nature and ancestral roots.
2. **Tactile Decompression:** Walking barefoot on clay bunds, holding an earthen pot on a potter's wheel, and splashing in irrigation water channels provides deep somatic relaxation that a luxury mall or indoor arcade cannot replicate.
3. **The Nostalgia Factor:** Many Hyderabad parents grew up in villages across Telangana and Andhra Pradesh. One Day Kissan allows them to show their children: *"This is how your grandparents harvested paddy."*

### 2. Institutional Trust: How to Convert 500+ Hyderabad Schools
Schools do not book on aesthetics; **schools book on safety, hygiene, and curriculum compliance**. To dominate the school excursion market:
- **Safety Certifications:** Publish an explicit "School Safety & Emergency Protocol" tab with:
  - First-aid certified staff on-site.
  - 100% RO-purified drinking water testing certificates.
  - Dedicated fenced boundaries preventing children from wandering near open wells.
  - Student-to-Guide ratio guarantee (1 trained rural guide per 20 students).
- **Curriculum Mapping:** Map each farm activity directly to educational boards:
  - **CBSE Science Grade 4–8:** Photosynthesis, drip irrigation, nitrogen-fixing crops.
  - **ICSE Environmental Studies:** Sustainable soil management, vermicomposting.
  - **IB PYP (Primary Years Programme):** "Sharing the Planet" unit of inquiry.

### 3. Transparent All-Inclusive Pricing vs. Hidden Add-ons
**The Worst UX in Agritourism:** Arriving at a farm, paying entry, and then discovering that bullock cart rides cost ₹50 extra, pottery costs ₹100 extra, and tea is charged separately. This generates immediate resentment.
- **The Winning Strategy:** **Strictly All-Inclusive Day Passes.**
  - One transparent fee: ₹1,200 Adult / ₹800 Child.
  - Every activity (pottery, tractor, paddy planting, bullock cart), morning village breakfast, unlimited farm buffet lunch, and evening herbal chai is included.
  - Zero surprise charges at the farm.

### 4. Transitioning 1-Time Visitors into a Recurring Agritourism Community
- **Seasonal Harvest Calendars:** Invite visitors back 3 months later to harvest the specific paddy crop they planted during the monsoon.
- **Farm-to-Door Community Supported Agriculture (CSA):** Offer departing visitors an annual subscription for monthly deliveries of pure cold-pressed oils, raw forest honey, and unpolished millets grown on the farm.
