const fs = require('fs');

console.log("Reading index.html...");
let html = fs.readFileSync('index.html', 'utf8');

const schools = JSON.parse(fs.readFileSync('verified_schools.json', 'utf8'));
const gallery = JSON.parse(fs.readFileSync('gallery_data.json', 'utf8'));
const faqs = JSON.parse(fs.readFileSync('faq_data.json', 'utf8'));
const stylesCSS = fs.readFileSync('milestone_1b_styles.css', 'utf8');

// 1. Remove obsolete scroll-anchor placeholders for schools and gallery
html = html.replace('<span id="schools" class="scroll-anchor" aria-hidden="true"></span>\n', '');
html = html.replace('<span id="schools" class="scroll-anchor" aria-hidden="true"></span>', '');
html = html.replace('<span id="gallery" class="scroll-anchor" aria-hidden="true"></span>\n', '');
html = html.replace('<span id="gallery" class="scroll-anchor" aria-hidden="true"></span>', '');

// 2. Insert CSS before </style>
if (!html.includes('MILESTONE 1B: INSTITUTIONAL TRUST & CONTENT PARITY')) {
  const styleEnd = '</style>';
  const styleIdx = html.indexOf(styleEnd);
  if (styleIdx === -1) {
    throw new Error("Could not find </style> in index.html");
  }
  html = html.slice(0, styleIdx) + '\n' + stylesCSS + '\n' + html.slice(styleIdx);
  console.log("Inserted Milestone 1B styles into <style>");
}

// 3. Build HTML Markup for Schools, Gallery, FAQ, Lightbox Modal

// --- Schools Section ---
const marqueeRow1 = schools.slice(0, 20);
const marqueeRow2 = schools.slice(20, 40);

const marqueeRow1HTML = marqueeRow1.concat(marqueeRow1).map(s => `
              <div class="marquee-school-pill">
                <span class="marquee-school-icon">🏛️</span>
                <span class="marquee-school-name">${s.name}</span>
                <span class="marquee-school-loc">📍 ${s.loc}</span>
              </div>`).join('\n');

const marqueeRow2HTML = marqueeRow2.concat(marqueeRow2).map(s => `
              <div class="marquee-school-pill">
                <span class="marquee-school-icon">🎓</span>
                <span class="marquee-school-name">${s.name}</span>
                <span class="marquee-school-loc">📍 ${s.loc}</span>
              </div>`).join('\n');

