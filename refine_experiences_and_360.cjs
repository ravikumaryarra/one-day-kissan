const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// =========================================================================
// 1. UPDATE EXPERIENCES DATA & FILTERING LOGIC
// =========================================================================
// Search for renderExperienceCategory implementation
const oldRenderFnStart = `function renderExperienceCategory(catIndex) {
        currentExpCategory = catIndex;

        // Update category tab buttons
        expCatBtns.forEach(btn => {
          const btnCat = parseInt(btn.getAttribute('data-cat'), 10);
          const isActive = btnCat === catIndex;
          btn.classList.toggle('is-active', isActive);
          btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Filter items for category
        const catItems = EXPERIENCES.filter(item => item.catIndex === catIndex);
        if (!catItems.length) return;`;

const newRenderFnStart = `function renderExperienceCategory(catIndex) {
        currentExpCategory = catIndex;

        // Update category tab buttons
        expCatBtns.forEach(btn => {
          const btnCat = parseInt(btn.getAttribute('data-cat'), 10);
          const isActive = btnCat === catIndex;
          btn.classList.toggle('is-active', isActive);
          btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Apply 3-way Filter: Category + Audience + Location
        const catItems = EXPERIENCES.filter(item => {
          const matchCat = item.catIndex === catIndex;
          const matchAudience = (currentExpAudience === 'all') || (!item.audience) || item.audience.includes(currentExpAudience);
          const matchFarm = (currentExpFarm === 'both') || (!item.location) || item.location === 'both' || item.location === currentExpFarm;
          return matchCat && matchAudience && matchFarm;
        });

        if (!catItems.length) {
          if (expActivitiesGrid) {
            expActivitiesGrid.innerHTML = \`
              <div style="grid-column: 1 / -1; padding: 36px 20px; text-align: center; background: rgba(23, 59, 43, 0.04); border: 1px dashed rgba(23, 59, 43, 0.2); border-radius: 16px;">
                <p style="font-size: 14px; font-weight: 600; color: var(--forest); margin-bottom: 8px;">No activities match this specific filter combination.</p>
                <p style="font-size: 12.5px; color: #5a6654; margin-bottom: 14px;">Try selecting "All Audiences" or "Both Farms" to view all 25+ farm activities.</p>
                <button type="button" class="btn btn-outline" style="font-size: 12px; height: 34px;" onclick="document.querySelector('.exp-filter-pill[data-audience=\\'all\\']').click(); document.querySelector('.exp-loc-pill[data-filter-farm=\\'both\\']').click();">
                  Reset Filters
                </button>
              </div>
            \`;
          }
          return;
        }`;

if (html.includes(oldRenderFnStart)) {
  html = html.replace(oldRenderFnStart, newRenderFnStart);
  console.log('✅ 1. 3-way filtering (Category + Audience + Location) applied to renderExperienceCategory');
}

// Enhance activity cards HTML in renderExperienceCategory to display verified tags: Seasonality, Age, and Location
const oldCardHtmlPattern = `<span class="exp-card-tag">\${item.tag}</span>
              </div>
              <div class="exp-card-body">
                <div>
                  <h4 class="exp-card-title">\${item.title}</h4>
                  <p class="exp-card-desc">\${item.short}</p>
                </div>`;

const newCardHtmlPattern = `<span class="exp-card-tag">\${item.tag}</span>
              </div>
              <div class="exp-card-body">
                <div>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 6px;">
                    <span style="font-size: 10px; font-weight: 700; color: var(--forest); background: rgba(23, 59, 43, 0.08); padding: 2px 7px; border-radius: 4px;">\${item.season || 'Year-Round'}</span>
                    <span style="font-size: 10px; font-weight: 700; color: #6e5830; background: rgba(220, 166, 79, 0.15); padding: 2px 7px; border-radius: 4px;">\${item.age || 'All Ages'}</span>
                  </div>
                  <h4 class="exp-card-title">\${item.title}</h4>
                  <p class="exp-card-desc">\${item.short}</p>
                </div>`;

if (html.includes(oldCardHtmlPattern)) {
  html = html.replace(oldCardHtmlPattern, newCardHtmlPattern);
  console.log('✅ 2. Verified tags (Seasonality & Age) added to activity cards');
}

// =========================================================================
// 2. ENHANCE 360 TOUR SECTION WITH VIEWPOINT SWITCHER & HOTSPOTS
// =========================================================================
const old360ControlsTop = `<div class="farm360-atmo-pills" role="group" aria-label="Time of Day">
                <button type="button" class="atmo-pill is-active" data-atmo="morning">🌅 Morning</button>
                <button type="button" class="atmo-pill" data-atmo="golden">☀️ Golden</button>
                <button type="button" class="atmo-pill" data-atmo="monsoon">🌧️ Monsoon</button>
              </div>`;

