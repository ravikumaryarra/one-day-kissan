const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// =========================================================================
// 1. UPDATE DESIGN TOKENS IN CSS
// =========================================================================
const oldTokens = `:root {
      --forest: #203C2B;
      --harvest: #D9A85C;
      --harvest-hover: #c79446;
      --ivory: #F5F1E8;
      --sage: #7B8D65;
      --charcoal: #292D26;
      --ink: #292D26;
      --pill: #E4EBD8;
      --pill-text: #203C2B;
      --line: rgba(32, 60, 43, 0.12);
      --bg: #F5F1E8;
      --radius: 22px;
    }`;

const newTokens = `:root {
      --forest: #173B2B;
      --harvest: #DCA64F;
      --harvest-hover: #c9933e;
      --ivory: #F4F0E6;
      --sage: #758A69;
      --charcoal: #232822;
      --ink: #232822;
      --pill: #E2E8D5;
      --pill-text: #173B2B;
      --line: rgba(23, 59, 43, 0.12);
      --bg: #F4F0E6;
      --radius: 22px;
    }`;

if (html.includes(oldTokens)) {
  html = html.replace(oldTokens, newTokens);
  console.log('✅ 1. Design tokens updated in :root');
}

// =========================================================================
// 2. HERO SECTION CSS STYLES FOR DUAL CTAS & LOCATION PILL
// =========================================================================
const heroExtraCSS = `
    /* HERO ACTION CLUSTER & LOCATION IDENTITY */
    .hero-location-pill {
      background: rgba(244, 240, 230, 0.92);
      border: 1px solid rgba(220, 166, 79, 0.45);
      color: var(--forest);
      box-shadow: 0 4px 16px rgba(23, 59, 43, 0.08);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .03em;
    }
    .hero-location-pill svg {
      fill: var(--harvest);
    }
    .hero-actions-cluster {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-top: 14px;
      z-index: 10;
      flex-wrap: wrap;
    }
    .hero-cta-primary {
      height: 48px;
      padding: 0 26px;
      font-size: 14.5px;
      font-weight: 700;
      background: var(--harvest);
      color: var(--forest);
      border: none;
      border-radius: 999px;
      box-shadow: 0 8px 24px rgba(220, 166, 79, 0.35);
      transition: all .25s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .hero-cta-primary:hover {
      background: #e5b35c;
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(220, 166, 79, 0.45);
    }
    .hero-cta-secondary {
      height: 48px;
      padding: 0 24px;
      font-size: 14.5px;
      font-weight: 600;
      background: rgba(244, 240, 230, 0.85);
      border: 1.5px solid var(--forest);
      color: var(--forest);
      border-radius: 999px;
      backdrop-filter: blur(8px);
      transition: all .25s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .hero-cta-secondary:hover {
      background: var(--forest);
      color: var(--ivory);
      transform: translateY(-2px);
    }
`;

// Insert hero styles if not present
if (!html.includes('.hero-cta-primary')) {
  html = html.replace('.hero-actions-cluster {', heroExtraCSS + '\n    .hero-actions-cluster {');
  console.log('✅ 2. Hero CTA styles injected');
}

// =========================================================================
// 3. UPGRADE HERO HTML
// =========================================================================
const heroStartIdx = html.indexOf('<section class="hero" id="hero">');
const heroEndIdx = html.indexOf('<!-- 01B. DEDICATED 360° VIRTUAL FARM TOUR SECTION -->');

