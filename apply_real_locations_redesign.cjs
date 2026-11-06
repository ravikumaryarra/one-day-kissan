const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace Terroir CSS with Locations CSS
const cssTargetStart = '/* 02.5 LIVING TERROIRS EXPLORER */';
const cssTargetEnd = '/* 03. FARMING EXPERIENCES (3-PANEL ACCORDION) */';

const newLocationsCSS = `/* 02.5 REAL FARM LOCATIONS (BHONGIR & MOINABAD) */
    .terroirs-section,
    .locations-section {
      position: relative;
      background: var(--ivory);
      padding: 96px 4vw 88px;
      z-index: 4;
      border-top: 1px solid rgba(32, 60, 43, 0.08);
    }
    .locations-container {
      max-width: 1180px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .locations-header {
      text-align: center;
      max-width: 720px;
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .locations-header .h2 {
      font-size: clamp(28px, 3.4vw, 44px);
      line-height: 1.2;
      color: var(--forest);
      font-family: "Playfair Display", Georgia, serif;
      margin: 0;
    }
    .locations-subtitle {
      font-size: clamp(15px, 1.4vw, 17px);
      line-height: 1.6;
      color: #4a5445;
      margin: 0;
    }

    /* Location Switcher Pills */
    .location-switcher {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px;
      background: rgba(32, 60, 43, 0.06);
      border: 1px solid rgba(32, 60, 43, 0.12);
      border-radius: 999px;
      margin-bottom: 36px;
      backdrop-filter: blur(8px);
    }
    .loc-tab {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 20px;
      border-radius: 999px;
      border: none;
      background: transparent;
      color: var(--forest);
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all .25s ease;
    }
    .loc-tab:hover {
      background: rgba(255, 255, 255, 0.7);
    }
    .loc-tab.is-active {
      background: var(--forest);
      color: #FFFFFF;
      box-shadow: 0 4px 16px rgba(27, 59, 34, 0.25);
    }
    .loc-tab-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--harvest);
      transition: transform .2s ease;
    }
    .loc-tab.is-active .loc-tab-dot {
      background: #E5C378;
      transform: scale(1.2);
    }
    .loc-tab-badge {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: .04em;
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(217, 168, 92, 0.22);
      color: var(--harvest);
    }
    .loc-tab.is-active .loc-tab-badge {
      background: rgba(255, 255, 255, 0.22);
      color: #FFFFFF;
    }

    /* Two Large Location Panels Grid */
    .locations-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 32px;
      width: 100%;
    }

    /* Location Panel */
    .location-panel {
      background: #FFFFFF;
      border-radius: 24px;
      border: 1px solid rgba(32, 60, 43, 0.12);
      box-shadow: 0 16px 44px rgba(18, 36, 25, 0.06);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
      position: relative;
      cursor: pointer;
    }
    .location-panel:hover {
      transform: translateY(-4px);
      box-shadow: 0 24px 56px rgba(18, 36, 25, 0.12);
      border-color: rgba(217, 168, 92, 0.45);
    }
    .location-panel.is-selected {
      border: 2px solid var(--harvest);
      box-shadow: 0 24px 60px rgba(18, 36, 25, 0.14), 0 0 0 4px rgba(217, 168, 92, 0.12);
    }

    /* Large Farm Media */
    .loc-media-wrap {
      position: relative;
      width: 100%;
      height: 310px;
      overflow: hidden;
      background: var(--forest);
    }
    .loc-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .65s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .location-panel:hover .loc-photo {
      transform: scale(1.04);
    }
    .loc-media-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(14, 28, 18, 0.72) 0%, rgba(14, 28, 18, 0.12) 50%, rgba(14, 28, 18, 0.35) 100%);
      pointer-events: none;
    }
    .loc-media-tags {
      position: absolute;
      top: 18px;
      left: 18px;
      right: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      pointer-events: none;
      z-index: 2;
    }
    .loc-tag {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 999px;
      background: rgba(14, 28, 18, 0.78);
      color: #FFFFFF;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .loc-badge-primary {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .05em;
      padding: 5px 14px;
      border-radius: 999px;
      background: var(--harvest);
      color: var(--forest);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
    }

    /* Location Details */
    .loc-details {
      padding: 28px 30px 30px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-between;
      gap: 18px;
      background: #FFFFFF;
    }
    .loc-meta-bar {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 1px solid rgba(32, 60, 43, 0.08);
      padding-bottom: 12px;
    }
    .loc-num-label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      color: var(--harvest);
      letter-spacing: .06em;
      text-transform: uppercase;
      margin-bottom: 2px;
    }
    .loc-name {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(26px, 2.5vw, 34px);
      color: var(--forest);
      margin: 0;
      line-height: 1.15;
    }
    .loc-badge-state {
      font-size: 12px;
      font-weight: 700;
      color: var(--forest);
      background: rgba(32, 60, 43, 0.08);
      padding: 4px 10px;
      border-radius: 999px;
    }

    /* Address Box */
    .loc-address-box {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: rgba(247, 245, 238, 0.85);
      border: 1px solid rgba(32, 60, 43, 0.08);
      border-radius: 14px;
      padding: 14px 16px;
    }
    .loc-pin-icon {
      color: var(--forest);
      flex-shrink: 0;
      margin-top: 2px;
    }
    .loc-address {
      font-style: normal;
      font-size: 13.5px;
      line-height: 1.55;
      color: #334032;
      margin: 0;
    }

    /* Visual Highlights List */
    .loc-features-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .loc-feature-item {
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 13px;
      color: #4a5445;
      line-height: 1.4;
    }
    .loc-feature-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--harvest);
      flex-shrink: 0;
    }

    /* Actions Bar */
    .loc-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding-top: 6px;
    }
    .loc-explore-btn {
      height: 42px;
      padding: 0 20px;
      font-size: 13.5px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 999px;
      border: 1.5px solid var(--forest);
      background: transparent;
      color: var(--forest);
      cursor: pointer;
      transition: all .2s ease;
    }
    .loc-explore-btn:hover {
      background: var(--forest);
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(27, 59, 34, 0.2);
    }
    .loc-maps-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 600;
      color: var(--forest);
      text-decoration: none;
      padding: 8px 12px;
      border-radius: 8px;
      transition: background .2s ease, color .2s ease;
    }
    .loc-maps-link:hover {
      background: rgba(32, 60, 43, 0.06);
      color: var(--harvest);
    }
    .loc-maps-link svg {
      transition: transform .2s ease;
    }
    .loc-maps-link:hover svg {
      transform: translate(2px, -2px);
    }

    `;

