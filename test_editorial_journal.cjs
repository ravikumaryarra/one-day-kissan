const http = require('http');
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
  console.log('================================================================');
  console.log('🧪 ONE DAY KISSAN - EDITORIAL TRAVEL JOURNAL TEST SUITE');
  console.log('================================================================\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') console.error('  [Browser Error]:', msg.text());
  });

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#reviews', { state: 'attached' });
  await page.waitForTimeout(1000);

  // --- 1. Verify Complete Removal of Legacy Reviews & Fictional Data ---
  console.log('\n--- 1. Verifying Removal of Generic Reviews & Fake Stats ---');

  const legacyStatsCount = await page.locator('.reviews-stats-banner').count();
  assert(legacyStatsCount === 0, `No legacy review statistics banner in DOM (Found: ${legacyStatsCount})`);

  const legacyCardsCount = await page.locator('.review-card').count();
  assert(legacyCardsCount === 0, `No legacy 3-column review cards in DOM (Found: ${legacyCardsCount})`);

  const writeBtnCount = await page.locator('#writeReviewBtn').count();
  assert(writeBtnCount === 0, `No review write button in DOM (Found: ${writeBtnCount})`);

  const reviewModalCount = await page.locator('#reviewModal').count();
  assert(reviewModalCount === 0, `No legacy #reviewModal in DOM (Found: ${reviewModalCount})`);

  const fakeContentExists = await page.evaluate(() => {
    const text = document.body.innerText;
    return text.includes('Kavita Ramachandran') || text.includes('Arun & Sunita Kulkarni') || text.includes('4.96 ★') || text.includes('340+');
  });
  assert(!fakeContentExists, 'Zero fictional guest names or made-up statistics present in page text');

  // --- 2. Verify Editorial Travel Journal Architecture ---
  console.log('\n--- 2. Verifying Editorial Travel Journal Architecture ---');

  const section = page.locator('#reviews');
  assert(await section.isVisible(), '#reviews section exists and is visible');

  const isJournal = await section.evaluate(el => el.classList.contains('journal-section'));
  assert(isJournal, 'Section has .journal-section styling class');

  const titleText = (await page.locator('.journal-title').textContent()).trim();
  assert(titleText === 'Memories made at the farm.', `Masthead heading verified: "${titleText}"`);

  const subText = (await page.locator('.journal-subtitle').textContent()).trim();
  assert(subText.includes('Stories from a day spent with nature'), `Masthead subtitle verified: "${subText}"`);

  const trustText = (await page.locator('.journal-trust-pill').textContent()).trim();
  assert(trustText.includes('4.8') && trustText.includes('664 Reviews'), `Google rating verified: "${trustText}"`);

  const volumeTag = (await page.locator('.journal-volume-tag').textContent()).trim();
  assert(volumeTag.includes('Volume IV • Field Memories'), `Editorial volume tag verified: "${volumeTag}"`);

  // --- 3. Verify Primary Featured Video Showcase ---
  console.log('\n--- 3. Verifying Primary Featured Video Showcase ---');

  // Scroll section into view
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const featuredCard = page.locator('#journalFeaturedCard');
  assert(await featuredCard.isVisible(), 'Featured video card is visible');

  const featuredTitle = (await page.locator('#journalFeaturedTitle').textContent()).trim();
  assert(featuredTitle === 'Alphores eTechno School', `Initial featured video is: "${featuredTitle}"`);

  const featuredThumbValid = await page.evaluate(() => {
    const img = document.getElementById('journalFeaturedThumb');
    return img && img.complete && img.naturalWidth > 0;
  });
  assert(featuredThumbValid, 'Featured video thumbnail loaded with valid natural dimensions');

  const playBtn = page.locator('#journalFeaturedPlayBtn');
  assert(await playBtn.isVisible(), 'Play button on featured video is visible and accessible');

  const shot19 = path.join(LOCAL_SCREENSHOT_DIR, '19_editorial_journal_desktop.png');
  await section.screenshot({ path: shot19 });
  fs.copyFileSync(shot19, path.join(ARTIFACT_SCREENSHOT_DIR, '19_editorial_journal_desktop.png'));
  console.log('📸 Saved screenshot: 19_editorial_journal_desktop.png');

  // Hover state capture on featured video card
  await featuredCard.hover();
  await page.waitForTimeout(300);
  const shot20 = path.join(LOCAL_SCREENSHOT_DIR, '20_editorial_journal_featured_hover.png');
  await featuredCard.screenshot({ path: shot20 });
  fs.copyFileSync(shot20, path.join(ARTIFACT_SCREENSHOT_DIR, '20_editorial_journal_featured_hover.png'));
  console.log('📸 Saved screenshot: 20_editorial_journal_featured_hover.png');

  // --- 4. Verify Curated Filmstrip & Thumbnails ---
  console.log('\n--- 4. Verifying Curated Filmstrip Collection ---');

  const filmCards = page.locator('.journal-film-card');
  const filmCount = await filmCards.count();
  assert(filmCount === 12, `Curated filmstrip contains 12 official testimonial videos (Found: ${filmCount})`);

  const allThumbsValid = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('.journal-film-thumb'));
    return imgs.length === 12 && imgs.every(img => img.complete && img.naturalWidth > 0);
  });
  assert(allThumbsValid, 'All 12 filmstrip video thumbnails loaded successfully with valid dimensions');

  const navNextBtn = page.locator('#journalNextBtn');
  const navPrevBtn = page.locator('#journalPrevBtn');
  assert(await navNextBtn.isVisible() && await navPrevBtn.isVisible(), 'Filmstrip left/right navigation controls are present');

  // Test Filmstrip scroll
  await navNextBtn.click();
  await page.waitForTimeout(350);
  const filmstripScrollLeft = await page.locator('#journalFilmstrip').evaluate(el => el.scrollLeft);
  assert(filmstripScrollLeft > 0, `Filmstrip scrolls horizontally via navigation arrows (scrollLeft: ${filmstripScrollLeft}px)`);

  const shot22 = path.join(LOCAL_SCREENSHOT_DIR, '22_editorial_journal_filmstrip.png');
  await page.locator('.journal-filmstrip-wrap').screenshot({ path: shot22 });
  fs.copyFileSync(shot22, path.join(ARTIFACT_SCREENSHOT_DIR, '22_editorial_journal_filmstrip.png'));
  console.log('📸 Saved screenshot: 22_editorial_journal_filmstrip.png');

  // --- 5. Test Video Viewing Experience & Player Teardown ---
  console.log('\n--- 5. Testing Video Modal Player Experience & Playback Teardown ---');

  await playBtn.click();
  await page.waitForTimeout(500);

  const videoModal = page.locator('#journalVideoModal');
  const isModalOpen = await videoModal.evaluate(el => el.classList.contains('is-open'));
  assert(isModalOpen, 'Video modal viewer opens on play button click');

  const modalTitle = (await page.locator('#journalModalTitle').textContent()).trim();
  assert(modalTitle === 'Alphores eTechno School', `Modal displays correct video title: "${modalTitle}"`);

  const iframeSrc = await page.locator('#journalModalFrame').getAttribute('src');
  assert(iframeSrc.includes('youtube-nocookie.com/embed/ECP1QRaze2A') && iframeSrc.includes('autoplay=1'),
    `Iframe loads original YouTube video embed: "${iframeSrc}"`);

  const shot21 = path.join(LOCAL_SCREENSHOT_DIR, '21_editorial_journal_video_modal.png');
  await page.locator('#journalVideoCard').screenshot({ path: shot21 });
  fs.copyFileSync(shot21, path.join(ARTIFACT_SCREENSHOT_DIR, '21_editorial_journal_video_modal.png'));
  console.log('📸 Saved screenshot: 21_editorial_journal_video_modal.png');

  // Close modal and verify playback is completely stopped
  const closeBtn = page.locator('#closeJournalModalBtn');
  await closeBtn.click();
  await page.waitForTimeout(400);

  const isModalClosed = !(await videoModal.evaluate(el => el.classList.contains('is-open')));
  assert(isModalClosed, 'Modal closed upon clicking close button');

  const stoppedIframeSrc = await page.locator('#journalModalFrame').getAttribute('src');
  assert(stoppedIframeSrc === '' || stoppedIframeSrc === null,
    'Iframe src is cleared immediately upon close to stop audio/video playback');

  // --- 6. Test Switching Video via Filmstrip Item Click ---
  console.log('\n--- 6. Testing Video Selection via Filmstrip ---');

  // Click second filmstrip card (Sloka The Global School)
  const secondCard = filmCards.nth(1);
  const secondTitle = (await secondCard.locator('.film-title').textContent()).trim();
  await secondCard.click();
  await page.waitForTimeout(500);

  // Modal should be open for Sloka
  assert(await videoModal.evaluate(el => el.classList.contains('is-open')), 'Modal opened for selected filmstrip video');
  const secondModalTitle = (await page.locator('#journalModalTitle').textContent()).trim();
  assert(secondModalTitle === secondTitle, `Modal updated to selected film: "${secondModalTitle}"`);

  const secondIframeSrc = await page.locator('#journalModalFrame').getAttribute('src');
  assert(secondIframeSrc.includes('iqaiVDI9Cow'), `Iframe loaded YouTube video for Sloka: "${secondIframeSrc}"`);

  // Close modal with Escape key
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  assert(!(await videoModal.evaluate(el => el.classList.contains('is-open'))), 'Modal closed via Escape key');

  // Verify featured card is now updated to Sloka
  const updatedFeaturedTitle = (await page.locator('#journalFeaturedTitle').textContent()).trim();
  assert(updatedFeaturedTitle === secondTitle, `Featured card updated to: "${updatedFeaturedTitle}"`);

  // --- 7. Test Booking Action from Video Viewer ---
  console.log('\n--- 7. Testing "Plan Your Farm Visit" Booking Action ---');
  await playBtn.click();
  await page.waitForTimeout(400);

  const bookBtn = page.locator('#journalModalBookBtn');
  await bookBtn.click();
  await page.waitForTimeout(600);

  assert(!(await videoModal.evaluate(el => el.classList.contains('is-open'))), 'Modal closed after clicking Plan Your Farm Visit');

  const notesVal = await page.locator('#dietaryNotes').inputValue();
  assert(notesVal.includes('Interested in School/Group Visit'), `Booking form pre-populated with inquiry notes: "${notesVal}"`);

  // --- 8. Responsiveness & Horizontal Overflow Verification (6 Viewports) ---
  console.log('\n--- 8. Responsiveness & Horizontal Overflow Verification (6 Viewports) ---');
  const viewports = [
    { name: 'desktop_1920x1080', width: 1920, height: 1080 },
    { name: 'desktop_1440x900',  width: 1440, height: 900 },
    { name: 'laptop_1280x800',   width: 1280, height: 800 },
    { name: 'tablet_768x1024',   width: 768,  height: 1024 },
    { name: 'mobile_390x844',    width: 390,  height: 844 },
    { name: 'small_mobile_320x700', width: 320, height: 700 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(300);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });

    assert(overflow <= 0, `Viewport ${vp.name} (${vp.width}x${vp.height}): 0px horizontal overflow (actual: ${overflow}px)`);

    if (vp.name === 'mobile_390x844') {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      const mobileShot = path.join(LOCAL_SCREENSHOT_DIR, '23_editorial_journal_mobile.png');
      await section.screenshot({ path: mobileShot });
      fs.copyFileSync(mobileShot, path.join(ARTIFACT_SCREENSHOT_DIR, '23_editorial_journal_mobile.png'));
      console.log('📸 Saved screenshot: 23_editorial_journal_mobile.png');
    }
  }

  await browser.close();
  console.log('\n================================================================');
  console.log('🎉 ALL EDITORIAL TRAVEL JOURNAL TESTS PASSED SUCCESSFULLY!');
  console.log('================================================================');
}

runTests().catch(err => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