if (heroStartIdx !== -1 && heroEndIdx !== -1) {
  const currentHeroHTML = html.substring(heroStartIdx, heroEndIdx);
  const upgradedHeroHTML = `<!-- 01. IMMERSIVE HERO -->
    <section class="hero" id="hero">
      <nav class="nav">
        <a href="#hero" class="brand" aria-label="One Day Kissan home">
          <!-- Sprout Monogram SVG -->
          <svg viewBox="0 0 30 24" aria-hidden="true">
            <path d="M15 22V12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M15 12C15 6 9 3 4 5C4 11 9 14 15 12Z" fill="currentColor" opacity="0.9"/>
            <path d="M15 10C15 5 21 2 26 4C26 10 21 12 15 10Z" fill="var(--forest)" stroke="currentColor" stroke-width="1.2"/>
          </svg>
          <span>One Day Kissan</span>
        </a>
      </nav>

      <div class="hero-content">
        <span class="pill hero-location-pill">
          <svg viewBox="0 0 24 24" width="13" height="13"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <span>Telangana, India • Bhongir &amp; Moinabad</span>
        </span>
        <h1 id="heroTitle" class="split">A day away from<br><em>the ordinary.</em></h1>
        <p class="hero-subtitle">Step into the rhythm of rural life. Discover farming, reconnect with nature and create memories that stay with you.</p>
        
        <!-- Primary & Secondary CTAs -->
        <div class="hero-actions-cluster">
          <a href="#farm-activities" class="btn btn-gold hero-cta-primary" id="heroExploreBtn">
            <span>Explore Farm Experiences</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#booking" class="btn btn-outline hero-cta-secondary" id="heroBookBtn">
            <span>Plan Your Farm Visit</span>
          </a>
        </div>
      </div>

      <div class="hero-media">
        <video id="heroVideo" autoplay muted loop playsinline preload="auto" poster="/assets/locations/bhongir_main_farm.jpg" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261021_093331_5998f443-1b9c-4b62-820c-8219c73c72c4.mp4"></video>
      </div>

      <div class="hero-glass" id="heroGlass"></div>
    </section>

    `;

  html = html.substring(0, heroStartIdx) + upgradedHeroHTML + html.substring(heroEndIdx);
  console.log('✅ 3. Hero HTML upgraded with authentic countryside visuals, location pill & dual CTAs');
}

// =========================================================================
// 4. FIX GSAP TARGET WARNING IN SCRIPT
// =========================================================================
if (html.includes("introTl.to('.hero-actions-cluster, .hero-corner-tour-pill'")) {
  html = html.replace(
    "introTl.to('.hero-actions-cluster, .hero-corner-tour-pill', {",
    "introTl.to('.hero-actions-cluster', {"
  );
  html = html.replace(
    "gsap.set('.hero-actions-cluster, .hero-corner-tour-pill', { opacity: 0, y: 16 });",
    "gsap.set('.hero-actions-cluster', { opacity: 0, y: 16 });"
  );
  console.log('✅ 4. GSAP intro animation target fixed');
}

// =========================================================================
// 5. REMOVE REDUNDANT SECTION <section class="loop" id="loop">
// =========================================================================
const loopStart = html.indexOf('<!-- 03. FARMING EXPERIENCES (3-PANEL ACCORDION) -->');
const storiesStart = html.indexOf('<!-- 04. STORIES ROOTED IN THE SOIL');

if (loopStart !== -1 && storiesStart !== -1 && loopStart < storiesStart) {
  html = html.substring(0, loopStart) + html.substring(storiesStart);
  console.log('✅ 5. Redundant #loop accordion removed; #stories is now the unified 3-stage storytelling section');
}

// =========================================================================
// 6. UPGRADE SECTION C — FARM LOCATIONS (#terroirs) WITH TRAVEL, FACILITIES & COMPARISON
// =========================================================================
const locStartIdx = html.indexOf('<!-- 02.5 REAL FARM LOCATIONS (BHONGIR & MOINABAD) -->');
const locEndIdx = html.indexOf('<!-- 04. STORIES ROOTED IN THE SOIL');

