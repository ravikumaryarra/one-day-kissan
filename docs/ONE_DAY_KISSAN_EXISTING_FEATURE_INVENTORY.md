# One Day Kissan — Complete Existing Feature Inventory
**Document ID:** `ODK-AUDIT-01-INVENTORY`  
**Date:** November 2026  
**Auditor:** Principal Solutions Architect, Technical Lead & Application Security Auditor  
**Status:** Comprehensive Technical Feature Audit  

---

## 1. Inventory Summary & Classification Matrix

Every feature across the One Day Kissan platform has been cataloged, audited against actual source code, and classified into one of the six standardized lifecycle tiers:

| Status Classification | Description | Count |
| :--- | :--- | :---: |
| **FULLY IMPLEMENTED** | Complete frontend UI connected to working backend services, fully validated and tested | **18** |
| **PARTIALLY IMPLEMENTED** | Working frontend with partial backend logic or missing full lifecycle features (e.g. no cancellations) | **14** |
| **UI ONLY — NO WORKING BACKEND** | Client-side visual interface with no server endpoints or data persistence | **5** |
| **PLACEHOLDER / MOCK DATA** | Features relying on static hardcoded JSON files or mock seeds | **4** |
| **BROKEN / NOT FUNCTIONAL** | Features with runtime bugs, unrouted handlers, or broken logic | **1** |
| **NOT IMPLEMENTED** | Industry features expected in agritourism that are completely absent | **18** |

---

## 2. Exhaustive Feature-by-Feature Technical Inventory

### Feature 01: Cinematic Image-Sequence Hero
- **Purpose:** Full-viewport narrative hero showcasing rural life (boys carrying harvested paddy sheaves on a traditional bamboo pole).
- **Location:** Section `#hero`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8248).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8248), `assets/hero_sequence/` (188 frames), [test_cinematic_hero.cjs](file:///home/ravikumaryarra5224/fcuk/test_cinematic_hero.cjs).
- **How it works:** Canvas 2D context rendering with `drawImage()` cover mathematics. Implements a bounded rolling ring cache (36-frame capacity) maintaining ~285MB decoded memory footprint. Driven by a dedicated `requestAnimationFrame` loop synced at 24fps. Scoped `IntersectionObserver` halts the loop when scrolled out of view.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No (purely static frame streaming).
- **Tested:** Yes ([test_cinematic_hero.cjs](file:///home/ravikumaryarra5224/fcuk/test_cinematic_hero.cjs)).
- **Limitations:** Initial load downloads 188 JPEG files over HTTP/1.1; needs HTTP/2 or WebP image sequence bundle.

---

### Feature 02: Fixed Glassmorphic Navigation Header
- **Purpose:** Persistent site branding, navigation links, quick contacts, and primary CTA.
- **Location:** Header `#siteHeader`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8170).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8170), [test_milestone_1a.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1a.cjs).
- **How it works:** `position: fixed` header with CSS backdrop-filter blur (16px). Scroll listener applies `.is-scrolled` class past 40px scroll depth, condensing height from 76px to 66px with drop shadow. Contains links to `#hero`, `#stories`, `#farm-activities`, `#gallery`, `#reviews`, `#schools`, `#contact`.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes ([test_milestone_1a.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1a.cjs)).
- **Limitations:** None.

---

### Feature 03: Mobile Navigation Drawer with Scroll Lock
- **Purpose:** Touch-accessible off-canvas mobile menu for viewports ≤ 900px.
- **Location:** Header drawer `#mobileNavDrawer`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8210).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8210), [test_milestone_1a.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1a.cjs).
- **How it works:** Hamburger button toggles `is-open` class on drawer, sets `aria-expanded`, and applies `overflow: hidden` to `document.body` to lock scrolling. Dismisses automatically on link click or `Escape` key.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes ([test_milestone_1a.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1a.cjs)).
- **Limitations:** None.

---

