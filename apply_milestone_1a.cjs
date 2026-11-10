const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log('Original index.html size:', html.length, 'bytes');

// 1. UPDATE DESIGN TOKENS IN :root
const targetRoot = `    :root {
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

const consolidatedRoot = `    :root {
      /* =========================================================================
         CONSOLIDATED DESIGN TOKENS (Milestone 1A)
         Theme: Premium Agriculture × Immersive Technology × Nature
         ========================================================================= */

      /* 1. Core Brand Colors */
      --color-forest-deep:      #0E2015; /* Deep canopy background & typography */
      --color-forest-primary:   #173B2B; /* Primary brand forest green */
      --color-forest-surface:   #203C2B; /* Elevated container forest surface */
      --color-forest-subtle:    rgba(23, 59, 43, 0.08);

      --color-harvest-gold:     #DCA64F; /* Golden hour & harvest accent */
      --color-harvest-hover:    #C9933E; /* Interactive hover gold */
      --color-harvest-subtle:   rgba(220, 166, 79, 0.16);

      --color-red-clay:         #9E5A38; /* Telangana red soil terracotta */
      --color-red-clay-subtle:  rgba(158, 90, 56, 0.12);

      --color-sage-leaf:        #758A69; /* Foliage & botanical secondary */
      --color-sage-light:       #E2E8D5; /* Pill badge background */

      --color-ivory-warm:       #FAF7F0; /* Clean rural parchment surface */
      --color-ivory-ground:     #F4F0E6; /* Primary canvas ground background */
      --color-ivory-card:       #FFFFFF; /* Elevated card surface */

      --color-charcoal-ink:     #1E241E; /* Primary readable text (WCAG AAA) */
      --color-charcoal-muted:   #546051; /* Secondary supporting text */
      --color-charcoal-faint:   #7A8A76; /* Captions, watermarks & metadata */

      --color-border-subtle:    rgba(23, 59, 43, 0.12);
      --color-border-glass:     rgba(255, 255, 255, 0.65);

      /* Backward-Compatible Aliases (Preserves 100% of existing styles) */
      --forest:                 var(--color-forest-primary);
      --harvest:                var(--color-harvest-gold);
      --harvest-hover:          var(--color-harvest-hover);
      --ivory:                  var(--color-ivory-ground);
      --sage:                   var(--color-sage-leaf);
      --charcoal:               var(--color-charcoal-ink);
      --ink:                    var(--color-charcoal-ink);
      --pill:                   var(--color-sage-light);
      --pill-text:              var(--color-forest-primary);
      --line:                   var(--color-border-subtle);
      --bg:                     var(--color-ivory-ground);
      --radius:                 22px;

      /* 2. Typographic Scale */
      --font-display:           "Playfair Display", Georgia, serif;
      --font-body:              "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      --font-ui:                "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

      --text-display:           clamp(2.75rem, 5.5vw, 4.25rem);
      --text-h1:                clamp(2.25rem, 4.0vw, 3.25rem);
      --text-h2:                clamp(1.75rem, 3.0vw, 2.35rem);
      --text-h3:                clamp(1.25rem, 2.0vw, 1.65rem);
      --text-lead:              clamp(1.10rem, 1.4vw, 1.25rem);
      --text-body:              1rem;
      --text-sm:                0.875rem;
      --text-xs:                0.75rem;
      --text-badge:             0.688rem;

      --leading-tight:          1.12;
      --leading-snug:           1.25;
      --leading-normal:         1.50;
      --leading-relaxed:        1.68;

      /* 3. Spacing Grid (8pt Harmonic Scale) */
      --space-2:                0.125rem; /* 2px */
      --space-4:                0.25rem;  /* 4px */
      --space-8:                0.5rem;   /* 8px */
      --space-12:               0.75rem;  /* 12px */
      --space-16:               1rem;     /* 16px */
      --space-20:               1.25rem;  /* 20px */
      --space-24:               1.5rem;   /* 24px */
      --space-32:               2rem;     /* 32px */
      --space-40:               2.5rem;   /* 40px */
      --space-48:               3rem;     /* 48px */
      --space-64:               4rem;     /* 64px */
      --space-80:               5rem;     /* 80px */
      --space-96:               6rem;     /* 96px */
      --space-128:              8rem;     /* 128px */

      /* 4. Radii Scale */
      --radius-xs:              4px;
      --radius-sm:              8px;
      --radius-md:              14px;
      --radius-lg:              22px;
      --radius-xl:              28px;
      --radius-2xl:             36px;
      --radius-pill:            9999px;

      /* 5. Shadows & Elevation */
      --shadow-xs:              0 1px 3px rgba(14, 32, 21, 0.05);
      --shadow-sm:              0 2px 8px rgba(14, 32, 21, 0.06);
      --shadow-md:              0 8px 24px rgba(14, 32, 21, 0.08);
      --shadow-lg:              0 18px 48px rgba(14, 32, 21, 0.12);
      --shadow-xl:              0 32px 80px rgba(14, 32, 21, 0.18);
      --shadow-glass:           inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 8px 24px rgba(32, 60, 43, 0.08);

      /* 6. Transitions & Motion */
      --ease-cinematic:         cubic-bezier(0.16, 1, 0.3, 1);
      --ease-in-out:            cubic-bezier(0.65, 0, 0.35, 1);
      --transition-fast:        0.20s var(--ease-cinematic);
      --transition-normal:      0.35s var(--ease-cinematic);
      --transition-slow:        0.70s var(--ease-cinematic);

      /* 7. Layout & Container Widths */
      --width-container-max:    1360px;
      --width-container-narrow: 1040px;
      --container-gutter:       clamp(1rem, 3.5vw, 3rem);

      /* 8. Layering & Z-Index Scale */
      --z-base:                 1;
      --z-elevated:             10;
      --z-sticky:               100;
      --z-header:               1000;
      --z-drawer:               2000;
      --z-modal:                10000;
      --z-toast:                100000;
    }`;

if (!html.includes(targetRoot)) {
  console.error('ERROR: Could not find targetRoot');
  process.exit(1);
}
html = html.replace(targetRoot, consolidatedRoot);
console.log('✅ Consolidated design tokens in :root successfully');

// 2. REPLACE LEGACY .nav CSS WITH FULL-WIDTH INTEGRATED SITE HEADER CSS
const targetLegacyNav = `    .nav {
      position: absolute;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 24px;
      border-radius: 999px;
      background: rgba(245, 241, 232, 0.90);
      box-shadow: 0 0 0 1px rgba(32, 60, 43, .08), 0 8px 24px rgba(32, 60, 43, .06);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: all 0.3s ease;
    }`;

const newHeaderCss = `    /* =========================================================================
       00. FULL-WIDTH INTEGRATED SITE HEADER (Milestone 1A)
       ========================================================================= */
    .site-header,
    .site-header.nav {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      height: 76px;
      z-index: var(--z-header, 1000);
      background: rgba(244, 240, 230, 0.65);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(23, 59, 43, 0.08);
      border-radius: 0 !important;
      box-shadow: none;
      padding: 0 !important;
      margin: 0 !important;
      display: flex;
      align-items: center;
      justify-content: stretch;
      transform: none;
      transition: height var(--transition-normal), background var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
    }

    .site-header.is-scrolled,
    .site-header.nav.is-scrolled {
      height: 66px;
      background: rgba(244, 240, 230, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 4px 20px rgba(14, 32, 21, 0.08);
      border-bottom: 1px solid rgba(23, 59, 43, 0.12);
    }

    .site-header-container {
      width: 100%;
      max-width: var(--width-container-max, 1360px);
      margin: 0 auto;
      padding: 0 var(--container-gutter, 28px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    /* Brand Logo */
    .site-header .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      flex-shrink: 0;
      transition: opacity var(--transition-fast);
    }

    .site-header .brand:hover {
      opacity: 0.9;
    }

    .site-header .brand-logo-svg {
      width: 28px;
      height: 24px;
      display: block;
      color: var(--color-harvest-gold);
    }

    .site-header .brand-title {
      font-family: var(--font-display);
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--color-forest-primary);
      white-space: nowrap;
    }

    /* Desktop Navigation */
    .site-nav-desktop {
      display: flex;
      align-items: center;
    }

    .nav-links-list {
      display: flex;
      align-items: center;
      gap: clamp(8px, 1.4vw, 20px);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-link {
      font-family: var(--font-body);
      font-size: 13.5px;
      font-weight: 600;
      color: var(--color-charcoal-ink);
      padding: 6px 12px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      transition: all var(--transition-fast);
      white-space: nowrap;
    }

    .nav-link:hover {
      color: var(--color-forest-primary);
      background: rgba(23, 59, 43, 0.06);
      transform: translateY(-1px);
    }

    .nav-link:focus-visible {
      outline: 2px solid var(--color-harvest-gold);
      outline-offset: 2px;
    }

    .nav-link.is-active {
      color: var(--color-forest-primary);
      background: rgba(23, 59, 43, 0.09);
      font-weight: 700;
      box-shadow: inset 0 -2px 0 var(--color-harvest-gold);
    }

    /* Header Actions */
    .site-header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    .header-action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 38px;
      padding: 0 14px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      font-family: var(--font-body);
      transition: all var(--transition-fast);
      white-space: nowrap;
    }

    .header-phone-btn {
      background: rgba(23, 59, 43, 0.06);
      border: 1px solid rgba(23, 59, 43, 0.12);
      color: var(--color-forest-primary);
      font-size: 12.5px;
      font-weight: 600;
    }

    .header-phone-btn:hover {
      background: rgba(23, 59, 43, 0.12);
      transform: translateY(-1px);
      box-shadow: var(--shadow-xs);
    }

    .header-phone-btn:focus-visible {
      outline: 2px solid var(--color-forest-primary);
      outline-offset: 2px;
    }

    .header-whatsapp-btn {
      background: rgba(37, 211, 102, 0.12);
      border: 1px solid rgba(37, 211, 102, 0.35);
      color: #15803D;
      font-size: 12px;
      font-weight: 700;
    }

    .header-whatsapp-btn:hover {
      background: rgba(37, 211, 102, 0.22);
      border-color: rgba(37, 211, 102, 0.55);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(37, 211, 102, 0.2);
    }

    .header-whatsapp-btn:focus-visible {
      outline: 2px solid #25D366;
      outline-offset: 2px;
    }

    .header-book-btn {
      height: 38px;
      padding: 0 18px;
      font-size: 13px;
      font-weight: 700;
      color: var(--color-forest-primary);
      background: var(--color-harvest-gold);
      border-radius: var(--radius-pill);
      border: none;
      box-shadow: 0 4px 12px rgba(220, 166, 79, 0.3);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: all var(--transition-fast);
    }

    .header-book-btn:hover {
      background: var(--color-harvest-hover);
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(220, 166, 79, 0.4);
    }

    .header-book-btn:focus-visible {
      outline: 2px solid var(--color-forest-primary);
      outline-offset: 2px;
    }

    /* Mobile Menu Toggle Button */
    .mobile-menu-toggle {
      display: none;
      width: 44px;
      height: 44px;
      border-radius: var(--radius-pill);
      background: rgba(23, 59, 43, 0.08);
      border: 1px solid rgba(23, 59, 43, 0.15);
      color: var(--color-forest-primary);
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      transition: background var(--transition-fast), transform var(--transition-fast);
    }

    .mobile-menu-toggle:hover {
      background: rgba(23, 59, 43, 0.14);
    }

    .mobile-menu-toggle:focus-visible {
      outline: 2px solid var(--color-forest-primary);
      outline-offset: 2px;
    }

    .mobile-menu-toggle .toggle-bar {
      display: block;
      width: 18px;
      height: 2px;
      background: var(--color-forest-primary);
      border-radius: 2px;
      transition: transform var(--transition-normal), opacity var(--transition-normal);
      margin: 2.5px 0;
    }

    .mobile-menu-toggle.is-active .bar-1 {
      transform: translateY(4.5px) rotate(45deg);
    }

    .mobile-menu-toggle.is-active .bar-2 {
      opacity: 0;
    }

    .mobile-menu-toggle.is-active .bar-3 {
      transform: translateY(-4.5px) rotate(-45deg);
    }

    /* Mobile Navigation Drawer Overlay */
    .mobile-nav-drawer {
      position: fixed;
      inset: 0;
      z-index: var(--z-drawer, 2000);
      visibility: hidden;
      pointer-events: none;
      transition: visibility var(--transition-normal);
    }

    .mobile-nav-drawer.is-open {
      visibility: visible;
      pointer-events: auto;
    }

    .mobile-drawer-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(14, 32, 21, 0.6);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      opacity: 0;
      transition: opacity var(--transition-normal);
    }

    .mobile-nav-drawer.is-open .mobile-drawer-backdrop {
      opacity: 1;
    }

    .mobile-drawer-sheet {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(380px, 88vw);
      background: var(--color-ivory-warm);
      box-shadow: -10px 0 36px rgba(14, 32, 21, 0.28);
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform var(--transition-normal);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: 24px;
      box-sizing: border-box;
    }

    .mobile-nav-drawer.is-open .mobile-drawer-sheet {
      transform: translateX(0);
    }

    .mobile-drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(23, 59, 43, 0.1);
    }

    .mobile-brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 700;
      color: var(--color-forest-primary);
    }

    .mobile-drawer-close {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-pill);
      background: rgba(23, 59, 43, 0.08);
      border: 1px solid rgba(23, 59, 43, 0.12);
      color: var(--color-forest-primary);
      font-size: 24px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      transition: background var(--transition-fast), transform var(--transition-fast);
    }

    .mobile-drawer-close:hover {
      background: var(--color-harvest-gold);
      transform: rotate(90deg);
    }

    .mobile-drawer-close:focus-visible {
      outline: 2px solid var(--color-forest-primary);
      outline-offset: 2px;
    }

    .mobile-drawer-nav {
      flex: 1;
      padding: 24px 0;
    }

    .mobile-nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .mobile-nav-item {
      min-height: 48px;
      padding: 12px 16px;
      font-family: var(--font-body);
      font-size: 16px;
      font-weight: 600;
      color: var(--color-forest-primary);
      text-decoration: none;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      gap: 14px;
      transition: all var(--transition-fast);
    }

    .mobile-nav-item:hover,
    .mobile-nav-item:focus-visible {
      background: rgba(23, 59, 43, 0.08);
      transform: translateX(4px);
      outline: none;
    }

    .mobile-nav-item .m-idx {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--color-harvest-gold);
      background: rgba(220, 166, 79, 0.15);
      padding: 3px 7px;
      border-radius: 4px;
    }

    .mobile-drawer-footer {
      padding-top: 20px;
      border-top: 1px solid rgba(23, 59, 43, 0.1);
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .mobile-contact-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mobile-contact-pill {
      min-height: 44px;
      padding: 10px 16px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      font-family: var(--font-body);
      font-size: 13.5px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background var(--transition-fast);
    }

    .mobile-call-pill {
      background: rgba(23, 59, 43, 0.08);
      color: var(--color-forest-primary);
      border: 1px solid rgba(23, 59, 43, 0.15);
    }

    .mobile-whatsapp-pill {
      background: rgba(37, 211, 102, 0.15);
      color: #15803D;
      border: 1px solid rgba(37, 211, 102, 0.35);
      font-weight: 700;
    }

    .mobile-book-cta {
      min-height: 48px;
      font-size: 15px;
      font-weight: 700;
      width: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-pill);
      box-shadow: 0 4px 14px rgba(220, 166, 79, 0.35);
    }

    body.mobile-nav-locked {
      overflow: hidden !important;
    }

    /* Scroll Anchor targets */
    .scroll-anchor {
      display: block;
      position: relative;
      top: -80px;
      visibility: hidden;
      height: 0;
      margin: 0;
      padding: 0;
    }

    /* Responsive Header Breakpoints */
    @media (max-width: 1120px) {
      .header-phone-btn .header-action-text {
        display: none;
      }
      .header-phone-btn {
        padding: 0 10px;
        width: 38px;
        justify-content: center;
      }
    }

    @media (max-width: 1024px) {
      .site-nav-desktop {
        display: none;
      }
      .mobile-menu-toggle {
        display: flex;
      }
      .header-whatsapp-btn .header-action-text {
        display: none;
      }
      .header-whatsapp-btn {
        padding: 0 10px;
        width: 38px;
        justify-content: center;
      }
    }

    @media (max-width: 640px) {
      .site-header,
      .site-header.nav {
        height: 64px;
      }
      .site-header.is-scrolled,
      .site-header.nav.is-scrolled {
        height: 60px;
      }
      .site-header-container {
        padding: 0 16px;
      }
      .site-header .brand-title {
        font-size: 18px;
      }
      .header-book-btn {
        height: 34px;
        padding: 0 14px;
        font-size: 12px;
      }
      .header-phone-btn, .header-whatsapp-btn {
        width: 34px;
        height: 34px;
      }
      .mobile-menu-toggle {
        width: 38px;
        height: 38px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .site-header,
      .site-header.nav,
      .mobile-drawer-sheet,
      .mobile-drawer-backdrop,
      .nav-link,
      .header-action-btn {
        transition: none !important;
      }
    }`;

if (!html.includes(targetLegacyNav)) {
  console.error('ERROR: Could not find targetLegacyNav');
  process.exit(1);
}
html = html.replace(targetLegacyNav, newHeaderCss);
console.log('✅ Replaced legacy .nav CSS with full-width site header CSS');

// Clean up legacy media query .nav overrides
html = html.replace(/\.nav \{\s*gap: 24px;\s*\}/g, '/* legacy nav gap removed */');
html = html.replace(/\.nav \{\s*top: 16px;\s*gap: 18px;\s*padding-left: 14px;\s*\}/g, '/* legacy nav top removed */');
console.log('✅ Cleaned up legacy media query overrides');

// 3. REPLACE OLD MINIMAL .nav WITH INTEGRATED SITE HEADER IN MARKUP
const oldNavMarkup = `    <section class="hero" id="hero">
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
      </nav>`;

const newHeaderMarkup = `    <!-- 00. FULL-WIDTH PREMIUM SITE HEADER (Milestone 1A) -->
    <header class="site-header nav" id="siteHeader" role="banner">
      <div class="site-header-container">
        <!-- Brand Logo -->
        <a href="#hero" class="brand" aria-label="One Day Kissan Home">
          <svg viewBox="0 0 30 24" aria-hidden="true" class="brand-logo-svg">
            <path d="M15 22V12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M15 12C15 6 9 3 4 5C4 11 9 14 15 12Z" fill="currentColor" opacity="0.9"/>
            <path d="M15 10C15 5 21 2 26 4C26 10 21 12 15 10Z" fill="var(--color-forest-primary, #173B2B)" stroke="currentColor" stroke-width="1.2"/>
          </svg>
          <span class="brand-title">One Day Kissan</span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="site-nav-desktop" id="siteNavDesktop" aria-label="Primary Navigation">
          <ul class="nav-links-list">
            <li><a href="#hero" class="nav-link is-active">Home</a></li>
            <li><a href="#stories" class="nav-link">About</a></li>
            <li><a href="#farm-activities" class="nav-link">Activities</a></li>
            <li><a href="#gallery" class="nav-link">Gallery</a></li>
            <li><a href="#reviews" class="nav-link">Testimonials</a></li>
            <li><a href="#schools" class="nav-link">Schools</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>

        <!-- Right Header Actions (Phone, WhatsApp & Quick Book) -->
        <div class="site-header-actions">
          <a href="tel:+919849798674" class="header-action-btn header-phone-btn" aria-label="Call One Day Kisan at +91 98497 98674" title="+91 98497 98674">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.05 15.05 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-.99-1z"/></svg>
            <span class="header-action-text">+91 98497 98674</span>
          </a>

          <a href="https://wa.me/919849798674?text=Hello%20One%20Day%20Kissan,%20I%20would%20like%20to%20plan%20a%20farm%20visit." target="_blank" rel="noopener noreferrer" class="header-action-btn header-whatsapp-btn" aria-label="Chat with One Day Kisan on WhatsApp" title="WhatsApp Concierge">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.33C9.34 7.33 9.03 7.4 8.78 7.67C8.53 7.94 7.83 8.6 7.83 9.94C7.83 11.28 8.81 12.57 8.94 12.75C9.08 12.93 10.87 15.7 13.6 16.87C14.25 17.15 14.76 17.32 15.15 17.44C15.8 17.65 16.4 17.62 16.86 17.55C17.38 17.47 18.46 16.9 18.69 16.26C18.92 15.62 18.92 15.07 18.85 14.96C18.78 14.85 18.59 14.78 18.31 14.64C18.03 14.5 16.68 13.84 16.43 13.75C16.18 13.66 16 13.61 15.81 13.89C15.63 14.17 15.1 14.78 14.94 14.96C14.78 15.15 14.63 15.17 14.35 15.03C14.07 14.89 13.17 14.6 12.11 13.65C11.28 12.91 10.72 12 10.56 11.72C10.4 11.44 10.54 11.29 10.68 11.15C10.81 11.02 10.97 10.81 11.11 10.65C11.25 10.49 11.3 10.37 11.39 10.19C11.48 10 11.44 9.84 11.37 9.7C11.3 9.56 10.74 8.19 10.51 7.63C10.29 7.08 10.06 7.16 9.89 7.15C9.73 7.14 9.53 7.33 9.53 7.33Z"/></svg>
            <span class="header-action-text">WhatsApp</span>
          </a>

          <a href="#booking" class="btn btn-gold header-book-btn" aria-label="Book Farm Visit">
            <span>Book Visit</span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button type="button" class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Open Navigation Menu" aria-expanded="false" aria-controls="mobileNavDrawer">
            <span class="toggle-bar bar-1"></span>
            <span class="toggle-bar bar-2"></span>
            <span class="toggle-bar bar-3"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer Overlay -->
      <div class="mobile-nav-drawer" id="mobileNavDrawer" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
        <div class="mobile-drawer-backdrop" id="mobileDrawerBackdrop"></div>
        <div class="mobile-drawer-sheet">
          <div class="mobile-drawer-header">
            <div class="brand mobile-brand">
              <svg viewBox="0 0 30 24" aria-hidden="true" class="brand-logo-svg">
                <path d="M15 22V12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M15 12C15 6 9 3 4 5C4 11 9 14 15 12Z" fill="currentColor" opacity="0.9"/>
                <path d="M15 10C15 5 21 2 26 4C26 10 21 12 15 10Z" fill="var(--color-forest-primary, #173B2B)" stroke="currentColor" stroke-width="1.2"/>
              </svg>
              <span>One Day Kissan</span>
            </div>
            <button type="button" class="mobile-drawer-close" id="mobileDrawerClose" aria-label="Close Navigation Menu">&times;</button>
          </div>
          
          <nav class="mobile-drawer-nav" aria-label="Mobile Navigation Links">
            <ul class="mobile-nav-list">
              <li><a href="#hero" class="mobile-nav-item"><span class="m-idx">01</span><span>Home</span></a></li>
              <li><a href="#stories" class="mobile-nav-item"><span class="m-idx">02</span><span>About the Farm</span></a></li>
              <li><a href="#farm-activities" class="mobile-nav-item"><span class="m-idx">03</span><span>23+ Activities</span></a></li>
              <li><a href="#gallery" class="mobile-nav-item"><span class="m-idx">04</span><span>Photo Gallery</span></a></li>
              <li><a href="#reviews" class="mobile-nav-item"><span class="m-idx">05</span><span>Video Testimonials</span></a></li>
              <li><a href="#schools" class="mobile-nav-item"><span class="m-idx">06</span><span>School Field Trips</span></a></li>
              <li><a href="#contact" class="mobile-nav-item"><span class="m-idx">07</span><span>Contact &amp; Location</span></a></li>
            </ul>
          </nav>

          <div class="mobile-drawer-footer">
            <div class="mobile-contact-actions">
              <a href="tel:+919849798674" class="mobile-contact-pill mobile-call-pill">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.05 15.05 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-.99-1z"/></svg>
                <span>+91 98497 98674</span>
              </a>
              <a href="https://wa.me/919849798674?text=Hello%20One%20Day%20Kissan,%20I%20would%20like%20to%20plan%20a%20farm%20visit." target="_blank" rel="noopener noreferrer" class="mobile-contact-pill mobile-whatsapp-pill">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.33C9.34 7.33 9.03 7.4 8.78 7.67C8.53 7.94 7.83 8.6 7.83 9.94C7.83 11.28 8.81 12.57 8.94 12.75C9.08 12.93 10.87 15.7 13.6 16.87C14.25 17.15 14.76 17.32 15.15 17.44C15.8 17.65 16.4 17.62 16.86 17.55C17.38 17.47 18.46 16.9 18.69 16.26C18.92 15.62 18.92 15.07 18.85 14.96C18.78 14.85 18.59 14.78 18.31 14.64C18.03 14.5 16.68 13.84 16.43 13.75C16.18 13.66 16 13.61 15.81 13.89C15.63 14.17 15.1 14.78 14.94 14.96C14.78 15.15 14.63 15.17 14.35 15.03C14.07 14.89 13.17 14.6 12.11 13.65C11.28 12.91 10.72 12 10.56 11.72C10.4 11.44 10.54 11.29 10.68 11.15C10.81 11.02 10.97 10.81 11.11 10.65C11.25 10.49 11.3 10.37 11.39 10.19C11.48 10 11.44 9.84 11.37 9.7C11.3 9.56 10.74 8.19 10.51 7.63C10.29 7.08 10.06 7.16 9.89 7.15C9.73 7.14 9.53 7.33 9.53 7.33Z"/></svg>
                <span>WhatsApp</span>
              </a>
            </div>
            <a href="#booking" class="btn btn-gold mobile-book-cta">Plan Your Farm Visit</a>
          </div>
        </div>
      </div>
    </header>

    <section class="hero" id="hero">`;

if (!html.includes(oldNavMarkup)) {
  console.error('ERROR: Could not find oldNavMarkup');
  process.exit(1);
}
html = html.replace(oldNavMarkup, newHeaderMarkup);
console.log('✅ Placed site header at top of app before #hero');

// 4. ADD ANCHOR DESTINATIONS FOR GALLERY, SCHOOLS, CONTACT
const targetExpHeader = `<section class="experiences-section" id="experiences">`;
const newExpHeader = `<section class="experiences-section" id="experiences">
      <span id="schools" class="scroll-anchor" aria-hidden="true"></span>`;
html = html.replace(targetExpHeader, newExpHeader);

const targetJournalCol = `<!-- Right Column: Editorial Essay & Authentic Gallery Collage -->`;
const newJournalCol = `<!-- Right Column: Editorial Essay & Authentic Gallery Collage -->
          <span id="gallery" class="scroll-anchor" aria-hidden="true"></span>`;
html = html.replace(targetJournalCol, newJournalCol);

const targetFooter = `<footer id="footer" class="luxury-footer" data-section="contact">`;
const newFooter = `<footer id="footer" class="luxury-footer" data-section="contact">
    <span id="contact" class="scroll-anchor" aria-hidden="true"></span>`;
html = html.replace(targetFooter, newFooter);

console.log('✅ Added verified anchor targets for #schools, #gallery, and #contact');

// 5. CORRECT WHATSAPP LINK IN EXPERIENCE MODAL (Line 8449)
const oldWaModal = `href="https://wa.me/919989912345?text=Hi%20One%20Day%20Kissan,%20I%20would%20like%20to%20enquire%20about%20the%20activities"`;
const newWaModal = `href="https://wa.me/919849798674?text=Hi%20One%20Day%20Kissan,%20I%20would%20like%20to%20enquire%20about%20the%20activities"`;
if (!html.includes(oldWaModal)) {
  console.error('ERROR: Could not find oldWaModal in index.html');
  process.exit(1);
}
html = html.replace(oldWaModal, newWaModal);
console.log('✅ Corrected dummy WhatsApp number 919989912345 -> 919849798674');

// 6. CLEAR TRANSFORMS IN INTROCOMPLETE SO HEADER RETAINS PURE FIXED POSITIONING
const targetIntroComplete = `        const backdrop = document.querySelector('.backdrop');
        if (backdrop) backdrop.remove();
        lenis.start();`;

const newIntroComplete = `        const backdrop = document.querySelector('.backdrop');
        if (backdrop) backdrop.remove();
        gsap.set('.site-header', { clearProps: 'transform' });
        lenis.start();`;

if (!html.includes(targetIntroComplete)) {
  console.error('ERROR: Could not find targetIntroComplete in index.html');
  process.exit(1);
}
html = html.replace(targetIntroComplete, newIntroComplete);
console.log('✅ Added clearProps: "transform" to site-header in introComplete');

// 7. ADD JAVASCRIPT CONTROLLER FOR HEADER SCROLL, ACTIVE LINK TRACKING & ACCESSIBLE MOBILE DRAWER
const scriptHook = `      // 6) Lenis smooth inertial scrolling`;
const headerJs = `      // 00) SITE HEADER CONTROLLER (Milestone 1A)
      const siteHeader = document.getElementById('siteHeader');
      const mobileMenuToggle = document.getElementById('mobileMenuToggle');
      const mobileNavDrawer = document.getElementById('mobileNavDrawer');
      const mobileDrawerClose = document.getElementById('mobileDrawerClose');
      const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-item, .mobile-book-cta');

      // Scroll State Transition (Frosted Glass on scroll > 40px)
      function updateHeaderScroll() {
        if (!siteHeader) return;
        const sy = window.scrollY || document.documentElement.scrollTop || 0;
        siteHeader.classList.toggle('is-scrolled', sy > 40);
      }
      window.addEventListener('scroll', updateHeaderScroll, { passive: true });
      updateHeaderScroll();

      // Mobile Menu Actions
      function openMobileDrawer() {
        if (!mobileNavDrawer) return;
        mobileNavDrawer.classList.add('is-open');
        mobileNavDrawer.setAttribute('aria-hidden', 'false');
        if (mobileMenuToggle) {
          mobileMenuToggle.setAttribute('aria-expanded', 'true');
          mobileMenuToggle.classList.add('is-active');
        }
        document.body.classList.add('mobile-nav-locked');
        if (mobileDrawerClose) mobileDrawerClose.focus();
      }

      function closeMobileDrawer() {
        if (!mobileNavDrawer) return;
        mobileNavDrawer.classList.remove('is-open');
        mobileNavDrawer.setAttribute('aria-hidden', 'true');
        if (mobileMenuToggle) {
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          mobileMenuToggle.classList.remove('is-active');
          mobileMenuToggle.focus();
        }
        document.body.classList.remove('mobile-nav-locked');
      }

      if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = mobileNavDrawer && mobileNavDrawer.classList.contains('is-open');
          if (isOpen) closeMobileDrawer();
          else openMobileDrawer();
        });
      }

      if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileDrawer);
      if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);

      mobileNavLinks.forEach(item => {
        item.addEventListener('click', () => {
          closeMobileDrawer();
        });
      });

      // Close on Escape key press
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavDrawer && mobileNavDrawer.classList.contains('is-open')) {
          closeMobileDrawer();
        }
      });

      // Active Section Tracking on Desktop
      const desktopNavLinks = document.querySelectorAll('.site-nav-desktop .nav-link');
      const trackedSections = [
        { id: 'hero', link: document.querySelector('.site-nav-desktop a[href="#hero"]') },
        { id: 'stories', link: document.querySelector('.site-nav-desktop a[href="#stories"]') },
        { id: 'farm-activities', link: document.querySelector('.site-nav-desktop a[href="#farm-activities"]') },
        { id: 'gallery', link: document.querySelector('.site-nav-desktop a[href="#gallery"]') },
        { id: 'reviews', link: document.querySelector('.site-nav-desktop a[href="#reviews"]') },
        { id: 'schools', link: document.querySelector('.site-nav-desktop a[href="#schools"]') },
        { id: 'contact', link: document.querySelector('.site-nav-desktop a[href="#contact"]') }
      ];

      if ('IntersectionObserver' in window) {
        const activeNavObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              trackedSections.forEach(item => {
                if (item.link) {
                  item.link.classList.toggle('is-active', item.id === entry.target.id);
                }
              });
            }
          });
        }, { rootMargin: '-20% 0px -65% 0px', threshold: 0.1 });

        trackedSections.forEach(item => {
          const sec = document.getElementById(item.id);
          if (sec) activeNavObserver.observe(sec);
        });
      }

`;

if (!html.includes(scriptHook)) {
  console.error('ERROR: Could not find scriptHook in index.html');
  process.exit(1);
}
html = html.replace(scriptHook, headerJs + '\n' + scriptHook);
console.log('✅ Added site header JavaScript controller with scroll listener & mobile drawer logic');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('🎉 Successfully updated index.html! New size:', html.length, 'bytes');
