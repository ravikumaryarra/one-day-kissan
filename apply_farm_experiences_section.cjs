const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// ============================================================================
// 1. REPLACE CSS BLOCK (Remove .hampers-* and add .experiences-*)
// ============================================================================
const cssStartMarker = '/* 04B. FARM-TO-FORK HARVEST HAMPERS */';
const cssEndMarker = '/* Phase 3 Story Modal & Audio Synth Player */';

const cssStartIndex = html.indexOf(cssStartMarker);
const cssEndIndex = html.indexOf(cssEndMarker);

if (cssStartIndex === -1 || cssEndIndex === -1) {
  console.error('❌ Could not find hampers CSS markers in index.html');
  process.exit(1);
}

const newCss = `/* 04B. INTERACTIVE FARM EXPERIENCES (OFFICIAL ONE DAY KISSAN ACTIVITIES) */
    .experiences-section {
      position: relative;
      padding: 110px 4vw;
      background: #FFFFFF;
      overflow: hidden;
      border-top: 1px solid var(--line);
    }
    .experiences-container {
      max-width: 1280px;
      margin: 0 auto;
    }
    .experiences-header {
      text-align: center;
      max-width: 780px;
      margin: 0 auto 42px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }
    .experiences-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(32px, 3.8vw, 48px);
      color: var(--forest);
      line-height: 1.16;
      margin: 0;
    }
    .experiences-subtitle {
      font-size: 16px;
      color: #435041;
      line-height: 1.6;
      margin: 0;
    }
    .experiences-disclaimer {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(32, 60, 43, 0.05);
      border: 1px solid rgba(32, 60, 43, 0.09);
      padding: 7px 18px;
      border-radius: 999px;
      font-size: 12px;
      color: var(--forest);
      margin-top: 4px;
    }

    /* 5-Category Editorial Navigation Tabs */
    .exp-category-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 38px;
      flex-wrap: wrap;
    }
    .exp-cat-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 999px;
      border: 1px solid rgba(32, 60, 43, 0.14);
      background: var(--ivory);
      color: #3b4737;
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all .25s ease;
      white-space: nowrap;
    }
    .exp-cat-btn:hover {
      background: #FFFFFF;
      border-color: var(--forest);
      color: var(--forest);
      transform: translateY(-1px);
    }
    .exp-cat-btn.is-active {
      background: var(--forest);
      color: #FFFFFF;
      border-color: var(--forest);
      box-shadow: 0 6px 18px rgba(27, 59, 34, 0.22);
    }
    .exp-cat-num {
      font-family: "Playfair Display", Georgia, serif;
      font-weight: 800;
      font-size: 13px;
      color: var(--harvest);
    }
    .exp-cat-btn.is-active .exp-cat-num {
      color: #e5b974;
    }

    /* Category Spotlight Showcase */
    .exp-spotlight {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
      gap: 36px;
      align-items: center;
      background: var(--ivory);
      border: 1px solid rgba(32, 60, 43, 0.12);
      border-radius: 28px;
      padding: 32px;
      box-shadow: 0 20px 50px rgba(18, 36, 25, 0.06);
      margin-bottom: 40px;
      transition: all .35s ease;
    }
    .exp-spotlight-visual {
      position: relative;
      height: 380px;
      border-radius: 20px;
      overflow: hidden;
      background: #1B3B22;
    }
    .exp-spotlight-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .6s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .exp-spotlight:hover .exp-spotlight-image {
      transform: scale(1.04);
    }
    .exp-spotlight-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(14, 28, 18, 0.6) 0%, rgba(14, 28, 18, 0.05) 50%, rgba(14, 28, 18, 0.2) 100%);
      pointer-events: none;
    }
    .exp-spotlight-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(14, 28, 18, 0.82);
      color: #FFFFFF;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .exp-spotlight-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 14px;
    }
    .exp-spotlight-kicker {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--harvest);
    }
    .exp-spotlight-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(26px, 2.5vw, 36px);
      color: var(--forest);
      line-height: 1.2;
      margin: 0;
    }
    .exp-spotlight-desc {
      font-size: 15px;
      color: #4a5445;
      line-height: 1.65;
      margin: 0;
    }
    .exp-spotlight-actions {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 10px;
      flex-wrap: wrap;
    }
    .exp-details-text-btn {
      background: none;
      border: none;
      color: var(--forest);
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      transition: transform .2s ease;
    }
    .exp-details-text-btn:hover {
      transform: translateX(4px);
      color: var(--harvest);
    }

    /* Activities Grid */
    .exp-activities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      width: 100%;
    }
    .exp-card {
      background: var(--ivory);
      border: 1px solid rgba(32, 60, 43, 0.1);
      border-radius: 22px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform .35s cubic-bezier(.2, .8, .2, 1), box-shadow .35s;
      box-shadow: 0 10px 24px rgba(32, 60, 43, 0.05);
    }
    .exp-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px rgba(32, 60, 43, 0.12);
    }
    .exp-card-media {
      position: relative;
      height: 200px;
      overflow: hidden;
      background: #1B3B22;
    }
    .exp-card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .5s cubic-bezier(.2, .8, .2, 1);
    }
    .exp-card:hover .exp-card-image {
      transform: scale(1.07);
    }
    .exp-card-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      font-size: 10.5px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(14, 28, 18, 0.82);
      color: #FFFFFF;
      backdrop-filter: blur(6px);
    }
    .exp-card-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-between;
      gap: 14px;
    }
    .exp-card-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: 18.5px;
      color: var(--forest);
      line-height: 1.3;
      margin: 0 0 6px 0;
    }
    .exp-card-desc {
      font-size: 13.5px;
      color: #4a5445;
      line-height: 1.55;
      margin: 0;
    }
    .exp-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      border-top: 1px solid rgba(32, 60, 43, 0.08);
      padding-top: 14px;
      margin-top: auto;
    }
    .exp-card-explore-btn {
      background: none;
      border: none;
      color: var(--forest);
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 0;
      transition: color .2s ease;
    }
    .exp-card-explore-btn:hover {
      color: var(--harvest);
    }
    .exp-card-enquire-btn {
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      background: rgba(32, 60, 43, 0.08);
      color: var(--forest);
      border: 1px solid rgba(32, 60, 43, 0.12);
      cursor: pointer;
      transition: all .2s ease;
    }
    .exp-card-enquire-btn:hover {
      background: var(--forest);
      color: #FFFFFF;
      border-color: var(--forest);
    }

    /* Experience Details Modal */
    .exp-modal-card {
      position: relative;
      width: 100%;
      max-width: 680px;
      max-height: 90vh;
      overflow-y: auto;
      background: #FFFFFF;
      border-radius: 26px;
      border: 1px solid rgba(32, 60, 43, 0.16);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
      overflow-x: hidden;
    }
    .exp-modal-media {
      position: relative;
      width: 100%;
      height: 320px;
      background: #1B3B22;
    }
    .exp-modal-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .exp-modal-badge {
      position: absolute;
      top: 18px;
      left: 20px;
      font-size: 11.5px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(14, 28, 18, 0.85);
      color: #FFFFFF;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .exp-modal-content {
      padding: 28px 32px 34px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .exp-modal-heading {
      font-family: "Playfair Display", Georgia, serif;
      font-size: 26px;
      color: var(--forest);
      margin: 0;
      line-height: 1.22;
    }
    .exp-modal-paragraph {
      font-size: 15px;
      color: #3b4737;
      line-height: 1.65;
      margin: 0;
    }
    .exp-modal-takeaway-box {
      background: rgba(32, 60, 43, 0.04);
      border: 1px solid rgba(32, 60, 43, 0.1);
      border-radius: 14px;
      padding: 14px 18px;
    }
    .exp-modal-takeaway-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--forest);
      text-transform: uppercase;
      letter-spacing: .06em;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .exp-modal-takeaway-text {
      font-size: 13.5px;
      color: #4a5445;
      line-height: 1.5;
    }
    .exp-modal-footer {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    @media (max-width: 900px) {
      .experiences-section {
        padding: 80px 5vw;
      }
      .exp-spotlight {
        grid-template-columns: 1fr;
        padding: 22px;
        gap: 20px;
      }
      .exp-spotlight-visual {
        height: 240px;
      }
      .exp-category-nav {
        justify-content: flex-start;
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 8px;
        -webkit-overflow-scrolling: touch;
      }
    }

    `;