if (locStartIdx !== -1 && locEndIdx !== -1) {
  const upgradedLocationsHTML = `<!-- 02.5 REAL FARM LOCATIONS (BHONGIR & MOINABAD) -->
    <section class="locations-section" id="terroirs">
      <div class="locations-container">
        <div class="locations-header">
          <span class="pill">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            Verified Farm Locations
          </span>
          <h2 class="h2">Two places. One unforgettable farm experience.</h2>
          <p class="locations-subtitle">Discover real farming and countryside hospitality at our two verified farms in Telangana.</p>
        </div>

        <!-- Interactive Location Switcher Pills -->
        <div class="location-switcher" role="tablist" aria-label="Farm Locations" id="locationSwitcher">
          <button type="button" class="loc-tab is-active" role="tab" aria-selected="true" data-loc="bhongir" id="tab-bhongir">
            <span class="loc-tab-dot"></span>
            <span class="loc-tab-name">Bhongir</span>
            <span class="loc-tab-badge">Main Farm</span>
          </button>
          <button type="button" class="loc-tab" role="tab" aria-selected="false" data-loc="moinabad" id="tab-moinabad">
            <span class="loc-tab-dot"></span>
            <span class="loc-tab-name">Moinabad</span>
            <span class="loc-tab-badge">Branch Farm</span>
          </button>
          <button type="button" class="loc-tab" role="tab" aria-selected="false" data-loc="compare" id="tab-compare">
            <span class="loc-tab-dot" style="background: var(--harvest);"></span>
            <span class="loc-tab-name">Compare Both Farms</span>
          </button>
        </div>

        <!-- Two Large Location Panels (Side-by-Side Comparison) -->
        <div class="locations-grid" id="locationsGrid">
          <!-- LOCATION 01 – BHONGIR -->
          <article class="location-panel is-selected" id="panel-bhongir" data-loc="bhongir">
            <div class="loc-media-wrap">
              <img src="/assets/locations/bhongir_main_farm.jpg" alt="Bhongir Main Farm - Open agricultural fields and rural Telangana landscape" class="loc-photo" loading="lazy">
              <div class="loc-media-gradient"></div>
              <div class="loc-media-tags">
                <span class="loc-tag">LOCATION 01</span>
                <span class="loc-badge-primary">Main Farm</span>
              </div>
            </div>

            <div class="loc-details">
              <div class="loc-meta-bar">
                <div>
                  <span class="loc-num-label">Location 01 • Main Hub</span>
                  <h3 class="loc-name">Bhongir</h3>
                </div>
                <span class="loc-badge-state">Yadadri Bhuvanagiri • Telangana</span>
              </div>

              <!-- Address Box -->
              <div class="loc-address-box">
                <svg class="loc-pin-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <address class="loc-address">Hotel Vivera, Hyderabad–Warangal Highway, Bhongir Bypass, Bhongir, Telangana – 508116.</address>
              </div>

              <!-- Travel & Route Info -->
              <div class="loc-travel-info" style="background: rgba(23, 59, 43, 0.05); border: 1px solid rgba(23, 59, 43, 0.1); border-radius: 12px; padding: 10px 14px; margin-bottom: 14px; font-size: 12.5px; display: flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--forest)"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
                <span><strong>Travel:</strong> ~55 km from Hyderabad (60–75 min via NH 163 Warangal Highway). Direct highway bypass access.</span>
              </div>

              <!-- Verified Features List -->
              <ul class="loc-features-list">
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span><strong>Farm Terroir:</strong> Expansive wetland paddy fields, traditional canal irrigation & historic Deccan boulder scenery.</span>
                </li>
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span><strong>Core Highlights:</strong> Working rice mill lifecycle, desi cattle ploughing, potter's wheel, and open mud sports grounds.</span>
                </li>
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span><strong>Verified Facilities:</strong> Shaded dining pavilions (seats 300+), clean washrooms, potable RO water & bus parking.</span>
                </li>
              </ul>

              <div class="loc-actions">
                <a href="#farm-activities" class="btn loc-explore-btn" data-filter-loc="bhongir">
                  <span>View Bhongir Activities</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/></svg>
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=Hotel+Vivera+Bhongir+Bypass+Telangana+508116" target="_blank" rel="noopener noreferrer" class="loc-maps-link" title="Open Bhongir Main Farm in Google Maps">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                  <span>Google Maps Directions</span>
                </a>
              </div>
            </div>
          </article>

          <!-- LOCATION 02 – MOINABAD -->
          <article class="location-panel" id="panel-moinabad" data-loc="moinabad">
            <div class="loc-media-wrap">
              <img src="/assets/locations/moinabad_branch_farm.jpg" alt="Moinabad Branch Farm - Lush Telangana agro-forest, fruit orchards and countryside paths" class="loc-photo" loading="lazy">
              <div class="loc-media-gradient"></div>
              <div class="loc-media-tags">
                <span class="loc-tag">LOCATION 02</span>
                <span class="loc-badge-primary">Branch Farm</span>
              </div>
            </div>

            <div class="loc-details">
              <div class="loc-meta-bar">
                <div>
                  <span class="loc-num-label">Location 02 • Agro-Forest Hub</span>
                  <h3 class="loc-name">Moinabad</h3>
                </div>
                <span class="loc-badge-state">Ranga Reddy • Telangana</span>
              </div>

              <!-- Address Box -->
              <div class="loc-address-box">
                <svg class="loc-pin-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <address class="loc-address">Kapil Agro Farms, Sriramnagar, Moinabad, Telangana – 501504.</address>
              </div>

              <!-- Travel & Route Info -->
              <div class="loc-travel-info" style="background: rgba(23, 59, 43, 0.05); border: 1px solid rgba(23, 59, 43, 0.1); border-radius: 12px; padding: 10px 14px; margin-bottom: 14px; font-size: 12.5px; display: flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--forest)"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
                <span><strong>Travel:</strong> ~25 km from Gachibowli / Financial District (40–50 min via Chevella Road). Convenient weekend retreat.</span>
              </div>

              <!-- Verified Features List -->
              <ul class="loc-features-list">
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span><strong>Farm Terroir:</strong> Verdant agro-orchards, mango groves, coconut canopies & bio-rich compost soil patches.</span>
                </li>
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span><strong>Core Highlights:</strong> Exotic and native bird aviary, country tractor trails, vegetable picking, and farm-to-fork trails.</span>
                </li>
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span><strong>Verified Facilities:</strong> Shaded outdoor pavilion, clean washrooms, potable water, and dedicated coach parking.</span>
                </li>
              </ul>

              <div class="loc-actions">
                <a href="#farm-activities" class="btn loc-explore-btn" data-filter-loc="moinabad">
                  <span>View Moinabad Activities</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/></svg>
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=Kapil+Agro+Farms+Sriramnagar+Moinabad+Telangana+501504" target="_blank" rel="noopener noreferrer" class="loc-maps-link" title="Open Moinabad Branch Farm in Google Maps">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                  <span>Google Maps Directions</span>
                </a>
              </div>
            </div>
          </article>
        </div>

        <!-- Location Comparison Matrix (Expandable) -->
        <div class="loc-compare-box" id="locCompareBox" style="display: none; margin-top: 32px; background: #FFF; border: 1px solid rgba(23, 59, 43, 0.14); border-radius: 20px; padding: 24px 28px; box-shadow: 0 10px 30px rgba(23, 59, 43, 0.06);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h4 style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: var(--forest); margin: 0;">Farm Comparison Summary</h4>
            <span style="font-size: 12px; font-weight: 700; color: var(--harvest);">Both Farms Operate in Telangana</span>
          </div>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
              <thead>
                <tr style="border-bottom: 2px solid rgba(23, 59, 43, 0.15);">
                  <th style="padding: 10px 14px; color: var(--forest);">Feature</th>
                  <th style="padding: 10px 14px; color: var(--forest);">Main Farm — Bhongir</th>
                  <th style="padding: 10px 14px; color: var(--forest);">Branch Farm — Moinabad</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(23, 59, 43, 0.08);">
                  <td style="padding: 10px 14px; font-weight: 700;">Distance from Hyderabad</td>
                  <td style="padding: 10px 14px;">~55 km (60–75 min via NH 163 Warangal Highway)</td>
                  <td style="padding: 10px 14px;">~25 km (40–50 min via Chevella Road)</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(23, 59, 43, 0.08);">
                  <td style="padding: 10px 14px; font-weight: 700;">Primary Agricultural Vibe</td>
                  <td style="padding: 10px 14px;">Open wetland paddies, canal irrigation & historical countryside</td>
                  <td style="padding: 10px 14px;">Lush mango orchards, agro-forestry & shady tree canopies</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(23, 59, 43, 0.08);">
                  <td style="padding: 10px 14px; font-weight: 700;">Signature Experiences</td>
                  <td style="padding: 10px 14px;">Paddy mud transplanting, rice mill, clay pottery & bullock cart</td>
                  <td style="padding: 10px 14px;">Orchard trail, walk-in bird aviary, vegetable picking & tractor trail</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(23, 59, 43, 0.08);">
                  <td style="padding: 10px 14px; font-weight: 700;">Ideal Visitors</td>
                  <td style="padding: 10px 14px;">Large school field trips, institutional batches & cultural tours</td>
                  <td style="padding: 10px 14px;">Families with kids, weekend friends & corporate team retreats</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-weight: 700;">Daily Capacity</td>
                  <td style="padding: 10px 14px;">300 Visitors</td>
                  <td style="padding: 10px 14px;">300 Visitors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>

    `;

  html = html.substring(0, locStartIdx) + upgradedLocationsHTML + html.substring(locEndIdx);
  console.log('✅ 6. Section C (Farm Locations) upgraded with travel times, route info, verified facilities & comparison');
}

