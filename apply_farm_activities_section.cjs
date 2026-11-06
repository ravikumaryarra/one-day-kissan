const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log('1. Replacing Masterclasses CSS with Farm Activities (Explore Life at the Farm) CSS...');

// CSS Replacement: Find /* Masterclasses Section */ through end of .workshop-price-sub
const cssStartMarker = '    /* Masterclasses Section */';
const cssEndMarker = '    /* Verified Community Reviews Section */';

const startIndex = html.indexOf(cssStartMarker);
const endIndex = html.indexOf(cssEndMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find CSS markers:', { startIndex, endIndex });
  process.exit(1);
}

const newCSS = `    /* 04C. EXPLORE LIFE AT THE FARM (PREMIUM 5-CHAPTER SIDE-BY-SIDE SCROLL EXPERIENCE) */
    .farm-life-scroll-section {
      position: relative;
      height: 480vh;
      background: var(--ivory);
      border-top: 1px solid rgba(32, 60, 43, 0.08);
      z-index: 3;
    }

    /* Pinned Sticky Viewport (Locks in place as user scrolls through the 480vh) */
    .farm-life-sticky-wrap {
      position: sticky;
      top: 0;
      height: 100vh;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--ivory);
    }

    .farm-life-editorial-container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 4vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      box-sizing: border-box;
    }

    /* Section Editorial Header */
    .farm-life-editorial-header {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .farm-life-section-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(26px, 3vw, 40px);
      color: var(--forest);
      line-height: 1.18;
      margin: 0;
      max-width: 840px;
    }

    /* Main Two-Column Side-by-Side Grid */
    .farm-life-side-by-side {
      display: grid;
      grid-template-columns: minmax(320px, 0.85fr) minmax(480px, 1.35fr);
      gap: 5vw;
      align-items: center;
      width: 100%;
    }

    /* LEFT COLUMN: Oversized Chapter Numbers */
    .farm-life-col-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }
    .farm-life-number-stage {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: visible;
    }
    .farm-life-giant-display {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      will-change: transform, opacity;
    }
    .farm-life-digit {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(110px, 14vw, 190px);
      font-weight: 800;
      line-height: 0.82;
      letter-spacing: -0.04em;
      display: block;
      user-select: none;
      will-change: transform, opacity;
    }
    .farm-life-digit.num-color-1 {
      color: #1B3B22;
      text-shadow: 0 8px 30px rgba(27, 59, 34, 0.12);
    }
    .farm-life-digit.num-color-2 {
      color: #2E5A36;
      text-shadow: 0 8px 30px rgba(46, 90, 54, 0.12);
    }
    .farm-life-digit.num-color-3 {
      color: #9E6728;
      text-shadow: 0 8px 30px rgba(158, 103, 40, 0.12);
    }
    .farm-life-digit.num-color-4 {
      color: #24657B;
      text-shadow: 0 8px 30px rgba(36, 101, 123, 0.12);
    }
    .farm-life-digit.num-color-5 {
      color: #D48B28;
      text-shadow: 0 8px 30px rgba(212, 139, 40, 0.12);
    }

    .farm-life-sub-label {
      font-size: 13.5px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--harvest);
      margin-top: 14px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      will-change: transform, opacity;
    }
    .farm-life-sub-label::before {
      content: "";
      width: 24px;
      height: 2px;
      background: currentColor;
    }

    /* Chapter Progress Track */
    .farm-life-progress-track {
      margin-top: 32px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .farm-life-progress-line {
      width: 120px;
      height: 3px;
      background: rgba(32, 60, 43, 0.12);
      border-radius: 999px;
      overflow: hidden;
      position: relative;
    }
    .farm-life-progress-bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 20%;
      background: var(--forest);
      border-radius: 999px;
      transition: width .15s ease-out;
    }
    .farm-life-track-dots {
      display: inline-flex;
      gap: 6px;
    }
    .farm-life-dot {
      border: 1px solid rgba(32, 60, 43, 0.12);
      background: rgba(255, 255, 255, 0.7);
      padding: 5px 11px;
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 700;
      color: #556250;
      cursor: pointer;
      transition: all .25s ease;
    }
    .farm-life-dot:hover {
      background: #FFFFFF;
      color: var(--forest);
      border-color: var(--forest);
    }
    .farm-life-dot.is-active {
      background: var(--forest);
      color: #FFFFFF;
      border-color: var(--forest);
      box-shadow: 0 4px 12px rgba(27, 59, 34, 0.2);
    }

    /* RIGHT COLUMN: Viewport Card */
    .farm-life-col-right {
      position: relative;
      width: 100%;
    }
    .farm-life-viewport-card {
      position: relative;
      width: 100%;
      height: 570px;
      max-height: 72vh;
      border-radius: 26px;
      overflow: hidden;
      background: #FFFFFF;
      border: 1px solid rgba(32, 60, 43, 0.12);
      box-shadow: 0 24px 60px rgba(18, 36, 25, 0.09);
      display: flex;
      flex-direction: column;
    }

    /* Visual Frame (Upper 55%) */
    .farm-life-visual-frame {
      position: relative;
      width: 100%;
      height: 55%;
      overflow: hidden;
      background: #1B3B22;
    }
    .farm-life-slide-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      opacity: 0;
      transform: scale(1.04);
      pointer-events: none;
      will-change: transform, opacity;
    }
    .farm-life-slide-image.is-active {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }
    .farm-life-visual-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(14, 28, 18, 0.65) 0%, rgba(14, 28, 18, 0.1) 50%, rgba(14, 28, 18, 0.25) 100%);
      pointer-events: none;
      z-index: 2;
    }
    .farm-life-visual-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(14, 28, 18, 0.78);
      color: #FFFFFF;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      z-index: 3;
      will-change: opacity, transform;
    }

    /* Editorial Caption (Lower 45%) */
    .farm-life-editorial-copy {
      padding: 22px 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 45%;
      background: #FFFFFF;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
      will-change: opacity, transform;
      overflow-y: auto;
    }
    .farm-life-copy-inner {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .farm-life-step-prefix {
      font-size: 11px;
      font-weight: 700;
      color: var(--harvest);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      display: block;
    }
    .farm-life-editorial-heading {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(20px, 2vw, 28px);
      color: var(--forest);
      margin: 0;
      line-height: 1.2;
    }
    .farm-life-editorial-desc {
      font-size: 13.5px;
      line-height: 1.5;
      color: #435041;
      margin: 0;
    }
    .farm-life-activity-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .farm-life-chip {
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(32, 60, 43, 0.05);
      color: var(--forest);
      border: 1px solid rgba(32, 60, 43, 0.09);
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .chip-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--harvest);
      display: inline-block;
    }
    .farm-life-action-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid rgba(32, 60, 43, 0.08);
    }
    .farm-life-plan-btn {
      padding: 8px 18px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(200, 155, 83, 0.25);
    }
    .farm-life-note {
      font-size: 11px;
      color: #616e5c;
      font-style: italic;
    }

    @media (max-width: 900px) {
      .farm-life-scroll-section {
        height: auto;
        padding: 80px 4vw;
      }
      .farm-life-sticky-wrap {
        position: relative;
        height: auto;
        overflow: visible;
      }
      .farm-life-editorial-container {
        padding: 0;
        height: auto;
      }
      .farm-life-side-by-side {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .farm-life-col-left {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .farm-life-number-stage {
        height: 70px;
        width: 140px;
      }
      .farm-life-giant-display {
        height: 100%;
      }
      .farm-life-digit {
        font-size: clamp(54px, 12vw, 76px);
        line-height: 0.9;
      }
      .farm-life-sub-label {
        display: none;
      }
      .farm-life-progress-track {
        margin-top: 0;
      }
      .farm-life-viewport-card {
        height: auto;
        max-height: none;
      }
      .farm-life-visual-frame {
        height: 240px;
      }
      .farm-life-editorial-copy {
        height: auto;
        padding: 20px 18px;
      }
      .farm-life-action-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }

`;

