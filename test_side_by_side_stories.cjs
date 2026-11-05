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
    process.exit(1);
  }
  console.log(`✅ ${message}`);
}

async function runTests() {
  console.log('================================================================');
  console.log('🧪 ONE DAY KISSAN - PREMIUM SIDE-BY-SIDE SCROLL STORYTELLING TEST');
  console.log('================================================================\n');

  // Launch Playwright
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`[Browser Error]:`, msg.text());
  });

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Wait for intro animation to complete so setupScroll() initializes
  console.log('Waiting for intro animation to finish and setupScroll() to run...');
  await page.waitForFunction(() => !document.body.classList.contains('intro'));
  await page.waitForTimeout(500);

  // --- 1. Verify Layout Architecture ---
  console.log('\n--- 1. Verifying Two-Column Side-by-Side Layout ---');
  const section = page.locator('#stories');
  assert(await section.isVisible(), '#stories section exists on page');

  const stickyWrap = section.locator('.stories-sticky-wrap');
  assert(await stickyWrap.isVisible(), 'Sticky pinned viewport wrapper is present');

  const leftCol = section.locator('.stories-col-left');
  const rightCol = section.locator('.stories-col-right');
  assert(await leftCol.isVisible(), 'Left column for oversized numbers is visible');
  assert(await rightCol.isVisible(), 'Right column for story visuals is visible');

  // Verify Side-by-Side Positioning on Desktop
  const leftBox = await leftCol.boundingBox();
  const rightBox = await rightCol.boundingBox();
  assert(leftBox && rightBox, 'Both columns have valid layout boxes');
  assert(rightBox.x > leftBox.x, `Side-by-side verified on desktop (Left X: ${leftBox.x}, Right X: ${rightBox.x})`);

  // --- 2. Verify Three Stages Content & Visuals ---
  console.log('\n--- 2. Verifying Three Storytelling Stages ---');

  // Stage 01
  const slide0 = section.locator('#slide-0');
  const num0 = section.locator('#num-0');
  const title0 = await slide0.locator('.story-editorial-heading').textContent();
  const desc0 = await slide0.locator('.story-editorial-desc').textContent();
  const img0 = await slide0.locator('.story-slide-image').getAttribute('src');
  const digit0 = await num0.locator('.giant-digit').textContent();

  assert(digit0.trim() === '01', `Stage 01 number: "${digit0.trim()}"`);
  assert(title0.trim() === 'Discover the Farm', `Stage 01 title: "${title0.trim()}"`);
  assert(desc0.includes('Explore the farm, discover nature and experience the beauty of rural life.'), `Stage 01 description verified`);
  assert(img0.includes('story_01_discover_farm.jpg'), `Stage 01 image verified: ${img0}`);

  // Stage 02
  const slide1 = section.locator('#slide-1');
  const num1 = section.locator('#num-1');
  const title1 = await slide1.locator('.story-editorial-heading').textContent();
  const desc1 = await slide1.locator('.story-editorial-desc').textContent();
  const img1 = await slide1.locator('.story-slide-image').getAttribute('src');
  const digit1 = await num1.locator('.giant-digit').textContent();

  assert(digit1.trim() === '02', `Stage 02 number: "${digit1.trim()}"`);
  assert(title1.trim() === 'Participate in Farming', `Stage 02 title: "${title1.trim()}"`);
  assert(desc1.includes('Get your hands into the soil and experience farming yourself.'), `Stage 02 description verified`);
  assert(img1.includes('story_02_participate_farming.jpg'), `Stage 02 image verified: ${img1}`);

  // Stage 03
  const slide2 = section.locator('#slide-2');
  const num2 = section.locator('#num-2');
  const title2 = await slide2.locator('.story-editorial-heading').textContent();
  const desc2 = await slide2.locator('.story-editorial-desc').textContent();
  const img2 = await slide2.locator('.story-slide-image').getAttribute('src');
  const digit2 = await num2.locator('.giant-digit').textContent();

  assert(digit2.trim() === '03', `Stage 03 number: "${digit2.trim()}"`);
  assert(title2.trim() === 'Experience Rural Life', `Stage 03 title: "${title2.trim()}"`);
  assert(desc2.includes('Enjoy traditional food, rural culture and meaningful moments.'), `Stage 03 description verified`);
  assert(img2.includes('story_03_experience_rural_life.jpg'), `Stage 03 image verified: ${img2}`);

  // --- 3. Verify Scroll-Driven Interactive Progress ---
  console.log('\n--- 3. Testing Scroll-Driven Transitions ---');
  
  // Helper to scroll to an exact stage progress fraction via ScrollTrigger
  async function scrollToStageFraction(fraction) {
    await page.evaluate((frac) => {
      const el = document.getElementById('stories');
      const triggers = ScrollTrigger.getAll();
      const st = triggers.find(t => t.trigger === el);
      if (st) {
        const target = st.start + frac * (st.end - st.start);
        if (window.__lenis) window.__lenis.scrollTo(target, { immediate: true });
        else window.scrollTo(0, target);
        ScrollTrigger.update();
      }
    }, fraction);
    await page.waitForTimeout(400);
  }

  // Scroll to 10% progress (Stage 01 active)
  await scrollToStageFraction(0.10);

  let isNum0Active = await num0.evaluate(el => el.classList.contains('is-active'));
  let isSlide0Active = await slide0.evaluate(el => el.classList.contains('is-active'));
  assert(isNum0Active && isSlide0Active, 'Stage 01 active at 10% scroll progress');

  // Screenshot Stage 01
  const shot0 = path.join(LOCAL_SCREENSHOT_DIR, '06_story_stage_01_discover.png');
  await section.screenshot({ path: shot0 });
  fs.copyFileSync(shot0, path.join(ARTIFACT_SCREENSHOT_DIR, '06_story_stage_01_discover.png'));
  console.log(`📸 Saved screenshot: 06_story_stage_01_discover.png`);

  // Scroll to 50% progress (Stage 02 active)
  await scrollToStageFraction(0.50);

  let isNum1Active = await num1.evaluate(el => el.classList.contains('is-active'));
  let isSlide1Active = await slide1.evaluate(el => el.classList.contains('is-active'));
  assert(isNum1Active && isSlide1Active, 'Stage 02 active at 50% scroll progress');

  // Screenshot Stage 02
  const shot1 = path.join(LOCAL_SCREENSHOT_DIR, '07_story_stage_02_participate.png');
  await section.screenshot({ path: shot1 });
  fs.copyFileSync(shot1, path.join(ARTIFACT_SCREENSHOT_DIR, '07_story_stage_02_participate.png'));
  console.log(`📸 Saved screenshot: 07_story_stage_02_participate.png`);

  // Scroll to 85% progress (Stage 03 active)
  await scrollToStageFraction(0.85);

  let isNum2Active = await num2.evaluate(el => el.classList.contains('is-active'));
  let isSlide2Active = await slide2.evaluate(el => el.classList.contains('is-active'));
  assert(isNum2Active && isSlide2Active, 'Stage 03 active at 85% scroll progress');

  // Screenshot Stage 03
  const shot2 = path.join(LOCAL_SCREENSHOT_DIR, '08_story_stage_03_experience.png');
  await section.screenshot({ path: shot2 });
  fs.copyFileSync(shot2, path.join(ARTIFACT_SCREENSHOT_DIR, '08_story_stage_03_experience.png'));
  console.log(`📸 Saved screenshot: 08_story_stage_03_experience.png`);

  // --- 4. Interactive Dot Jump Navigation ---
  console.log('\n--- 4. Testing Interactive Chapter Dot Navigation ---');
  const dot1 = section.locator('.story-dot[data-jump="0"]');
  await dot1.click();
  await page.waitForTimeout(600);
  isNum0Active = await num0.evaluate(el => el.classList.contains('is-active'));
  assert(isNum0Active, 'Clicking Chapter 01 dot jumped back to Stage 01');

  // --- 5. Responsiveness & Horizontal Overflow (6 Viewports) ---
  console.log('\n--- 5. Responsiveness & Horizontal Overflow Verification (6 Viewports) ---');
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
    await page.waitForTimeout(350);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });

    assert(overflow <= 0, `Viewport ${vp.name} (${vp.width}x${vp.height}): 0px horizontal overflow (actual: ${overflow}px)`);

    if (vp.name === 'mobile_390x844') {
      await scrollToStageFraction(0.12);
      await page.waitForTimeout(400);

      const mobileShot = path.join(LOCAL_SCREENSHOT_DIR, '09_story_side_by_side_mobile.png');
      await section.screenshot({ path: mobileShot });
      fs.copyFileSync(mobileShot, path.join(ARTIFACT_SCREENSHOT_DIR, '09_story_side_by_side_mobile.png'));
      console.log(`📸 Saved screenshot: 09_story_side_by_side_mobile.png`);
    }
  }

  await browser.close();
  console.log('\n================================================================');
  console.log('🎉 ALL SIDE-BY-SIDE SCROLL STORYTELLING TESTS PASSED!');
  console.log('================================================================');
}

runTests().catch(err => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
