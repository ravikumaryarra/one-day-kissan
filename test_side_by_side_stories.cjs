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
  console.log('🧪 ONE DAY KISSAN - FIXED SCROLL ANIMATION & NO OVERLAPPING TEST');
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
  await page.waitForTimeout(600);

  // --- 1. Verify Architecture: Single Shared Display (No Overlapping Elements) ---
  console.log('\n--- 1. Verifying Single-Source-of-Truth DOM Architecture ---');
  const section = page.locator('#stories');
  assert(await section.isVisible(), '#stories section exists on page');

  const stickyWrap = section.locator('.stories-sticky-wrap');
  assert(await stickyWrap.isVisible(), 'Sticky pinned viewport wrapper is present');

  const leftCol = section.locator('.stories-col-left');
  const rightCol = section.locator('.stories-col-right');
  assert(await leftCol.isVisible(), 'Left column for oversized number is visible');
  assert(await rightCol.isVisible(), 'Right column for story visual card is visible');

  // Confirm Side-by-Side on Desktop
  const leftBox = await leftCol.boundingBox();
  const rightBox = await rightCol.boundingBox();
  assert(leftBox && rightBox, 'Both columns have valid bounding boxes');
  assert(rightBox.x > leftBox.x, `Side-by-side layout verified (Left X: ${leftBox.x}, Right X: ${rightBox.x})`);

  // Verify only ONE giant digit and ONE sub-label exists in the entire DOM
  const digitCount = await page.locator('#stories .giant-digit').count();
  const subLabelCount = await page.locator('#stories .num-sub-label').count();
  assert(digitCount === 1, `Exactly 1 giant digit in DOM (Found: ${digitCount}) - physically impossible to overlap!`);
  assert(subLabelCount === 1, `Exactly 1 sub-label in DOM (Found: ${subLabelCount}) - zero ghost labels!`);

  // Verify only ONE copy container exists
  const copyCount = await page.locator('#stories .story-editorial-copy').count();
  assert(copyCount === 1, `Exactly 1 editorial copy container in DOM (Found: ${copyCount}) - zero duplicate headings!`);

  // Verify 3 layered images exist in the visual frame
  const img0 = page.locator('#storyImg-0');
  const img1 = page.locator('#storyImg-1');
  const img2 = page.locator('#storyImg-2');
  assert(await img0.count() === 1, '#storyImg-0 exists');
  assert(await img1.count() === 1, '#storyImg-1 exists');
  assert(await img2.count() === 1, '#storyImg-2 exists');

  // Helper to scroll to exact fraction inside ScrollTrigger
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
    await page.waitForTimeout(650);
  }

  // --- 2. Test Forward Scroll Stages ---
  console.log('\n--- 2. Testing Forward Scroll Transitions (01 -> 02 -> 03) ---');

  // Scroll to 10% -> Stage 01
  await scrollToStageFraction(0.10);
  let curDigit = (await page.locator('#giantDigit').textContent()).trim();
  let curLabel = (await page.locator('#numSubLabel').textContent()).trim();
  let curHeading = (await page.locator('#storyHeading').textContent()).trim();
  let curDesc = (await page.locator('#storyDesc').textContent()).trim();
  let img0Opacity = await page.evaluate(() => window.getComputedStyle(document.getElementById('storyImg-0')).opacity);

  assert(curDigit === '01', `Stage 01 number is "01" (actual: "${curDigit}")`);
  assert(curLabel === 'Discover', `Stage 01 label is "Discover" (actual: "${curLabel}")`);
  assert(curHeading === 'Discover the Farm', `Stage 01 heading is "Discover the Farm"`);
  assert(curDesc.includes('Explore the farm, discover nature and experience the beauty of rural life.'), `Stage 01 description verified`);
  assert(parseFloat(img0Opacity) > 0.8, `Stage 01 image is fully visible (opacity: ${img0Opacity})`);

  // Screenshot Stage 01
  const shot0 = path.join(LOCAL_SCREENSHOT_DIR, '06_story_stage_01_discover.png');
  await section.screenshot({ path: shot0 });
  fs.copyFileSync(shot0, path.join(ARTIFACT_SCREENSHOT_DIR, '06_story_stage_01_discover.png'));
  console.log(`📸 Saved screenshot: 06_story_stage_01_discover.png`);

  // Scroll to 50% -> Stage 02
  await scrollToStageFraction(0.50);
  curDigit = (await page.locator('#giantDigit').textContent()).trim();
  curLabel = (await page.locator('#numSubLabel').textContent()).trim();
  curHeading = (await page.locator('#storyHeading').textContent()).trim();
  curDesc = (await page.locator('#storyDesc').textContent()).trim();
  let img1Opacity = await page.evaluate(() => window.getComputedStyle(document.getElementById('storyImg-1')).opacity);

  assert(curDigit === '02', `Stage 02 number transitioned cleanly to "02" (actual: "${curDigit}")`);
  assert(curLabel === 'Participate', `Stage 02 label is "Participate" (actual: "${curLabel}")`);
  assert(curHeading === 'Participate in Farming', `Stage 02 heading is "Participate in Farming"`);
  assert(curDesc.includes('Get your hands into the soil and experience farming yourself.'), `Stage 02 description verified`);
  assert(parseFloat(img1Opacity) > 0.8, `Stage 02 image is fully visible (opacity: ${img1Opacity})`);

  // Screenshot Stage 02
  const shot1 = path.join(LOCAL_SCREENSHOT_DIR, '07_story_stage_02_participate.png');
  await section.screenshot({ path: shot1 });
  fs.copyFileSync(shot1, path.join(ARTIFACT_SCREENSHOT_DIR, '07_story_stage_02_participate.png'));
  console.log(`📸 Saved screenshot: 07_story_stage_02_participate.png`);

  // Scroll to 85% -> Stage 03
  await scrollToStageFraction(0.85);
  curDigit = (await page.locator('#giantDigit').textContent()).trim();
  curLabel = (await page.locator('#numSubLabel').textContent()).trim();
  curHeading = (await page.locator('#storyHeading').textContent()).trim();
  curDesc = (await page.locator('#storyDesc').textContent()).trim();
  let img2Opacity = await page.evaluate(() => window.getComputedStyle(document.getElementById('storyImg-2')).opacity);

  assert(curDigit === '03', `Stage 03 number transitioned cleanly to "03" (actual: "${curDigit}")`);
  assert(curLabel === 'Experience', `Stage 03 label is "Experience" (actual: "${curLabel}")`);
  assert(curHeading === 'Experience Rural Life', `Stage 03 heading is "Experience Rural Life"`);
  assert(curDesc.includes('Enjoy traditional food, rural culture and meaningful moments.'), `Stage 03 description verified`);
  assert(parseFloat(img2Opacity) > 0.8, `Stage 03 image is fully visible (opacity: ${img2Opacity})`);

  // Screenshot Stage 03
  const shot2 = path.join(LOCAL_SCREENSHOT_DIR, '08_story_stage_03_experience.png');
  await section.screenshot({ path: shot2 });
  fs.copyFileSync(shot2, path.join(ARTIFACT_SCREENSHOT_DIR, '08_story_stage_03_experience.png'));
  console.log(`📸 Saved screenshot: 08_story_stage_03_experience.png`);

  // --- 3. Test Backward Scroll (03 -> 02 -> 01) ---
  console.log('\n--- 3. Testing Backward Scroll Transitions (03 -> 02 -> 01) ---');

  // Scroll back to 50% -> Stage 02
  await scrollToStageFraction(0.50);
  curDigit = (await page.locator('#giantDigit').textContent()).trim();
  curLabel = (await page.locator('#numSubLabel').textContent()).trim();
  assert(curDigit === '02', `Backward scroll cleanly transitioned to "02"`);
  assert(curLabel === 'Participate', `Backward scroll label is "Participate"`);

  // Scroll back to 10% -> Stage 01
  await scrollToStageFraction(0.10);
  curDigit = (await page.locator('#giantDigit').textContent()).trim();
  curLabel = (await page.locator('#numSubLabel').textContent()).trim();
  assert(curDigit === '01', `Backward scroll cleanly transitioned to "01"`);
  assert(curLabel === 'Discover', `Backward scroll label is "Discover"`);

  // --- 4. Rapid Scrolling Stress Test (Zero Overlap & Zero Desync) ---
  console.log('\n--- 4. Stress Testing Rapid Scrolling Back and Forth ---');
  for (let i = 0; i < 5; i++) {
    await scrollToStageFraction(0.90);
    await page.waitForTimeout(100);
    await scrollToStageFraction(0.05);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(600);
  curDigit = (await page.locator('#giantDigit').textContent()).trim();
  assert(['01', '02', '03'].includes(curDigit), `Valid single digit state after rapid scrolling: "${curDigit}"`);
  const finalDigitCount = await page.locator('#stories .giant-digit').count();
  assert(finalDigitCount === 1, `Exactly 1 giant digit maintained during stress test`);

  // --- 5. Chapter Dot Navigation ---
  console.log('\n--- 5. Testing Chapter Dot Direct Click Navigation ---');
  const dot2 = section.locator('.story-dot[data-jump="1"]');
  await dot2.click();
  await page.waitForTimeout(650);
  curDigit = (await page.locator('#giantDigit').textContent()).trim();
  assert(curDigit === '02', `Clicking 02 dot switched digit to "02"`);

  const dot1 = section.locator('.story-dot[data-jump="0"]');
  await dot1.click();
  await page.waitForTimeout(650);
  curDigit = (await page.locator('#giantDigit').textContent()).trim();
  assert(curDigit === '01', `Clicking 01 dot switched digit to "01"`);

  // --- 6. Viewport Responsiveness & Horizontal Overflow (6 Viewports) ---
  console.log('\n--- 6. Responsiveness & Horizontal Overflow (6 Viewports) ---');
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
  console.log('🎉 ALL FIXED SCROLL ANIMATION & OVERLAP TESTS PASSED!');
  console.log('================================================================');
}

runTests().catch(err => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