html = html.slice(0, startIndex) + newCSS + html.slice(endIndex);

console.log('2. Replacing Masterclasses HTML section with Explore Life at the Farm section...');

const htmlSectionStart = '    <!-- 04C. SEASONAL AGRARIAN MASTERCLASSES -->';
const htmlSectionEnd = '    <!-- 04D. THE AGRARIAN GUEST LOGBOOK & REVIEWS -->';

const hStartIndex = html.indexOf(htmlSectionStart);
const hEndIndex = html.indexOf(htmlSectionEnd);

if (hStartIndex === -1 || hEndIndex === -1) {
  console.error('Could not find HTML section markers:', { hStartIndex, hEndIndex });
  process.exit(1);
}

const newHTMLSection = `    <!-- 04C. EXPLORE LIFE AT THE FARM (PREMIUM 5-CHAPTER SIDE-BY-SIDE SCROLL EXPERIENCE) -->
    <section class="farm-life-scroll-section" id="farm-activities" aria-label="Explore Life at the Farm">
      <!-- Hidden anchor to ensure backward compatibility with #workshops links -->
      <span id="workshops" style="position: absolute; top: 0; left: 0; width: 1px; height: 1px; opacity: 0; pointer-events: none;"></span>
      <div class="farm-life-sticky-wrap" id="farmLifeStickyWrap">
        <div class="farm-life-editorial-container">

          <!-- Section Editorial Header -->
          <div class="farm-life-editorial-header">
            <span class="pill">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
              Explore Life at the Farm
            </span>
            <h2 class="farm-life-section-title">More than 23 ways to discover, learn and experience the joy of farming.</h2>
          </div>

          <!-- Main Two-Column Side-by-Side Grid -->
          <div class="farm-life-side-by-side">

            <!-- LEFT COLUMN: Oversized Chapter Numbers (Single Shared Display) -->
            <div class="farm-life-col-left">
              <div class="farm-life-number-stage" id="farmLifeNumberStage">
                <!-- Single Shared Giant Number Display - guarantees no overlapping numbers -->
                <div class="farm-life-giant-display" id="farmLifeGiantDisplay" data-stage="0">
                  <span class="giant-digit farm-life-digit num-color-1" id="farmLifeGiantDigit">01</span>
                  <span class="num-sub-label farm-life-sub-label" id="farmLifeSubLabel">The Art of Farming</span>
                </div>
              </div>

              <!-- Chapter Progress Track (01 - 05) -->
              <div class="farm-life-progress-track" aria-label="Farm Activities Chapters Progress">
                <div class="farm-life-progress-line">
                  <div class="farm-life-progress-bar" id="farmLifeProgressBar"></div>
                </div>
                <div class="farm-life-track-dots">
                  <button type="button" class="farm-life-dot is-active" data-jump="0" aria-label="Chapter 01: The Art of Farming">01</button>
                  <button type="button" class="farm-life-dot" data-jump="1" aria-label="Chapter 02: Life Around the Farm">02</button>
                  <button type="button" class="farm-life-dot" data-jump="2" aria-label="Chapter 03: Village Traditions">03</button>
                  <button type="button" class="farm-life-dot" data-jump="3" aria-label="Chapter 04: The Wisdom of Water">04</button>
                  <button type="button" class="farm-life-dot" data-jump="4" aria-label="Chapter 05: Fun on the Farm">05</button>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: Visual & Activity Story Card -->
            <div class="farm-life-col-right">
              <div class="farm-life-viewport-card" id="farmLifeViewportCard">

                <!-- Visual Frame with 5 Authentic One Day Kisan Photographs -->
                <div class="farm-life-visual-frame" id="farmLifeVisualFrame">
                  <img id="farmLifeImg-0" src="/assets/experiences/gallery/gallery-02.webp" alt="01 – The Art of Farming: Students ploughing and transplanting paddy in the farm fields" class="farm-life-slide-image is-active" loading="lazy">
                  <img id="farmLifeImg-1" src="/assets/experiences/gallery/gallery-05.webp" alt="02 – Life Around the Farm: Animal care, walk-in bird aviary, and indigenous livestock" class="farm-life-slide-image" loading="lazy">
                  <img id="farmLifeImg-2" src="/assets/experiences/gallery/gallery-06.webp" alt="03 – Village Traditions: Traditional pottery wheel, dung cake making and artisan crafts" class="farm-life-slide-image" loading="lazy">
                  <img id="farmLifeImg-3" src="/assets/experiences/gallery/gallery-07.webp" alt="04 – The Wisdom of Water: Ancient Persian wheel, Archimedes screw and reservoir heritage" class="farm-life-slide-image" loading="lazy">
                  <img id="farmLifeImg-4" src="/assets/experiences/gallery/gallery-10.webp" alt="05 – Fun on the Farm: Open tractor ride, hay castle adventures and farm festivities" class="farm-life-slide-image" loading="lazy">
                  <div class="farm-life-visual-overlay"></div>
                  <div class="farm-life-visual-badge" id="farmLifeVisualBadge">Chapter 01 • The Art of Farming</div>
                </div>

                <!-- Single Shared Editorial Copy Container (No overlapping text) -->
                <div class="farm-life-editorial-copy" id="farmLifeEditorialCopy">
                  <div class="farm-life-copy-inner">
                    <span class="farm-life-step-prefix" id="farmLifeStepPrefix">Chapter 01</span>
                    <h3 class="farm-life-editorial-heading" id="farmLifeHeading">The Art of Farming</h3>
                    <p class="farm-life-editorial-desc" id="farmLifeDesc">Step barefoot into wetland fields. Prepare living soil, transplant tender paddy seedlings, trace the rice mill, and discover the journey from seed to harvest.</p>
                    
                    <!-- Activity List Chips -->
                    <div class="farm-life-activity-chips" id="farmLifeActivityChips">
                      <span class="farm-life-chip"><span class="chip-dot"></span>Ploughing and paddy transplantation</span>
                      <span class="farm-life-chip"><span class="chip-dot"></span>Paddy life cycle and rice mill activity</span>
                      <span class="farm-life-chip"><span class="chip-dot"></span>Cotton life cycle</span>
                      <span class="farm-life-chip"><span class="chip-dot"></span>Vegetable and food grain field exploration</span>
                    </div>

                    <!-- Subtle "Plan Your Farm Visit" action at the end -->
                    <div class="farm-life-action-row" id="farmLifeActionRow">
                      <a href="#booking" class="btn btn-gold farm-life-plan-btn" id="farmLifePlanBtn">
                        <span>Plan Your Farm Visit</span>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                      <span class="farm-life-note">Experience all 23+ activities across our Telangana farms</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>

`;

