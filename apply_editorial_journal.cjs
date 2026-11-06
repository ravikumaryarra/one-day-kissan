const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log('1. Replacing Reviews CSS with Editorial Travel Journal CSS...');

const cssStartMarker = '    /* Verified Community Reviews Section */';
const cssEndMarker = '    /* 05. BOOKING EXPERIENCE (CTA) */';

const startIndex = html.indexOf(cssStartMarker);
const endIndex = html.indexOf(cssEndMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find CSS markers:', { startIndex, endIndex });
  process.exit(1);
}

const newJournalCSS = `    /* 04D. EDITORIAL TRAVEL JOURNAL: MEMORIES MADE AT THE FARM */
    .journal-section {
      position: relative;
      padding: 110px 4vw 120px;
      background: var(--ivory);
      overflow: hidden;
      border-top: 1px solid var(--line);
    }
    .journal-container {
      max-width: 1280px;
      margin: 0 auto;
    }

    /* Masthead */
    .journal-masthead {
      margin-bottom: 46px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    .journal-masthead-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .journal-volume-tag {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--forest);
      background: rgba(32, 60, 43, 0.08);
      padding: 5px 12px;
      border-radius: 999px;
      border: 1px solid rgba(32, 60, 43, 0.12);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .journal-trust-pill {
      font-size: 12px;
      font-weight: 600;
      color: var(--forest);
      background: #FFFFFF;
      padding: 5px 14px;
      border-radius: 999px;
      border: 1px solid rgba(32, 60, 43, 0.12);
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .trust-stars {
      color: #E5A83B;
      letter-spacing: 1.5px;
      font-size: 12px;
    }
    .trust-divider {
      color: rgba(32, 60, 43, 0.25);
    }
    .journal-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(32px, 3.8vw, 48px);
      color: var(--forest);
      line-height: 1.15;
      margin: 0;
      letter-spacing: -0.02em;
    }
    .journal-subtitle {
      font-size: 16px;
      color: #485444;
      line-height: 1.55;
      max-width: 680px;
      margin: 0;
    }

    /* Editorial Magazine Spread (Asymmetric 2-Column Grid) */
    .journal-spread {
      display: grid;
      grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.85fr);
      gap: 40px;
      align-items: stretch;
      margin-bottom: 60px;
    }

    /* Left Column: Featured Video Showcase */
    .journal-featured-col {
      display: flex;
      flex-direction: column;
    }
    .journal-featured-card {
      position: relative;
      border-radius: 24px;
      background: #FFFFFF;
      border: 1px solid rgba(32, 60, 43, 0.12);
      box-shadow: 0 16px 36px rgba(27, 59, 34, 0.08);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: transform .35s cubic-bezier(.2, .8, .2, 1), box-shadow .35s;
    }
    .journal-featured-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 24px 50px rgba(27, 59, 34, 0.13);
    }
    .journal-media-wrap {
      position: relative;
      height: 380px;
      background: #1B3B22;
      overflow: hidden;
      cursor: pointer;
    }
    .journal-featured-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .6s cubic-bezier(.2, .8, .2, 1);
    }
    .journal-featured-card:hover .journal-featured-thumb {
      transform: scale(1.04);
    }
    .journal-media-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(14, 28, 18, 0.75) 0%, rgba(14, 28, 18, 0.15) 50%, rgba(14, 28, 18, 0.3) 100%);
      pointer-events: none;
    }
    .journal-play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 74px;
      height: 74px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.94);
      color: var(--forest);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      transition: transform .3s cubic-bezier(.2, .8, .2, 1), background-color .25s, box-shadow .3s;
      z-index: 3;
    }
    .journal-play-btn:hover {
      transform: translate(-50%, -50%) scale(1.12);
      background: #FFFFFF;
      box-shadow: 0 14px 40px rgba(200, 155, 83, 0.45);
      color: var(--harvest);
    }
    .play-icon-triangle {
      margin-left: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .journal-media-badges {
      position: absolute;
      bottom: 18px;
      left: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      z-index: 2;
    }
    .journal-live-badge {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 999px;
      background: rgba(14, 28, 18, 0.85);
      color: #FFFFFF;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .live-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 8px #4ade80;
    }
    .journal-duration-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 999px;
      background: rgba(245, 241, 232, 0.94);
      color: var(--forest);
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .journal-featured-caption {
      padding: 26px 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;
      gap: 12px;
      background: #FFFFFF;
    }
    .journal-caption-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 14px;
    }
    .journal-caption-location {
      font-size: 12px;
      font-weight: 700;
      color: var(--harvest);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: block;
      margin-bottom: 4px;
    }
    .journal-caption-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: 24px;
      color: var(--forest);
      margin: 0;
      line-height: 1.25;
    }
    .journal-watch-link {
      padding: 8px 18px;
      border-radius: 999px;
      background: rgba(32, 60, 43, 0.07);
      color: var(--forest);
      font-size: 12.5px;
      font-weight: 700;
      border: 1px solid rgba(32, 60, 43, 0.14);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
      transition: all 0.25s ease;
    }
    .journal-watch-link:hover {
      background: var(--forest);
      color: #FFFFFF;
      border-color: var(--forest);
      transform: translateY(-1px);
    }
    .journal-caption-desc {
      font-size: 14px;
      color: #4a5546;
      line-height: 1.55;
      margin: 0;
    }

    /* Right Column: Editorial Essay Card */
    .journal-editorial-col {
      display: flex;
      flex-direction: column;
    }
    .journal-essay-card {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 34px 32px;
      border: 1px solid rgba(32, 60, 43, 0.12);
      box-shadow: 0 16px 36px rgba(27, 59, 34, 0.06);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }
    .journal-dropcap {
      font-family: "Playfair Display", Georgia, serif;
      font-size: 54px;
      line-height: 0.8;
      float: left;
      margin-right: 12px;
      margin-bottom: 2px;
      color: var(--forest);
      font-weight: 800;
    }
    .journal-essay-lead {
      font-size: 15px;
      line-height: 1.65;
      color: #2e3b2c;
      font-weight: 500;
      margin: 0 0 14px;
    }
    .journal-essay-body {
      font-size: 14px;
      line-height: 1.65;
      color: #4a5546;
      margin: 0 0 20px;
    }
    .journal-pullquote {
      border-left: 3px solid var(--harvest);
      padding: 12px 18px;
      margin: 0 0 24px;
      font-family: "Playfair Display", Georgia, serif;
      font-style: italic;
      font-size: 15px;
      line-height: 1.5;
      color: var(--forest);
      background: rgba(200, 155, 83, 0.06);
      border-radius: 0 14px 14px 0;
    }
    .journal-stamp-row {
      display: flex;
      align-items: center;
      gap: 20px;
      padding-top: 18px;
      border-top: 1px solid rgba(32, 60, 43, 0.08);
      margin-top: auto;
    }
    .journal-polaroid {
      width: 100px;
      background: #FFFFFF;
      padding: 6px 6px 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      border: 1px solid rgba(0,0,0,0.06);
      transform: rotate(-3deg);
      border-radius: 6px;
      flex-shrink: 0;
    }
    .journal-polaroid-img {
      width: 100%;
      height: 65px;
      object-fit: cover;
      display: block;
      border-radius: 3px;
    }
    .journal-polaroid-lbl {
      display: block;
      font-size: 8.5px;
      font-weight: 700;
      color: #556250;
      text-align: center;
      margin-top: 5px;
      letter-spacing: 0.04em;
    }
    .journal-stamp-meta {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .journal-stat-tag {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .stat-num {
      font-size: 22px;
      font-weight: 800;
      color: var(--forest);
      font-family: "Playfair Display", Georgia, serif;
    }
    .stat-txt {
      font-size: 12px;
      color: #5d6a57;
      font-weight: 600;
    }

    /* Curated Filmstrip Header */
    .journal-filmstrip-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 22px;
      gap: 16px;
    }
    .journal-filmstrip-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: 26px;
      color: var(--forest);
      margin: 8px 0 0;
    }
    .journal-filmstrip-nav {
      display: inline-flex;
      gap: 10px;
    }
    .journal-nav-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 1px solid rgba(32, 60, 43, 0.14);
      color: var(--forest);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 4px 10px rgba(0,0,0,0.04);
    }
    .journal-nav-btn:hover {
      background: var(--forest);
      color: #FFFFFF;
      border-color: var(--forest);
      transform: translateY(-1px);
    }

    /* Horizontal Curated Filmstrip */
    .journal-filmstrip-wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .journal-filmstrip {
      display: flex;
      gap: 22px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding: 10px 4px 24px;
      scrollbar-width: thin;
      scrollbar-color: rgba(32, 60, 43, 0.2) transparent;
      -webkit-overflow-scrolling: touch;
    }
    .journal-filmstrip::-webkit-scrollbar {
      height: 6px;
    }
    .journal-filmstrip::-webkit-scrollbar-thumb {
      background: rgba(32, 60, 43, 0.2);
      border-radius: 999px;
    }
    .journal-film-card {
      flex: 0 0 clamp(270px, 26vw, 320px);
      scroll-snap-align: start;
      background: #FFFFFF;
      border-radius: 20px;
      border: 1px solid rgba(32, 60, 43, 0.1);
      box-shadow: 0 10px 24px rgba(27, 59, 34, 0.05);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: transform .3s cubic-bezier(.2, .8, .2, 1), box-shadow .3s, border-color .3s;
    }
    .journal-film-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 18px 36px rgba(27, 59, 34, 0.11);
      border-color: rgba(200, 155, 83, 0.4);
    }
    .journal-film-thumb-wrap {
      position: relative;
      height: 175px;
      background: #1B3B22;
      overflow: hidden;
    }
    .journal-film-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .5s cubic-bezier(.2, .8, .2, 1);
    }
    .journal-film-card:hover .journal-film-thumb {
      transform: scale(1.06);
    }
    .journal-film-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(14, 28, 18, 0.6) 0%, rgba(14, 28, 18, 0.1) 60%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .film-mini-play {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      color: var(--forest);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
      transition: transform .25s ease, background-color .25s;
    }
    .film-mini-play svg {
      margin-left: 2px;
    }
    .journal-film-card:hover .film-mini-play {
      transform: scale(1.15);
      background: #FFFFFF;
      color: var(--harvest);
    }
    .film-tag-pill {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(14, 28, 18, 0.85);
      color: #FFFFFF;
      backdrop-filter: blur(4px);
    }
    .journal-film-body {
      padding: 18px 18px 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-between;
      gap: 10px;
    }
    .film-location {
      font-size: 11px;
      font-weight: 700;
      color: var(--harvest);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .film-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: 17px;
      color: var(--forest);
      margin: 0;
      line-height: 1.3;
    }
    .film-desc {
      font-size: 12.5px;
      color: #4a5546;
      line-height: 1.48;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .film-footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10px;
      border-top: 1px solid rgba(32, 60, 43, 0.08);
      margin-top: auto;
    }
    .film-action-text {
      font-size: 12px;
      font-weight: 700;
      color: var(--forest);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: color .2s;
    }
    .journal-film-card:hover .film-action-text {
      color: var(--harvest);
    }

    /* Cinematic Video Modal Viewer */
    .journal-video-modal {
      z-index: 10001;
    }
    .journal-video-card {
      position: relative;
      width: min(880px, 94vw);
      background: #0E1A11;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      flex-direction: column;
      max-height: 92vh;
      animation: modalZoomIn .3s cubic-bezier(.2, .8, .2, 1);
    }
    @keyframes modalZoomIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .journal-video-header {
      padding: 18px 24px;
      background: rgba(14, 26, 17, 0.95);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
    }
    .journal-video-badge {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--harvest);
      display: block;
      margin-bottom: 4px;
    }
    .journal-video-modal-title {
      font-family: "Playfair Display", Georgia, serif;
      font-size: 20px;
      color: #FFFFFF;
      margin: 0 0 2px;
      line-height: 1.25;
    }
    .journal-video-modal-loc {
      font-size: 12px;
      color: #A3B2A1;
    }
    .journal-close-btn {
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.1);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      font-size: 24px;
      cursor: pointer;
      line-height: 1;
      transition: background-color .2s;
    }
    .journal-close-btn:hover {
      background: rgba(255, 255, 255, 0.22);
    }
    .journal-video-viewport {
      position: relative;
      width: 100%;
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
      background: #000000;
    }
    .journal-video-viewport iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
    .journal-video-footer {
      padding: 16px 24px 20px;
      background: rgba(14, 26, 17, 0.95);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
    }
    .journal-modal-desc {
      font-size: 13px;
      color: #CAD5C8;
      line-height: 1.5;
      margin: 0;
      max-width: 540px;
    }
    .journal-modal-book-btn {
      padding: 9px 20px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
      flex-shrink: 0;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }

    @media (max-width: 960px) {
      .journal-section {
        padding: 80px 5vw;
      }
      .journal-spread {
        grid-template-columns: 1fr;
        gap: 28px;
      }
      .journal-media-wrap {
        height: 280px;
      }
      .journal-featured-caption {
        padding: 20px 22px;
      }
      .journal-caption-title {
        font-size: 21px;
      }
      .journal-caption-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
      .journal-essay-card {
        padding: 26px 22px;
      }
      .journal-video-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
      .journal-modal-book-btn {
        width: 100%;
        justify-content: center;
      }
    }

`;