// =========================================================================
// 7. UPGRADE SECTION E — ACTIVITIES DISCOVERY WITH AUDIENCE & LOCATION FILTERS
// =========================================================================
const expHeaderTarget = `<div class="exp-category-nav" role="tablist" aria-label="Farm Experience Categories">`;
const upgradedExpFilterHTML = `<!-- Dual Filter Controls: Audience & Location -->
        <div class="exp-filters-container" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
          <!-- Audience Filter Pills -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-size: 11px; font-weight: 700; color: var(--forest); text-transform: uppercase; letter-spacing: .06em; margin-right: 4px;">Audience:</span>
            <button type="button" class="exp-filter-pill is-active" data-audience="all">All Audiences</button>
            <button type="button" class="exp-filter-pill" data-audience="school">🏫 Schools &amp; Students</button>
            <button type="button" class="exp-filter-pill" data-audience="family">👨‍👩‍👧‍👦 Families &amp; Kids</button>
            <button type="button" class="exp-filter-pill" data-audience="corporate">🏢 Corporate Teams</button>
          </div>
          <!-- Location Filter Pills -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-size: 11px; font-weight: 700; color: var(--forest); text-transform: uppercase; letter-spacing: .06em; margin-right: 4px;">Farm:</span>
            <button type="button" class="exp-loc-pill is-active" data-filter-farm="both">Both Farms (Bhongir &amp; Moinabad)</button>
            <button type="button" class="exp-loc-pill" data-filter-farm="bhongir">📍 Main Farm — Bhongir</button>
            <button type="button" class="exp-loc-pill" data-filter-farm="moinabad">📍 Branch Farm — Moinabad</button>
          </div>
        </div>

        <div class="exp-category-nav" role="tablist" aria-label="Farm Experience Categories">`;