const cssStartIndex = html.indexOf(cssTargetStart);
const cssEndIndex = html.indexOf(cssTargetEnd);
if (cssStartIndex === -1 || cssEndIndex === -1) {
  throw new Error("Could not find CSS boundaries");
}
html = html.slice(0, cssStartIndex) + newLocationsCSS + html.slice(cssEndIndex);

// 2. Responsive CSS replacement in @media (max-width: 990px)
const oldResponsiveTarget = `      .terroirs-section {
        padding: 56px 4vw 56px;
      }
      .terroir-card {
        grid-template-columns: minmax(0, 1fr);
      }
      .terroir-content {
        padding: 24px 20px;
      }
      .terroirs-tabs {
        border-radius: 16px;
      }
      .terroir-specs-grid {
        grid-template-columns: minmax(0, 1fr);
      }
      .calendar-milestones {
        grid-template-columns: minmax(0, 1fr);
      }`;

const newResponsiveReplacement = `      .terroirs-section,
      .locations-section {
        padding: 56px 4vw 56px;
      }
      .locations-grid {
        grid-template-columns: minmax(0, 1fr);
        max-width: 620px;
        margin: 0 auto;
        gap: 24px;
      }
      .loc-media-wrap {
        height: 250px;
      }
      .loc-details {
        padding: 22px 20px 24px;
      }
      .location-switcher {
        width: 100%;
        max-width: 440px;
        justify-content: center;
      }
      .loc-actions {
        flex-direction: column;
        align-items: stretch;
      }
      .loc-explore-btn,
      .loc-maps-link {
        justify-content: center;
      }`;

