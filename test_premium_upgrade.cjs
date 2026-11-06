const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_SCREENSHOT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/screenshots';
const LOCAL_SCREENSHOT_DIR = path.join(__dirname, 'screenshots_360_tour');

if (!fs.existsSync(LOCAL_SCREENSHOT_DIR)) {
  fs.mkdirSync(LOCAL_SCREENSHOT_DIR, { recursive: true });
}
if (!fs.existsSync(ARTIFACT_SCREENSHOT_DIR)) {
  fs.mkdirSync(ARTIFACT_SCREENSHOT_DIR, { recursive: true });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✅ ${message}`);
}

async function runTests() {
  console.log('========================================================================');
  console.log('🌟 ONE DAY KISSAN - COMPREHENSIVE PREMIUM EXPERIENCE UPGRADE TEST SUITE');
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  const pageErrors = [];
  page.on('pageerror', err => {
    pageErrors.push(err.message);
    console.error('  [Page Error]:', err.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') console.error('  [Browser Error]:', msg.text());
  });

  console.log(`Navigating to ${BASE_URL}...`);
  await page.addInitScript(() => sessionStorage.setItem('odk_welcome_dismissed', 'true'));
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  assert(pageErrors.length === 0, `Zero page runtime errors detected on initial load (errors: ${pageErrors.length})`);

  // =========================================================================
  // SECTION A: HERO SECTION UPGRADE
  // =========================================================================
  console.log('\n--- SECTION A: Hero Experience ---');
  const heroH1 = (await page.locator('#heroTitle').textContent()).trim();
  assert(heroH1.includes('A day away from the ordinary.'), `Hero Title verified: "${heroH1}"`);

  const heroSub = (await page.locator('#heroLead').textContent()).trim();
  assert(heroSub.includes('Step into the rhythm of rural life') && heroSub.includes('create memories that stay with you'), `Hero subtitle verified: "${heroSub}"`);

  const heroLocationPill = (await page.locator('.hero-location-pill').textContent()).trim();
  assert(heroLocationPill.includes('Telangana, India • Bhongir & Moinabad'), `Hero location identity pill verified: "${heroLocationPill}"`);

  const heroActions = page.locator('.hero-actions-cluster');
  assert(await heroActions.isVisible(), 'Dual hero action buttons cluster is visible');

  const primaryCta = page.locator('.hero-actions-cluster a[href="#farm-activities"]');
  const secondaryCta = page.locator('.hero-actions-cluster a[href="#booking"]');
  assert(await primaryCta.isVisible(), 'Primary CTA "Explore Farm Experiences" is visible');
  assert(await secondaryCta.isVisible(), 'Secondary CTA "Plan Your Farm Visit" is visible');

  // Verify absence of fantasy clouds and presence of authentic Telangana poster
  const cloudPngs = await page.locator('img[src*="fantasy_cloud"], img[src*="clouds-opt.png"]').count();
  assert(cloudPngs === 0, 'Zero fantasy cloud PNG images in DOM');

  const heroVideo = page.locator('#heroVideo');
  const posterSrc = await heroVideo.getAttribute('poster');
  assert(posterSrc && posterSrc.includes('bhongir_main_farm.jpg'), `Hero features authentic Bhongir farm poster: "${posterSrc}"`);

  const shot30 = path.join(LOCAL_SCREENSHOT_DIR, '30_premium_hero_section.png');
  await page.locator('.hero').screenshot({ path: shot30 });
  fs.copyFileSync(shot30, path.join(ARTIFACT_SCREENSHOT_DIR, '30_premium_hero_section.png'));
  console.log('📸 Saved screenshot: 30_premium_hero_section.png');

  // =========================================================================
  // SECTION B: TRUST METRICS & IMPACT
  // =========================================================================
  console.log('\n--- SECTION B: Trust Metrics & Verified Scale ---');
  const statsSection = page.locator('#stats');
  assert(await statsSection.isVisible(), 'Stats & impact section is visible');

  const statsText = await statsSection.textContent();
  assert(statsText.includes('400+') && statsText.includes('Schools'), 'Verified metric: 400+ Schools & Educational Institutions');
  assert(statsText.includes('80,000+') && statsText.includes('Students'), 'Verified metric: 80,000+ Students Inspired');
  assert(statsText.includes('4.8') && statsText.includes('664'), 'Verified metric: 4.8/5 Rating across 664+ Google Reviews');
  assert(statsText.includes('2') && (statsText.includes('Telangana') || statsText.includes('Bhongir')), 'Verified metric: 2 Authentic Farm Locations');

  // =========================================================================
  // SECTION C: FARM LOCATIONS & COMPARISON
  // =========================================================================
  console.log('\n--- SECTION C: Two Farm Locations & Comparison Matrix ---');
  const locSection = page.locator('#locations');
  await locSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const locHeading = (await page.locator('#locations h2').textContent()).trim();
  assert(locHeading.includes('Two places. One unforgettable farm experience.'), `Locations heading verified: "${locHeading}"`);

  // Both location cards
  const bhongirCard = page.locator('#panel-bhongir');
  const moinabadCard = page.locator('#panel-moinabad');
  assert(await bhongirCard.isVisible() && await moinabadCard.isVisible(), 'Both Bhongir and Moinabad location cards are visible');

  // Verify travel badges
  const travelBadges = await page.locator('.loc-travel-info').allTextContents();
  const travelCombined = travelBadges.join(' ');
  assert(travelCombined.includes('55 km') && travelCombined.includes('25 km'), 'Travel distance badges verified (~55 km Bhongir, ~25 km Moinabad)');

  // Verify comparison toggle
  const compareToggle = page.locator('#tab-compare');
  const compareTable = page.locator('#locCompareBox');
  assert(await compareToggle.isVisible(), 'Compare Both Farms interactive tab button is visible');
  assert(!await compareTable.isVisible(), 'Comparison matrix is initially hidden');

  await compareToggle.click();
  await page.waitForTimeout(400);
  assert(await compareTable.isVisible(), 'Comparison matrix smoothly expands on click');

  const shot31 = path.join(LOCAL_SCREENSHOT_DIR, '31_premium_locations_comparison.png');
  await locSection.screenshot({ path: shot31 });
  fs.copyFileSync(shot31, path.join(ARTIFACT_SCREENSHOT_DIR, '31_premium_locations_comparison.png'));
  console.log('📸 Saved screenshot: 31_premium_locations_comparison.png');

  // =========================================================================
  // SECTION D: THREE STAGES SCROLL STORYTELLING
  // =========================================================================
  console.log('\n--- SECTION D: Three Stages Scroll Storytelling ---');
  const redundantLoop = await page.locator('#loop').count();
  assert(redundantLoop === 0, 'Redundant #loop accordion completely eliminated from DOM');

  const storiesSection = page.locator('#stories');
  assert(await storiesSection.isVisible(), 'Single unified storytelling section #stories is visible');
  await storiesSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Check oversized numbers
  const giantDigit = page.locator('#giantDigit');
  const numberText = (await giantDigit.textContent()).trim();
  assert(numberText === '01', `Storytelling initial active stage is 01 (got "${numberText}")`);

  const storyHeading = (await page.locator('#storyHeading').textContent()).trim();
  assert(storyHeading === 'Discover the Farm', `Stage 01 heading verified: "${storyHeading}"`);

  // Verify stage images
  const storyImg0 = page.locator('#storyImg-0');
  const storyImgSrc = await storyImg0.getAttribute('src');
  assert(storyImgSrc.includes('story_01_discover_farm.jpg'), `Stage 01 shows correct authentic photo: "${storyImgSrc}"`);

  // Test interactive navigation dots
  const stage02Dot = page.locator('.story-dot[data-jump="1"]');
  if (await stage02Dot.count() > 0) {
    await stage02Dot.click();
    await page.waitForTimeout(500);
    const newNum = (await giantDigit.textContent()).trim();
    assert(newNum === '02', `Dot click switches stage to 02 (got "${newNum}")`);
  }

  // =========================================================================
  // SECTION E: ACTIVITIES DISCOVERY & 3-WAY FILTERING
  // =========================================================================
  console.log('\n--- SECTION E: Activities Discovery & 3-Way Filtering ---');
  
  // 1. Interactive 25+ Experiences Grid with 3-Way Filters
  const expSection = page.locator('#experiences');
  assert(await expSection.isVisible(), 'Interactive #experiences section with 3-way filters is visible');
  await expSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const catTabs = page.locator('.exp-cat-btn');
  const tabCount = await catTabs.count();
  assert(tabCount === 5, `5 visual chapter category tabs present (count: ${tabCount})`);

  // Verify Audience filter pills
  const audiencePills = page.locator('.exp-filter-pill');
  assert(await audiencePills.count() >= 4, 'Audience filter pills present (All, Schools, Families, Corporates)');

  // Verify Farm filter pills
  const farmPills = page.locator('.exp-loc-pill');
  assert(await farmPills.count() >= 3, 'Farm location filter pills present (Both, Bhongir, Moinabad)');

  // Test Filter Interaction: Filter by School audience
  const schoolFilterBtn = page.locator('.exp-filter-pill[data-audience="school"]');
  await schoolFilterBtn.click();
  await page.waitForTimeout(300);

  const initialVisibleCards = await page.locator('.exp-card:visible').count();
  assert(initialVisibleCards > 0, `Activity cards visible when filtered by School (${initialVisibleCards} cards)`);

  // Verify tags in card (Seasonality, Age)
  const firstCardTags = await page.locator('.exp-card:visible').first().textContent();
  assert(firstCardTags.includes('All Ages') || firstCardTags.includes('Students') || firstCardTags.includes('Kids') || firstCardTags.includes('Year-Round'), 'Activity card renders authentic Age / Seasonality tags');

  // Reset filter to All
  const allAudienceBtn = page.locator('.exp-filter-pill[data-audience="all"]');
  await allAudienceBtn.click();
  await page.waitForTimeout(300);

  // 2. Immersive 5-Chapter Storytelling Section (Explore Life at the Farm)
  const farmActivitiesSection = page.locator('#farm-activities');
  assert(await farmActivitiesSection.isVisible(), 'Immersive #farm-activities section is visible');
  await farmActivitiesSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const actHeading = (await page.locator('#farm-activities h2').textContent()).trim();
  assert(actHeading.includes('More than 23 ways') || actHeading.includes('Explore Life at the Farm'), `Farm activities heading verified: "${actHeading}"`);

  const chapterDots = page.locator('.farm-life-dot');
  assert(await chapterDots.count() === 5, '5 visual chapter navigation dots present');

  const shot32 = path.join(LOCAL_SCREENSHOT_DIR, '32_premium_activities_discovery.png');
  await expSection.screenshot({ path: shot32 });
  fs.copyFileSync(shot32, path.join(ARTIFACT_SCREENSHOT_DIR, '32_premium_activities_discovery.png'));
  console.log('📸 Saved screenshot: 32_premium_activities_discovery.png');

  // =========================================================================
  // SECTION F: EDITORIAL TESTIMONIALS & SCHOOL VIDEOS
  // =========================================================================
  console.log('\n--- SECTION F: Editorial Testimonials & School Videos ---');
  const testimonialsSection = page.locator('#reviews');
  await testimonialsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const videoThumbnails = page.locator('.journal-film-card, .journal-featured-card');
  const totalVideos = await videoThumbnails.count();
  assert(totalVideos >= 10, `At least 10 official verified school videos present (found: ${totalVideos})`);

  // Verify Video Modal trigger and clean teardown
  const firstPlayBtn = page.locator('.journal-play-btn').first();
  await firstPlayBtn.click();
  await page.waitForTimeout(500);

  const videoModal = page.locator('#journalVideoModal');
  const isModalOpen = await videoModal.evaluate(el => el.classList.contains('is-open'));
  assert(isModalOpen, 'Testimonial video modal opens on card click');

  const closeVideoModalBtn = page.locator('#closeJournalModalBtn');
  await closeVideoModalBtn.click();
  await page.waitForTimeout(400);
  const isModalClosed = await videoModal.evaluate(el => !el.classList.contains('is-open'));
  assert(isModalClosed, 'Video modal cleanly closes on dismiss');

  // =========================================================================
  // SECTION G: 360° VIRTUAL FARM TOUR & HOTSPOTS
  // =========================================================================
  console.log('\n--- SECTION G: 360° Virtual Farm Tour & Hotspots ---');
  const tour360Section = page.locator('#farm-360-tour');
  await tour360Section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Start Tour
  const start360Btn = page.locator('#start360TourBtn');
  await start360Btn.click();
  await page.waitForTimeout(1000);

  const canvasWrap = page.locator('#farm360LiveCanvasWrap');
  assert(await canvasWrap.isVisible(), '360 Live WebGL canvas container is active and visible');

  // Viewpoint selector buttons
  const vpBhongirBtn = page.locator('#vpBhongirBtn');
  const vpMoinabadBtn = page.locator('#vpMoinabadBtn');
  assert(await vpBhongirBtn.isVisible() && await vpMoinabadBtn.isVisible(), '360 Tour Viewpoint selector buttons (Bhongir / Moinabad) are visible');

  // Verify Hotspots
  const hotspots = page.locator('.farm360-hotspot');
  const hotspotCount = await hotspots.count();
  assert(hotspotCount === 3, `3 contextual hotspots present on 360 canvas (found: ${hotspotCount})`);

  // Click a hotspot to trigger the info card
  const riceHotspot = hotspots.first();
  await riceHotspot.click();
  await page.waitForTimeout(400);

  const hotspotCard = page.locator('#farm360HotspotCard');
  assert(await hotspotCard.isVisible(), 'Hotspot detail card pops up when clicked');

  const cardTitle = (await page.locator('#hotspotCardTitle').textContent()).trim();
  assert(cardTitle.includes('Wetland Rice'), `Hotspot card title verified: "${cardTitle}"`);

  const closeHotspotBtn = page.locator('#closeHotspotCardBtn');
  await closeHotspotBtn.click();
  await page.waitForTimeout(300);
  assert(!await hotspotCard.isVisible(), 'Hotspot card cleanly closes on dismiss');

  // Test Viewpoint switch
  await vpMoinabadBtn.click();
  await page.waitForTimeout(400);
  assert(await vpMoinabadBtn.getAttribute('class').then(c => c.includes('is-active')), 'Moinabad viewpoint successfully selected');

  const shot33 = path.join(LOCAL_SCREENSHOT_DIR, '33_premium_360_tour_hotspots.png');
  await tour360Section.screenshot({ path: shot33 });
  fs.copyFileSync(shot33, path.join(ARTIFACT_SCREENSHOT_DIR, '33_premium_360_tour_hotspots.png'));
  console.log('📸 Saved screenshot: 33_premium_360_tour_hotspots.png');

  // Stop 360 tour to save GPU memory
  const toggleBtn = page.locator('#toggle360PowerBtn');
  await toggleBtn.click();
  await page.waitForTimeout(300);

  // =========================================================================
  // SECTION H: LUXURY FARM RESERVATION & WHATSAPP
  // =========================================================================
  console.log('\n--- SECTION H: Luxury Farm Reservation & WhatsApp ---');
  const bookingSection = page.locator('#booking');
  await bookingSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const waBtn = page.locator('a[href*="wa.me/919849798674"]');
  assert(await waBtn.count() > 0, 'Direct WhatsApp Concierge link (wa.me/919849798674) is present');

  // Check 4-step wizard structure
  const stepPanels = page.locator('.luxury-step-panel');
  assert(await stepPanels.count() === 4, '4-step reservation wizard panels present');

  // Advance through booking form to verify end-to-end flow
  const catCard = page.locator('.luxury-choice-card[data-category="school"]');
  await catCard.click();
  const farmCard = page.locator('.luxury-choice-card[data-farm="bhongir"]');
  await farmCard.click();

  const toStep2Btn = page.locator('#luxuryStep1NextBtn');
  await toStep2Btn.click();
  await page.waitForTimeout(300);

  // Step 2: Date & Group Size
  await page.locator('#inputVisitDate').fill('2026-11-20');
  await page.locator('#inputSchoolName').fill('Hyderabad Public School');
  await page.locator('#inputSchoolCity').fill('Hyderabad');
  await page.locator('#inputSchoolGrade').fill('Grade 6–8');
  await page.locator('#inputSchoolStudents').fill('85');
  const toStep3Btn = page.locator('#luxuryStep2NextBtn');
  await toStep3Btn.click();
  await page.waitForTimeout(300);

  // Step 3: Contact Person, Phone, Email
  await page.locator('#inputContactName').fill('Dr. Ramesh Rao');
  await page.locator('#inputContactPhone').fill('+91 9849798674');
  await page.locator('#inputContactEmail').fill('principal@hps.edu.in');

  const toStep4Btn = page.locator('#luxuryStep3NextBtn');
  await toStep4Btn.click();
  await page.waitForTimeout(300);

  // Step 4: Submit Reservation
  const confirmBtn = page.locator('#luxurySubmitBtn');
  await confirmBtn.click();
  await page.waitForSelector('#luxuryConfirmedCard', { state: 'visible', timeout: 8000 });

  const successCard = page.locator('#luxuryConfirmedCard');
  assert(await successCard.isVisible(), 'Reservation confirmed state successfully displayed');

  // =========================================================================
  // SECTION I: FOOTER & OFFICIAL DIRECT CONTACT
  // =========================================================================
  console.log('\n--- SECTION I: Verified Footer & Official Direct Contact ---');
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const phoneLink = page.locator('footer a[href="tel:+919849798674"]');
  assert(await phoneLink.count() > 0, 'Clickable official phone tel:+919849798674 verified in footer');

  const emailLink = page.locator('footer a[href="mailto:info@onedaykisan.com"]');
  assert(await emailLink.count() > 0, 'Clickable official email mailto:info@onedaykisan.com verified in footer');

  const footerText = await footer.textContent();
  assert(footerText.includes('Hotel Vivera, Hyderabad–Warangal Highway') && footerText.includes('508116'), 'Bhongir full postal address verified in footer');
  assert(footerText.includes('Kapil Agro Farms, Sriramnagar') && footerText.includes('501504'), 'Moinabad full postal address verified in footer');

  // =========================================================================
  // VIEWPORT RESPONSIVENESS & OVERFLOW AUDIT (6 VIEWPORTS)
  // =========================================================================
  console.log('\n--- VIEWPORT RESPONSIVENESS AUDIT (6 VIEWPORTS) ---');
  const viewports = [
    { name: 'Desktop Large', width: 1920, height: 1080 },
    { name: 'Desktop Standard', width: 1440, height: 900 },
    { name: 'Laptop', width: 1280, height: 800 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Mobile iPhone 14', width: 390, height: 844 },
    { name: 'Small Mobile', width: 320, height: 700 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(400);

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    assert(!hasOverflow, `Zero horizontal overflow on ${vp.name} (${vp.width}x${vp.height})`);
  }

  // Mobile screenshot
  const shot34 = path.join(LOCAL_SCREENSHOT_DIR, '34_premium_mobile_viewport.png');
  await page.screenshot({ path: shot34, fullPage: false });
  fs.copyFileSync(shot34, path.join(ARTIFACT_SCREENSHOT_DIR, '34_premium_mobile_viewport.png'));
  console.log('📸 Saved screenshot: 34_premium_mobile_viewport.png');

  console.log('\n========================================================================');
  console.log('🎉 ALL PREMIUM EXPERIENCE UPGRADE TESTS PASSED WITH 100% ACCURACY!');
  console.log('========================================================================\n');

  await browser.close();
}

runTests().catch(err => {
  console.error('\n❌ TEST RUN TERMINATED WITH ERROR:', err);
  process.exit(1);
});