if (html.includes(expHeaderTarget) && !html.includes('exp-filters-container')) {
  html = html.replace(expHeaderTarget, upgradedExpFilterHTML);
  console.log('✅ 7. Section E upgraded with Audience & Location filter controls');
}

// Add CSS for filter pills if not present
const filterPillCSS = `
    .exp-filter-pill, .exp-loc-pill {
      background: rgba(244, 240, 230, 0.9);
      border: 1px solid rgba(23, 59, 43, 0.18);
      color: var(--forest);
      font-family: inherit;
      font-size: 11.5px;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: all .2s;
    }
    .exp-filter-pill:hover, .exp-loc-pill:hover {
      background: var(--pill);
      border-color: var(--forest);
    }
    .exp-filter-pill.is-active, .exp-loc-pill.is-active {
      background: var(--forest);
      color: var(--ivory);
      border-color: var(--forest);
      box-shadow: 0 2px 8px rgba(23, 59, 43, 0.2);
    }
`;
if (!html.includes('.exp-filter-pill')) {
  html = html.replace('.exp-category-nav {', filterPillCSS + '\n    .exp-category-nav {');
}

// =========================================================================
// 8. ADD WHATSAPP DIRECT BUTTON IN BOOKING SECTION
// =========================================================================
const whatsappTarget = `<div class="luxury-card-header">`;
const whatsappButtonHTML = `<div class="luxury-whatsapp-bar" style="margin-bottom: 16px;">
                <a href="https://wa.me/919849798674?text=Hello%20One%20Day%20Kissan,%20I%20would%20like%20to%20plan%20a%20farm%20visit." target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(37, 211, 102, 0.15); border: 1px solid rgba(37, 211, 102, 0.4); color: #25D366; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 999px; text-decoration: none; transition: background .2s;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  <span>Quick Enquiries on WhatsApp</span>
                </a>
              </div>
              <div class="luxury-card-header">`;

