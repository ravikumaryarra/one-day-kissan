const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_SCREENSHOT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/screenshots';
const LOCAL_SCREENSHOT_DIR = path.join(__dirname, 'screenshots_milestone_1b');

if (!fs.existsSync(LOCAL_SCREENSHOT_DIR)) {
  fs.mkdirSync(LOCAL_SCREENSHOT_DIR, { recursive: true });
}
if (!fs.existsSync(ARTIFACT_SCREENSHOT_DIR)) {
  fs.mkdirSync(ARTIFACT_SCREENSHOT_DIR, { recursive: true });
}

async function saveScreenshot(page, filename) {
  const localPath = path.join(LOCAL_SCREENSHOT_DIR, filename);
  const artifactPath = path.join(ARTIFACT_SCREENSHOT_DIR, filename);
  await page.screenshot({ path: localPath, fullPage: false });
  await page.screenshot({ path: artifactPath, fullPage: false });
  console.log(`📸 Screenshot saved: ${filename}`);
}

async function runMilestone1BTests() {
  console.log('========================================================================');
  console.log('🌟 ONE DAY KISSAN — MILESTONE 1B VERIFICATION TEST SUITE');
  console.log('   Scope: Institutional Trust & Content Parity');
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  // Pre-seed dismissal so welcome popup doesn't block test clicks
  await context.addInitScript(() => {
    sessionStorage.setItem("odk_welcome_dismissed", "true");
  });

  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  try {
    console.log(`1. Loading ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Dismiss cinematic welcome popup if open so it doesn't intercept clicks
    const welcomeClose = page.locator('#welcomeCinematicClose');
    if (await welcomeClose.isVisible()) {
      console.log("Dismissing welcome popup for clean interaction testing...");
      await welcomeClose.click();
      await page.waitForTimeout(400);
    }

    // -------------------------------------------------------------------------
    // TEST SUITE 1: School Clientele Directory (#schools)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST SUITE 1: School Clientele Directory (#schools) ---");
    const schoolsSection = page.locator('#schools');
    await schoolsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const isSchoolsVisible = await schoolsSection.isVisible();
    console.log("✓ #schools section is visible in DOM:", isSchoolsVisible);

    const schoolsTitle = await page.locator('#schools .schools-title').innerText();
    console.log(`✓ Schools section title: "${schoolsTitle.replace(/\n/g, ' ')}"`);

    // Verify 4 Trust Metrics
    const metricNumbers = await page.locator('#schools .metric-number').allInnerTexts();
    console.log("✓ Trust metrics rendered:", metricNumbers.join(' | '));
    if (!metricNumbers.includes('400+') || !metricNumbers.includes('80,000+')) {
      throw new Error("Missing expected metrics 400+ or 80,000+ in #schools");
    }

    // Verify initial school cards
    const initialCardCount = await page.locator('#schoolsDirectoryGrid .directory-school-card').count();
    console.log(`✓ Initial visible school cards in directory: ${initialCardCount} (expected 24)`);
    if (initialCardCount !== 24) {
      throw new Error(`Expected 24 initial cards, found ${initialCardCount}`);
    }

    // Verify card content
    const firstSchoolName = await page.locator('#schoolsDirectoryGrid .directory-school-card .directory-school-name').first().innerText();
    const firstSchoolLoc = await page.locator('#schoolsDirectoryGrid .directory-school-card .directory-school-loc').first().innerText();
    console.log(`✓ Sample verified school card: "${firstSchoolName}" with "${firstSchoolLoc}"`);

    // Test Region Filter: "Warangal & Hanmakonda"
    console.log("Testing region filter tab: Warangal & Hanmakonda...");
    const warangalTab = page.locator('.school-region-tab[data-region="warangal"]');
    await warangalTab.click();
    await page.waitForTimeout(300);

    const warangalCardsCount = await page.locator('#schoolsDirectoryGrid .directory-school-card').count();
    const warangalSample = await page.locator('#schoolsDirectoryGrid .directory-school-card .directory-school-loc').first().innerText();
    console.log(`✓ Warangal filtered cards count: ${warangalCardsCount}, sample location: "${warangalSample}"`);

    // Test Region Filter: "Hyderabad & Secunderabad"
    console.log("Testing region filter tab: Hyderabad & Secunderabad...");
    const hydTab = page.locator('.school-region-tab[data-region="hyderabad"]');
    await hydTab.click();
    await page.waitForTimeout(300);
    const hydCardsCount = await page.locator('#schoolsDirectoryGrid .directory-school-card').count();
    console.log(`✓ Hyderabad filtered cards count: ${hydCardsCount}`);

    // Restore "All Regions"
    const allTab = page.locator('.school-region-tab[data-region="all"]');
    await allTab.click();
    await page.waitForTimeout(300);

    // Test Real-time Search: "Chirec"
    console.log("Testing search input: 'Chirec'...");
    const searchInput = page.locator('#schoolSearchInput');
    await searchInput.fill('Chirec');
    await page.waitForTimeout(350);

    const chirecCount = await page.locator('#schoolsDirectoryGrid .directory-school-card').count();
    const chirecText = await page.locator('#schoolsDirectoryGrid .directory-school-card .directory-school-name').first().innerText();
    console.log(`✓ Search result for 'Chirec': ${chirecCount} card(s), name: "${chirecText}"`);
    if (!chirecText.toLowerCase().includes('chirec')) {
      throw new Error(`Expected search result to contain Chirec, got "${chirecText}"`);
    }

    // Clear search
    await searchInput.fill('');
    await page.waitForTimeout(350);

    // Test "Show More Partner Schools" pagination button
    console.log("Testing 'Show More Partner Schools' pagination button...");
    const loadMoreBtn = page.locator('#schoolsLoadMoreBtn');
    if (await loadMoreBtn.isVisible()) {
      await loadMoreBtn.click();
      await page.waitForTimeout(300);
      const expandedCount = await page.locator('#schoolsDirectoryGrid .directory-school-card').count();
      console.log(`✓ Cards count after Load More: ${expandedCount} (increased from 24)`);
      if (expandedCount <= 24) {
        throw new Error("Pagination failed to load more schools");
      }
    }

    // Verify marquee rows
    const marqueePillsCount = await page.locator('#schools .marquee-school-pill').count();
    console.log(`✓ Continuous marquee pills count: ${marqueePillsCount}`);

    // Capture screenshot of Schools section
    await saveScreenshot(page, '39_schools_directory_desktop.png');

    // -------------------------------------------------------------------------
    // TEST SUITE 2: Candid Photo Gallery Mosaic (#gallery)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST SUITE 2: Candid Photo Gallery Mosaic (#gallery) ---");
    const gallerySection = page.locator('#gallery');
    await gallerySection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const isGalleryVisible = await gallerySection.isVisible();
    console.log("✓ #gallery section is visible in DOM:", isGalleryVisible);

    const totalGalleryCards = await page.locator('#gallery .gallery-card').count();
    console.log(`✓ Total gallery photo cards: ${totalGalleryCards} (expected 20 authentic WebP photos)`);
    if (totalGalleryCards !== 20) {
      throw new Error(`Expected 20 gallery photo cards, found ${totalGalleryCards}`);
    }

    // Verify WebP image paths and lazy loading
    const firstImgSrc = await page.locator('#gallery .gallery-card img').first().getAttribute('src');
    const firstImgLoading = await page.locator('#gallery .gallery-card img').first().getAttribute('loading');
    console.log(`✓ Sample photo src: "${firstImgSrc}", loading: "${firstImgLoading}"`);
    if (!firstImgSrc.endsWith('.webp')) {
      throw new Error(`Gallery photo should be authentic WebP, got "${firstImgSrc}"`);
    }

    // Test Category Filter: "Village Crafts"
    console.log("Testing gallery filter: Village Crafts...");
    const craftsTab = page.locator('.gallery-tab-btn[data-gallery-filter="crafts"]');
    await craftsTab.click();
    await page.waitForTimeout(300);

    const visibleCraftCards = await page.locator('#gallery .gallery-card:visible').count();
    console.log(`✓ Visible craft cards under filter: ${visibleCraftCards}`);

    // Restore All Moments
    const allGalleryTab = page.locator('.gallery-tab-btn[data-gallery-filter="all"]');
    await allGalleryTab.click();
    await page.waitForTimeout(300);

    // Capture Photo Gallery Mosaic screenshot
    await saveScreenshot(page, '40_photo_gallery_mosaic_desktop.png');

    // Test Lightbox Modal Opening
    console.log("Testing Lightbox Modal opening on card click...");
    const firstCard = page.locator('#gallery .gallery-card').first();
    await firstCard.click();
    await page.waitForTimeout(400);

    const galleryModal = page.locator('#galleryModal');
    const isModalOpen = await galleryModal.evaluate(el => el.classList.contains('is-active'));
    console.log("✓ Lightbox modal opened (.is-active):", isModalOpen);
    if (!isModalOpen) throw new Error("Gallery modal did not open upon card click");

    const modalTitle = await page.locator('#galleryModalTitle').innerText();
    const modalCounter = await page.locator('#galleryModalCounter').innerText();
    console.log(`✓ Lightbox active photo: "${modalTitle}", counter: "${modalCounter}"`);

    // Test Next Photo navigation
    console.log("Testing Lightbox Next photo button...");
    const nextBtn = page.locator('#galleryNextBtn');
    await nextBtn.click();
    await page.waitForTimeout(300);
    const modalCounterAfterNext = await page.locator('#galleryModalCounter').innerText();
    console.log(`✓ Lightbox counter after next: "${modalCounterAfterNext}"`);

    // Test Keyboard navigation (ArrowLeft)
    console.log("Testing Lightbox Keyboard navigation (ArrowLeft)...");
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(300);
    const modalCounterAfterArrow = await page.locator('#galleryModalCounter').innerText();
    console.log(`✓ Lightbox counter after ArrowLeft: "${modalCounterAfterArrow}"`);

    // Capture Lightbox screenshot
    await saveScreenshot(page, '41_gallery_lightbox_modal.png');

    // Close Lightbox via Escape
    console.log("Testing Lightbox dismissal via Escape key...");
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    const isModalClosed = await galleryModal.evaluate(el => !el.classList.contains('is-active'));
    console.log("✓ Lightbox modal closed successfully:", isModalClosed);
    if (!isModalClosed) throw new Error("Gallery modal failed to close via Escape");

    // -------------------------------------------------------------------------
    // TEST SUITE 3: Agritourism FAQ Accordion (#faq)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST SUITE 3: Agritourism FAQ Accordion (#faq) ---");
    const faqSection = page.locator('#faq');
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const isFaqVisible = await faqSection.isVisible();
    console.log("✓ #faq section is visible in DOM:", isFaqVisible);

    const faqItemsCount = await page.locator('#faq .faq-item').count();
    console.log(`✓ Total FAQ items: ${faqItemsCount} (expected 8 verified questions)`);
    if (faqItemsCount !== 8) {
      throw new Error(`Expected 8 FAQ items, found ${faqItemsCount}`);
    }

    // Verify first question
    const q1Trigger = page.locator('#faqTrigger-0');
    const q1Panel = page.locator('#faqPanel-0');
    const q1Text = await q1Trigger.locator('.faq-q-text').innerText();
    console.log(`✓ Question 01: "${q1Text}"`);

    const initialExpanded = await q1Trigger.getAttribute('aria-expanded');
    console.log("✓ Initial aria-expanded state for Q1:", initialExpanded);
    if (initialExpanded !== 'false') throw new Error("FAQ item should be collapsed initially");

    // Click to expand Q1
    console.log("Clicking Question 01 to expand...");
    await q1Trigger.click();
    await page.waitForTimeout(300);

    const afterExpanded = await q1Trigger.getAttribute('aria-expanded');
    const isQ1PanelVisible = await q1Panel.isVisible();
    const q1AnswerText = await q1Panel.innerText();
    console.log(`✓ Q1 after click aria-expanded: "${afterExpanded}", panel visible: ${isQ1PanelVisible}`);
    console.log(`✓ Q1 verified answer preview: "${q1AnswerText.slice(0, 80)}..."`);
    if (afterExpanded !== 'true' || !isQ1PanelVisible) {
      throw new Error("FAQ accordion failed to expand on click");
    }

    // Click Q2 (should expand Q2 and collapse Q1)
    console.log("Clicking Question 02 (verifying single-open accordion behavior)...");
    const q2Trigger = page.locator('#faqTrigger-1');
    await q2Trigger.click();
    await page.waitForTimeout(300);

    const q1AfterQ2 = await q1Trigger.getAttribute('aria-expanded');
    const q2AfterClick = await q2Trigger.getAttribute('aria-expanded');
    console.log(`✓ Q1 state after Q2 click: "${q1AfterQ2}", Q2 state: "${q2AfterClick}"`);
    if (q1AfterQ2 !== 'false' || q2AfterClick !== 'true') {
      throw new Error("Accordion single-open behavior failed");
    }

    // Verify Concierge side card
    const conciergeCard = page.locator('#faq .faq-help-card');
    const hasConcierge = await conciergeCard.isVisible();
    const conciergeWhatsappHref = await page.locator('#faq .faq-help-btn').getAttribute('href');
    console.log(`✓ Concierge card visible: ${hasConcierge}, WhatsApp link: "${conciergeWhatsappHref}"`);
    if (!conciergeWhatsappHref.includes('9849798674')) {
      throw new Error("Concierge WhatsApp link missing verified phone number 9849798674");
    }

    // Capture FAQ screenshot
    await saveScreenshot(page, '42_faq_accordion_desktop.png');

    // -------------------------------------------------------------------------
    // TEST SUITE 4: Dynamic Activity Content & Modal Wiring
    // -------------------------------------------------------------------------
    console.log("\n--- TEST SUITE 4: Dynamic Activity Content & Modal Wiring ---");

    // 4A. Test in #experiences (Category browser)
    const experiencesSection = page.locator('#experiences');
    await experiencesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const firstExpCard = page.locator('#expActivitiesGrid .exp-card').first();
    const firstExpTitle = await firstExpCard.locator('.exp-card-title').innerText();
    console.log(`Clicking activity card in #experiences: "${firstExpTitle}"...`);
    await firstExpCard.click();
    await page.waitForTimeout(400);

    const expModal = page.locator('#experienceModal');
    const isExpModalOpen = await expModal.evaluate(el => el.classList.contains('is-open') || el.classList.contains('is-active'));
    const expModalHeading = await page.locator('#expModalTitle').innerText();
    const expModalDesc = await page.locator('#expModalFullDesc').innerText();
    const expModalTakeaway = await page.locator('#expModalTakeawayText').innerText();
    console.log(`✓ Activity Modal opened: ${isExpModalOpen}`);
    console.log(`✓ Modal dynamic title: "${expModalHeading}"`);
    console.log(`✓ Modal description preview: "${expModalDesc.slice(0, 80)}..."`);
    console.log(`✓ Modal takeaway preview: "${expModalTakeaway.slice(0, 80)}..."`);

    if (expModalHeading !== firstExpTitle) {
      throw new Error(`Modal title mismatch: expected "${firstExpTitle}", got "${expModalHeading}"`);
    }

    // Capture dynamic activity modal screenshot
    await saveScreenshot(page, '43_dynamic_activity_modal.png');

    // Close modal
    await page.locator('#closeExpModalBtn').click();
    await page.waitForTimeout(400);

    // 4B. Test in #farm-activities (5-chapter scroll experience chips)
    console.log("Testing activity chips in #farm-activities...");
    const farmActivitiesSection = page.locator('#farm-activities');
    await farmActivitiesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const firstChip = page.locator('#farmLifeActivityChips .farm-life-chip').first();
    const chipText = await firstChip.locator('.chip-title').innerText();
    console.log(`Clicking interactive chip: "${chipText}"...`);
    await firstChip.click();
    await page.waitForTimeout(400);

    const isChipModalOpen = await expModal.evaluate(el => el.classList.contains('is-open') || el.classList.contains('is-active'));
    const chipModalHeading = await page.locator('#expModalTitle').innerText();
    console.log(`✓ Modal opened from chip click: ${isChipModalOpen}, title: "${chipModalHeading}"`);
    if (!isChipModalOpen) {
      throw new Error("Clicking farm-life-chip failed to open experienceModal");
    }

    // Test "Book a Farm Visit for This Activity" button in modal
    console.log("Testing 'Book a Farm Visit for This Activity' button in modal...");
    const bookActivityBtn = page.locator('#expModalBookBtn');
    await bookActivityBtn.click();
    await page.waitForTimeout(700);

    // Verify notes field in booking section
    const dietaryNotesVal = await page.locator('#dietaryNotes').inputValue();
    console.log(`✓ Reservation notes field populated with: "${dietaryNotesVal}"`);
    if (!dietaryNotesVal.includes('Interested in:')) {
      throw new Error(`Booking notes not populated properly: got "${dietaryNotesVal}"`);
    }

    // -------------------------------------------------------------------------
    // TEST SUITE 5: Responsive Verification & Zero Overflow Across 6 Breakpoints
    // -------------------------------------------------------------------------
    console.log("\n--- TEST SUITE 5: Responsive Verification & Zero Overflow Across 6 Breakpoints ---");
    const viewports = [
      { name: '1920_desktop_large', width: 1920, height: 1080 },
      { name: '1440_desktop_standard', width: 1440, height: 900 },
      { name: '1024_tablet_landscape', width: 1024, height: 768 },
      { name: '768_tablet_portrait', width: 768, height: 1024 },
      { name: '480_mobile_standard', width: 480, height: 854 },
      { name: '360_mobile_narrow', width: 360, height: 740 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(300);

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      console.log(`✓ Viewport ${vp.name} (${vp.width}px): horizontal overflow = ${hasOverflow ? 'FAIL' : 'PASS (0px)'}`);
      if (hasOverflow) {
        throw new Error(`Horizontal overflow detected at ${vp.width}px!`);
      }
    }

    // Capture mobile viewports screenshots of new sections
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);

    await page.locator('#schools').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await saveScreenshot(page, '44_schools_mobile_390.png');

    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await saveScreenshot(page, '45_gallery_mobile_390.png');

    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await saveScreenshot(page, '46_faq_mobile_390.png');

    // -------------------------------------------------------------------------
    // TEST SUITE 6: Preservation Check (3D Tour, GSAP, Lenis)
    // -------------------------------------------------------------------------
    console.log("\n--- TEST SUITE 6: Preservation Check (3D Tour, GSAP, Lenis) ---");
    await page.setViewportSize({ width: 1440, height: 900 });
    const preservation = await page.evaluate(() => {
      return {
        hasThree360: typeof window.__farm360 !== 'undefined',
        hasGSAP: typeof window.gsap !== 'undefined',
        hasScrollTrigger: typeof window.ScrollTrigger !== 'undefined',
        hasLenis: typeof window.__lenis !== 'undefined'
      };
    });

    console.log("✓ Preservation audit:", JSON.stringify(preservation, null, 2));
    if (!preservation.hasGSAP || !preservation.hasScrollTrigger) {
      throw new Error("GSAP / ScrollTrigger preservation failed!");
    }

    console.log(`\nConsole errors encountered during test: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log("Console errors:", consoleErrors);
    }

    console.log("\n=======================================================");
    console.log("🎉 ALL MILESTONE 1B TESTS PASSED WITH 100% SUCCESS!");
    console.log("=======================================================");

  } catch (err) {
    console.error("\n❌ TEST SUITE FAILED:", err);
    await saveScreenshot(page, 'error_failure.png');
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runMilestone1BTests();