if (html.includes(oldResponsiveTarget)) {
  html = html.replace(oldResponsiveTarget, newResponsiveReplacement);
  console.log("✅ Updated responsive media queries");
} else {
  console.warn("⚠️ Could not match exact responsive block");
}

// 3. HTML Section Replacement
const htmlTargetStart = '<!-- 02.5 LIVING TERROIRS & AGROFOREST ESTATES -->';
const htmlTargetEnd = '<!-- 03. FARMING EXPERIENCES (3-PANEL ACCORDION) -->';

const newLocationsHTML = `<!-- 02.5 REAL FARM LOCATIONS (BHONGIR & MOINABAD) -->
    <section class="locations-section" id="terroirs">
      <div class="locations-container">
        <div class="locations-header">
          <span class="pill">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            Farm Locations
          </span>
          <h2 class="h2">Two places. One unforgettable farm experience.</h2>
          <p class="locations-subtitle">Discover the joy of farming and rural life at our farms in Telangana.</p>
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
        </div>

        <!-- Two Large Location Panels (Side-by-Side Comparison) -->
        <div class="locations-grid" id="locationsGrid">
          <!-- LOCATION 01 – BHONGIR -->
          <article class="location-panel is-selected" id="panel-bhongir" data-loc="bhongir">
            <div class="loc-media-wrap">
              <img src="/assets/locations/bhongir_main_farm.jpg" alt="Bhongir Main Farm - Realistic Telangana farmland, open agricultural fields and rural surroundings" class="loc-photo" loading="lazy">
              <div class="loc-media-gradient"></div>
              <div class="loc-media-tags">
                <span class="loc-tag">LOCATION 01</span>
                <span class="loc-badge-primary">Main Farm</span>
              </div>
            </div>

            <div class="loc-details">
              <div class="loc-meta-bar">
                <div>
                  <span class="loc-num-label">Location 01</span>
                  <h3 class="loc-name">Bhongir</h3>
                </div>
                <span class="loc-badge-state">Main Farm • Telangana</span>
              </div>

              <div class="loc-address-box">
                <svg class="loc-pin-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <address class="loc-address">Hotel Vivera, Hyderabad–Warangal Highway, Bhongir Bypass, Bhongir, Telangana – 508116.</address>
              </div>

              <ul class="loc-features-list">
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span>Realistic Telangana farmland & open agricultural fields</span>
                </li>
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span>Traditional farming activities & rural surroundings</span>
                </li>
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span>Historic Bhongir countryside along Hyderabad–Warangal Highway</span>
                </li>
              </ul>

              <div class="loc-actions">
                <button type="button" class="btn loc-explore-btn" data-loc="bhongir">
                  <span>Explore Location</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/></svg>
                </button>
                <a href="https://www.google.com/maps/search/?api=1&query=Hotel+Vivera+Bhongir+Bypass+Telangana+508116" target="_blank" rel="noopener" class="loc-maps-link" title="Open Bhongir Main Farm in Google Maps">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </article>

          <!-- LOCATION 02 – MOINABAD -->
          <article class="location-panel" id="panel-moinabad" data-loc="moinabad">
            <div class="loc-media-wrap">
              <img src="/assets/locations/moinabad_branch_farm.jpg" alt="Moinabad Branch Farm - Telangana countryside, green agricultural fields and rural farm life" class="loc-photo" loading="lazy">
              <div class="loc-media-gradient"></div>
              <div class="loc-media-tags">
                <span class="loc-tag">LOCATION 02</span>
                <span class="loc-badge-primary">Branch Farm</span>
              </div>
            </div>

            <div class="loc-details">
              <div class="loc-meta-bar">
                <div>
                  <span class="loc-num-label">Location 02</span>
                  <h3 class="loc-name">Moinabad</h3>
                </div>
                <span class="loc-badge-state">Branch Farm • Telangana</span>
              </div>

              <div class="loc-address-box">
                <svg class="loc-pin-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <address class="loc-address">Kapil Agro Farms, Sriramnagar, Moinabad, Telangana – 501504.</address>
              </div>

              <ul class="loc-features-list">
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span>Telangana countryside & lush green agricultural fields</span>
                </li>
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span>Farm activities, natural vegetation & countryside farm life</span>
                </li>
                <li class="loc-feature-item">
                  <span class="loc-feature-dot"></span>
                  <span>Peaceful agro-farm retreat located near Sriramnagar, Moinabad</span>
                </li>
              </ul>

              <div class="loc-actions">
                <button type="button" class="btn loc-explore-btn" data-loc="moinabad">
                  <span>Explore Location</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/></svg>
                </button>
                <a href="https://www.google.com/maps/search/?api=1&query=Kapil+Agro+Farms+Sriramnagar+Moinabad+Telangana+501504" target="_blank" rel="noopener" class="loc-maps-link" title="Open Moinabad Branch Farm in Google Maps">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    `;

