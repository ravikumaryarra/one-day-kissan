const http = require('http');
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots_phase3');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('🌱 --- STARTING PHASE 3 TEST SUITE: FARM STORIES & HARVEST HAMPERS --- 🌱');
  let passedCount = 0;
  let testTotal = 0;

  function assert(condition, testName) {
    testTotal++;
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passedCount++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      throw new Error(`Assertion failed: ${testName}`);
    }
  }

  // 1. REST API TESTS
  console.log('\n--- 1. REST API Verification ---');

  // Test 1: GET /api/stories
  const storiesRes = await makeRequest('GET', '/api/stories');
  assert(storiesRes.status === 200, 'GET /api/stories returns HTTP 200');
  assert(storiesRes.data.success === true, 'GET /api/stories success flag is true');
  assert(storiesRes.data.count === 4, 'GET /api/stories returns exactly 4 stories');
  const storyIds = storiesRes.data.data.map(s => s.id);
  assert(storyIds.includes('story-sahyadri') && storyIds.includes('story-cauvery'), 'Stories include Sahyadri and Cauvery profiles');

  // Test 2: GET /api/stories/:id
  const sahyadriStory = await makeRequest('GET', '/api/stories/story-sahyadri');
  assert(sahyadriStory.status === 200, 'GET /api/stories/story-sahyadri returns HTTP 200');
  assert(sahyadriStory.data.data.farmer_name === 'Ramrao & Savitri Deshmukh', 'Sahyadri story farmer name matches');
  assert(sahyadriStory.data.data.ambient_sound === 'canopy-breeze', 'Sahyadri ambient sound is canopy-breeze');

  // Test 3: GET /api/stories/invalid-id
  const invalidStory = await makeRequest('GET', '/api/stories/invalid-story-999');
  assert(invalidStory.status === 404, 'GET /api/stories/invalid-id returns HTTP 404');

  // Test 4: GET /api/hampers
  const hampersRes = await makeRequest('GET', '/api/hampers');
  assert(hampersRes.status === 200, 'GET /api/hampers returns HTTP 200');
  assert(hampersRes.data.success === true, 'GET /api/hampers success flag is true');
  assert(hampersRes.data.count === 4, 'GET /api/hampers returns 4 curated seasonal crates');
  const hamperIds = hampersRes.data.data.map(h => h.id);
  assert(hamperIds.includes('hamper-cauvery') && hamperIds.includes('hamper-punjab'), 'Hampers include Cauvery and Punjab crates');

  // Test 5: GET /api/hampers/:id
  const cauveryHamper = await makeRequest('GET', '/api/hampers/hamper-cauvery');
  assert(cauveryHamper.status === 200, 'GET /api/hampers/hamper-cauvery returns HTTP 200');
  assert(cauveryHamper.data.data.price_usd === 46, 'Cauvery hamper price is $46');
  assert(cauveryHamper.data.data.weight === '6.2 kg', 'Cauvery hamper weight is 6.2 kg');
  assert(cauveryHamper.data.data.stock_remaining > 0, 'Cauvery hamper has stock remaining');

  // Test 6: GET /api/hampers/invalid-id
  const invalidHamper = await makeRequest('GET', '/api/hampers/nonexistent-hamper');
  assert(invalidHamper.status === 404, 'GET /api/hampers/invalid-id returns HTTP 404');

  // Test 7: POST /api/hampers/orders validation failure
  const badOrder = await makeRequest('POST', '/api/hampers/orders', { hamperId: 'hamper-cauvery' });
  assert(badOrder.status === 400, 'POST /api/hampers/orders with missing fields returns HTTP 400');

  // Test 8: POST /api/hampers/orders success
  const newOrderPayload = {
    hamperId: 'hamper-deccan',
    fullName: 'Dr. Vikramaditya Sen',
    email: 'vikram.sen@bengalurufoodies.in',
    phone: '+91 98765 11223',
    deliveryAddress: 'Penthouse 12, Lavelle Heights, Bengaluru 560001',
    frequency: 'monthly',
    specialNotes: 'Please ring bell upon arrival'
  };
  const createOrderRes = await makeRequest('POST', '/api/hampers/orders', newOrderPayload);
  assert(createOrderRes.status === 201, 'POST /api/hampers/orders returns HTTP 201 Created');
  assert(createOrderRes.data.success === true, 'Hamper order success flag is true');
  assert(createOrderRes.data.data.order_ref.startsWith('ODK-BOX-'), 'Order reference starts with ODK-BOX-');
  const createdRef = createOrderRes.data.data.order_ref;

  // Test 9: GET /api/hampers/orders/:ref
  const lookupOrderRes = await makeRequest('GET', `/api/hampers/orders/${createdRef}`);
  assert(lookupOrderRes.status === 200, 'GET /api/hampers/orders/:ref returns HTTP 200');
  assert(lookupOrderRes.data.data.full_name === 'Dr. Vikramaditya Sen', 'Retrieved order recipient matches');
  assert(lookupOrderRes.data.data.hamper_id === 'hamper-deccan', 'Retrieved order hamper matches');

  // 2. PLAYWRIGHT BROWSER & INTERACTIVE TESTS
  console.log('\n--- 2. Playwright Interactive Verification ---');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Listen for uncaught console errors
  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') pageErrors.push(msg.text());
  });

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  assert(pageErrors.length === 0, 'Page loaded with zero JavaScript console errors');

  // Test 10: Stories section presence & 4 story cards
  const storiesSection = page.locator('#stories');
  assert(await storiesSection.isVisible(), 'Farm Stories section (#stories) is visible');
  const storyCards = page.locator('.story-card');
  const storyCount = await storyCards.count();
  assert(storyCount === 4, `Stories section renders 4 story cards (got ${storyCount})`);

  // Test 11: Story Modal Open & Audio Soundscape synthesis
  const firstStoryReadBtn = page.locator('.story-read-btn[data-story-id="story-sahyadri"]');
  await firstStoryReadBtn.scrollIntoViewIfNeeded();
  await firstStoryReadBtn.click();
  await page.waitForTimeout(400);

  const storyModal = page.locator('#storyModal');
  const isStoryModalOpen = await storyModal.evaluate(el => el.classList.contains('is-open'));
  assert(isStoryModalOpen, 'Clicking story read button opens #storyModal with .is-open');

  const storyModalName = await page.locator('#storyModalTitle').textContent();
  assert(storyModalName.includes('Ramrao & Savitri Deshmukh'), 'Story modal shows correct steward name');

  // Test soundscape synthesis button
  const soundToggleBtn = page.locator('#soundscapeToggleBtn');
  await soundToggleBtn.click();
  await page.waitForTimeout(300);

  const isSoundwaveActive = await page.locator('#soundwaveBars').evaluate(el => el.classList.contains('is-active'));
  assert(isSoundwaveActive, 'Clicking soundscape play button activates Web Audio soundwave bars (.is-active)');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_story_modal_audio.png') });
  console.log('  📸 Captured 01_story_modal_audio.png');

  // Close story modal
  await page.locator('#closeStoryModalBtn').click();
  await page.waitForTimeout(300);
  const isStoryModalClosed = await storyModal.evaluate(el => !el.classList.contains('is-open'));
  assert(isStoryModalClosed, 'Story modal closes on close button click');

  // Test 12: Hampers section presence & 4 hamper crates
  const hampersSection = page.locator('#hampers');
  await hampersSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  assert(await hampersSection.isVisible(), 'Farm-to-Fork Harvest Hampers section (#hampers) is visible');

  const hamperCards = page.locator('.hamper-card');
  const hamperCount = await hamperCards.count();
  assert(hamperCount === 4, `Hampers section renders 4 curated hamper cards (got ${hamperCount})`);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_hampers_grid.png') });
  console.log('  📸 Captured 02_hampers_grid.png');

  // Test 13: Hamper Reservation Drawer Modal
  const cauveryReserveBtn = page.locator('.hamper-reserve-btn[data-hamper-id="hamper-cauvery"]');
  await cauveryReserveBtn.click();
  await page.waitForTimeout(400);

  const hamperModal = page.locator('#hamperModal');
  const isHamperModalOpen = await hamperModal.evaluate(el => el.classList.contains('is-open'));
  assert(isHamperModalOpen, 'Clicking reserve crate button opens #hamperModal with .is-open');

  const previewName = await page.locator('#hamperPreviewName').textContent();
  assert(previewName.includes('Cauvery Wetland Heirloom Rice Crate'), 'Hamper preview reflects Cauvery crate');
  const previewPrice = await page.locator('#hamperPreviewPrice').textContent();
  assert(previewPrice.includes('$46'), 'Hamper preview price reflects $46');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_hamper_modal_order.png') });
  console.log('  📸 Captured 03_hamper_modal_order.png');

  // Test 14: Fill and submit hamper reservation form
  await page.fill('#hamperFullName', 'Dr. Aditi Narayanan');
  await page.fill('#hamperPhone', '+91 98450 12345');
  await page.fill('#hamperEmail', 'aditi.narayanan@agrotest.org');
  await page.fill('#hamperAddress', 'Flat 502, Palm Grove Terraces, Koramangala 4th Block, Bengaluru 560034');
  await page.selectOption('#hamperFrequency', 'monthly');
  await page.fill('#hamperNotes', 'Please leave package with ground security gate if after 6 PM');

  await page.click('#hamperSubmitBtn');
  await page.waitForTimeout(600);

  const hamperPassModal = page.locator('#hamperPassModal');
  const isPassModalOpen = await hamperPassModal.evaluate(el => el.classList.contains('is-open'));
  assert(isPassModalOpen, 'Submitting hamper reservation opens #hamperPassModal with .is-open');

  const passRef = await page.locator('#hamperPassRefText').textContent();
  assert(passRef.startsWith('ODK-BOX-'), `Generated hamper dispatch ref starts with ODK-BOX- (got: ${passRef})`);

  const passGuest = await page.locator('#hamperPassGuestName').textContent();
  assert(passGuest === 'Dr. Aditi Narayanan', 'Hamper pass reflects customer full name');

  const passCrate = await page.locator('#hamperPassCrateName').textContent();
  assert(passCrate.includes('Cauvery Wetland Heirloom Rice Crate'), 'Hamper pass reflects crate name');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_hamper_dispatch_pass.png') });
  console.log('  📸 Captured 04_hamper_dispatch_pass.png');

  // Close hamper pass modal
  await page.locator('#closeHamperPassModalBtn').click();
  await page.waitForTimeout(300);

  // Test 15: Retrieve newly created hamper dispatch pass via #lookupModal
  const navLookupBtn = page.locator('#navLookupBtn');
  await navLookupBtn.click();
  await page.waitForTimeout(300);

  const lookupModal = page.locator('#lookupModal');
  assert(await lookupModal.evaluate(el => el.classList.contains('is-open')), '#lookupModal opens on My Pass nav button click');

  await page.fill('#lookupInput', passRef);
  await page.click('#lookupSubmitBtn');
  await page.waitForTimeout(600);

  assert(await hamperPassModal.evaluate(el => el.classList.contains('is-open')), 'Lookup modal retrieves and displays #hamperPassModal for ODK-BOX reference');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_lookup_hamper_order.png') });
  console.log('  📸 Captured 05_lookup_hamper_order.png');

  await page.locator('#closeHamperPassModalBtn').click();
  await page.waitForTimeout(300);

  // 3. RESPONSIVE LAYOUT & ZERO HORIZONTAL OVERFLOW VERIFICATION
  console.log('\n--- 3. Responsive Layout & Horizontal Overflow Verification ---');

  const viewports = [
    { name: 'desktop_1920x1080', width: 1920, height: 1080 },
    { name: 'desktop_1440x900', width: 1440, height: 900 },
    { name: 'laptop_1280x800', width: 1280, height: 800 },
    { name: 'tablet_768x1024', width: 768, height: 1024 },
    { name: 'mobile_390x844', width: 390, height: 844 },
    { name: 'small_mobile_320x700', width: 320, height: 700 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(400);

    const overflowCheck = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      const maxScroll = Math.max(scrollWidth, bodyScrollWidth);
      return {
        clientWidth: docWidth,
        scrollWidth: maxScroll,
        diff: maxScroll - docWidth,
        hasOverflow: maxScroll > docWidth + 1
      };
    });

    assert(!overflowCheck.hasOverflow, `Viewport ${vp.name} (${vp.width}x${vp.height}) has 0px horizontal overflow (diff: ${overflowCheck.diff}px)`);

    // Capture responsive screenshots for key viewports
    if (['desktop_1920x1080', 'tablet_768x1024', 'mobile_390x844', 'small_mobile_320x700'].includes(vp.name)) {
      const hampersEl = page.locator('#hampers');
      await hampersEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `06_responsive_${vp.name}.png`) });
      console.log(`  📸 Captured 06_responsive_${vp.name}.png`);
    }
  }

  await browser.close();

  console.log(`\n🎉 ALL ${testTotal} TESTS PASSED! (${passedCount}/${testTotal})\n`);
  return { passedCount, testTotal };
}

runTests().catch(err => {
  console.error('\n❌ Test suite execution failed:', err);
  process.exit(1);
});