const schoolsSectionHTML = `
    <!-- 04B-2. INSTITUTIONAL TRUST & SCHOOL CLIENTELE DIRECTORY -->
    <section class="schools-section" id="schools" aria-label="Our Clientele: Trusted by 400+ Schools & Educational Institutions">
      <div class="schools-container">

        <!-- Section Header -->
        <div class="schools-header">
          <span class="schools-pill">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 14.54l-7-3.82V17l7 3.82 7-3.82v-3.28l-7 3.82z"/></svg>
            Institutional Trust &amp; Experiential Learning
          </span>
          <h2 class="schools-title">Trusted by <span class="schools-count">400+</span> Schools &amp; Institutions</h2>
          <p class="schools-subtitle">From Hyderabad's premier international academies to leading CBSE and state schools across Warangal, Karimnagar, and regional Telangana — educators trust One Day Kisan for curriculum-aligned agricultural discovery.</p>
        </div>

        <!-- Trust Metrics Ribbon -->
        <div class="schools-metrics-ribbon">
          <div class="metric-card">
            <div class="metric-number">400+</div>
            <div class="metric-label">Partner Schools &amp; Colleges</div>
          </div>
          <div class="metric-card">
            <div class="metric-number">80,000+</div>
            <div class="metric-label">Students Welcomed</div>
          </div>
          <div class="metric-card">
            <div class="metric-number">23+</div>
            <div class="metric-label">Hands-on Farm Activities</div>
          </div>
          <div class="metric-card">
            <div class="metric-number">100%</div>
            <div class="metric-label">Verified Field Experiences</div>
          </div>
        </div>

        <!-- Dual Continuous Marquee Ribbons -->
        <div class="schools-marquee-wrapper" aria-hidden="true">
          <div class="marquee-row">
            <div class="marquee-track track-left">
${marqueeRow1HTML}
            </div>
          </div>
          <div class="marquee-row">
            <div class="marquee-track track-right">
${marqueeRow2HTML}
            </div>
          </div>
        </div>

        <!-- Interactive Directory Controls -->
        <div class="schools-directory-header">
          <div class="schools-filter-group" role="tablist" aria-label="Filter Schools by Region">
            <button type="button" class="school-region-tab is-active" data-region="all" role="tab" aria-selected="true">
              All Regions (<span id="schoolsCountAll">${schools.length}</span>)
            </button>
            <button type="button" class="school-region-tab" data-region="hyderabad" role="tab" aria-selected="false">
              Hyderabad &amp; Secunderabad (<span id="schoolsCountHyd">${schools.filter(s => s.region === 'hyderabad').length}</span>)
            </button>
            <button type="button" class="school-region-tab" data-region="warangal" role="tab" aria-selected="false">
              Warangal &amp; Hanmakonda (<span id="schoolsCountWgl">${schools.filter(s => s.region === 'warangal').length}</span>)
            </button>
            <button type="button" class="school-region-tab" data-region="regional" role="tab" aria-selected="false">
              Regional Districts (<span id="schoolsCountReg">${schools.filter(s => s.region === 'regional').length}</span>)
            </button>
          </div>

          <div class="schools-search-box">
            <svg class="schools-search-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <input type="text" id="schoolSearchInput" class="schools-search-input" placeholder="Search schools by name or location (e.g. Kondapur, DAV, Warangal)..." aria-label="Search schools by name or location">
          </div>
        </div>

        <!-- Directory School Cards Grid -->
        <div class="schools-directory-grid" id="schoolsDirectoryGrid">
          <!-- Populated dynamically via JS -->
        </div>

        <!-- Pagination / Load More Row -->
        <div class="schools-pagination-row" id="schoolsPaginationRow">
          <button type="button" class="schools-load-more-btn" id="schoolsLoadMoreBtn">
            <span>Show More Partner Schools</span>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
          </button>
        </div>

        <!-- Educator Field Trip Callout Banner -->
        <div class="schools-educator-banner">
          <div class="educator-banner-copy">
            <span class="educator-banner-kicker">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              CBSE &amp; ICSE Experiential Learning Curriculum
            </span>
            <h3 class="educator-banner-title">Planning a school field trip or college agrarian study tour?</h3>
            <p class="educator-banner-desc">Our farm curriculum connects classroom science with living reality — covering soil microbiology, seed-to-grain biology, ancestral hydraulic engineering (Persian wheel &amp; Archimedes screw), and vermicomposting. Includes dedicated farm educators, strict safety protocols, and spacious school bus parking.</p>
          </div>
          <div class="educator-banner-actions">
            <a href="#booking" class="btn btn-gold educator-banner-btn" id="schoolEnquireBtn">
              <span>Book a School Field Trip</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="https://wa.me/919849798674?text=Hi%20One%20Day%20Kissan,%20I%20am%20interested%20in%20planning%20a%20school%20field%20trip%20for%20our%20students." target="_blank" rel="noopener noreferrer" class="btn btn-outline educator-banner-btn" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.3); color: #FFFFFF;">
              <span>WhatsApp Coordinator</span>
            </a>
          </div>
        </div>

      </div>
    </section>
`;

// --- Gallery Section ---
const galleryCardsHTML = gallery.map((item, idx) => {
  let featClass = '';
  if (idx === 0) featClass = 'mosaic-feat-1';
  else if (idx === 5) featClass = 'mosaic-feat-2';
  
  return `
          <article class="gallery-card ${featClass}" data-gallery-id="${item.id}" data-category="${item.category}" role="button" tabindex="0" aria-label="View photo: ${item.title}">
            <img src="${item.src}" alt="${item.title}: Authentic moment at One Day Kisan ${item.location}" class="gallery-card-img" loading="lazy" decoding="async">
            <div class="gallery-card-overlay">
              <div class="gallery-card-meta">
                <span class="gallery-card-category">${item.categoryLabel}</span>
                <span class="gallery-card-loc">📍 ${item.location}</span>
              </div>
              <h4 class="gallery-card-title">${item.title}</h4>
            </div>
            <div class="gallery-zoom-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7V9zm2-2h1v5H9V7z"/></svg>
            </div>
          </article>`;
}).join('\n');

const gallerySectionHTML = `
    <!-- 04E. CANDID PHOTO GALLERY MOSAIC -->
    <section class="gallery-section" id="gallery" aria-label="Candid Photo Gallery: Moments at One Day Kisan">
      <div class="gallery-container">

        <!-- Section Header -->
        <div class="gallery-header">
          <span class="gallery-pill">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            Visual Chronicle
          </span>
          <h2 class="gallery-title">A Day in the Life at One Day Kisan</h2>
          <p class="gallery-subtitle">Authentic moments captured across our Bhongir and Moinabad farmlands — where curious hands, green fields, and joyful smiles come together.</p>
        </div>

        <!-- Filter Tabs -->
        <div class="gallery-filter-tabs" role="tablist" aria-label="Filter Photos by Experience">
          <button type="button" class="gallery-tab-btn is-active" data-gallery-filter="all" role="tab" aria-selected="true">
            All Moments (${gallery.length})
          </button>
          <button type="button" class="gallery-tab-btn" data-gallery-filter="field" role="tab" aria-selected="false">
            🌾 Paddy &amp; Soil
          </button>
          <button type="button" class="gallery-tab-btn" data-gallery-filter="animals" role="tab" aria-selected="false">
            🐂 Animals &amp; Aviary
          </button>
          <button type="button" class="gallery-tab-btn" data-gallery-filter="crafts" role="tab" aria-selected="false">
            🏺 Village Crafts
          </button>
          <button type="button" class="gallery-tab-btn" data-gallery-filter="fun" role="tab" aria-selected="false">
            🚜 Farm Joy
          </button>
        </div>

        <!-- Mosaic Grid of Authentic 20 WebP Photos -->
        <div class="gallery-mosaic-grid" id="galleryMosaicGrid">
${galleryCardsHTML}
        </div>

      </div>
    </section>
`;