if (html.includes(whatsappTarget) && !html.includes('luxury-whatsapp-bar')) {
  html = html.replace(whatsappTarget, whatsappButtonHTML);
  console.log('✅ 8. WhatsApp direct enquiry button added to Booking section');
}

// =========================================================================
// 9. UPGRADE LOCATIONS SCRIPT (COMPARISON TOGGLE & MAP LINKS)
// =========================================================================
const locScriptTarget = `// Location switcher tab listener
        locTabs.forEach(tab => {`;

const upgradedLocScript = `// Comparison Box Toggle
        const tabCompare = document.getElementById('tab-compare');
        const locCompareBox = document.getElementById('locCompareBox');

        if (tabCompare && locCompareBox) {
          tabCompare.addEventListener('click', () => {
            const isShowing = locCompareBox.style.display === 'block';
            locCompareBox.style.display = isShowing ? 'none' : 'block';
            tabCompare.classList.toggle('is-active', !isShowing);
            if (!isShowing) {
              locCompareBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          });
        }

        // Location switcher tab listener
        locTabs.forEach(tab => {`;

if (html.includes(locScriptTarget) && !html.includes('tabCompare.addEventListener')) {
  html = html.replace(locScriptTarget, upgradedLocScript);
  console.log('✅ 9. Location comparison toggle logic added to script');
}

// =========================================================================
// 10. UPGRADE EXPERIENCES SCRIPT WITH AUDIENCE & LOCATION FILTERING
// =========================================================================
const expScriptSearch = `// Experience Browser State
      let currentExpCategory = 0;
      let activeExpModalItem = null;`;

const upgradedExpScript = `// Experience Browser State
      let currentExpCategory = 0;
      let currentExpAudience = 'all';
      let currentExpFarm = 'both';
      let activeExpModalItem = null;

      // Filter controls
      const audiencePills = document.querySelectorAll('.exp-filter-pill');
      const farmPills = document.querySelectorAll('.exp-loc-pill');

      audiencePills.forEach(pill => {
        pill.addEventListener('click', () => {
          audiencePills.forEach(p => p.classList.remove('is-active'));
          pill.classList.add('is-active');
          currentExpAudience = pill.getAttribute('data-audience') || 'all';
          renderExperienceCategory(currentExpCategory);
        });
      });

      farmPills.forEach(pill => {
        pill.addEventListener('click', () => {
          farmPills.forEach(p => p.classList.remove('is-active'));
          pill.classList.add('is-active');
          currentExpFarm = pill.getAttribute('data-filter-farm') || 'both';
          renderExperienceCategory(currentExpCategory);
        });
      });`;

if (html.includes(expScriptSearch) && !html.includes('currentExpAudience')) {
  html = html.replace(expScriptSearch, upgradedExpScript);
  console.log('✅ 10. Experience filter variables and event listeners added to script');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('🎉 One Day Kissan website successfully upgraded to premium experience!');