const htmlStartIndex = html.indexOf(htmlTargetStart);
const htmlEndIndex = html.indexOf(htmlTargetEnd);
if (htmlStartIndex === -1 || htmlEndIndex === -1) {
  throw new Error("Could not find HTML boundaries");
}
html = html.slice(0, htmlStartIndex) + newLocationsHTML + html.slice(htmlEndIndex);

// 4. Update Booking Form Option List
const oldBookingSelect = `<div class="booking-field booking-col-1">
            <label for="regionSelect">1. Agrarian Region</label>
            <select id="regionSelect" required>
              <option value="sahyadri" selected>Western Ghats Foothills (Sahyadri)</option>
              <option value="deccan">Deccan Agroforest Plateau</option>
              <option value="cauvery">Cauvery Delta Wetlands</option>
              <option value="punjab">Canal Plains Organic Estate</option>
            </select>
          </div>`;

const newBookingSelect = `<div class="booking-field booking-col-1">
            <label for="regionSelect">1. Farm Location</label>
            <select id="regionSelect" required>
              <option value="bhongir" selected>Bhongir — Main Farm (Hotel Vivera, NH 163)</option>
              <option value="moinabad">Moinabad — Branch Farm (Kapil Agro Farms)</option>
            </select>
          </div>`;

if (html.includes(oldBookingSelect)) {
  html = html.replace(oldBookingSelect, newBookingSelect);
  console.log("✅ Updated booking form regionSelect to Bhongir & Moinabad");
}

// 5. Update Review Modal Option List
const oldReviewSelect = `<select id="reviewRegion" required>
              <option value="sahyadri">Sahyadri Heritage Agroforest (Maharashtra)</option>
              <option value="deccan">Ananya & Devraj Living Farm (Deccan)</option>
              <option value="punjab">Singh Ancestral Farm (Punjab)</option>
              <option value="cauvery">Thanjavur Heirloom Rice Wetland (Cauvery)</option>
            </select>`;

const newReviewSelect = `<select id="reviewRegion" required>
              <option value="bhongir" selected>Bhongir — Main Farm (Telangana)</option>
              <option value="moinabad">Moinabad — Branch Farm (Telangana)</option>
            </select>`;

if (html.includes(oldReviewSelect)) {
  html = html.replace(oldReviewSelect, newReviewSelect);
  console.log("✅ Updated review modal reviewRegion to Bhongir & Moinabad");
}