html = html.slice(0, cssStartIndex) + newCss + html.slice(cssEndIndex);

// ============================================================================
// 2. REPLACE HTML SECTION (Remove #hampers and add #experiences)
// ============================================================================
const htmlStartMarker = '<!-- 04B. FARM-TO-FORK HARVEST HAMPERS -->';
const htmlEndMarker = '<!-- 04C. SEASONAL AGRARIAN MASTERCLASSES -->';

const htmlStartIndex = html.indexOf(htmlStartMarker);
const htmlEndIndex = html.indexOf(htmlEndMarker);

if (htmlStartIndex === -1 || htmlEndIndex === -1) {
  console.error('❌ Could not find hampers HTML markers in index.html');
  process.exit(1);
}

const newHtml = `<!-- 04B. INTERACTIVE FARM EXPERIENCES (REPLACING HARVEST HAMPERS) -->
    <section class="experiences-section" id="experiences">
      <div class="experiences-container">

        <!-- Section Header -->
        <div class="experiences-header">
          <span class="pill">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
            Authentic Agrarian Immersion
          </span>
          <h2 class="experiences-title">Real farm life, lived and learned.</h2>
          <p class="experiences-subtitle">Over 25 hands-on rural activities crafted to reconnect children, families, and mindful urban explorers with the living rhythms of Indian agriculture.</p>
          <div class="experiences-disclaimer">
            <span class="star-gold">✦</span>
            <span>Activities are curated for hands-on learning and may vary seasonally between our <strong>Bhongir</strong> and <strong>Moinabad</strong> farms.</span>
          </div>
        </div>

        <!-- 5-Category Editorial Navigation Tabs -->
        <div class="exp-category-nav" role="tablist" aria-label="Farm Experience Categories">
          <button type="button" class="exp-cat-btn is-active" data-cat="0" role="tab" aria-selected="true" aria-controls="expStage">
            <span class="exp-cat-num">01</span>
            <span class="exp-cat-name">Hands-on Farming</span>
          </button>
          <button type="button" class="exp-cat-btn" data-cat="1" role="tab" aria-selected="false" aria-controls="expStage">
            <span class="exp-cat-num">02</span>
            <span class="exp-cat-name">Animals &amp; Nature</span>
          </button>
          <button type="button" class="exp-cat-btn" data-cat="2" role="tab" aria-selected="false" aria-controls="expStage">
            <span class="exp-cat-num">03</span>
            <span class="exp-cat-name">Traditional Village Skills</span>
          </button>
          <button type="button" class="exp-cat-btn" data-cat="3" role="tab" aria-selected="false" aria-controls="expStage">
            <span class="exp-cat-num">04</span>
            <span class="exp-cat-name">Farming &amp; Water Heritage</span>
          </button>
          <button type="button" class="exp-cat-btn" data-cat="4" role="tab" aria-selected="false" aria-controls="expStage">
            <span class="exp-cat-num">05</span>
            <span class="exp-cat-name">Farm Fun</span>
          </button>
        </div>

        <!-- Dynamic Category Stage (Browser View) -->
        <div class="exp-category-stage" id="expStage">
          <!-- Featured Category Banner / Spotlight -->
          <div class="exp-spotlight" id="expSpotlight">
            <div class="exp-spotlight-visual">
              <img id="expSpotlightImg" src="/assets/experiences/16.png" alt="Ploughing and Paddy Transplantation" class="exp-spotlight-image" loading="lazy">
              <div class="exp-spotlight-overlay"></div>
              <div class="exp-spotlight-badge" id="expSpotlightBadge">01 • Category Spotlight</div>
            </div>
            <div class="exp-spotlight-copy">
              <span class="exp-spotlight-kicker" id="expSpotlightKicker">Featured Agrarian Experience</span>
              <h3 class="exp-spotlight-title" id="expSpotlightTitle">Ploughing &amp; Paddy Transplantation</h3>
              <p class="exp-spotlight-desc" id="expSpotlightDesc">Each student experiences soil preparation and paddy transplanting firsthand. Get your feet into the living mud and understand how rice is born.</p>
              <div class="exp-spotlight-actions">
                <button type="button" class="btn btn-gold exp-enquire-btn" id="expSpotlightEnquireBtn" data-activity-title="Ploughing &amp; Paddy Transplantation">
                  Enquire About This Activity
                </button>
                <button type="button" class="exp-details-text-btn" id="expSpotlightDetailsBtn" data-act-id="ploughing-paddy">
                  Read Full Story
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Activities Grid for Active Category -->
          <div class="exp-activities-grid" id="expActivitiesGrid">
            <!-- Rendered dynamically by category -->
          </div>
        </div>

      </div>
    </section>

    `;