html = html.slice(0, startIndex) + newJournalCSS + '\n' + html.slice(endIndex);

console.log('2. Replacing Reviews HTML with Editorial Travel Journal HTML...');

const htmlReviewStart = '    <!-- 04D. THE AGRARIAN GUEST LOGBOOK & REVIEWS -->';
const htmlReviewEnd = '    <section class="cta" id="booking">';

const rStartIndex = html.indexOf(htmlReviewStart);
const rEndIndex = html.indexOf(htmlReviewEnd);

if (rStartIndex === -1 || rEndIndex === -1) {
  console.error('Could not find HTML review markers:', { rStartIndex, rEndIndex });
  process.exit(1);
}

const newJournalHTML = `    <!-- 04D. EDITORIAL TRAVEL JOURNAL: MEMORIES MADE AT THE FARM -->
    <section class="journal-section" id="reviews" aria-label="Editorial Travel Journal: Memories Made at the Farm">
      <div class="journal-container">

        <!-- Top Editorial Masthead -->
        <div class="journal-masthead">
          <div class="journal-masthead-meta">
            <span class="journal-volume-tag">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>
              Volume IV • Field Memories
            </span>
            <div class="journal-trust-pill">
              <span class="trust-stars">★★★★★</span>
              <strong>4.8 / 5</strong> Google Rating
              <span class="trust-divider">•</span>
              <span>664 Reviews</span>
            </div>
          </div>
          <h2 class="journal-title">Memories made at the farm.</h2>
          <p class="journal-subtitle">Real moments. Real visitors. Stories from a day spent with nature.</p>
        </div>

        <!-- Main Editorial Magazine Spread (Asymmetric 2-Column) -->
        <div class="journal-spread">

          <!-- Left Column: Primary Featured Video Showcase -->
          <div class="journal-featured-col">
            <div class="journal-featured-card" id="journalFeaturedCard">
              <div class="journal-media-wrap" id="journalMediaWrap" role="button" tabindex="0" aria-label="Play Featured Video: Alphores eTechno School">
                <img id="journalFeaturedThumb" src="/assets/testimonials/ECP1QRaze2A.jpg" alt="Featured School Visit: Alphores eTechno School at One Day Kissan" class="journal-featured-thumb" loading="lazy">
                <div class="journal-media-overlay"></div>
                <button type="button" class="journal-play-btn" id="journalFeaturedPlayBtn" aria-label="Play Featured Testimonial Video" data-video-id="ECP1QRaze2A">
                  <div class="play-icon-triangle">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  </div>
                </button>
                <div class="journal-media-badges">
                  <span class="journal-live-badge"><span class="live-dot"></span> Official Testimonial</span>
                  <span class="journal-duration-badge" id="journalFeaturedTag">Field Trip Film</span>
                </div>
              </div>
              <div class="journal-featured-caption">
                <div class="journal-caption-header">
                  <div>
                    <span class="journal-caption-location" id="journalFeaturedLocation">Bhagatnagar, Karimnagar</span>
                    <h3 class="journal-caption-title" id="journalFeaturedTitle">Alphores eTechno School</h3>
                  </div>
                  <button type="button" class="journal-watch-link" id="journalFeaturedWatchBtn" data-video-id="ECP1QRaze2A">
                    <span>Watch Film</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
                <p class="journal-caption-desc" id="journalFeaturedDesc">Students experiencing barefoot paddy planting, organic soil preparation, and joyful village games under the open Telangana sky.</p>
              </div>
            </div>
          </div>

          <!-- Right Column: Editorial Essay & Authentic Gallery Collage -->
          <div class="journal-editorial-col">
            <div class="journal-essay-card">
              <div>
                <span class="journal-dropcap">W</span>
                <p class="journal-essay-lead">
                  hen children step out of yellow buses onto red Deccan soil, textbooks give way to wonder. Hands plunge into wet paddy silt, laughs echo across the Persian wheel, and curiosity takes root.
                </p>
                <p class="journal-essay-body">
                  Over 400 schools and 80,000 students have journeyed to our farms in Bhongir and Moinabad to experience real agriculture firsthand. These recorded memories capture pure, unscripted reflections from educators, young explorers, and families discovering where our food truly comes from.
                </p>
                <div class="journal-pullquote">
                  “Seeing children touch living earthworms, watch rice husk in the mill, and share woodfire lunch outdoors reminds us why experiential learning matters.”
                </div>
              </div>
              <div class="journal-stamp-row">
                <div class="journal-polaroid">
                  <img src="/assets/experiences/gallery/gallery-01.webp" alt="Authentic visitor experience in One Day Kisan fields" class="journal-polaroid-img" loading="lazy">
                  <span class="journal-polaroid-lbl">Telangana Farmlands</span>
                </div>
                <div class="journal-stamp-meta">
                  <div class="journal-stat-tag">
                    <span class="stat-num">400+</span>
                    <span class="stat-txt">Schools Welcomed</span>
                  </div>
                  <div class="journal-stat-tag">
                    <span class="stat-num">80,000+</span>
                    <span class="stat-txt">Students Experienced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Curated Filmstrip Header & Controls -->
        <div class="journal-filmstrip-header">
          <div>
            <span class="pill" style="font-size: 11px; padding: 4px 12px;">Curated Testimonial Archives</span>
            <h3 class="journal-filmstrip-title">More Stories from the Field</h3>
          </div>
          <div class="journal-filmstrip-nav">
            <button type="button" class="journal-nav-btn prev" id="journalPrevBtn" aria-label="Previous Stories">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button type="button" class="journal-nav-btn next" id="journalNextBtn" aria-label="Next Stories">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <!-- Horizontal Curated Filmstrip -->
        <div class="journal-filmstrip-wrap">
          <div class="journal-filmstrip" id="journalFilmstrip" tabindex="0" role="region" aria-label="Testimonial Video Collection">
            <!-- Film cards injected dynamically via JS controller -->
          </div>
        </div>

      </div>
    </section>

`;