// 6. Update regionNames map in JavaScript
const oldRegionNamesMap = `            sahyadri: 'Sahyadri Heritage Agroforest',
            deccan: 'Ananya & Devraj Living Farm',
            cauvery: 'Thanjavur Heirloom Rice Wetland',
            punjab: 'Singh Ancestral Wheat & Mustard Farm'`;

const newRegionNamesMap = `            bhongir: 'Bhongir (Main Farm)',
            moinabad: 'Moinabad (Branch Farm)',
            sahyadri: 'Bhongir (Main Farm)',
            deccan: 'Moinabad (Branch Farm)',
            cauvery: 'Bhongir (Main Farm)',
            punjab: 'Moinabad (Branch Farm)'`;

if (html.includes(oldRegionNamesMap)) {
  html = html.replace(oldRegionNamesMap, newRegionNamesMap);
  console.log("✅ Updated regionNames map in JavaScript");
}

// 7. Update Footer link text
html = html.replace('<a href="#terroirs">Living Terroirs</a>', '<a href="#terroirs">Farm Locations</a>');

// 8. Replace Terroirs JavaScript with Real Locations JavaScript
const scriptTargetStart = '// Phase 2: Living Terroirs Explorer';
const scriptTargetEnd = '// ==========================================\n      // PHASE 3: ORAL STORIES & HARVEST HAMPERS';

const newLocationsScript = `// ==========================================
      // REAL FARM LOCATIONS (BHONGIR & MOINABAD)
      // ==========================================
      let currentFarmLocation = 'bhongir';
      const locTabs = document.querySelectorAll('.loc-tab');
      const locPanels = document.querySelectorAll('.location-panel');
      const locExploreBtns = document.querySelectorAll('.loc-explore-btn');

      function switchFarmLocation(locId) {
        currentFarmLocation = locId;
        locTabs.forEach(tab => {
          const isActive = tab.getAttribute('data-loc') === locId;
          tab.classList.toggle('is-active', isActive);
          tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        locPanels.forEach(panel => {
          const isSelected = panel.getAttribute('data-loc') === locId;
          panel.classList.toggle('is-selected', isSelected);
        });
      }

      locTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const loc = tab.getAttribute('data-loc');
          if (loc) {
            switchFarmLocation(loc);
            const targetPanel = document.getElementById(\`panel-\${loc}\`);
            if (targetPanel && window.innerWidth <= 990) {
              targetPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        });
      });

      locPanels.forEach(panel => {
        panel.addEventListener('click', (e) => {
          if (e.target.closest('.loc-maps-link') || e.target.closest('.loc-explore-btn')) return;
          const loc = panel.getAttribute('data-loc');
          if (loc) switchFarmLocation(loc);
        });
      });

      locExploreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const loc = btn.getAttribute('data-loc');
          if (loc) {
            switchFarmLocation(loc);
            if (regionSelect) {
              regionSelect.value = loc;
              regionSelect.dispatchEvent(new Event('change'));
            }
            const bookingEl = document.getElementById('booking');
            if (bookingEl) {
              if (window.__lenis) window.__lenis.scrollTo(bookingEl, { duration: 1.4 });
              else bookingEl.scrollIntoView({ behavior: 'smooth' });
              const farmName = loc === 'bhongir' ? 'Bhongir (Main Farm)' : 'Moinabad (Branch Farm)';
              showToast(\`Selected: \${farmName}\`);
            }
          }
        });
      });

      `;

const scriptStartIndex = html.indexOf(scriptTargetStart);
const scriptEndIndex = html.indexOf(scriptTargetEnd);
if (scriptStartIndex === -1 || scriptEndIndex === -1) {
  throw new Error("Could not find Script boundaries: " + scriptStartIndex + ", " + scriptEndIndex);
}
html = html.slice(0, scriptStartIndex) + newLocationsScript + html.slice(scriptEndIndex);

// Save updated HTML
fs.writeFileSync('index.html', html, 'utf8');
console.log("🎉 Successfully transformed Terroirs section into Real Farm Locations in index.html!");