html = html.slice(0, htmlStartIndex) + newHtml + html.slice(htmlEndIndex);

// ============================================================================
// 3. REPLACE HAMPER MODALS (Remove hamperModal & hamperPassModal, add experienceModal)
// ============================================================================
const modalStartMarker = '<div id="hamperModal"';
const modalEndMarker = '<!-- Workshop Registration Drawer Modal -->';

const modalStartIndex = html.indexOf(modalStartMarker);
const modalEndIndex = html.indexOf(modalEndMarker);

if (modalStartIndex === -1 || modalEndIndex === -1) {
  console.error('❌ Could not find hamper modal markers in index.html');
  process.exit(1);
}

const newModalHtml = `<!-- Farm Activity Detail & Enquiry Modal -->
  <div id="experienceModal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="expModalTitle">
    <div class="exp-modal-card" id="expModalCard">
      <button type="button" class="pass-close-btn" id="closeExpModalBtn" aria-label="Close Activity Details">&times;</button>
      <div class="exp-modal-media">
        <img id="expModalImg" src="/assets/experiences/16.png" alt="Activity Photo" class="exp-modal-image">
        <div class="exp-modal-badge" id="expModalCategoryBadge">01 • Hands-on Farming</div>
      </div>
      <div class="exp-modal-content">
        <h3 id="expModalTitle" class="exp-modal-heading">Ploughing &amp; Paddy Transplantation</h3>
        <p id="expModalFullDesc" class="exp-modal-paragraph">Detailed description of the activity...</p>
        <div class="exp-modal-takeaway-box">
          <div class="exp-modal-takeaway-title">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            What Students &amp; Families Learn:
          </div>
          <div id="expModalTakeawayText" class="exp-modal-takeaway-text">Hands-on knowledge about soil health, microbial vitality, and ancestral food cultivation.</div>
        </div>
        <div class="exp-modal-footer">
          <button type="button" class="btn btn-gold" id="expModalBookBtn" style="flex: 1; height: 46px; font-weight: 700;">
            Book a Farm Visit for This Activity
          </button>
          <a href="https://wa.me/919849798674?text=Hi%20One%20Day%20Kissan,%20I%20would%20like%20to%20enquire%20about%20the%20activities" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="height: 46px; padding: 0 18px; display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  </div>

  `;