// --- FAQ Section ---
const faqsListHTML = faqs.map((faq, i) => `
              <div class="faq-item" id="faqItem-${i}">
                <button type="button" class="faq-trigger" id="faqTrigger-${i}" aria-expanded="false" aria-controls="faqPanel-${i}">
                  <span class="faq-trigger-left">
                    <span class="faq-num">${faq.num}</span>
                    <span class="faq-q-text">${faq.q}</span>
                  </span>
                  <span class="faq-chevron-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
                  </span>
                </button>
                <div class="faq-panel" id="faqPanel-${i}" role="region" aria-labelledby="faqTrigger-${i}" hidden>
                  <p>${faq.a}</p>
                </div>
              </div>`).join('\n');

const faqSectionHTML = `
    <!-- 04F. AGRITOURISM FAQ ACCORDION -->
    <section class="faq-section" id="faq" aria-label="Frequently Asked Questions">
      <div class="faq-container">

        <div class="faq-layout-grid">

          <!-- Left Column: Sticky Editorial Context & Concierge Card -->
          <div class="faq-sidebar">
            <span class="faq-tag">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .88-.36 1.68-.93 2.25z"/></svg>
              Got Questions?
            </span>
            <h2 class="faq-title">Frequently Asked <em>Questions</em></h2>
            <p class="faq-subtitle">Everything you need to know before visiting our farms in Bhongir and Moinabad. Can't find what you are looking for? Reach out to our farm stewards directly.</p>

            <div class="faq-help-card">
              <div class="faq-help-icon">🌾</div>
              <h3 class="faq-help-title">Still have questions?</h3>
              <p class="faq-help-text">Our dedicated team is here to assist with school itineraries, corporate day packages, and custom timings.</p>
              <a href="https://wa.me/919849798674?text=Hi%20One%20Day%20Kissan,%20I%20have%20a%20question%20about%20planning%20a%20farm%20visit." target="_blank" rel="noopener noreferrer" class="faq-help-btn">
                <span>Chat on WhatsApp</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="tel:+919849798674" class="faq-phone-link">
                <span>Call +91 98497 98674</span>
              </a>
            </div>
          </div>

          <!-- Right Column: 8 Verified Accordion Questions -->
          <div class="faq-accordion-col">
            <div class="faq-accordion-list" id="faqAccordionList">
${faqsListHTML}
            </div>
          </div>

        </div>

      </div>
    </section>
`;

// --- Lightbox Modal ---
const lightboxModalHTML = `
  <!-- Accessible Candid Photo Lightbox Modal -->
  <div id="galleryModal" class="gallery-lightbox-overlay" role="dialog" aria-modal="true" aria-labelledby="galleryModalTitle" aria-hidden="true">
    <div class="gallery-lightbox-dialog" id="galleryModalDialog">
      <button type="button" class="gallery-lightbox-close" id="closeGalleryModalBtn" aria-label="Close Lightbox">&times;</button>
      
      <div class="gallery-lightbox-stage">
        <button type="button" class="lightbox-nav-btn prev" id="galleryPrevBtn" aria-label="Previous Photo">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        
        <img id="galleryModalImg" src="/assets/experiences/gallery/gallery-01.webp" alt="One Day Kisan Farm Photography" class="gallery-lightbox-img">
        
        <button type="button" class="lightbox-nav-btn next" id="galleryNextBtn" aria-label="Next Photo">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>
      </div>

      <div class="gallery-lightbox-caption">
        <div class="lightbox-caption-text">
          <div class="lightbox-meta-row">
            <span class="lightbox-category-tag" id="galleryModalCat">Paddy &amp; Soil</span>
            <span class="lightbox-loc-pill" id="galleryModalLoc">📍 Bhongir Farm</span>
          </div>
          <h3 class="lightbox-title" id="galleryModalTitle">Experiential Agricultural Discovery</h3>
          <p class="lightbox-desc" id="galleryModalDesc">Students and visitors gathering amidst lush open farm fields under guided stewardship.</p>
        </div>
        <div class="lightbox-counter-badge" id="galleryModalCounter">01 / 20</div>
      </div>
    </div>
  </div>
`;