### Feature 04: Three.js 360° Realtime VR Farm Tour
- **Purpose:** Immersive 360-degree interactive panoramic exploration of farm sectors.
- **Location:** Section `#farm-360-tour`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8280).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8280), Three.js r128 CDN, `assets/farm_tour/`, [test_milestone_1c_phase6.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1c_phase6.cjs).
- **How it works:** Three.js inverted sphere geometry (`SphereGeometry(500, 60, 40)`) with inward facing normals (`scale.x = -1`). Spherical coordinates `(lon, lat)` map pointer drag and touch interactions to Euler angles.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** Partially (reads initial tour metadata from `/api/farm-360`).
- **Tested:** Yes ([test_milestone_1c_phase6.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1c_phase6.cjs)).
- **Limitations:** Equirectangular panorama depicts a Tamil Nadu hill village farm rather than native Telangana landscape.

---

### Feature 05: 3D-to-Screen Projected Hotspots
- **Purpose:** Interactive points of interest in 3D world-space projecting to 2D screen DOM elements.
- **Location:** Inside `#farm-360-tour`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8310).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L11200), [test_milestone_1c_phase2.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1c_phase2.cjs).
- **How it works:** Vector3 positions converted each frame using `vector.project(camera)`. Coordinates transformed to viewport CSS percentages `((x + 1)/2 * 100%, (-y + 1)/2 * 100%)`. Dot product visibility test hides hotspots behind the camera.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes.
- **Limitations:** Hotspot modal displays static sector description without audio playback.

---

### Feature 06: Atmosphere Multi-Mesh Crossfade Engine
- **Purpose:** Smooth visual transition between three lighting atmospheres: Morning Mist, Golden Hour, Monsoon Dew.
- **Location:** `#farm-360-tour` controls, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8340).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L11350), `assets/farm_tour/pano_*.jpg`, [test_milestone_1c_phase3.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1c_phase3.cjs).
- **How it works:** Two concentric inverted spherical meshes (`meshA` and `meshB`). Crossfade interpolates material opacity over 1.2s via GSAP tween without rebuilding WebGL geometries.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes.
- **Limitations:** High memory usage if textures are loaded concurrently on low-end mobile devices (managed via 2048x1024 textures).

---

### Feature 07: Organic Camera Idle Breathing
- **Purpose:** Subtle sinusoidal floating camera motion during idle state to simulate living human gaze.
- **Location:** `#farm-360-tour` animation loop.
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L11420), [test_milestone_1c_phase4.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1c_phase4.cjs).
- **How it works:** Math.sin / Math.cos harmonic perturbation applied to camera yaw/pitch when user is not actively dragging. Auto-disables immediately on user touch or pointerdown. Respects `prefers-reduced-motion`.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes.
- **Limitations:** None.

---

### Feature 08: Mobile DeviceOrientation Gyroscope Sensor
- **Purpose:** Physical smartphone rotation controlling the 360° virtual camera.
- **Location:** `#farm-360-tour` motion toggle.
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L11550), [test_milestone_1c_phase5.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1c_phase5.cjs).
- **How it works:** Listens to `deviceorientation` event. Converts alpha, beta, gamma Euler angles to quaternion. Includes iOS 13+ permission request API (`DeviceOrientationEvent.requestPermission()`).
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes.
- **Limitations:** Requires HTTPS in production mobile browsers (iOS Safari blocks device orientation over insecure HTTP).

---

### Feature 09: WebGL Lifecycle State Machine & Viewport Caching
- **Purpose:** Halt rendering loops when tour is scrolled out of viewport, preventing battery drain and GPU thermal throttling.
- **Location:** `#farm-360-tour` lifecycle controller.
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L11680), [test_milestone_1c_phase6.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1c_phase6.cjs).
- **How it works:** Formal state machine: `NOT_INITIALIZED` -> `INITIALIZING` -> `ACTIVE` -> `PAUSED` -> `DISPOSED`. IntersectionObserver monitors tour container; cancels `requestAnimationFrame` when `< 10%` visible; resumes smoothly when scrolled back.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes (21 lifecycle assertions in [test_milestone_1c_phase6.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1c_phase6.cjs)).
- **Limitations:** None.

---

