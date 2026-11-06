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

async function runComprehensiveTests() {
  console.log('================================================================');
  console.log('🧪 ONE DAY KISSAN - BIDIRECTIONAL THREE-STAGE SCROLL TEST SUITE');
  console.log('================================================================\n');

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

  // Wait for intro animation
  console.log('Waiting for intro animation and setupScroll()...');
  await page.waitForFunction(() => !document.body.classList.contains('intro'));
  await page.waitForTimeout(600);

  // Helper to capture visible screenshot without scrolling the viewport
  async function captureVisibleStage(fileName) {
    const localPath = path.join(LOCAL_SCREENSHOT_DIR, fileName);
    const wrap = page.locator('#storiesStickyWrap');
    const box = await wrap.boundingBox();
    if (box) {
      await page.screenshot({ path: localPath, clip: box });
    } else {
      await page.screenshot({ path: localPath });
    }
    fs.copyFileSync(localPath, path.join(ARTIFACT_SCREENSHOT_DIR, fileName));
    console.log(`📸 Saved screenshot: ${fileName}`);
  }

  // Helper to get stories state
  async function getStoriesState() {
    return await page.evaluate(() => {
      const section = document.getElementById('stories');
      const st = ScrollTrigger.getAll().find(t => t.trigger === section);
      const digit = document.getElementById('giantDigit')?.textContent.trim();
      const label = document.getElementById('numSubLabel')?.textContent.trim();
      const heading = document.getElementById('storyHeading')?.textContent.trim();
      const desc = document.getElementById('storyDesc')?.textContent.trim();
      const badge = document.getElementById('storyVisualBadge')?.textContent.trim();
      const stage = document.getElementById('storyGiantDisplay')?.getAttribute('data-stage');
      const dots = Array.from(document.querySelectorAll('.story-dot')).map(d => ({
        label: d.textContent.trim(),
        active: d.classList.contains('is-active')
      }));
      const img0Op = window.getComputedStyle(document.getElementById('storyImg-0')).opacity;
      const img1Op = window.getComputedStyle(document.getElementById('storyImg-1')).opacity;
      const img2Op = window.getComputedStyle(document.getElementById('storyImg-2')).opacity;

      return {
        scrollY: window.scrollY,
        sectionTop: section.offsetTop,
        sectionHeight: section.offsetHeight,
        stStart: st.start,
        stEnd: st.end,
        progress: st.progress,
        digit,
        label,
        heading,
        desc,
        badge,
        stage,
        dots,
        imgOpacities: [parseFloat(img0Op), parseFloat(img1Op), parseFloat(img2Op)]
      };
    });
  }

  // Helper to scroll to exact fraction
  async function scrollToSectionFraction(fraction, smooth = false) {
    await page.evaluate(({ frac, isSmooth }) => {
      const s = document.getElementById('stories');
      const st = ScrollTrigger.getAll().find(t => t.trigger === s);
      const targetY = st.start + frac * (st.end - st.start);
      if (isSmooth && window.__lenis) {
        window.__lenis.scrollTo(targetY, { duration: 0.8 });
      } else if (window.__lenis) {
        window.__lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo({ top: targetY, behavior: isSmooth ? 'smooth' : 'auto' });
      }
      ScrollTrigger.update();
    }, { frac: fraction, isSmooth: smooth });
    await page.waitForTimeout(500);
  }

  // --- CASE 1: Open homepage and scroll down to section -> Stage 01 MUST appear first ---
  console.log('\n--- Case 1: Initial Arrival from Top of Homepage ---');
  let state = await getStoriesState();
  assert(state.digit === '01', `Before scrolling to section, Stage 01 initialized (actual: "${state.digit}")`);
  assert(state.heading === 'Discover the Farm', `Heading is "Discover the Farm"`);

  // Scroll to section start (fraction = 0.05)
  console.log('Scrolling down to the top of #stories (fraction = 0.05)...');
  await scrollToSectionFraction(0.05);
  state = await getStoriesState();
  assert(state.digit === '01', `Section opens at Stage 01 (actual: "${state.digit}")`);
  assert(state.label === 'Discover', `Sub-label is "Discover"`);
  assert(state.heading === 'Discover the Farm', `Heading is "Discover the Farm"`);
  assert(state.desc.includes('Explore the farm, discover nature and experience the beauty of rural life.'), 'Description matches Stage 01');
  assert(state.dots[0].active === true && !state.dots[1].active && !state.dots[2].active, 'Progress indicator 01 is highlighted');
  assert(state.imgOpacities[0] > 0.8, 'Stage 01 image is visible');

  // Screenshot Stage 01
  await captureVisibleStage('06_story_stage_01_discover.png');

  // --- CASE 2: Scroll slowly from 01 -> 02 -> 03 ---
  console.log('\n--- Case 2: Slow Forward Scroll (01 -> 02 -> 03) ---');
  
  // Mid-stage 01
  await scrollToSectionFraction(0.18);
  state = await getStoriesState();
  assert(state.digit === '01', `At 18% scroll: still Stage 01`);

  // Transition to Stage 02 (fraction = 0.50)
  await scrollToSectionFraction(0.50);
  state = await getStoriesState();
  assert(state.digit === '02', `At 50% scroll: transitioned to Stage 02`);
  assert(state.label === 'Participate', `Sub-label is "Participate"`);
  assert(state.heading === 'Participate in Farming', `Heading is "Participate in Farming"`);
  assert(state.desc.includes('Get your hands into the soil and experience farming yourself.'), 'Description matches Stage 02');
  assert(state.dots[1].active === true, 'Progress indicator 02 is highlighted');
  assert(state.imgOpacities[1] > 0.8, 'Stage 02 image is visible');

  // Screenshot Stage 02
  await captureVisibleStage('07_story_stage_02_participate.png');

  // Transition to Stage 03 (fraction = 0.88)
  await scrollToSectionFraction(0.88);
  state = await getStoriesState();
  assert(state.digit === '03', `At 88% scroll: transitioned to Stage 03`);
  assert(state.label === 'Experience', `Sub-label is "Experience"`);
  assert(state.heading === 'Experience Rural Life', `Heading is "Experience Rural Life"`);
  assert(state.desc.includes('Enjoy traditional food, rural culture and meaningful moments.'), 'Description matches Stage 03');
  assert(state.dots[2].active === true, 'Progress indicator 03 is highlighted');
  assert(state.imgOpacities[2] > 0.8, 'Stage 03 image is visible');

  // Screenshot Stage 03
  await captureVisibleStage('08_story_stage_03_experience.png');

  // --- CASE 3: Scroll backwards from 03 -> 02 -> 01 ---
  console.log('\n--- Case 3: Reverse Scrolling (03 -> 02 -> 01) ---');

  // Scroll backwards to Stage 02 (fraction = 0.50)
  await scrollToSectionFraction(0.50);
  state = await getStoriesState();
  assert(state.digit === '02', `Reverse scroll back to 50%: returned cleanly to Stage 02`);
  assert(state.label === 'Participate', `Reverse scroll sub-label is "Participate"`);
  assert(state.heading === 'Participate in Farming', `Reverse scroll heading is "Participate in Farming"`);
  assert(state.dots[1].active === true, 'Progress indicator 02 is highlighted in reverse');

  // Scroll backwards to Stage 01 (fraction = 0.12)
  await scrollToSectionFraction(0.12);
  state = await getStoriesState();
  assert(state.digit === '01', `Reverse scroll back to 12%: returned cleanly to Stage 01`);
  assert(state.label === 'Discover', `Reverse scroll sub-label is "Discover"`);
  assert(state.heading === 'Discover the Farm', `Reverse scroll heading is "Discover the Farm"`);
  assert(state.dots[0].active === true, 'Progress indicator 01 is highlighted in reverse');

  // --- CASE 4: Quick Scroll Through Entire Section ---
  console.log('\n--- Case 4: Fast Rapid Scrolling Stress Test ---');
  for (let i = 0; i < 4; i++) {
    await scrollToSectionFraction(0.92);
    await page.waitForTimeout(100);
    await scrollToSectionFraction(0.04);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(500);
  state = await getStoriesState();
  assert(['01', '02', '03'].includes(state.digit), `Valid state after fast scrolling: "${state.digit}"`);
  const digitCount = await page.locator('#stories .giant-digit').count();
  assert(digitCount === 1, `Single shared digit maintained during fast scrolling`);

  // --- CASE 5: Stop Halfway and Continue in Either Direction ---
  console.log('\n--- Case 5: Stop Halfway and Resume Scroll ---');
  // Scroll to halfway (Stage 02)
  await scrollToSectionFraction(0.50);
  state = await getStoriesState();
  assert(state.digit === '02', `Stopped halfway: Stage 02`);

  // Continue downwards to Stage 03
  await scrollToSectionFraction(0.85);
  state = await getStoriesState();
  assert(state.digit === '03', `Resumed scroll down: reached Stage 03`);

  // Scroll back to halfway
  await scrollToSectionFraction(0.50);
  state = await getStoriesState();
  assert(state.digit === '02', `Resumed scroll up to halfway: back to Stage 02`);

  // Continue upwards to Stage 01
  await scrollToSectionFraction(0.08);
  state = await getStoriesState();
  assert(state.digit === '01', `Resumed scroll up: back to Stage 01`);

  // --- CASE 6: Chapter Dot Click Jump Navigation ---
  console.log('\n--- Case 6: Interactive Chapter Dot Clicks ---');
  // Click Dot 02
  await page.locator('.story-dot[data-jump="1"]').click();
  await page.waitForTimeout(700);
  state = await getStoriesState();
  assert(state.digit === '02', `Clicked dot 02: transitioned to Stage 02`);
  assert(state.dots[1].active === true, `Dot 02 highlighted`);

  // Click Dot 03
  await page.locator('.story-dot[data-jump="2"]').click();
  await page.waitForTimeout(700);
  state = await getStoriesState();
  assert(state.digit === '03', `Clicked dot 03: transitioned to Stage 03`);
  assert(state.dots[2].active === true, `Dot 03 highlighted`);

  // Click Dot 01
  await page.locator('.story-dot[data-jump="0"]').click();
  await page.waitForTimeout(700);
  state = await getStoriesState();
  assert(state.digit === '01', `Clicked dot 01: returned to Stage 01`);
  assert(state.dots[0].active === true, `Dot 01 highlighted`);

  // --- CASE 7: Refresh Page and Re-enter Section ---
  console.log('\n--- Case 7: Page Reload and Re-entry ---');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForFunction(() => !document.body.classList.contains('intro'));
  await page.waitForTimeout(500);

  // Scroll to section start
  await scrollToSectionFraction(0.05);
  state = await getStoriesState();
  assert(state.digit === '01', `After reload: section opens cleanly at Stage 01 (actual: "${state.digit}")`);

  // --- CASE 8: Desktop & Mobile Layout Verification ---
  console.log('\n--- Case 8: Viewports & Responsiveness (6 Viewports) ---');
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
      await scrollToSectionFraction(0.10);
      await captureVisibleStage('09_story_side_by_side_mobile.png');
    }
  }

  await browser.close();
  console.log('\n================================================================');
  console.log('🎉 ALL 8 BIDIRECTIONAL SCROLL TEST CASES PASSED SUCCESSFULLY!');
  console.log('================================================================');
}

runComprehensiveTests().catch(err => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