// 4. Insert Sections into DOM
// Insert #schools after </section> of #experiences
const expEndMarker = '</section>\n\n    <!-- 04C. EXPLORE LIFE AT THE FARM';
if (html.includes(expEndMarker) && !html.includes('id="schools" class="schools-section"')) {
  html = html.replace(expEndMarker, '</section>\n' + schoolsSectionHTML + '\n    <!-- 04C. EXPLORE LIFE AT THE FARM');
  console.log("Inserted #schools section after #experiences");
}

// Insert #gallery and #faq after </section> of #reviews
const revEndMarker = '</section>\n\n    <!-- 05. LUXURY FARM RESERVATION SECTION';
if (html.includes(revEndMarker) && !html.includes('id="gallery" class="gallery-section"')) {
  html = html.replace(revEndMarker, '</section>\n' + gallerySectionHTML + '\n' + faqSectionHTML + '\n    <!-- 05. LUXURY FARM RESERVATION SECTION');
  console.log("Inserted #gallery and #faq sections before #booking");
}

// Insert #galleryModal before #experienceModal
const expModalMarker = '<div id="experienceModal"';
if (html.includes(expModalMarker) && !html.includes('id="galleryModal"')) {
  html = html.replace(expModalMarker, lightboxModalHTML + '\n  ' + expModalMarker);
  console.log("Inserted #galleryModal into modal overlay group");
}

// 5. Update Desktop and Mobile Nav links to include Schools, Gallery, FAQ
// Desktop nav
const oldDesktopNav = `<nav class="site-nav-desktop" id="siteNavDesktop" aria-label="Primary Navigation">
          <ul class="nav-links-list">
            <li><a href="#hero" class="nav-link is-active">Home</a></li>
            <li><a href="#stories" class="nav-link">About</a></li>
            <li><a href="#farm-activities" class="nav-link">Activities</a></li>
            <li><a href="#gallery" class="nav-link">Gallery</a></li>
            <li><a href="#reviews" class="nav-link">Testimonials</a></li>
            <li><a href="#schools" class="nav-link">Schools</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>`;

const newDesktopNav = `<nav class="site-nav-desktop" id="siteNavDesktop" aria-label="Primary Navigation">
          <ul class="nav-links-list">
            <li><a href="#hero" class="nav-link is-active">Home</a></li>
            <li><a href="#stories" class="nav-link">About</a></li>
            <li><a href="#farm-activities" class="nav-link">Activities</a></li>
            <li><a href="#schools" class="nav-link">Schools</a></li>
            <li><a href="#reviews" class="nav-link">Testimonials</a></li>
            <li><a href="#gallery" class="nav-link">Gallery</a></li>
            <li><a href="#faq" class="nav-link">FAQ</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>`;

if (html.includes(oldDesktopNav)) {
  html = html.replace(oldDesktopNav, newDesktopNav);
  console.log("Updated desktop navigation links");
}

// Mobile nav
const oldMobileNav = `<ul class="mobile-nav-list">
              <li><a href="#hero" class="mobile-nav-item"><span class="m-idx">01</span><span>Home</span></a></li>
              <li><a href="#stories" class="mobile-nav-item"><span class="m-idx">02</span><span>About the Farm</span></a></li>
              <li><a href="#farm-activities" class="mobile-nav-item"><span class="m-idx">03</span><span>23+ Activities</span></a></li>
              <li><a href="#gallery" class="mobile-nav-item"><span class="m-idx">04</span><span>Photo Gallery</span></a></li>
              <li><a href="#reviews" class="mobile-nav-item"><span class="m-idx">05</span><span>Video Testimonials</span></a></li>
              <li><a href="#schools" class="mobile-nav-item"><span class="m-idx">06</span><span>School Field Trips</span></a></li>
              <li><a href="#contact" class="mobile-nav-item"><span class="m-idx">07</span><span>Contact &amp; Location</span></a></li>
            </ul>`;

const newMobileNav = `<ul class="mobile-nav-list">
              <li><a href="#hero" class="mobile-nav-item"><span class="m-idx">01</span><span>Home</span></a></li>
              <li><a href="#stories" class="mobile-nav-item"><span class="m-idx">02</span><span>About the Farm</span></a></li>
              <li><a href="#farm-activities" class="mobile-nav-item"><span class="m-idx">03</span><span>23+ Activities</span></a></li>
              <li><a href="#schools" class="mobile-nav-item"><span class="m-idx">04</span><span>School Field Trips</span></a></li>
              <li><a href="#reviews" class="mobile-nav-item"><span class="m-idx">05</span><span>Video Testimonials</span></a></li>
              <li><a href="#gallery" class="mobile-nav-item"><span class="m-idx">06</span><span>Photo Gallery</span></a></li>
              <li><a href="#faq" class="mobile-nav-item"><span class="m-idx">07</span><span>Agritourism FAQ</span></a></li>
              <li><a href="#contact" class="mobile-nav-item"><span class="m-idx">08</span><span>Contact &amp; Location</span></a></li>
            </ul>`;

if (html.includes(oldMobileNav)) {
  html = html.replace(oldMobileNav, newMobileNav);
  console.log("Updated mobile drawer navigation links");
}