const new360ControlsTop = `<div class="farm360-atmo-pills" role="group" aria-label="Time of Day">
                <button type="button" class="atmo-pill is-active" data-atmo="morning">🌅 Morning</button>
                <button type="button" class="atmo-pill" data-atmo="golden">☀️ Golden</button>
                <button type="button" class="atmo-pill" data-atmo="monsoon">🌧️ Monsoon</button>
              </div>

              <!-- Farm Viewpoint Selector -->
              <div class="farm360-viewpoint-pills" role="group" aria-label="Farm Viewpoint">
                <button type="button" class="atmo-pill is-active" data-viewpoint="bhongir" id="vpBhongirBtn">📍 Bhongir Farm</button>
                <button type="button" class="atmo-pill" data-viewpoint="moinabad" id="vpMoinabadBtn">📍 Moinabad Farm</button>
              </div>`;

if (html.includes(old360ControlsTop) && !html.includes('farm360-viewpoint-pills')) {
  html = html.replace(old360ControlsTop, new360ControlsTop);
  console.log('✅ 3. Farm Viewpoint Selector added to 360 Tour controls');
}

// Add contextual hotspots HTML overlay inside .farm360-live-canvas-wrap
const canvasWrapTarget = `<canvas id="farm360LiveCanvas"></canvas>`;
const hotspotsOverlayHTML = `<canvas id="farm360LiveCanvas"></canvas>

            <!-- Contextual Hotspots Layer -->
            <div class="farm360-hotspots-layer" id="farm360HotspotsLayer">
              <div class="farm360-hotspot" style="top: 42%; left: 32%;" data-title="Wetland Rice Paddy" data-desc="Step into flooded agricultural bunds for hands-on paddy transplanting and natural canal irrigation.">
                <span class="hotspot-pulse"></span>
                <span class="hotspot-pill">🌾 Wetland Rice Fields</span>
              </div>
              <div class="farm360-hotspot" style="top: 48%; left: 68%;" data-title="Desi Cattle Barn" data-desc="Meet indigenous Indian cattle, experience traditional feeding, grooming, and learn the science of natural soil enrichment.">
                <span class="hotspot-pulse"></span>
                <span class="hotspot-pill">🐂 Desi Cattle Barn</span>
              </div>
              <div class="farm360-hotspot" style="top: 60%; left: 50%;" data-title="Artisan Pottery Hearth" data-desc="Experience clay pottery spinning on manual village wheels and woodfire hearth baking with local artisans.">
                <span class="hotspot-pulse"></span>
                <span class="hotspot-pill">🏺 Pottery &amp; Village Hearth</span>
              </div>
            </div>

            <!-- Hotspot Info Modal / Tooltip Card -->
            <div class="farm360-hotspot-card" id="farm360HotspotCard" style="display: none;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                <h4 id="hotspotCardTitle" style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; font-weight: 700; color: var(--forest); margin: 0;">Hotspot</h4>
                <button type="button" id="closeHotspotCardBtn" style="background: none; border: none; font-size: 18px; line-height: 1; cursor: pointer; color: var(--forest);">&times;</button>
              </div>
              <p id="hotspotCardDesc" style="font-size: 12px; line-height: 1.45; color: #4a5445; margin: 6px 0 10px;">Description</p>
              <a href="#farm-activities" class="btn btn-gold" style="height: 30px; font-size: 11px; padding: 0 14px; width: 100%;">Explore Related Activity</a>
            </div>`;

if (html.includes(canvasWrapTarget) && !html.includes('farm360-hotspots-layer')) {
  html = html.replace(canvasWrapTarget, hotspotsOverlayHTML);
  console.log('✅ 4. Contextual Hotspots layer added to 360 Tour section');
}