html = html.slice(0, rStartIndex) + newJournalHTML + html.slice(rEndIndex);

console.log('3. Replacing #reviewModal with #journalVideoModal...');

const modalReviewStart = '  <!-- Submit Field Note / Review Modal -->';
const modalReviewEnd = '  <!-- Toast Notification -->';

const mRStart = html.indexOf(modalReviewStart);
const mREnd = html.indexOf(modalReviewEnd);

if (mRStart !== -1 && mREnd !== -1) {
  const newVideoModalHTML = `  <!-- Cinematic Testimonial Video Player Viewer -->
  <div id="journalVideoModal" class="modal-overlay journal-video-modal" role="dialog" aria-modal="true" aria-labelledby="journalModalTitle">
    <div class="journal-video-card" id="journalVideoCard">
      <div class="journal-video-header">
        <div class="journal-video-meta">
          <span class="journal-video-badge" id="journalModalTag">Official Testimonial Film</span>
          <h3 class="journal-video-modal-title" id="journalModalTitle">Alphores eTechno School</h3>
          <span class="journal-video-modal-loc" id="journalModalLoc">Bhagatnagar, Karimnagar • One Day Kissan Experience</span>
        </div>
        <button type="button" class="pass-close-btn journal-close-btn" id="closeJournalModalBtn" aria-label="Close Video Viewer">&times;</button>
      </div>
      <div class="journal-video-viewport">
        <iframe id="journalModalFrame" src="" title="One Day Kisan Testimonial Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
      </div>
      <div class="journal-video-footer">
        <p id="journalModalDesc" class="journal-modal-desc">Students experiencing barefoot paddy planting, organic soil preparation, and joyful village games under the open sky.</p>
        <div class="journal-modal-actions">
          <a href="#booking" class="btn btn-gold journal-modal-book-btn" id="journalModalBookBtn">
            Plan Your Farm Visit
          </a>
        </div>
      </div>
    </div>
  </div>

`;
  html = html.slice(0, mRStart) + newVideoModalHTML + html.slice(mREnd);
  console.log('   Successfully replaced #reviewModal with #journalVideoModal.');
} else {
  console.warn('   Could not find #reviewModal markers:', { mRStart, mREnd });
}