// 6. Update trackedSections in activeNavObserver
const oldTracked = `const trackedSections = [
        { id: 'hero', link: document.querySelector('.site-nav-desktop a[href="#hero"]') },
        { id: 'stories', link: document.querySelector('.site-nav-desktop a[href="#stories"]') },
        { id: 'farm-activities', link: document.querySelector('.site-nav-desktop a[href="#farm-activities"]') },
        { id: 'gallery', link: document.querySelector('.site-nav-desktop a[href="#gallery"]') },
        { id: 'reviews', link: document.querySelector('.site-nav-desktop a[href="#reviews"]') },
        { id: 'schools', link: document.querySelector('.site-nav-desktop a[href="#schools"]') },
        { id: 'contact', link: document.querySelector('.site-nav-desktop a[href="#contact"]') }
      ];`;

const newTracked = `const trackedSections = [
        { id: 'hero', link: document.querySelector('.site-nav-desktop a[href="#hero"]') },
        { id: 'stories', link: document.querySelector('.site-nav-desktop a[href="#stories"]') },
        { id: 'farm-activities', link: document.querySelector('.site-nav-desktop a[href="#farm-activities"]') },
        { id: 'schools', link: document.querySelector('.site-nav-desktop a[href="#schools"]') },
        { id: 'reviews', link: document.querySelector('.site-nav-desktop a[href="#reviews"]') },
        { id: 'gallery', link: document.querySelector('.site-nav-desktop a[href="#gallery"]') },
        { id: 'faq', link: document.querySelector('.site-nav-desktop a[href="#faq"]') },
        { id: 'contact', link: document.querySelector('.site-nav-desktop a[href="#contact"]') }
      ];`;

if (html.includes(oldTracked)) {
  html = html.replace(oldTracked, newTracked);
  console.log("Updated trackedSections for active navigation state");
}

// 7. Add "Bullock Cart Experience" to EXPERIENCES array if not present
if (!html.includes('id: "bullock-cart"')) {
  const targetCat5 = '        // --- 05. FARM FUN ---';
  const bullockCartEntry = `        // --- 05. FARM FUN ---
        {
          id: "bullock-cart",
          catIndex: 4,
          categoryName: "Farm Fun",
          categoryNumber: "05",
          title: "Bullock Cart Experience",
          short: "Enjoy the classic vintage bullock cart ride through scenic field pathways.",
          full: "Enjoy the classic, vintage Bullock Cart Experience — just the way farmers transported grains and family in rural India for centuries. Experience the gentle rhythmic charm of a bygone era and understand traditional transportation and bovine draft power.",
          takeaway: "Understand how traditional animal draught power shaped rural Telangana agriculture and sustainable transit.",
          img: "/assets/experiences/gallery/gallery-12.webp",
          tag: "Heritage Ride",
          season: "Year-Round",
          age: "All Ages",
          audience: ["school", "family", "corporate"],
          location: "both"
        },`;
  html = html.replace(targetCat5, bullockCartEntry);
  console.log("Added Bullock Cart Experience to EXPERIENCES data array");
}

// 8. Update applyFarmChapterDOM to make farmLifeActivityChips clickable buttons
const oldApplyFarmChapter = `            if (farmLifeActivityChips) {
              farmLifeActivityChips.innerHTML = data.activities
                .map(a => '<span class="farm-life-chip"><span class="chip-dot"></span>' + a + '</span>')
                .join('');
            }`;

const newApplyFarmChapter = `            if (farmLifeActivityChips) {
              farmLifeActivityChips.innerHTML = data.activities
                .map(a => '<button type="button" class="farm-life-chip" data-activity-title="' + a.replace(/"/g, '&quot;') + '" aria-label="Learn more about ' + a.replace(/"/g, '&quot;') + '"><span class="chip-dot"></span><span class="chip-title">' + a + '</span><svg class="chip-arrow" viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>')
                .join('');

              // Bind click listeners to newly rendered interactive activity chips
              farmLifeActivityChips.querySelectorAll('.farm-life-chip').forEach(btn => {
                btn.addEventListener('click', (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const rawTitle = btn.getAttribute('data-activity-title') || '';
                  const item = window.__findExperienceByTitle ? window.__findExperienceByTitle(rawTitle) : null;
                  if (item && window.__openExperienceModal) {
                    window.__openExperienceModal(item);
                  }
                });
              });
            }`;

if (html.includes(oldApplyFarmChapter)) {
  html = html.replace(oldApplyFarmChapter, newApplyFarmChapter);
  console.log("Updated applyFarmChapterDOM for interactive activity chips");
}