// Add CSS for hotspots
const hotspotCSS = `
    /* 360 TOUR HOTSPOTS & VIEWPOINTS */
    .farm360-viewpoint-pills {
      display: inline-flex;
      background: rgba(14, 26, 17, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      padding: 3px;
      gap: 3px;
      backdrop-filter: blur(12px);
    }
    .farm360-hotspots-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 10;
    }
    .farm360-hotspot {
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: auto;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: transform .2s ease;
    }
    .farm360-hotspot:hover {
      transform: translate(-50%, -50%) scale(1.08);
    }
    .hotspot-pulse {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--harvest);
      box-shadow: 0 0 0 0 rgba(220, 166, 79, 0.7);
      animation: hotspotPulse 2s infinite;
      flex-shrink: 0;
    }
    @keyframes hotspotPulse {
      0% { box-shadow: 0 0 0 0 rgba(220, 166, 79, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(220, 166, 79, 0); }
      100% { box-shadow: 0 0 0 0 rgba(220, 166, 79, 0); }
    }
    .hotspot-pill {
      background: rgba(23, 59, 43, 0.88);
      color: #FAF7F0;
      border: 1px solid rgba(220, 166, 79, 0.45);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      white-space: nowrap;
    }
    .farm360-hotspot-card {
      position: absolute;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      width: min(340px, 90vw);
      background: #FFFFFF;
      border: 1px solid rgba(220, 166, 79, 0.5);
      border-radius: 16px;
      padding: 16px 18px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
      z-index: 25;
      animation: hotspotCardIn .25s ease-out;
    }
    @keyframes hotspotCardIn {
      from { opacity: 0; transform: translate(-50%, 10px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
`;

if (!html.includes('.farm360-hotspots-layer')) {
  html = html.replace('.farm360-integrated-section {', hotspotCSS + '\n    .farm360-integrated-section {');
  console.log('✅ 5. Hotspots CSS injected');
}

// =========================================================================
// 3. WIRE UP HOTSPOTS AND VIEWPOINT LISTENER IN JAVASCRIPT
// =========================================================================
const old360JsEnd = `// Keyboard Arrow Controls
      window.addEventListener('keydown', (e) => {
        if (!isInitialized || stageCard.classList.contains('is-off')) return;
        if (e.key === 'ArrowLeft') targetLon -= 15;
        if (e.key === 'ArrowRight') targetLon += 15;
        if (e.key === 'ArrowUp') targetLat = Math.min(85, targetLat + 10);
        if (e.key === 'ArrowDown') targetLat = Math.max(-85, targetLat - 10);
      });
    })();`;

const new360JsEnd = `// Keyboard Arrow Controls
      window.addEventListener('keydown', (e) => {
        if (!isInitialized || stageCard.classList.contains('is-off')) return;
        if (e.key === 'ArrowLeft') targetLon -= 15;
        if (e.key === 'ArrowRight') targetLon += 15;
        if (e.key === 'ArrowUp') targetLat = Math.min(85, targetLat + 10);
        if (e.key === 'ArrowDown') targetLat = Math.max(-85, targetLat - 10);
      });

      // Contextual Hotspots Interaction
      const hotspotEls = document.querySelectorAll('.farm360-hotspot');
      const hotspotCard = document.getElementById('farm360HotspotCard');
      const hotspotCardTitle = document.getElementById('hotspotCardTitle');
      const hotspotCardDesc = document.getElementById('hotspotCardDesc');
      const closeHotspotCardBtn = document.getElementById('closeHotspotCardBtn');

      hotspotEls.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
          e.stopPropagation();
          const title = hotspot.getAttribute('data-title');
          const desc = hotspot.getAttribute('data-desc');
          if (hotspotCardTitle) hotspotCardTitle.textContent = title;
          if (hotspotCardDesc) hotspotCardDesc.textContent = desc;
          if (hotspotCard) hotspotCard.style.display = 'block';
        });
      });

      if (closeHotspotCardBtn && hotspotCard) {
        closeHotspotCardBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          hotspotCard.style.display = 'none';
        });
      }

      // Farm Viewpoint Switcher (Bhongir vs Moinabad)
      const vpBhongirBtn = document.getElementById('vpBhongirBtn');
      const vpMoinabadBtn = document.getElementById('vpMoinabadBtn');

      function switchFarmViewpoint(vp) {
        if (vp === 'bhongir') {
          if (vpBhongirBtn) vpBhongirBtn.classList.add('is-active');
          if (vpMoinabadBtn) vpMoinabadBtn.classList.remove('is-active');
          switchAtmosphere('golden');
        } else {
          if (vpMoinabadBtn) vpMoinabadBtn.classList.add('is-active');
          if (vpBhongirBtn) vpBhongirBtn.classList.remove('is-active');
          switchAtmosphere('morning');
        }
      }

      if (vpBhongirBtn) vpBhongirBtn.addEventListener('click', () => switchFarmViewpoint('bhongir'));
      if (vpMoinabadBtn) vpMoinabadBtn.addEventListener('click', () => switchFarmViewpoint('moinabad'));
    })();`;

if (html.includes(old360JsEnd)) {
  html = html.replace(old360JsEnd, new360JsEnd);
  console.log('✅ 6. 360 Tour Hotspot & Viewpoint listeners wired in JS engine');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✨ Experiences & 360 Tour successfully refined!');