html = html.slice(0, hStartIndex) + newHTMLSection + html.slice(hEndIndex);

console.log('3. Updating footer navigation link...');
html = html.replace('<a href="#workshops">Masterclasses</a>', '<a href="#farm-activities">Explore Farm Life</a>');

console.log('4. Removing Workshop Modals (#workshopModal & #workshopPassModal)...');
const modalStart = '  <!-- Workshop Registration Drawer Modal -->';
const modalEnd = '  <!-- Submit Field Note / Review Modal -->';

const mStartIndex = html.indexOf(modalStart);
const mEndIndex = html.indexOf(modalEnd);

if (mStartIndex !== -1 && mEndIndex !== -1) {
  html = html.slice(0, mStartIndex) + html.slice(mEndIndex);
  console.log('   Successfully removed workshop modals.');
} else {
  console.warn('   Could not find workshop modal markers, skipping.');
}

console.log('5. Injecting Farm Activities Scroll Controller in setupScroll()...');

// Find insertion point right after storyDots click handling in setupScroll()
const scriptStoryAnchor = '          // Chapter dots click navigation (bidirectional jump)';
const scriptStoryEndAnchor = '        // CTA Parallax & Entrance';

const sAnchorIndex = html.indexOf(scriptStoryAnchor);
const sEndAnchorIndex = html.indexOf(scriptStoryEndAnchor, sAnchorIndex);