console.log('4. Replacing legacy Review JS with Editorial Travel Journal Controller...');

const jsReviewStart = '      // ==========================================\n      // PHASE 4: GUEST LOGBOOK & REVIEWS\n      // ==========================================';
const jsReviewEnd = '      attachLikeListeners();';

const jsRStart = html.indexOf(jsReviewStart);
const jsREnd = html.indexOf(jsReviewEnd, jsRStart);

if (jsRStart !== -1 && jsREnd !== -1) {
  const endCutIndex = jsREnd + jsReviewEnd.length;
  const newJournalJS = `      // ==========================================
      // PHASE 4: EDITORIAL TRAVEL JOURNAL CONTROLLER
      // ==========================================

      const TESTIMONIAL_VIDEOS = [
        {
          id: "ECP1QRaze2A",
          institution: "Alphores eTechno School",
          location: "Bhagatnagar, Karimnagar",
          caption: "Students experiencing barefoot paddy planting, organic soil preparation, and joyful village games under the open sky.",
          tag: "Field Trip Film",
          thumb: "/assets/testimonials/ECP1QRaze2A.jpg"
        },
        {
          id: "iqaiVDI9Cow",
          institution: "Sloka The Global School",
          location: "Hyderabad",
          caption: "An immersive outdoor day connecting young urban minds to farming heritage, water canals, and animal care.",
          tag: "School Excursion",
          thumb: "/assets/testimonials/iqaiVDI9Cow.jpg"
        },
        {
          id: "gHAtUX2qt2c",
          institution: "Loyola High School",
          location: "Secunderabad",
          caption: "Hands-on walk-in bird aviary exploration, water heritage demonstrations, and traditional village crafts.",
          tag: "Nature Immersion",
          thumb: "/assets/testimonials/gHAtUX2qt2c.jpg"
        },
        {
          id: "O17e9WGiEqc",
          institution: "Rising Sun Kids School",
          location: "Telangana",
          caption: "Young children discovering the origins of food, interacting with farm cows, and enjoying open tractor rides.",
          tag: "Early Explorers",
          thumb: "/assets/testimonials/O17e9WGiEqc.jpg"
        },
        {
          id: "3SaJu9fiATE",
          institution: "TGMS (PMSHRI School)",
          location: "Maripeda",
          caption: "Experiential agrarian science curriculum, exploring earthworm vermiculture and ancestral water lift techniques.",
          tag: "Educational Study",
          thumb: "/assets/testimonials/3SaJu9fiATE.jpg"
        },
        {
          id: "RnJUm9V0jCk",
          institution: "Masterji Group of Schools",
          location: "Hanamkonda",
          caption: "Teachers and students reflecting on transformative rural life lessons, clay pottery, and living ecology.",
          tag: "Faculty & Student Review",
          thumb: "/assets/testimonials/RnJUm9V0jCk.jpg"
        },
        {
          id: "NMCfLntDp6c",
          institution: "Rosebuds World School",
          location: "Manikonda",
          caption: "Tracing the paddy life cycle, rice mill operation, and joyous open-air tractor trailer rides.",
          tag: "Agricultural Discovery",
          thumb: "/assets/testimonials/NMCfLntDp6c.jpg"
        },
        {
          id: "1sfSFpvh3As",
          institution: "Suvidya School",
          location: "Ramanthapur",
          caption: "A joyful day outside textbook pages — hands-on clay pottery and natural farming experiences.",
          tag: "Experiential Learning",
          thumb: "/assets/testimonials/1sfSFpvh3As.jpg"
        },
        {
          id: "G4r1Ch81JqQ",
          institution: "Kendriya Vidyalaya (KV)",
          location: "Picket, Secunderabad",
          caption: "Practical agrarian science aligned with National Education Policy (NEP) outdoor learning.",
          tag: "National Curriculum Trip",
          thumb: "/assets/testimonials/G4r1Ch81JqQ.jpg"
        },
        {
          id: "F0qFT6KCfS0",
          institution: "Shanthinikethan School",
          location: "Warangal",
          caption: "Unplugging from screens to celebrate rural hospitality, bullock carts, and harvest smiles.",
          tag: "Heritage Field Day",
          thumb: "/assets/testimonials/F0qFT6KCfS0.jpg"
        },
        {
          id: "X0XqxeeBfsg",
          institution: "St. Pious High School",
          location: "Alwal",
          caption: "Exploring vegetable biodiversity, Archimedes screw irrigation, and village crafts.",
          tag: "Hands-on Science",
          thumb: "/assets/testimonials/X0XqxeeBfsg.jpg"
        },
        {
          id: "I2SoLDuRdXE",
          institution: "Skillstork International School",
          location: "Telangana",
          caption: "Inquiry-based outdoor environmental stewardship and community agrarian celebration.",
          tag: "International Curriculum",
          thumb: "/assets/testimonials/I2SoLDuRdXE.jpg"
        }
      ];

      let currentFeaturedVideo = TESTIMONIAL_VIDEOS[0];

      const journalFeaturedThumb = document.getElementById('journalFeaturedThumb');
      const journalFeaturedPlayBtn = document.getElementById('journalFeaturedPlayBtn');
      const journalFeaturedWatchBtn = document.getElementById('journalFeaturedWatchBtn');
      const journalFeaturedTag = document.getElementById('journalFeaturedTag');
      const journalFeaturedLocation = document.getElementById('journalFeaturedLocation');
      const journalFeaturedTitle = document.getElementById('journalFeaturedTitle');
      const journalFeaturedDesc = document.getElementById('journalFeaturedDesc');
      const journalMediaWrap = document.getElementById('journalMediaWrap');
      const journalFilmstrip = document.getElementById('journalFilmstrip');
      const journalPrevBtn = document.getElementById('journalPrevBtn');
      const journalNextBtn = document.getElementById('journalNextBtn');

      const journalVideoModal = document.getElementById('journalVideoModal');
      const closeJournalModalBtn = document.getElementById('closeJournalModalBtn');
      const journalModalFrame = document.getElementById('journalModalFrame');
      const journalModalTitle = document.getElementById('journalModalTitle');
      const journalModalLoc = document.getElementById('journalModalLoc');
      const journalModalTag = document.getElementById('journalModalTag');
      const journalModalDesc = document.getElementById('journalModalDesc');
      const journalModalBookBtn = document.getElementById('journalModalBookBtn');

      function openJournalVideoModal(videoItem) {
        if (!videoItem) return;
        if (journalModalTitle) journalModalTitle.textContent = videoItem.institution;
        if (journalModalLoc) journalModalLoc.textContent = \`\${videoItem.location} • One Day Kissan Experience\`;
        if (journalModalTag) journalModalTag.textContent = videoItem.tag;
        if (journalModalDesc) journalModalDesc.textContent = videoItem.caption;

        if (journalModalFrame) {
          // Play original YouTube video securely with no branding / tracking
          journalModalFrame.src = \`https://www.youtube-nocookie.com/embed/\${encodeURIComponent(videoItem.id)}?autoplay=1&rel=0&modestbranding=1\`;
        }

        openModal(journalVideoModal);
      }

      function closeJournalVideoModal() {
        if (journalModalFrame) {
          // Immediately stop playback upon closing
          journalModalFrame.src = '';
        }
        closeModal(journalVideoModal);
      }

      function setFeaturedVideo(videoItem) {
        if (!videoItem) return;
        currentFeaturedVideo = videoItem;

        if (journalFeaturedThumb) {
          journalFeaturedThumb.src = videoItem.thumb;
          journalFeaturedThumb.alt = \`Featured Visit: \${videoItem.institution}\`;
        }
        if (journalFeaturedTag) journalFeaturedTag.textContent = videoItem.tag;
        if (journalFeaturedLocation) journalFeaturedLocation.textContent = videoItem.location;
        if (journalFeaturedTitle) journalFeaturedTitle.textContent = videoItem.institution;
        if (journalFeaturedDesc) journalFeaturedDesc.textContent = videoItem.caption;

        if (journalFeaturedPlayBtn) journalFeaturedPlayBtn.setAttribute('data-video-id', videoItem.id);
        if (journalFeaturedWatchBtn) journalFeaturedWatchBtn.setAttribute('data-video-id', videoItem.id);
      }

      // Render Filmstrip Cards
      if (journalFilmstrip) {
        journalFilmstrip.innerHTML = TESTIMONIAL_VIDEOS.map((item, index) => \`
          <article class="journal-film-card" data-video-index="\${index}" data-video-id="\${item.id}" tabindex="0" role="button" aria-label="Watch testimonial: \${item.institution}">
            <div class="journal-film-thumb-wrap">
              <img src="\${item.thumb}" alt="\${item.institution}" class="journal-film-thumb" loading="lazy">
              <div class="journal-film-overlay">
                <div class="film-mini-play">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                </div>
              </div>
              <span class="film-tag-pill">\${item.tag}</span>
            </div>
            <div class="journal-film-body">
              <div>
                <span class="film-location">\${item.location}</span>
                <h4 class="film-title">\${item.institution}</h4>
                <p class="film-desc">\${item.caption}</p>
              </div>
              <div class="film-footer-row">
                <span class="film-action-text">
                  <span>Watch Story</span>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
                <span style="font-size: 11px; color: #73806e; font-weight: 600;">Telangana</span>
              </div>
            </div>
          </article>
        \`).join('');

        // Filmstrip Card Click Listener
        journalFilmstrip.querySelectorAll('.journal-film-card').forEach(card => {
          card.addEventListener('click', () => {
            const idx = parseInt(card.getAttribute('data-video-index'), 10) || 0;
            const item = TESTIMONIAL_VIDEOS[idx];
            setFeaturedVideo(item);
            openJournalVideoModal(item);
          });
          card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const idx = parseInt(card.getAttribute('data-video-index'), 10) || 0;
              const item = TESTIMONIAL_VIDEOS[idx];
              setFeaturedVideo(item);
              openJournalVideoModal(item);
            }
          });
        });
      }

      // Filmstrip Navigation Buttons
      if (journalPrevBtn && journalFilmstrip) {
        journalPrevBtn.addEventListener('click', () => {
          journalFilmstrip.scrollBy({ left: -320, behavior: 'smooth' });
        });
      }
      if (journalNextBtn && journalFilmstrip) {
        journalNextBtn.addEventListener('click', () => {
          journalFilmstrip.scrollBy({ left: 320, behavior: 'smooth' });
        });
      }

      // Featured Card Play Click
      if (journalFeaturedPlayBtn) {
        journalFeaturedPlayBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openJournalVideoModal(currentFeaturedVideo);
        });
      }
      if (journalFeaturedWatchBtn) {
        journalFeaturedWatchBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openJournalVideoModal(currentFeaturedVideo);
        });
      }
      if (journalMediaWrap) {
        journalMediaWrap.addEventListener('click', () => {
          openJournalVideoModal(currentFeaturedVideo);
        });
        journalMediaWrap.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openJournalVideoModal(currentFeaturedVideo);
          }
        });
      }

      // Modal Close Handlers
      if (closeJournalModalBtn) {
        closeJournalModalBtn.addEventListener('click', closeJournalVideoModal);
      }
      if (journalVideoModal) {
        journalVideoModal.addEventListener('click', (e) => {
          if (e.target === journalVideoModal) closeJournalVideoModal();
        });
      }
      if (journalModalBookBtn) {
        journalModalBookBtn.addEventListener('click', () => {
          closeJournalVideoModal();
          const bookingEl = document.getElementById('booking');
          if (bookingEl) {
            const notes = document.getElementById('dietaryNotes');
            if (notes && currentFeaturedVideo) {
              notes.value = \`Interested in School/Group Visit (Inspired by \${currentFeaturedVideo.institution})\`;
            }
            if (window.__lenis) window.__lenis.scrollTo(bookingEl, { duration: 1.2, offset: -20 });
            else bookingEl.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      // Keyboard Esc key listener for Video Modal
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && journalVideoModal && journalVideoModal.classList.contains('is-open')) {
          closeJournalVideoModal();
        }
      });
`;

  html = html.slice(0, jsRStart) + newJournalJS + '\n' + html.slice(endCutIndex);
  console.log('   Successfully replaced legacy review JS with Editorial Travel Journal controller.');
} else {
  console.warn('   Could not find JS review markers:', { jsRStart, jsREnd });
}

// Clean up closeModal(reviewModal) from global Esc key listener if present
html = html.replace('          closeModal(reviewModal);\n', '');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ Successfully applied Editorial Travel Journal to index.html!');
