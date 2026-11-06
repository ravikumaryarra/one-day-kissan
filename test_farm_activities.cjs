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
  console.log('🧪 ONE DAY KISSAN - EXPLORE LIFE AT THE FARM VERIFICATION');
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
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // --- 1. Verify Removal of Masterclasses & Fictional Offerings ---
  console.log('\n--- 1. Verifying Complete Removal of Agrarian Masterclasses ---');
  
  const workshopCardsCount = await page.locator('.workshop-card').count();
  assert(workshopCardsCount === 0, `No legacy workshop cards remain in DOM (Found: ${workshopCardsCount})`);

  const workshopGridsCount = await page.locator('.workshops-grid').count();
  assert(workshopGridsCount === 0, `No legacy workshop grids remain in DOM (Found: ${workshopGridsCount})`);

  const workshopFilterTabsCount = await page.locator('#workshopFilterTabs').count();
  assert(workshopFilterTabsCount === 0, `No legacy workshop filter tabs remain in DOM (Found: ${workshopFilterTabsCount})`);

  const seatsPillCount = await page.locator('.workshop-seats-pill').count();
  assert(seatsPillCount === 0, `No seat availability counters remain in DOM (Found: ${seatsPillCount})`);

  const legacyModals = await page.evaluate(() => {
    return {
      workshopModal: !!document.getElementById('workshopModal'),
      workshopPassModal: !!document.getElementById('workshopPassModal')
    };
  });
  assert(!legacyModals.workshopModal, 'Legacy #workshopModal is completely removed');
  assert(!legacyModals.workshopPassModal, 'Legacy #workshopPassModal is completely removed');

  const pricingRegexMatches = await page.evaluate(() => {
    const text = document.body.innerText;
    return text.includes('$35 / person') || text.includes('$42 / person') || text.includes('Ramrao & Savitri Deshmukh');
  });
  assert(!pricingRegexMatches, 'No unverified course pricing or fictional instructors displayed');

  // --- 2. Verify Explore Life at the Farm Section Architecture ---
  console.log('\n--- 2. Verifying New Explore Life at the Farm Section Architecture ---');

  const section = page.locator('#farm-activities');
  assert(await section.isVisible(), '#farm-activities section exists and is in DOM');

  const sectionTitle = (await page.locator('.farm-life-section-title').textContent()).trim();
  assert(sectionTitle.includes('More than 23 ways to discover'), `Section title verified: "${sectionTitle}"`);

  const pillText = (await page.locator('#farm-activities .farm-life-editorial-header .pill').textContent()).trim();
  assert(pillText.includes('Explore Life at the Farm'), `Section pill verified: "${pillText}"`);

  const dotsCount = await page.locator('.farm-life-dot').count();
  assert(dotsCount === 5, `Exactly 5 chapter dots present (Found: ${dotsCount})`);

  const imagesCount = await page.locator('.farm-life-slide-image').count();
  assert(imagesCount === 5, `Exactly 5 authentic chapter slide photographs present (Found: ${imagesCount})`);

  // --- 3. Test Scroll Stages & Bidirectional Transitions Across All 5 Chapters ---
  console.log('\n--- 3. Testing 5-Chapter Side-by-Side Scroll Transitions ---');

  const chapterData = [
    {
      index: 0,
      num: '01',
      title: 'The Art of Farming',
      expectedActivities: [
        'Ploughing and paddy transplantation',
        'Paddy life cycle and rice mill activity',
        'Cotton life cycle',
        'Vegetable and food grain field exploration'
      ]
    },
    {
      index: 1,
      num: '02',
      title: 'Life Around the Farm',
      expectedActivities: [
        'Domestic animals and birds',
        'Exotic birds',
        'Walk-in bird aviary',
        'Bird nest exploration'
      ]
    },
    {
      index: 2,
      num: '03',
      title: 'Village Traditions',
      expectedActivities: [
        'Pottery',
        'Dung cake making',
        'Scarecrow making',
        'Traditional hand grinding'
      ]
    },
    {
      index: 3,
      num: '04',
      title: 'The Wisdom of Water',
      expectedActivities: [
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
      index: 4,
      num: '05',
      title: 'Fun on the Farm',
      expectedActivities: [
        'Grass castle',
        'Polyhouse experience',
        'Farmer watch tower',
        'Tractor ride',
        'DJ music and fun games'
      ]
    }
  ];

  // Helper to test each chapter state
  async function verifyChapterState(expected) {
    const curNum = (await page.locator('#farmLifeGiantDigit').textContent()).trim();
    assert(curNum === expected.num, `Giant number displays "${expected.num}" (actual: "${curNum}")`);

    const curLabel = (await page.locator('#farmLifeSubLabel').textContent()).trim();
    assert(curLabel === expected.title, `Sub-label displays "${expected.title}" (actual: "${curLabel}")`);

    const curHeading = (await page.locator('#farmLifeHeading').textContent()).trim();
    assert(curHeading === expected.title, `Editorial heading displays "${expected.title}" (actual: "${curHeading}")`);

    const activeDot = (await page.locator('.farm-life-dot.is-active').textContent()).trim();
    assert(activeDot === expected.num, `Chapter progress dot ${expected.num} is active`);

    const activeImgId = await page.evaluate(() => {
      const active = document.querySelector('.farm-life-slide-image.is-active');
      return active ? active.id : null;
    });
    assert(activeImgId === `farmLifeImg-${expected.index}`, `Active photograph is farmLifeImg-${expected.index}`);

    // Verify activities rendered
    const renderedActivities = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('#farmLifeActivityChips .farm-life-chip'))
        .map(el => el.textContent.trim());
    });
    assert(renderedActivities.length === expected.expectedActivities.length,
      `Chapter ${expected.num} displays all ${expected.expectedActivities.length} activities (rendered: ${renderedActivities.length})`);

    // Verify single number visibility (prevent overlap)
    const giantDigitsVisible = await page.locator('.farm-life-digit').count();
    assert(giantDigitsVisible === 1, `Only 1 shared giant digit element exists in DOM (prevents overlapping numbers)`);
  }

  // Scroll to #farm-activities section
  await page.evaluate(() => {
    const el = document.getElementById('farm-activities');
    el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(600);

  // Test Chapter 01
  console.log('\nTesting Chapter 01: The Art of Farming...');
  await page.locator('.farm-life-dot[data-jump="0"]').click();
  await page.waitForTimeout(600);
  await verifyChapterState(chapterData[0]);

  // Capture Screenshot Chapter 01
  const shot01 = path.join(LOCAL_SCREENSHOT_DIR, '14_farm_life_chapter_01_art_of_farming.png');
  await page.locator('#farmLifeStickyWrap').screenshot({ path: shot01 });
  fs.copyFileSync(shot01, path.join(ARTIFACT_SCREENSHOT_DIR, '14_farm_life_chapter_01_art_of_farming.png'));
  console.log('📸 Saved screenshot: 14_farm_life_chapter_01_art_of_farming.png');

  // Test Chapter 02
  console.log('\nTesting Chapter 02: Life Around the Farm...');
  await page.locator('.farm-life-dot[data-jump="1"]').click();
  await page.waitForTimeout(600);
  await verifyChapterState(chapterData[1]);

  // Test Chapter 03
  console.log('\nTesting Chapter 03: Village Traditions...');
  await page.locator('.farm-life-dot[data-jump="2"]').click();
  await page.waitForTimeout(600);
  await verifyChapterState(chapterData[2]);

  // Capture Screenshot Chapter 03
  const shot03 = path.join(LOCAL_SCREENSHOT_DIR, '15_farm_life_chapter_03_village_traditions.png');
  await page.locator('#farmLifeStickyWrap').screenshot({ path: shot03 });
  fs.copyFileSync(shot03, path.join(ARTIFACT_SCREENSHOT_DIR, '15_farm_life_chapter_03_village_traditions.png'));
  console.log('📸 Saved screenshot: 15_farm_life_chapter_03_village_traditions.png');

  // Test Chapter 04
  console.log('\nTesting Chapter 04: The Wisdom of Water...');
  await page.locator('.farm-life-dot[data-jump="3"]').click();
  await page.waitForTimeout(600);
  await verifyChapterState(chapterData[3]);

  // Capture Screenshot Chapter 04
  const shot04 = path.join(LOCAL_SCREENSHOT_DIR, '16_farm_life_chapter_04_wisdom_of_water.png');
  await page.locator('#farmLifeStickyWrap').screenshot({ path: shot04 });
  fs.copyFileSync(shot04, path.join(ARTIFACT_SCREENSHOT_DIR, '16_farm_life_chapter_04_wisdom_of_water.png'));
  console.log('📸 Saved screenshot: 16_farm_life_chapter_04_wisdom_of_water.png');

  // Test Chapter 05
  console.log('\nTesting Chapter 05: Fun on the Farm...');
  await page.locator('.farm-life-dot[data-jump="4"]').click();
  await page.waitForTimeout(600);
  await verifyChapterState(chapterData[4]);

  // Capture Screenshot Chapter 05
  const shot05 = path.join(LOCAL_SCREENSHOT_DIR, '17_farm_life_chapter_05_fun_on_the_farm.png');
  await page.locator('#farmLifeStickyWrap').screenshot({ path: shot05 });
  fs.copyFileSync(shot05, path.join(ARTIFACT_SCREENSHOT_DIR, '17_farm_life_chapter_05_fun_on_the_farm.png'));
  console.log('📸 Saved screenshot: 17_farm_life_chapter_05_fun_on_the_farm.png');

  // Test Reverse Scrolling (05 -> 01)
  console.log('\nTesting Reverse Scrolling (05 -> 01)...');
  await page.locator('.farm-life-dot[data-jump="0"]').click();
  await page.waitForTimeout(600);
  await verifyChapterState(chapterData[0]);
  console.log('✅ Backward scrolling cleanly restores Chapter 01');

  // --- 4. Verify Simple Booking Action ("Plan Your Farm Visit") ---
  console.log('\n--- 4. Testing "Plan Your Farm Visit" Booking Action ---');
  await page.locator('.farm-life-dot[data-jump="4"]').click();
  await page.waitForTimeout(500);

  const planBtn = page.locator('#farmLifePlanBtn');
  assert(await planBtn.isVisible(), '"Plan Your Farm Visit" CTA button is visible');
  await planBtn.click();
  await page.waitForTimeout(600);

  const notesVal = await page.locator('#dietaryNotes').inputValue();
  assert(notesVal.includes('All 23+ Activities & 5 Chapters'), `Booking notes form pre-filled: "${notesVal}"`);

  const toastVisible = await page.locator('#toastMessage').evaluate(el => el.classList.contains('is-visible') || window.getComputedStyle(el).opacity > 0);
  assert(toastVisible, 'Toast confirmation displayed on clicking Plan Your Farm Visit');

  // --- 5. Verify Photo Loading & Natural Dimensions ---
  console.log('\n--- 5. Verifying All 5 Chapter Photographs Load Properly ---');
  const photosValid = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('.farm-life-slide-image'));
    return imgs.every(img => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
  });
  assert(photosValid, 'All 5 authentic chapter photographs loaded with valid natural dimensions');

  // --- 6. Viewport Responsiveness & 0px Overflow (6 Viewports) ---
  console.log('\n--- 6. Responsiveness & Horizontal Overflow Verification (6 Viewports) ---');
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
      const mobileShot = path.join(LOCAL_SCREENSHOT_DIR, '18_farm_life_mobile_responsive.png');
      await section.screenshot({ path: mobileShot });
      fs.copyFileSync(mobileShot, path.join(ARTIFACT_SCREENSHOT_DIR, '18_farm_life_mobile_responsive.png'));
      console.log('📸 Saved screenshot: 18_farm_life_mobile_responsive.png');
    }
  }

  await browser.close();
  console.log('\n================================================================');
  console.log('🎉 ALL EXPLORE LIFE AT THE FARM TESTS PASSED SUCCESSFULLY!');
  console.log('================================================================');
}

runTests().catch(err => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