if (sAnchorIndex === -1 || sEndAnchorIndex === -1) {
  console.error('Could not find script anchor for setupScroll():', { sAnchorIndex, sEndAnchorIndex });
  process.exit(1);
}

const farmScrollTriggerCode = `
        // ------------------------------------------------------------------
        // Premium Side-by-Side Scroll Storytelling: Explore Life at the Farm
        // Single-Source-of-Truth Controller across 5 Chapters (01 <-> 05)
        // ------------------------------------------------------------------
        const farmLifeSection = document.getElementById('farm-activities');
        const farmLifeGiantDisplay = document.getElementById('farmLifeGiantDisplay');
        const farmLifeGiantDigit = document.getElementById('farmLifeGiantDigit');
        const farmLifeSubLabel = document.getElementById('farmLifeSubLabel');
        const farmLifeProgressBar = document.getElementById('farmLifeProgressBar');
        const farmLifeDots = document.querySelectorAll('.farm-life-dot');
        const farmLifeImgs = [
          document.getElementById('farmLifeImg-0'),
          document.getElementById('farmLifeImg-1'),
          document.getElementById('farmLifeImg-2'),
          document.getElementById('farmLifeImg-3'),
          document.getElementById('farmLifeImg-4')
        ];
        const farmLifeVisualBadge = document.getElementById('farmLifeVisualBadge');
        const farmLifeEditorialCopy = document.getElementById('farmLifeEditorialCopy');
        const farmLifeStepPrefix = document.getElementById('farmLifeStepPrefix');
        const farmLifeHeading = document.getElementById('farmLifeHeading');
        const farmLifeDesc = document.getElementById('farmLifeDesc');
        const farmLifeActivityChips = document.getElementById('farmLifeActivityChips');
        const farmLifePlanBtn = document.getElementById('farmLifePlanBtn');

        if (farmLifeSection && farmLifeGiantDigit && farmLifeSubLabel && farmLifeEditorialCopy) {
          const FARM_LIFE_CHAPTERS = [
            {
              chapterIndex: 0,
              num: '01',
              numClass: 'num-color-1',
              label: 'The Art of Farming',
              badge: 'Chapter 01 • The Art of Farming',
              step: 'Chapter 01',
              heading: 'The Art of Farming',
              desc: 'Step barefoot into fertile fields. Prepare living soil, transplant tender paddy seedlings, trace the rice mill, and discover the journey from seed to harvest.',
              activities: [
                'Ploughing and paddy transplantation',
                'Paddy life cycle and rice mill activity',
                'Cotton life cycle',
                'Vegetable and food grain field exploration'
              ]
            },
            {
              chapterIndex: 1,
              num: '02',
              numClass: 'num-color-2',
              label: 'Life Around the Farm',
              badge: 'Chapter 02 • Life Around the Farm',
              step: 'Chapter 02',
              heading: 'Life Around the Farm',
              desc: 'Encounter indigenous livestock and avian wonders. Interact with friendly farm animals, walk through our bird aviary, and observe the architectural genius of wild bird nests.',
              activities: [
                'Domestic animals and birds',
                'Exotic birds',
                'Walk-in bird aviary',
                'Bird nest exploration'
              ]
            },
            {
              chapterIndex: 2,
              num: '03',
              numClass: 'num-color-3',
              label: 'Village Traditions',
              badge: 'Chapter 03 • Village Traditions',
              step: 'Chapter 03',
              heading: 'Village Traditions',
              desc: 'Revive timeless rural arts passed down through generations. Shape wet Deccan clay on the potter\\\'s wheel, craft natural dung cakes, erect straw scarecrows, and grind grain on stone chakki.',
              activities: [
                'Pottery',
                'Dung cake making',
                'Scarecrow making',
                'Traditional hand grinding'
              ]
            },
            {
              chapterIndex: 3,
              num: '04',
              numClass: 'num-color-4',
              label: 'The Wisdom of Water',
              badge: 'Chapter 04 • The Wisdom of Water',
              step: 'Chapter 04',
              heading: 'The Wisdom of Water',
              desc: 'Discover ancestral hydraulic engineering and natural soil life. Operate the Persian wheel, marvel at the Archimedes screw, explore Mota Bavi step-wells, and learn rainwater percolation.',
              activities: [
                'Earthworm experience',
                'Working reservoir model',
                'Persian wheel',
                'Archimedes screw',
                'Hand water pump',
                'Vintage domestic water well',
                'Mota Bavi',
                'Rainwater harvesting model'
              ]
            },
            {
              chapterIndex: 4,
              num: '05',
              numClass: 'num-color-5',
              label: 'Fun on the Farm',
              badge: 'Chapter 05 • Fun on the Farm',
              step: 'Chapter 05',
              heading: 'Fun on the Farm',
              desc: 'Unwind with laughter, fresh open air, and rural celebrations. Hop on scenic tractor trailer rides, conquer the grass castle, gaze from the farmer watch tower, and celebrate with DJ music.',
              activities: [
                'Grass castle',
                'Polyhouse experience',
                'Farmer watch tower',
                'Tractor ride',
                'DJ music and fun games'
              ]
            }
          ];

          let currentFarmChapter = 0;
          let activeFarmTransition = null;

          function applyFarmChapterDOM(targetIdx) {
            const data = FARM_LIFE_CHAPTERS[targetIdx];
            if (!data) return;
            farmLifeGiantDigit.textContent = data.num;
            farmLifeGiantDigit.className = 'giant-digit farm-life-digit ' + data.numClass;
            farmLifeSubLabel.textContent = data.label;
            if (farmLifeGiantDisplay) farmLifeGiantDisplay.setAttribute('data-stage', String(targetIdx));

            if (farmLifeStepPrefix) farmLifeStepPrefix.textContent = data.step;
            if (farmLifeHeading) farmLifeHeading.textContent = data.heading;
            if (farmLifeDesc) farmLifeDesc.textContent = data.desc;
            if (farmLifeVisualBadge) farmLifeVisualBadge.textContent = data.badge;

            if (farmLifeActivityChips) {
              farmLifeActivityChips.innerHTML = data.activities
                .map(a => '<span class="farm-life-chip"><span class="chip-dot"></span>' + a + '</span>')
                .join('');
            }
          }

          function transitionToFarmChapter(targetIdx, immediate = false, direction = 1) {
            if (targetIdx === currentFarmChapter && !immediate) return;

            const prevIdx = currentFarmChapter;
            currentFarmChapter = targetIdx;

            // Update chapter dots
            farmLifeDots.forEach((dot, i) => {
              dot.classList.toggle('is-active', i === targetIdx);
            });

            // Kill in-flight transition
            if (activeFarmTransition) {
              activeFarmTransition.kill();
              activeFarmTransition = null;
            }

            const data = FARM_LIFE_CHAPTERS[targetIdx];
            if (!data) return;

            const isDown = direction >= 0;
            const outDigitY = isDown ? -30 : 30;
            const inDigitY = isDown ? 30 : -30;
            const outCopyY = isDown ? -16 : 16;
            const inCopyY = isDown ? 16 : -16;

            if (immediate || reduce) {
              applyFarmChapterDOM(targetIdx);
              gsap.set([farmLifeGiantDigit, farmLifeSubLabel, farmLifeEditorialCopy, farmLifeVisualBadge], { opacity: 1, y: 0 });
              farmLifeImgs.forEach((img, i) => {
                if (img) {
                  img.classList.toggle('is-active', i === targetIdx);
                  gsap.set(img, { opacity: i === targetIdx ? 1 : 0, scale: 1 });
                }
              });
              return;
            }

            const tl = gsap.timeline({
              defaults: { ease: 'power2.out' },
              onComplete: () => {
                activeFarmTransition = null;
              }
            });
            activeFarmTransition = tl;

            // Slide & fade out previous elements
            tl.to(farmLifeGiantDigit, { opacity: 0, y: outDigitY, duration: 0.20, ease: 'power2.in' }, 0)
              .to(farmLifeSubLabel, { opacity: 0, y: outDigitY * 0.5, duration: 0.16, ease: 'power2.in' }, 0)
              .to(farmLifeEditorialCopy, { opacity: 0, y: outCopyY, duration: 0.20, ease: 'power2.in' }, 0)
              .to(farmLifeVisualBadge, { opacity: 0, duration: 0.16 }, 0);

            // Switch DOM at midpoint
            tl.add(() => {
              applyFarmChapterDOM(targetIdx);
              gsap.set(farmLifeGiantDigit, { y: inDigitY, opacity: 0 });
              gsap.set(farmLifeSubLabel, { y: inDigitY * 0.5, opacity: 0 });
              gsap.set(farmLifeEditorialCopy, { y: inCopyY, opacity: 0 });
              gsap.set(farmLifeVisualBadge, { opacity: 0 });
            });

            // Animate in incoming number, label, and copy
            tl.to(farmLifeGiantDigit, { opacity: 1, y: 0, duration: 0.34, ease: 'power2.out' }, '+=0.02')
              .to(farmLifeSubLabel, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }, '-=0.24')
              .to(farmLifeEditorialCopy, { opacity: 1, y: 0, duration: 0.34, ease: 'power2.out' }, '-=0.28')
              .to(farmLifeVisualBadge, { opacity: 1, duration: 0.26 }, '-=0.22');

            // Synchronized photograph crossfade
            farmLifeImgs.forEach((img, i) => {
              if (!img) return;
              if (i === targetIdx) {
                img.classList.add('is-active');
                tl.fromTo(img,
                  { opacity: 0, scale: isDown ? 1.05 : 0.98 },
                  { opacity: 1, scale: 1, duration: 0.48, ease: 'power2.out' },
                  0.04
                );
              } else if (i === prevIdx) {
                tl.to(img, {
                  opacity: 0,
                  scale: isDown ? 0.98 : 1.05,
                  duration: 0.42,
                  ease: 'power2.inOut',
                  onComplete: () => {
                    img.classList.remove('is-active');
                  }
                }, 0);
              } else {
                img.classList.remove('is-active');
                gsap.set(img, { opacity: 0, scale: 1 });
              }
            });
          }

          // Initial state: Chapter 01
          transitionToFarmChapter(0, true, 1);

          // ScrollTrigger for Farm Activities (480vh with 5 stages)
          const farmST = ScrollTrigger.create({
            trigger: farmLifeSection,
            start: 'top top',
            end: 'bottom bottom',
            refreshPriority: -2,
            onEnter: () => {
              transitionToFarmChapter(0, false, 1);
            },
            onLeaveBack: () => {
              transitionToFarmChapter(0, false, -1);
            },
            onEnterBack: () => {
              transitionToFarmChapter(4, false, -1);
            },
            onLeave: () => {
              transitionToFarmChapter(4, false, 1);
            },
            onUpdate: (self) => {
              const p = self.progress;
              const dir = self.direction;

              if (farmLifeProgressBar) {
                farmLifeProgressBar.style.width = \`\${Math.min(100, Math.max(0, p * 100))}%\`;
              }

              if (p <= 0.04) {
                if (currentFarmChapter !== 0) transitionToFarmChapter(0, false, dir);
                return;
              }
              if (p >= 0.96) {
                if (currentFarmChapter !== 4) transitionToFarmChapter(4, false, dir);
                return;
              }

              let targetChapter = currentFarmChapter;
              if (dir >= 0) {
                // Scrolling Down (01 -> 02 -> 03 -> 04 -> 05)
                if (p >= 0.80) targetChapter = 4;
                else if (p >= 0.60) targetChapter = 3;
                else if (p >= 0.40) targetChapter = 2;
                else if (p >= 0.20) targetChapter = 1;
                else targetChapter = 0;
              } else {
                // Scrolling Up (05 -> 04 -> 03 -> 02 -> 01)
                if (p <= 0.20) targetChapter = 0;
                else if (p <= 0.40) targetChapter = 1;
                else if (p <= 0.60) targetChapter = 2;
                else if (p <= 0.80) targetChapter = 3;
                else targetChapter = 4;
              }

              if (targetChapter !== currentFarmChapter) {
                transitionToFarmChapter(targetChapter, false, dir);
              }
            }
          });

          if (farmST.progress > 0) {
            let initialTarget = 0;
            const p = farmST.progress;
            if (p >= 0.80) initialTarget = 4;
            else if (p >= 0.60) initialTarget = 3;
            else if (p >= 0.40) initialTarget = 2;
            else if (p >= 0.20) initialTarget = 1;
            transitionToFarmChapter(initialTarget, true, 1);
            if (farmLifeProgressBar) {
              farmLifeProgressBar.style.width = \`\${Math.min(100, Math.max(0, p * 100))}%\`;
            }
          }

          // Chapter dots click navigation
          farmLifeDots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
              e.preventDefault();
              const jumpIdx = parseInt(dot.getAttribute('data-jump'), 10) || 0;
              const fractions = [0.05, 0.28, 0.50, 0.72, 0.95];
              const fraction = fractions[jumpIdx] !== undefined ? fractions[jumpIdx] : 0.05;
              const st = ScrollTrigger.getAll().find(t => t.trigger === farmLifeSection);
              let targetY = farmLifeSection.offsetTop + fraction * (farmLifeSection.offsetHeight - window.innerHeight);
              if (st && st.end > st.start) {
                targetY = st.start + fraction * (st.end - st.start);
              }
              const scrollDir = jumpIdx >= currentFarmChapter ? 1 : -1;
              transitionToFarmChapter(jumpIdx, false, scrollDir);

              if (window.__lenis) {
                window.__lenis.scrollTo(targetY, { duration: 1.0 });
              } else {
                window.scrollTo({ top: targetY, behavior: 'smooth' });
              }
            });
          });

          // Connect "Plan Your Farm Visit" CTA button to booking section
          if (farmLifePlanBtn) {
            farmLifePlanBtn.addEventListener('click', (e) => {
              e.preventDefault();
              const bookingSection = document.getElementById('booking');
              if (bookingSection) {
                const notes = document.getElementById('dietaryNotes');
                if (notes) {
                  notes.value = 'Interested in: Farm Visit (All 23+ Activities & 5 Chapters)';
                }
                if (window.__lenis) {
                  window.__lenis.scrollTo(bookingSection, { duration: 1.2, offset: -20 });
                } else {
                  bookingSection.scrollIntoView({ behavior: 'smooth' });
                }
                if (window.__showToast) {
                  window.__showToast('Ready to plan your visit! Choose your preferred farm date.');
                }
              }
            });
          }
        }
`;