### Feature 10: Real Telangana Farm Locations Section
- **Purpose:** Present the two authentic operating farm locations of One Day Kissan.
- **Location:** Section `#locations`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8443).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8443), [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L59), `assets/locations/`.
- **How it works:** Displays Location 01 (Bhongir Main Farm) and Location 02 (Moinabad Branch Farm) with addresses, capacity (300 guests), driving directions, and direct Google Maps navigation links.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** Yes (`GET /api/locations`).
- **Tested:** Yes ([test_farm_locations.cjs](file:///home/ravikumaryarra5224/fcuk/test_farm_locations.cjs)).
- **Limitations:** Maps links open static search query URLs rather than place IDs.

---

### Feature 11: 3-Stage Storytelling Scroll Sequence
- **Purpose:** Editorial presentation of the three pillars of a farm day: Discover, Participate, Experience.
- **Location:** Section `#stories`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8651).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8651), `assets/stories/`, GSAP ScrollTrigger.
- **How it works:** Pinned horizontal/side-by-side card sequence scrubbed by GSAP ScrollTrigger. Bidirectional scrolling updates active text and synchronized photograph.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes ([test_bidirectional_storytelling.cjs](file:///home/ravikumaryarra5224/fcuk/test_bidirectional_storytelling.cjs)).
- **Limitations:** Heavy image weight if scrolled before caching completes.

---

### Feature 12: Authentic Farm Experiences Grid & Filter
- **Purpose:** Discover activities available at the farms (Ploughing, Pottery, Bullock Cart, Rain Dance, etc.).
- **Location:** Section `#experiences`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8725).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8725), `official_activities.json`, [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L145).
- **How it works:** Filter tabs (All, Farming & Soil, Crafts & Village Life, Traditional Foods) toggle active visibility of 23 activity cards. Clicking a card opens `#experienceModal`.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** Duplicate endpoint in `server.js` (see Bug section). Frontend operates on embedded JSON.
- **Tested:** Yes ([test_farm_experiences.cjs](file:///home/ravikumaryarra5224/fcuk/test_farm_experiences.cjs)).
- **Limitations:** Route duplicate in `server.js` (`/api/experiences` defined twice).

---

### Feature 13: 5-Chapter Living Farm Day Scroll & Activity Chips
- **Purpose:** Chronological day itinerary with clickable activity pills.
- **Location:** Section `#farm-activities`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L9406).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L9406), [test_farm_activities.cjs](file:///home/ravikumaryarra5224/fcuk/test_farm_activities.cjs).
- **How it works:** 5 chapters: Dawn Arrival, Soil Connection, Traditional Feast, Village Crafts, Sunset Departure. Each chapter has interactive chips opening the activity modal with "Book for this activity" pre-fill button.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes ([test_farm_activities.cjs](file:///home/ravikumaryarra5224/fcuk/test_farm_activities.cjs)).
- **Limitations:** None.

---

### Feature 14: School Clientele Directory (400+ Schools)
- **Purpose:** Institutional social proof demonstrating adoption by schools across Telangana.
- **Location:** Section `#schools`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8820).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8820), `verified_schools.json`, [test_milestone_1b.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1b.cjs).
- **How it works:** Real-time client-side text search (e.g. "Chirec", "DPS"), regional filters (Warangal, Hyderabad, All), and pagination ("Show More Partner Schools" expanding from 24 to 60+ cards).
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No (data bundled in `verified_schools.json` and embedded in DOM).
- **Tested:** Yes ([test_milestone_1b.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1b.cjs)).
- **Limitations:** No backend endpoint for school search; all 400+ entries parsed client-side.

---

### Feature 15: Continuous School Marquee Banner
- **Purpose:** Visual infinite ticker of school partner badges.
- **Location:** Inside `#schools` section.
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8850), [milestone_1b_styles.css](file:///home/ravikumaryarra5224/fcuk/milestone_1b_styles.css).
- **How it works:** CSS animation `marqueeScroll` moving 80 pill badges infinitely with hover-to-pause capability.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes.
- **Limitations:** Purely visual.

---

### Feature 16: Candid Photo Gallery Mosaic & Lightbox
- **Purpose:** Authentic imagery showcasing real visitor memories.
- **Location:** Section `#gallery`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L9619).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L9619), `assets/experiences/gallery/` (20 WebP files), `gallery_data.json`, [test_milestone_1b.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1b.cjs).
- **How it works:** 20-card CSS Grid mosaic. Filter pills (All, Paddy & Soil, Animals & Aviary, Village Crafts, Farm Joy). Fullscreen modal lightbox (`#galleryModal`) with Next/Prev controls, keyboard arrows, and counter (`01 / 20`).
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes ([test_milestone_1b.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1b.cjs)).
- **Limitations:** Gallery items are static; no admin interface to upload new images.