html = html.slice(0, modalStartIndex) + newModalHtml + html.slice(modalEndIndex);

// ============================================================================
// 4. REPLACE JAVASCRIPT BLOCK (Remove hamper logic, add experiences controller)
// ============================================================================
const jsStartMarker = 'const fallbackHampers = {';
const jsEndMarker = '// ==========================================\n      // PHASE 4: MASTERCLASSES & GUEST LOGBOOK';

const jsStartIndex = html.indexOf(jsStartMarker);
const jsEndIndex = html.indexOf(jsEndMarker);

if (jsStartIndex === -1 || jsEndIndex === -1) {
  console.error('❌ Could not find hampers JS markers in index.html');
  process.exit(1);
}

const newJs = `// ------------------------------------------------------------------
      // Official Farm Experiences Data & Interactive Browser
      // Sourced directly from official One Day Kisan website
      // ------------------------------------------------------------------
      const EXPERIENCES = [
        // --- 01. HANDS-ON FARMING ---
        {
          id: "ploughing-paddy",
          catIndex: 0,
          categoryName: "Hands-on Farming",
          categoryNumber: "01",
          title: "Ploughing & Paddy Transplantation",
          short: "Soil preparation with traditional bullock ploughs and hands-on paddy seedling transplantation.",
          full: "Ploughing helps remove weeds, aerate the earth, and loosen soil for healthy root development. Every student and visitor gets their hands and feet into the wet soil bunds to participate in traditional ploughing and transplant tender heirloom paddy seedlings directly into living mud.",
          takeaway: "Understand how soil texture, aeration, and water retention create fertile conditions for rice cultivation.",
          tag: "Field Stewardship",
          img: "/assets/experiences/16.png"
        },
        {
          id: "paddy-lifecycle",
          catIndex: 0,
          categoryName: "Hands-on Farming",
          categoryNumber: "01",
          title: "Paddy Life Cycle & Rice Mill Activity",
          short: "From seed germinating to harvest, threshing, and traditional mini rice milling.",
          full: "Experience the complete agricultural journey of rice: seed soaking, nursery rearing, vegetative tillering, flowering, harvesting, threshing, and de-husking in a working mini rice mill to understand where urban food comes from.",
          takeaway: "Discover how a single grain multiplies into thousands through mindful water and nutrient cycles.",
          tag: "Life Cycle Science",
          img: "/assets/experiences/21.png"
        },
        {
          id: "vegetable-field-exploration",
          catIndex: 0,
          categoryName: "Hands-on Farming",
          categoryNumber: "01",
          title: "Vegetable & Food Grain Field Exploration",
          short: "Walk through diverse seasonal vegetable patches, root crops, and indigenous grain beds.",
          full: "Explore thriving open-air vegetable gardens, legume beds, and seasonal food grains. Discover root systems, companion planting, natural pest deterrence, and the biological differences between heirloom crop varieties.",
          takeaway: "Learn to recognize living plants before they become grocery store vegetables.",
          tag: "Botanical Discovery",
          img: "/assets/experiences/22.png"
        },
        {
          id: "cotton-lifecycle",
          catIndex: 0,
          categoryName: "Hands-on Farming",
          categoryNumber: "01",
          title: "Cotton Life Cycle & Fibre Exploration",
          short: "Follow the journey from seed sowing to golden blossoms and fluffy cotton bolls.",
          full: "Trace the miraculous transformation of cotton from dark seeds to golden-yellow blossoms, green pods, and snow-white fluffy cotton bolls ready for ginning and spinning into khadi threads.",
          takeaway: "Connect the clothes we wear every day to real agricultural field plants.",
          tag: "Natural Fibres",
          img: "/assets/experiences/2.png"
        },

        // --- 02. ANIMALS & NATURE ---
        {
          id: "domestic-animals",
          catIndex: 1,
          categoryName: "Animals & Nature",
          categoryNumber: "02",
          title: "Domestic Animals & Cattle Milking",
          short: "Hands-on cow care, feeding, gentle grooming, and traditional milking demonstration.",
          full: "Learn about indigenous Indian cattle breeds (Desi cows), natural grazing diets, gentle animal husbandry, and hands-on milking demonstrations. Understand the nutritional distinction between A1 and A2 milk and cattle's role in organic farm fertility.",
          takeaway: "Appreciate the symbiotic bond between farm animals and regenerative soil health.",
          tag: "Animal Husbandry",
          img: "/assets/experiences/18.png"
        },
        {
          id: "exotic-birds",
          catIndex: 1,
          categoryName: "Animals & Nature",
          categoryNumber: "02",
          title: "Exotic Birds Encounter",
          short: "Observe colorful, diverse bird species and their behavioral adaptations.",
          full: "Meet vibrant, friendly avian species up close in a dedicated sanctuary space. Learn about plumage coloration, beak adaptations for diverse seeds, and humane bird care.",
          takeaway: "Understand bird species biodiversity, nutritional needs, and habitat conservation.",
          tag: "Avian Biodiversity",
          img: "/assets/experiences/gallery/gallery-08.webp"
        },
        {
          id: "walkin-aviary",
          catIndex: 1,
          categoryName: "Animals & Nature",
          categoryNumber: "02",
          title: "Walk-in Bird Aviary",
          short: "Step inside a shaded walk-in aviary surrounded by gentle fluttering birds.",
          full: "A spacious, airy walk-in aviary that lets visitors walk among flutterings of parakeets, lovebirds, and finches in an enriched green natural environment with perches, nesting boxes, and natural water baths.",
          takeaway: "Experience peaceful, respectful interaction with birds in an open natural flight space.",
          tag: "Habitat Immersion",
          img: "/assets/experiences/gallery/gallery-09.webp"
        },
        {
          id: "birds-nest-exploration",
          catIndex: 1,
          categoryName: "Animals & Nature",
          categoryNumber: "02",
          title: "Bird Nest Exploration",
          short: "Discover natural weaver bird nests and avian architecture.",
          full: "Marvel at intricate real weaver bird nests suspended from palm fronds and branches. Discover the ingenious natural architecture, woven fiber techniques, and safety engineering birds use to protect their hatchlings.",
          takeaway: "Marvel at nature's master engineers and their sustainable weaving methods.",
          tag: "Natural Architecture",
          img: "/assets/experiences/17.png"
        },

        // --- 03. TRADITIONAL VILLAGE SKILLS ---
        {
          id: "pottery",
          catIndex: 2,
          categoryName: "Traditional Village Skills",
          categoryNumber: "03",
          title: "Artisan Clay Pottery Wheel",
          short: "Shape wet terracotta clay on traditional rotating village wheels.",
          full: "Sit beside a village potter at an authentic spinning wheel. Learn clay centering, finger pressure, and ancient wheel throwing to shape your own terracotta earthen diya or small clay vessel to take home.",
          takeaway: "Develop tactile sensory mindfulness and understand earthen craft heritage.",
          tag: "Artisan Heritage",
          img: "/assets/experiences/2.png"
        },
        {
          id: "dung-cake-making",
          catIndex: 2,
          categoryName: "Traditional Village Skills",
          categoryNumber: "03",
          title: "Dung Cake Making",
          short: "Handcraft organic cow dung cakes used in ancestral woodfire chulhas.",
          full: "Cow dung cakes are an ancestral carbon-neutral biomass fuel for village woodfire cooking hearths (chulhas). Mix organic dung with straw, hand-pat into discs, and dry under the Deccan sun, experiencing a timeless rural craft.",
          takeaway: "Discover zero-waste circular energy systems practiced in Indian villages for millennia.",
          tag: "Circular Biomass",
          img: "/assets/experiences/1.png"
        },
        {
          id: "scarecrow-making",
          catIndex: 2,
          categoryName: "Traditional Village Skills",
          categoryNumber: "03",
          title: "Scarecrow Making Workshop",
          short: "Craft bamboo and straw scarecrows to protect farm crops from birds.",
          full: "Gather dry straw, bamboo frames, and discarded clothes to assemble traditional farm scarecrows. Discover how natural visual deterrents protect ripening crops without toxic chemicals.",
          takeaway: "Practice creative team building and non-chemical pest management.",
          tag: "Rural Ingenuity",
          img: "/assets/experiences/5.png"
        },
        {
          id: "traditional-hand-grinding",
          catIndex: 2,
          categoryName: "Traditional Village Skills",
          categoryNumber: "03",
          title: "Traditional Hand Grinding",
          short: "Operate heavy granite stone hand mills and pestles for lentils and flour.",
          full: "Turn the heavy stone grinding chakki and pound grains with tall wooden pestles in granite mortars (Rolu-Rolu). Experience the physical rhythm and mindful effort village women used for centuries to prepare wholesome stone-ground flour.",
          takeaway: "Gain appreciation for wholesome slow food preparation and mechanical leverage.",
          tag: "Ancestral Foodways",
          img: "/assets/experiences/12.png"
        },

        // --- 04. FARMING & WATER HERITAGE ---
        {
          id: "earthworm-experience",
          catIndex: 3,
          categoryName: "Farming & Water Heritage",
          categoryNumber: "04",
          title: "Vermicompost & Earthworm Experience",
          short: "Explore the magical soil-building world of red wriggler earthworms.",
          full: "Discover why earthworms are the farmer's best friend. Touch nutrient-rich vermicompost castings, see how organic vegetable scraps are transformed into biological black gold, and learn natural soil regeneration.",
          takeaway: "Learn how microscopic soil biology drives healthy, chemical-free food growth.",
          tag: "Living Soil",
          img: "/assets/experiences/4.png"
        },
        {
          id: "persian-wheel",
          catIndex: 3,
          categoryName: "Farming & Water Heritage",
          categoryNumber: "04",
          title: "Working Model of Persian Wheel (Rahat)",
          short: "Ancient geared irrigation technology lifting water with chained buckets.",
          full: "Operate a fully functional model of the Persian Wheel (Rahat). Witness how horizontal circular motion converts into vertical lifting power using interlocking wooden pegs and chained brass buckets.",
          takeaway: "Explore mechanical gear ratios and ancient zero-electricity irrigation engineering.",
          tag: "Ancient Mechanics",
          img: "/assets/experiences/7.png"
        },
        {
          id: "archimedes-screw",
          catIndex: 3,
          categoryName: "Farming & Water Heritage",
          categoryNumber: "04",
          title: "Working Model of Archimedes Screw",
          short: "Spiral mechanical water pump designed by Archimedes over 2,000 years ago.",
          full: "Turn the hand crank of an authentic spiral Archimedes screw and watch water steadily climb upward inside the transparent chamber against gravity — mechanical physics brought to life.",
          takeaway: "Witness applied physics and rotational fluid dynamics in action.",
          tag: "Physics in Farming",
          img: "/assets/experiences/8.png"
        },
        {
          id: "reservoir-model",
          catIndex: 3,
          categoryName: "Farming & Water Heritage",
          categoryNumber: "04",
          title: "Working Reservoir & Dam Model",
          short: "Interactive spillways, sluice gates, and watershed storage dynamics.",
          full: "Understand how catchment areas, dams, canals, and check dams retain monsoon rainwater. Control sluice gates to see how watershed management prevents field erosion.",
          takeaway: "Understand regional hydrology and monsoon water retention strategies.",
          tag: "Hydrology",
          img: "/assets/experiences/6.png"
        },
        {
          id: "vintage-water-well",
          catIndex: 3,
          categoryName: "Farming & Water Heritage",
          categoryNumber: "04",
          title: "Vintage Domestic Water Well",
          short: "Draw fresh water using traditional rope, pulley, and brass buckets.",
          full: "Experience drawing water by hand from a deep stone-lined well using a balanced pulley and sturdy coir rope. Feel the weight of water and gain profound gratitude for daily water access.",
          takeaway: "Experience manual mechanical advantage and value every drop of water.",
          tag: "Water Stewardship",
          img: "/assets/experiences/11.png"
        },
        {
          id: "hand-water-pump",
          catIndex: 3,
          categoryName: "Farming & Water Heritage",
          categoryNumber: "04",
          title: "Hand Water Pump & Vintage Borewell",
          short: "Pump lever action lifting groundwater from deep aquifers.",
          full: "Work the heavy cast-iron lever of a vintage village hand pump. Understand cylinder vacuum suction, foot valves, and sustainable groundwater tables.",
          takeaway: "Learn suction mechanics and the critical balance of groundwater aquifers.",
          tag: "Groundwater Science",
          img: "/assets/experiences/9.png"
        },
        {
          id: "mota-bavi",
          catIndex: 3,
          categoryName: "Farming & Water Heritage",
          categoryNumber: "04",
          title: "Mota Bavi (Deep Incline Well)",
          short: "Deccan heritage stepped inclined well system with bullock haulage.",
          full: "Explore the architectural marvel of Mota Bavi — an earthen inclined ramp well where bullocks historically walked down an incline to pull massive leather buckets (Mote) of groundwater to the surface.",
          takeaway: "Discover historical Deccan water engineering before electric pumps existed.",
          tag: "Heritage Hydraulics",
          img: "/assets/experiences/19.png"
        },
        {
          id: "rainwater-harvesting",
          catIndex: 3,
          categoryName: "Farming & Water Heritage",
          categoryNumber: "04",
          title: "Rainwater Harvesting Pit Model",
          short: "Multi-layered gravel, sand, and charcoal aquifer recharge pit.",
          full: "Discover how gravel, coarse sand, and biochar layers filter rooftop and surface runoff directly into underground aquifers, securing water resilience for decades to come.",
          takeaway: "Learn practical ecological conservation to combat urban water scarcity.",
          tag: "Ecological Recharge",
          img: "/assets/experiences/20.png"
        },

        // --- 05. FARM FUN ---
        {
          id: "tractor-ride",
          catIndex: 4,
          categoryName: "Farm Fun",
          categoryNumber: "05",
          title: "Open-Field Tractor Joy Ride",
          short: "Breezy tractor trailer ride through open farmland and orchard groves.",
          full: "Hop aboard the wooden tractor trailer for an exhilarating ride across wide agricultural paths, waving at grazing cattle and soaking in expansive hill views and rural breezes.",
          takeaway: "Unfiltered countryside joy and scenic appreciation of agricultural landscapes.",
          tag: "Joyful Ride",
          img: "/assets/experiences/14.png"
        },
        {
          id: "grass-castle",
          catIndex: 4,
          categoryName: "Farm Fun",
          categoryNumber: "05",
          title: "Grass Castle & Hay Trampoline",
          short: "Soft aromatic straw stacks for jumping, climbing, and tactile play.",
          full: "Unleash pure joy in a massive castle built entirely of stacked golden paddy straw and hay bales. Safe, tactile, biodegradable playground for children and adults to jump and tumble.",
          takeaway: "Tactile outdoor physical recreation free from screens and plastic play areas.",
          tag: "Tactile Play",
          img: "/assets/experiences/23.png"
        },
        {
          id: "polyhouse-experience",
          catIndex: 4,
          categoryName: "Farm Fun",
          categoryNumber: "05",
          title: "Polyhouse & Greenhouse Farming",
          short: "Climate-controlled cultivation of delicate vegetables and exotic greens.",
          full: "Step inside a modern temperature and humidity-controlled polyhouse. Learn drip irrigation, misting systems, and soil-less cultivation methods used to grow crisp bell peppers and herbs year-round.",
          takeaway: "Compare traditional open-field farming with modern precision agriculture.",
          tag: "Protected Agrotech",
          img: "/assets/experiences/13.png"
        },
        {
          id: "farmer-watch-tower",
          catIndex: 4,
          categoryName: "Farm Fun",
          categoryNumber: "05",
          title: "Vintage Farmer Watch Tower",
          short: "Climb the elevated wooden watch tower for a panoramic farm survey.",
          full: "Ascend the rustic timber watch tower historically used by farmers to keep vigil over crops against wild boars and birds under night skies. Enjoy 360° views across Telangana fields.",
          takeaway: "Experience the bird's-eye vantage point of field custodians.",
          tag: "Panoramic Survey",
          img: "/assets/experiences/10.png"
        },
        {
          id: "dj-music-games",
          catIndex: 4,
          categoryName: "Farm Fun",
          categoryNumber: "05",
          title: "DJ Music, Folk Dance & Traditional Games",
          short: "Celebrate rural rhythms with village folk dance, music, and country games.",
          full: "Unwind at the end of an agrarian day under shaded trees with village folk rhythms, cheerful rural games like gilli-danda, lemon-and-spoon, and tug-of-war, celebrating community bonding.",
          takeaway: "Celebrate community bonding, folk heritage, and shared agrarian joy.",
          tag: "Celebration",
          img: "/assets/experiences/24.png"
        }
      ];

      // Experience Browser State
      let currentExpCategory = 0;
      let activeExpModalItem = null;

      const expCatBtns = document.querySelectorAll('.exp-cat-btn');
      const expActivitiesGrid = document.getElementById('expActivitiesGrid');
      const expSpotlightImg = document.getElementById('expSpotlightImg');
      const expSpotlightBadge = document.getElementById('expSpotlightBadge');
      const expSpotlightTitle = document.getElementById('expSpotlightTitle');
      const expSpotlightDesc = document.getElementById('expSpotlightDesc');
      const expSpotlightEnquireBtn = document.getElementById('expSpotlightEnquireBtn');
      const expSpotlightDetailsBtn = document.getElementById('expSpotlightDetailsBtn');

      const experienceModal = document.getElementById('experienceModal');
      const closeExpModalBtn = document.getElementById('closeExpModalBtn');
      const expModalImg = document.getElementById('expModalImg');
      const expModalCategoryBadge = document.getElementById('expModalCategoryBadge');
      const expModalTitle = document.getElementById('expModalTitle');
      const expModalFullDesc = document.getElementById('expModalFullDesc');
      const expModalTakeawayText = document.getElementById('expModalTakeawayText');
      const expModalBookBtn = document.getElementById('expModalBookBtn');

      function openExperienceModal(item) {
        if (!item) return;
        activeExpModalItem = item;
        if (expModalImg) {
          expModalImg.src = item.img;
          expModalImg.alt = item.title;
        }
        if (expModalCategoryBadge) expModalCategoryBadge.textContent = \`\${item.categoryNumber} • \${item.categoryName}\`;
        if (expModalTitle) expModalTitle.textContent = item.title;
        if (expModalFullDesc) expModalFullDesc.textContent = item.full;
        if (expModalTakeawayText) expModalTakeawayText.textContent = item.takeaway;

        openModal(experienceModal);
      }

      function scrollToBookingForExperience(activityTitle) {
        const bookingSection = document.getElementById('booking');
        if (!bookingSection) return;

        // Populate special notes with activity preference
        const dietaryNotes = document.getElementById('dietaryNotes');
        if (dietaryNotes) {
          dietaryNotes.value = \`Interested in: \${activityTitle}\`;
        }

        if (window.__lenis) {
          window.__lenis.scrollTo(bookingSection, { duration: 1.2, offset: -20 });
        } else {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }

        showToast(\`Selected: "\${activityTitle}". Choose your date to book your visit!\`);
      }

      function renderExperienceCategory(catIndex) {
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
        if (!catItems.length) return;

        // Featured spotlight item is the first in category
        const featured = catItems[0];
        if (expSpotlightImg) {
          expSpotlightImg.src = featured.img;
          expSpotlightImg.alt = featured.title;
        }
        if (expSpotlightBadge) expSpotlightBadge.textContent = \`\${featured.categoryNumber} • Category Spotlight\`;
        if (expSpotlightTitle) expSpotlightTitle.textContent = featured.title;
        if (expSpotlightDesc) expSpotlightDesc.textContent = featured.short;
        if (expSpotlightEnquireBtn) {
          expSpotlightEnquireBtn.setAttribute('data-activity-title', featured.title);
        }
        if (expSpotlightDetailsBtn) {
          expSpotlightDetailsBtn.setAttribute('data-act-id', featured.id);
        }

        // Render remaining activity cards in the grid
        if (expActivitiesGrid) {
          expActivitiesGrid.innerHTML = catItems.map(item => \`
            <article class="exp-card" data-act-id="\${item.id}">
              <div class="exp-card-media">
                <img src="\${item.img}" alt="\${item.title}" class="exp-card-image" loading="lazy">
                <span class="exp-card-tag">\${item.tag}</span>
              </div>
              <div class="exp-card-body">
                <div>
                  <h4 class="exp-card-title">\${item.title}</h4>
                  <p class="exp-card-desc">\${item.short}</p>
                </div>
                <div class="exp-card-footer">
                  <button type="button" class="exp-card-explore-btn" data-act-id="\${item.id}">
                    Read Details
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  <button type="button" class="exp-card-enquire-btn" data-activity-title="\${item.title}">
                    Enquire
                  </button>
                </div>
              </div>
            </article>
          \`).join('');

          // Bind card click listeners
          expActivitiesGrid.querySelectorAll('.exp-card-explore-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const actId = btn.getAttribute('data-act-id');
              const item = EXPERIENCES.find(x => x.id === actId);
              openExperienceModal(item);
            });
          });

          expActivitiesGrid.querySelectorAll('.exp-card-enquire-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const title = btn.getAttribute('data-activity-title');
              scrollToBookingForExperience(title);
            });
          });

          expActivitiesGrid.querySelectorAll('.exp-card').forEach(card => {
            card.addEventListener('click', () => {
              const actId = card.getAttribute('data-act-id');
              const item = EXPERIENCES.find(x => x.id === actId);
              openExperienceModal(item);
            });
          });
        }
      }

      // Category tab switch listeners
      expCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const cat = parseInt(btn.getAttribute('data-cat'), 10) || 0;
          renderExperienceCategory(cat);
        });
      });

      // Spotlight buttons
      if (expSpotlightEnquireBtn) {
        expSpotlightEnquireBtn.addEventListener('click', () => {
          const title = expSpotlightEnquireBtn.getAttribute('data-activity-title') || 'Hands-on Farming';
          scrollToBookingForExperience(title);
        });
      }

      if (expSpotlightDetailsBtn) {
        expSpotlightDetailsBtn.addEventListener('click', () => {
          const actId = expSpotlightDetailsBtn.getAttribute('data-act-id');
          const item = EXPERIENCES.find(x => x.id === actId);
          openExperienceModal(item);
        });
      }

      // Modal listeners
      if (closeExpModalBtn) {
        closeExpModalBtn.addEventListener('click', () => closeModal(experienceModal));
      }

      if (experienceModal) {
        experienceModal.addEventListener('click', (e) => {
          if (e.target === experienceModal) closeModal(experienceModal);
        });
      }

      if (expModalBookBtn) {
        expModalBookBtn.addEventListener('click', () => {
          closeModal(experienceModal);
          const title = activeExpModalItem ? activeExpModalItem.title : 'Farm Immersion';
          scrollToBookingForExperience(title);
        });
      }

      // Initialize Category 01 on page load
      renderExperienceCategory(0);

      `;

html = html.slice(0, jsStartIndex) + newJs + html.slice(jsEndIndex);

// ============================================================================
// 5. UPDATE FOOTER LINK (<a href="#hampers">Harvest Crates</a> -> Farm Experiences)
// ============================================================================
html = html.replace('<a href="#hampers">Harvest Crates</a>', '<a href="#experiences">Farm Experiences</a>');

// Write updated index.html
fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ Successfully replaced Harvest Hampers with Interactive Farm Experiences in index.html!');