html = html.slice(0, sEndAnchorIndex) + farmScrollTriggerCode + '\n' + html.slice(sEndAnchorIndex);

console.log('6. Removing legacy Workshop JS code (fallbackWorkshops through workshop buttons)...');

// Find and remove the old workshop JS block
const jsWorkshopStart = '      // ==========================================\n      // PHASE 4: MASTERCLASSES & GUEST LOGBOOK\n      // ==========================================\n\n      const fallbackWorkshops = {';
const jsReviewsAnchor = '      // Reviews & Logbook';

const jsStartIndex = html.indexOf(jsWorkshopStart);
const jsEndIndex = html.indexOf(jsReviewsAnchor);

if (jsStartIndex !== -1 && jsEndIndex !== -1) {
  const replacementHeader = `      // ==========================================\n      // PHASE 4: GUEST LOGBOOK & REVIEWS\n      // ==========================================\n\n`;
  html = html.slice(0, jsStartIndex) + replacementHeader + html.slice(jsEndIndex);
  console.log('   Successfully replaced legacy workshop JS.');
} else {
  console.warn('   Could not find legacy workshop JS markers:', { jsStartIndex, jsEndIndex });
}

// Clean up references to closeModal(workshopModal) in Esc listener
html = html.replace('          closeModal(workshopModal);\n          closeModal(workshopPassModal);\n', '');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ Successfully applied all changes to index.html!');