// 9. Append JavaScript Controller for Milestone 1B before </body>
const m1bScript = `
  <!-- =========================================================================
       MILESTONE 1B CONTROLLERS: Schools Directory, Gallery Lightbox, FAQ
       ========================================================================= -->
  <script>
    (function initMilestone1B() {
      // 1. Verified Schools Dataset
      const VERIFIED_SCHOOLS = ${JSON.stringify(schools)};
      let currentSchoolRegion = 'all';
      let currentSchoolQuery = '';
      let visibleSchoolCount = 24;

      const schoolsGrid = document.getElementById('schoolsDirectoryGrid');
      const schoolSearchInput = document.getElementById('schoolSearchInput');
      const schoolRegionTabs = document.querySelectorAll('.school-region-tab');
      const schoolsLoadMoreBtn = document.getElementById('schoolsLoadMoreBtn');
      const schoolsPaginationRow = document.getElementById('schoolsPaginationRow');
      const schoolEnquireBtn = document.getElementById('schoolEnquireBtn');

      function filterSchools() {
        const q = currentSchoolQuery.toLowerCase().trim();
        return VERIFIED_SCHOOLS.filter(s => {
          const matchRegion = (currentSchoolRegion === 'all') || (s.region === currentSchoolRegion);
          const matchQuery = !q || (s.name.toLowerCase().includes(q) || s.loc.toLowerCase().includes(q));
          return matchRegion && matchQuery;
        });
      }

      function renderSchools() {
        if (!schoolsGrid) return;
        const filtered = filterSchools();
        const toShow = filtered.slice(0, visibleSchoolCount);

        if (!toShow.length) {
          schoolsGrid.innerHTML = \`
            <div style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; background: rgba(23, 59, 43, 0.04); border: 1px dashed rgba(23, 59, 43, 0.2); border-radius: 16px;">
              <p style="font-size: 15px; font-weight: 700; color: var(--color-forest-deep); margin-bottom: 6px;">No institutions found matching "\${currentSchoolQuery}"</p>
              <p style="font-size: 13px; color: var(--color-charcoal-muted); margin-bottom: 12px;">Try searching for a different area (e.g. Kondapur, ECIL, Karimnagar) or clear your search.</p>
              <button type="button" class="btn btn-outline" style="font-size: 12px; height: 34px;" id="resetSchoolSearchBtn">
                View All Partner Schools
              </button>
            </div>
          \`;
          const resetBtn = document.getElementById('resetSchoolSearchBtn');
          if (resetBtn) {
            resetBtn.addEventListener('click', () => {
              if (schoolSearchInput) schoolSearchInput.value = '';
              currentSchoolQuery = '';
              currentSchoolRegion = 'all';
              schoolRegionTabs.forEach(t => t.classList.toggle('is-active', t.getAttribute('data-region') === 'all'));
              visibleSchoolCount = 24;
              renderSchools();
            });
          }
          if (schoolsPaginationRow) schoolsPaginationRow.style.display = 'none';
          return;
        }

        schoolsGrid.innerHTML = toShow.map(s => \`
          <article class="directory-school-card">
            <div class="school-card-top">
              <div class="school-badge-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 14.54l-7-3.82V17l7 3.82 7-3.82v-3.28l-7 3.82z"/></svg>
              </div>
              <div class="school-info-wrap">
                <h4 class="directory-school-name">\${s.name}</h4>
                <div class="directory-school-loc">📍 \${s.loc}</div>
              </div>
            </div>
            <div class="directory-school-action">
              <span class="school-tag-pill">Field Partner</span>
              <button type="button" class="school-enquire-link" data-school-name="\${s.name} (\${s.loc})">
                <span>Plan Visit</span>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </article>
        \`).join('');

        // Wire "Plan Visit" buttons
        schoolsGrid.querySelectorAll('.school-enquire-link').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const schoolName = btn.getAttribute('data-school-name') || '';
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
              const notes = document.getElementById('dietaryNotes');
              if (notes) {
                notes.value = 'Interested in: School Field Trip for ' + schoolName;
              }
              const visitType = document.getElementById('visitType');
              if (visitType) {
                // If visitType select has school option
                const schoolOpt = Array.from(visitType.options).find(o => o.value.toLowerCase().includes('school') || o.text.toLowerCase().includes('school'));
                if (schoolOpt) visitType.value = schoolOpt.value;
              }
              if (window.__lenis) {
                window.__lenis.scrollTo(bookingSection, { duration: 1.2, offset: -20 });
              } else {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
              }
              if (window.__showToast) {
                window.__showToast('School Field Trip selected for ' + schoolName + '! Choose your date.');
              }
            }
          });
        });

        // Pagination row visibility
        if (schoolsPaginationRow) {
          if (filtered.length > visibleSchoolCount) {
            schoolsPaginationRow.style.display = 'block';
            if (schoolsLoadMoreBtn) {
              schoolsLoadMoreBtn.querySelector('span').textContent = \`Show More (\${visibleSchoolCount} of \${filtered.length} Schools)\`;
            }
          } else {
            schoolsPaginationRow.style.display = 'none';
          }
        }
      }

      // Region Filter Tabs
      schoolRegionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          schoolRegionTabs.forEach(t => {
            const isTarget = t === tab;
            t.classList.toggle('is-active', isTarget);
            t.setAttribute('aria-selected', isTarget ? 'true' : 'false');
          });
          currentSchoolRegion = tab.getAttribute('data-region') || 'all';
          visibleSchoolCount = 24;
          renderSchools();
        });
      });

      // Search input handler
      if (schoolSearchInput) {
        let debounceTimer = null;
        schoolSearchInput.addEventListener('input', (e) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            currentSchoolQuery = e.target.value;
            visibleSchoolCount = 24;
            renderSchools();
          }, 150);
        });
      }

      // Load More button
      if (schoolsLoadMoreBtn) {
        schoolsLoadMoreBtn.addEventListener('click', () => {
          visibleSchoolCount += 36;
          renderSchools();
        });
      }

      // School Banner Enquire Button
      if (schoolEnquireBtn) {
        schoolEnquireBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const bookingSection = document.getElementById('booking');
          if (bookingSection) {
            const notes = document.getElementById('dietaryNotes');
            if (notes) {
              notes.value = 'Interested in: School Field Trip / Educational Agrarian Tour';
            }
            if (window.__lenis) {
              window.__lenis.scrollTo(bookingSection, { duration: 1.2, offset: -20 });
            } else {
              bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
            if (window.__showToast) {
              window.__showToast('School Field Trip inquiry prefilled. Select your desired farm and date!');
            }
          }
        });
      }

      // Initial School Directory Render
      renderSchools();

      // -----------------------------------------------------------------------
      // 2. Candid Photo Gallery Mosaic & Lightbox
      // -----------------------------------------------------------------------
      const GALLERY_ITEMS = ${JSON.stringify(gallery)};
      let activeGalleryIndex = 0;
      let currentGalleryFilter = 'all';

      const galleryCards = document.querySelectorAll('.gallery-card');
      const galleryFilterBtns = document.querySelectorAll('.gallery-tab-btn');
      const galleryModal = document.getElementById('galleryModal');
      const galleryModalImg = document.getElementById('galleryModalImg');
      const galleryModalCat = document.getElementById('galleryModalCat');
      const galleryModalLoc = document.getElementById('galleryModalLoc');
      const galleryModalTitle = document.getElementById('galleryModalTitle');
      const galleryModalDesc = document.getElementById('galleryModalDesc');
      const galleryModalCounter = document.getElementById('galleryModalCounter');
      const closeGalleryModalBtn = document.getElementById('closeGalleryModalBtn');
      const galleryPrevBtn = document.getElementById('galleryPrevBtn');
      const galleryNextBtn = document.getElementById('galleryNextBtn');

      function openGalleryLightbox(index) {
        activeGalleryIndex = ((index % GALLERY_ITEMS.length) + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
        const item = GALLERY_ITEMS[activeGalleryIndex];
        if (!item || !galleryModal) return;

        if (galleryModalImg) {
          galleryModalImg.src = item.src;
          galleryModalImg.alt = item.title;
        }
        if (galleryModalCat) galleryModalCat.textContent = item.categoryLabel;
        if (galleryModalLoc) galleryModalLoc.textContent = '📍 ' + item.location;
        if (galleryModalTitle) galleryModalTitle.textContent = item.title;
        if (galleryModalDesc) galleryModalDesc.textContent = item.desc;
        if (galleryModalCounter) {
          const num = String(activeGalleryIndex + 1).padStart(2, '0');
          const total = String(GALLERY_ITEMS.length).padStart(2, '0');
          galleryModalCounter.textContent = \`\${num} / \${total}\`;
        }

        galleryModal.classList.add('is-active');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      function closeGalleryLightbox() {
        if (!galleryModal) return;
        galleryModal.classList.remove('is-active');
        galleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      function navGallery(step) {
        openGalleryLightbox(activeGalleryIndex + step);
      }

      // Gallery card click / keyboard handlers
      galleryCards.forEach((card, idx) => {
        card.addEventListener('click', () => openGalleryLightbox(idx));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openGalleryLightbox(idx);
          }
        });
      });

      // Filter tabs
      galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          galleryFilterBtns.forEach(b => {
            const isTarget = b === btn;
            b.classList.toggle('is-active', isTarget);
            b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
          });

          const filter = btn.getAttribute('data-gallery-filter') || 'all';
          currentGalleryFilter = filter;

          galleryCards.forEach(card => {
            const cat = card.getAttribute('data-category');
            const show = (filter === 'all') || (cat === filter);
            card.style.display = show ? 'block' : 'none';
          });
        });
      });

      // Lightbox Controls
      if (closeGalleryModalBtn) closeGalleryModalBtn.addEventListener('click', closeGalleryLightbox);
      if (galleryPrevBtn) galleryPrevBtn.addEventListener('click', () => navGallery(-1));
      if (galleryNextBtn) galleryNextBtn.addEventListener('click', () => navGallery(1));

      if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
          if (e.target === galleryModal) closeGalleryLightbox();
        });
      }

      // Keyboard navigation for Lightbox
      window.addEventListener('keydown', (e) => {
        if (!galleryModal || !galleryModal.classList.contains('is-active')) return;
        if (e.key === 'Escape') closeGalleryLightbox();
        else if (e.key === 'ArrowLeft') navGallery(-1);
        else if (e.key === 'ArrowRight') navGallery(1);
      });

      // -----------------------------------------------------------------------
      // 3. Agritourism FAQ Accordion Controller
      // -----------------------------------------------------------------------
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach((item, i) => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');

        if (trigger && panel) {
          trigger.addEventListener('click', () => {
            const isCurrentlyOpen = item.classList.contains('is-open');

            // Close all other items for a clean single-open accordion
            faqItems.forEach(other => {
              if (other !== item) {
                other.classList.remove('is-open');
                const otherTrigger = other.querySelector('.faq-trigger');
                const otherPanel = other.querySelector('.faq-panel');
                if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                if (otherPanel) otherPanel.hidden = true;
              }
            });

            // Toggle target item
            if (isCurrentlyOpen) {
              item.classList.remove('is-open');
              trigger.setAttribute('aria-expanded', 'false');
              panel.hidden = true;
            } else {
              item.classList.add('is-open');
              trigger.setAttribute('aria-expanded', 'true');
              panel.hidden = false;
            }
          });
        }
      });

      // -----------------------------------------------------------------------
      // 4. Global Activity Lookup Helper (for farmLifeActivityChips & Modal)
      // -----------------------------------------------------------------------
      window.__findExperienceByTitle = function(rawTitle) {
        if (!rawTitle || typeof EXPERIENCES === 'undefined') return null;
        const clean = rawTitle.toLowerCase().trim();
        let found = EXPERIENCES.find(e => e.title.toLowerCase() === clean);
        if (found) return found;

        // Substring / keyword matching
        const words = clean.split(/[\\s,&\\/\\-]+/).filter(w => w.length > 3);
        found = EXPERIENCES.find(e => {
          const et = e.title.toLowerCase();
          return words.some(w => et.includes(w));
        });
        if (found) return found;

        // Fallback to closest chapter/category item
        return EXPERIENCES[0];
      };

      // Expose openExperienceModal globally for chips
      window.__openExperienceModal = function(item) {
        const expModal = document.getElementById('experienceModal');
        const expImg = document.getElementById('expModalImg');
        const expBadge = document.getElementById('expModalCategoryBadge');
        const expTitle = document.getElementById('expModalTitle');
        const expFullDesc = document.getElementById('expModalFullDesc');
        const expTakeaway = document.getElementById('expModalTakeawayText');

        if (!item || !expModal) return;

        if (expImg) {
          expImg.src = item.img;
          expImg.alt = item.title;
        }
        if (expBadge) expBadge.textContent = \`\${item.categoryNumber || '01'} • \${item.categoryName || 'Farm Activity'}\`;
        if (expTitle) expTitle.textContent = item.title;
        if (expFullDesc) expFullDesc.textContent = item.full;
        if (expTakeaway) expTakeaway.textContent = item.takeaway;

        // Dynamic WhatsApp link with activity title
        const modalWhatsappBtn = expModal.querySelector('.btn-outline[href*="wa.me"]');
        if (modalWhatsappBtn) {
          modalWhatsappBtn.href = \`https://wa.me/919849798674?text=\${encodeURIComponent('Hi One Day Kissan, I would like to enquire about the "' + item.title + '" activity.')}\`;
        }

        // Book button handler
        const bookBtn = document.getElementById('expModalBookBtn');
        if (bookBtn) {
          bookBtn.onclick = function() {
            if (typeof closeModal === 'function') closeModal(expModal);
            else expModal.classList.remove('is-active');

            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
              const notes = document.getElementById('dietaryNotes');
              if (notes) notes.value = 'Interested in: ' + item.title;

              if (window.__lenis) {
                window.__lenis.scrollTo(bookingSection, { duration: 1.2, offset: -20 });
              } else {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
              }
              if (window.__showToast) {
                window.__showToast('Selected "' + item.title + '". Choose your date to book!');
              }
            }
          };
        }

        if (typeof openModal === 'function') {
          openModal(expModal);
        } else {
          expModal.classList.add('is-active');
          document.body.style.overflow = 'hidden';
        }
      };

    })();
  </script>
`;

if (!html.includes('initMilestone1B()')) {
  const bodyEnd = '</body>';
  const bodyIdx = html.indexOf(bodyEnd);
  if (bodyIdx === -1) {
    throw new Error("Could not find </body> in index.html");
  }
  html = html.slice(0, bodyIdx) + '\n' + m1bScript + '\n' + html.slice(bodyIdx);
  console.log("Appended Milestone 1B JavaScript controllers before </body>");
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully updated index.html with Milestone 1B features!");