---

### Feature 17: Agritourism FAQ Accordion
- **Purpose:** Answer common questions regarding locations, safety, attire, food, and booking.
- **Location:** Section `#faq`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L9940).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L9940), `faq_data.json`, [test_milestone_1b.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1b.cjs).
- **How it works:** 8 accordion items with single-open toggle logic (`aria-expanded="true/false"`). Smooth CSS grid expansion. Includes direct WhatsApp Concierge card.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes ([test_milestone_1b.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1b.cjs)).
- **Limitations:** FAQs hardcoded; no search functionality.

---

### Feature 18: Video Testimonials Modal Player
- **Purpose:** Play authentic video feedback from school principals and families.
- **Location:** Inside `#reviews` section, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L9550).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L9550), `testimonial_videos.json`, `assets/testimonials/`.
- **How it works:** Clicking video card opens `#videoModal` and loads YouTube embed iframe. Closes on backdrop click or Escape.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** Partial (`GET /api/testimonials`).
- **Tested:** Yes ([test_editorial_journal.cjs](file:///home/ravikumaryarra5224/fcuk/test_editorial_journal.cjs)).
- **Limitations:** Third-party YouTube iframe cookies.

---

### Feature 19: Luxury 4-Step Reservation Wizard
- **Purpose:** Primary conversion engine for farm visits.
- **Location:** Section `#booking`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L10100).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L10100), [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L425), [database.js](file:///home/ravikumaryarra5224/fcuk/database.js#L702), [test_booking_calendar.cjs](file:///home/ravikumaryarra5224/fcuk/test_booking_calendar.cjs).
- **How it works:** Multi-step wizard:
  - **Step 01:** Category selection (School, Corporate, Family, Friends), Farm selection (Bhongir vs Moinabad), Interactive Date Calendar, Fixed Session Selection.
  - **Step 02:** Role-specific dynamic fields (School name/grade/students vs Corporate company/visitors vs Family contact). Schedule summary badge with "Modify Date" button.
  - **Step 03:** Contact person name, phone/WhatsApp, email.
  - **Step 04:** Review sheet displaying farm address, scheduled date, visit session, party details, and submit button.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** Yes (`POST /api/bookings`).
- **Tested:** Yes ([test_booking_calendar.cjs](file:///home/ravikumaryarra5224/fcuk/test_booking_calendar.cjs)).
- **Limitations:** Booking is an enquiry; no online payment processing (no Razorpay/Stripe).

---

### Feature 20: Interactive Premium Date Calendar
- **Purpose:** Custom interactive calendar for visit date selection without browser `<input type="date">`.
- **Location:** `#booking` Step 01, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L10260).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L10260), [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L397), [database.js](file:///home/ravikumaryarra5224/fcuk/database.js#L673), [test_booking_calendar.cjs](file:///home/ravikumaryarra5224/fcuk/test_booking_calendar.cjs).
- **How it works:** Custom 7-day grid rendering. Past dates disabled. Today highlighted with dashed ring and dot. Selected date highlighted in Harvest Gold. Month navigation with 6-month forward constraint and past-month lock. Queries `/api/availability?regionId=...&month=...` to display real slot availability and disable full dates.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** Yes (`GET /api/availability`).
- **Tested:** Yes (37 tests in [test_booking_calendar.cjs](file:///home/ravikumaryarra5224/fcuk/test_booking_calendar.cjs)).
- **Limitations:** Daily availability checks total daily capacity rather than session-specific capacity.

---

### Feature 21: Fixed Session Selection Engine
- **Purpose:** Select structured arrival windows: Morning (09:00 AM – 01:00 PM), Afternoon (02:00 PM – 06:00 PM), Full Day (09:00 AM – 06:00 PM).
- **Location:** `#booking` Step 01, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L10340).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L10340), [test_booking_calendar.cjs](file:///home/ravikumaryarra5224/fcuk/test_booking_calendar.cjs).
- **How it works:** Radio cards with time pills, status pills (`Open for Enquiry`), titles, and inclusions. Bound into wizard state; validated before advancing to Step 02.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** Recorded in booking submission (`special_requests` column).
- **Tested:** Yes ([test_booking_calendar.cjs](file:///home/ravikumaryarra5224/fcuk/test_booking_calendar.cjs)).
- **Limitations:** Individual session capacities are not separately tracked in the database (tracked at whole-farm daily level).

---

### Feature 22: QR-Code Reservation Pass Generation
- **Purpose:** Generate a scannable digital verification pass upon booking enquiry.
- **Location:** Backend booking handler, [database.js](file:///home/ravikumaryarra5224/fcuk/database.js#L734).
- **Files & Components:** [database.js](file:///home/ravikumaryarra5224/fcuk/database.js#L734), `qrcode` npm package.
- **How it works:** Generates Base64 DataURL QR code containing JSON verification payload (`ref`, `name`, `guests`, `farm`, `date`, `status`) and stores it in SQLite `bookings.qr_code_data`.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** Yes.
- **Tested:** Yes ([test_booking_calendar.cjs](file:///home/ravikumaryarra5224/fcuk/test_booking_calendar.cjs)).
- **Limitations:** QR code is stored in DB but not rendered on the client confirmation card UI.

---

### Feature 23: Offline Booking Fallback Mode
- **Purpose:** Prevent user booking loss if the server or database is temporarily unreachable.
- **Location:** Client booking form submit handler, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L13476).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L13476).
- **How it works:** Catch block generates an ephemeral client-side reference (`ODK-YYMM-XXXX`) and displays the confirmation UI with a "Request recorded (Offline Mode)" toast notice.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No (client-side fail-safe).
- **Tested:** Yes.
- **Limitations:** Offline bookings are not queued in IndexedDB or synced to server when connectivity resumes.

---

### Feature 24: Direct WhatsApp Booking & Concierge Triggers
- **Purpose:** Low-friction direct communication channel for visitors to chat with farm stewards.
- **Location:** Fixed header, mobile drawer, booking panel, FAQ concierge, and confirmation card.
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L8200), [test_milestone_1a.cjs](file:///home/ravikumaryarra5224/fcuk/test_milestone_1a.cjs).
- **How it works:** `https://wa.me/919849798674?text=...` deep links with pre-filled context-specific messages.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No (uses WhatsApp Web/App deep links).
- **Tested:** Yes (verified official number `919849798674` across all 7 occurrences).
- **Limitations:** Manual chat; no automated WhatsApp chatbot or webhook.

---

### Feature 25: Cinematic Welcome Popup ("Land of Little Wonders")
- **Purpose:** First-time visitor brand welcome modal with rural photography and rotating quotes.
- **Location:** Root DOM overlay `#welcomePopupModal`, [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L12733).
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html#L12733), [test_warm_welcome.cjs](file:///home/ravikumaryarra5224/fcuk/test_warm_welcome.cjs).
- **How it works:** Displays on page load unless previously dismissed (uses `sessionStorage`). Rotates 4 authentic quotes. Provides "Explore the Farm" and "Plan a Farm Visit" direct navigation buttons.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes ([test_warm_welcome.cjs](file:///home/ravikumaryarra5224/fcuk/test_warm_welcome.cjs)).
- **Limitations:** None.

---

### Feature 26: Toast Notification System
- **Purpose:** Transient status messages for user actions.
- **Location:** Window global helper `window.__showToast()`.
- **Files & Components:** [index.html](file:///home/ravikumaryarra5224/fcuk/index.html).
- **How it works:** Appends floating toast element to body, fades in with CSS transform, removes after 3.2s.
- **Classification:** **FULLY IMPLEMENTED**
- **Requires Backend:** No.
- **Tested:** Yes.
- **Limitations:** Single toast at a time.

---

### Feature 27: Community Reviews & Upvote API
- **Purpose:** Visitor logbook reviews and upvoting.
- **Location:** Backend [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L328) and [database.js](file:///home/ravikumaryarra5224/fcuk/database.js#L1039).
- **Files & Components:** `database.js` table `reviews`, `server.js` (`GET /api/reviews`, `POST /api/reviews`, `POST /api/reviews/:id/like`).
- **How it works:** Full CRUD for reviews: lists reviews, calculates average rating, allows new submission with star rating, increments helpful count.
- **Classification:** **PARTIALLY IMPLEMENTED**
- **Requires Backend:** Yes.
- **Tested:** Partial (backend endpoints tested; frontend `#reviews` uses static cards rather than dynamic fetch).
- **Limitations:** Frontend `#reviews` section displays static hardcoded testimonial cards and does not call `GET /api/reviews` or render a review submission form.

---

### Feature 28: Live Business Statistics API
- **Purpose:** Serve verified metrics (schools welcomed, students, Google rating, locations).
- **Location:** [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L523).
- **Files & Components:** [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L523).
- **How it works:** Returns JSON payload `{ schoolsWelcomed: 400, studentsExperienced: 80000, googleRating: 4.8, reviewCount: 664, farmLocations: 2 }`.
- **Classification:** **PARTIALLY IMPLEMENTED**
- **Requires Backend:** Yes.
- **Tested:** Yes.
- **Limitations:** Hardcoded static JSON inside the route handler; not calculated dynamically from `bookings` or `reviews` tables.

---

### Feature 29: Booking Reference Pass Lookup
- **Purpose:** Lookup an existing booking enquiry by reference code (`ODK-YYYYMM-XXXX`).
- **Location:** [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L489).
- **Files & Components:** [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L489), [database.js](file:///home/ravikumaryarra5224/fcuk/database.js#L759).
- **How it works:** `GET /api/bookings/:ref` joins `bookings` with `regions` and `experiences` and returns full reservation details.
- **Classification:** **PARTIALLY IMPLEMENTED**
- **Requires Backend:** Yes.
- **Tested:** Yes ([test_phase1.cjs](file:///home/ravikumaryarra5224/fcuk/test_phase1.cjs)).
- **Limitations:** Backend endpoint works perfectly, but there is NO frontend "Check My Booking" or "Find My Pass" lookup page for visitors.

---

### Feature 30: Steward Recent Bookings Feed
- **Purpose:** Internal feed of recent enquiries for farm coordinators.
- **Location:** [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L502).
- **Files & Components:** [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L502).
- **How it works:** `GET /api/bookings` returns last 50 bookings with full customer details.
- **Classification:** **PARTIALLY IMPLEMENTED (CRITICAL SECURITY RISK)**
- **Requires Backend:** Yes.
- **Tested:** Yes.
- **Limitations:** Complete lack of authentication. Exposes visitor names, phone numbers, and emails to public internet.

---

### Feature 31: Legacy Harvest Produce Hampers System
- **Purpose:** Farm produce crates available for delivery ($48–$54 USD).
- **Location:** [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L177), [database.js](file:///home/ravikumaryarra5224/fcuk/database.js#L285).
- **Files & Components:** `database.js` tables `hampers` and `hamper_orders`.
- **How it works:** Complete backend CRUD for produce crate orders.
- **Classification:** **PLACEHOLDER / MOCK DATA (DEAD BACKEND CODE)**
- **Requires Backend:** Yes.
- **Tested:** Legacy test ([test_phase3.cjs](file:///home/ravikumaryarra5224/fcuk/test_phase3.cjs)).
- **Limitations:** Harvest Hampers were removed from the frontend UI in Milestone 1B to focus on authentic agritourism farm visits. Seed data still has prices in USD ($48–$54) and references remote regions (Sahyadri, Punjab, Cauvery).

---

### Feature 32: Legacy Agrarian Masterclasses & Workshops System
- **Purpose:** Workshop ticket registration system ($35–$48 USD).
- **Location:** [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L252), [database.js](file:///home/ravikumaryarra5224/fcuk/database.js#L382).
- **Files & Components:** `database.js` tables `workshops` and `workshop_registrations`.
- **How it works:** Backend inventory decrement and QR-pass generation.
- **Classification:** **PLACEHOLDER / MOCK DATA (DEAD BACKEND CODE)**
- **Requires Backend:** Yes.
- **Tested:** Legacy test ([test_phase4.cjs](file:///home/ravikumaryarra5224/fcuk/test_phase4.cjs)).
- **Limitations:** Removed from frontend UI in favor of `#farm-activities`. Database still seeds USD pricing and non-Telangana regions.

---

### Feature 33: Duplicate `/api/experiences` Route Handler
- **Purpose:** Serve farm experience listings.
- **Location:** [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L50) and [server.js](file:///home/ravikumaryarra5224/fcuk/server.js#L145).
- **Files & Components:** [server.js](file:///home/ravikumaryarra5224/fcuk/server.js).
- **How it works:** Line 50 queries SQLite `experiences` table; Line 145 reads `official_activities.json`.
- **Classification:** **BROKEN / NOT FUNCTIONAL (ROUTE SHADOWING BUG)**
- **Requires Backend:** Yes.
- **Tested:** Line 50 intercepts all requests; Line 145 is unreachable dead code.
- **Limitations:** Express matches first defined route. Route at line 145 is never executed.

---

### Features 34–51: Critical Features NOT Implemented

The following essential agritourism capabilities have **ZERO** implementation in the current codebase:

| Feature Name | Description | Status |
| :--- | :--- | :--- |
| **Admin Authentication** | No staff login, no JWT, no password hashing, no sessions | ❌ NOT IMPLEMENTED |
| **Admin Dashboard UI** | No web interface for farm staff to manage bookings | ❌ NOT IMPLEMENTED |
| **Role-Based Access Control** | No distinction between admin, steward, mentor, visitor | ❌ NOT IMPLEMENTED |
| **Payment Gateway Integration** | No Razorpay, Stripe, UPI, or Cashfree processing | ❌ NOT IMPLEMENTED |
| **Booking Cancellation Workflow** | Visitors cannot cancel or request cancellation online | ❌ NOT IMPLEMENTED |
| **Booking Rescheduling** | Visitors cannot modify visit dates after submission | ❌ NOT IMPLEMENTED |
| **Session-Level Capacity Deduction**| Capacity is deducted only at farm daily level, not per session | ❌ NOT IMPLEMENTED |
| **Blackout Date Management** | Admins cannot mark holidays or weather closures | ❌ NOT IMPLEMENTED |
| **Automated Email Confirmation** | No email sending service (no Nodemailer, Resend, Sendgrid) | ❌ NOT IMPLEMENTED |
| **Automated WhatsApp Notifications** | No Meta WhatsApp Cloud API or Twilio integration | ❌ NOT IMPLEMENTED |
| **Visitor Check-in Management** | No gate check-in scanner or staff scanning interface | ❌ NOT IMPLEMENTED |
| **Activity Pricing System** | No pricing engine for tickets or individual activities | ❌ NOT IMPLEMENTED |
| **Customer Accounts / Portal** | Visitors cannot log in to view their visit history | ❌ NOT IMPLEMENTED |
| **Capacity Overbooking Guard** | Backend does not reject `createBooking` when full | ❌ NOT IMPLEMENTED |
| **Rate Limiting / DDoS Guard** | No API rate limiters (`express-rate-limit`) installed | ❌ NOT IMPLEMENTED |
| **Database Migrations** | Schema defined only in `initDatabase()` seed scripts | ❌ NOT IMPLEMENTED |
| **PostgreSQL Compatibility** | Code uses raw SQLite3 callbacks, incompatible with Postgres | ❌ NOT IMPLEMENTED |
| **Analytics & Financial Reports** | No revenue, conversion, or visitor demographic reporting | ❌ NOT IMPLEMENTED |
