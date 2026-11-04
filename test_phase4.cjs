const http = require('http');
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots_phase4');

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
  console.log('🌱 --- STARTING PHASE 4 TEST SUITE: MASTERCLASSES & GUEST LOGBOOK --- 🌱');
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

  // 1. REST API VERIFICATION
  console.log('\n--- 1. REST API Verification ---');

  // Test 1: GET /api/workshops
  const wsRes = await makeRequest('GET', '/api/workshops');
  assert(wsRes.status === 200, 'GET /api/workshops returns HTTP 200');
  assert(wsRes.data.success === true, 'GET /api/workshops success flag is true');
  assert(wsRes.data.count === 4, 'GET /api/workshops returns 4 seasonal masterclasses');
  const wsIds = wsRes.data.data.map(w => w.id);
  assert(wsIds.includes('ws-jeevamrutha') && wsIds.includes('ws-chulha-baking'), 'Workshops include Jeevamrutha and Chulha Baking');

  // Test 2: GET /api/workshops?regionId=sahyadri
  const sahyadriWs = await makeRequest('GET', '/api/workshops?regionId=sahyadri');
  assert(sahyadriWs.status === 200, 'GET /api/workshops?regionId=sahyadri returns HTTP 200');
  assert(sahyadriWs.data.count === 1, 'Sahyadri region has 1 masterclass');
  assert(sahyadriWs.data.data[0].id === 'ws-jeevamrutha', 'Sahyadri masterclass is Jeevamrutha');

  // Test 3: GET /api/workshops/:id
  const singleWs = await makeRequest('GET', '/api/workshops/ws-jeevamrutha');
  assert(singleWs.status === 200, 'GET /api/workshops/ws-jeevamrutha returns HTTP 200');
  assert(singleWs.data.data.price_usd === 35, 'Jeevamrutha price is $35');
  assert(singleWs.data.data.instructor === 'Ramrao & Savitri Deshmukh', 'Instructor steward matches');

  // Test 4: GET /api/workshops/nonexistent-id
  const invalidWs = await makeRequest('GET', '/api/workshops/ws-nonexistent');
  assert(invalidWs.status === 404, 'GET /api/workshops/invalid returns HTTP 404');

  // Test 5: POST /api/workshops/register validation failure
  const badReg = await makeRequest('POST', '/api/workshops/register', { workshopId: 'ws-jeevamrutha' });
  assert(badReg.status === 400, 'POST /api/workshops/register with missing fields returns HTTP 400');

  // Test 6: POST /api/workshops/register success
  const newRegPayload = {
    workshopId: 'ws-chulha-baking',
    fullName: 'Rhea Chakraborty',
    email: 'rhea.c@harvestmail.in',
    phone: '+91 98200 33445',
    sessionDate: '2026-11-22',
    seats: 2,
    specialNotes: 'Interested in heirloom sourdough fermentation'
  };
  const regRes = await makeRequest('POST', '/api/workshops/register', newRegPayload);
  assert(regRes.status === 201, 'POST /api/workshops/register returns HTTP 201 Created');
  assert(regRes.data.success === true, 'Workshop registration success flag is true');
  assert(regRes.data.data.ticket_ref.startsWith('ODK-WS-'), 'Ticket reference starts with ODK-WS-');
  const createdTicketRef = regRes.data.data.ticket_ref;

  // Test 7: GET /api/workshops/register/:ref
  const lookupTicketRes = await makeRequest('GET', `/api/workshops/register/${createdTicketRef}`);
  assert(lookupTicketRes.status === 200, 'GET /api/workshops/register/:ref returns HTTP 200');
  assert(lookupTicketRes.data.data.full_name === 'Rhea Chakraborty', 'Retrieved pass attendee matches');
  assert(lookupTicketRes.data.data.seats === 2, 'Retrieved pass seats count matches');

  // Test 8: GET /api/reviews
  const revRes = await makeRequest('GET', '/api/reviews');
  assert(revRes.status === 200, 'GET /api/reviews returns HTTP 200');
  assert(revRes.data.success === true, 'GET /api/reviews success flag is true');
  assert(revRes.data.count >= 6, 'GET /api/reviews returns at least 6 verified reviews');
  assert(revRes.data.stats.average_rating >= 4.9, 'Average rating is >= 4.9');
  assert(revRes.data.stats.verified_percentage === 100, '100% verified percentage');

  // Test 9: POST /api/reviews validation failure
  const badRev = await makeRequest('POST', '/api/reviews', { rating: 5 });
  assert(badRev.status === 400, 'POST /api/reviews missing fields returns HTTP 400');

  // Test 10: POST /api/reviews success
  const newRevPayload = {
    bookingRef: 'ODK-2611-TEST',
    regionId: 'cauvery',
    guestName: 'Vandana Shiva Kumar',
    city: 'Coimbatore',
    rating: 5,
    title: 'The ancient Samba rice paddies healed my soul',
    comment: 'Wading knee-deep into river silt while wild ducks paddled around the seedlings was pure joy. Murugesan and Valliammai are living national treasures.'
  };
  const createRevRes = await makeRequest('POST', '/api/reviews', newRevPayload);
  assert(createRevRes.status === 201, 'POST /api/reviews returns HTTP 201 Created');
  assert(createRevRes.data.success === true, 'Review creation success flag is true');
  assert(createRevRes.data.data.farm_response.includes('Murugesan'), 'Review received automatic steward reply');
  const createdReviewId = createRevRes.data.data.id;

  // Test 11: POST /api/reviews/:id/like
  const likeRes = await makeRequest('POST', `/api/reviews/${createdReviewId}/like`);
  assert(likeRes.status === 200, 'POST /api/reviews/:id/like returns HTTP 200');
  assert(likeRes.data.data.helpful_count === 1, 'Helpful count incremented to 1');

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

  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') pageErrors.push(msg.text());
  });

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  assert(pageErrors.length === 0, 'Page loaded with zero JavaScript console errors');

  // Test 12: Masterclasses section presence & filter tabs
  const workshopsSection = page.locator('#workshops');
  await workshopsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  assert(await workshopsSection.isVisible(), 'Masterclasses section (#workshops) is visible');

  const wsCards = page.locator('.workshop-card');
  assert(await wsCards.count() === 4, 'Renders 4 masterclass cards');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_workshops_grid.png') });
  console.log('  📸 Captured 01_workshops_grid.png');

  // Test 13: Workshop filter tab interaction
  const punjabFilterBtn = page.locator('.workshop-tab[data-filter="punjab"]');
  await punjabFilterBtn.click();
  await page.waitForTimeout(300);

  const visibleCardsAfterPunjabFilter = await page.locator('.workshop-card:visible').count();
  assert(visibleCardsAfterPunjabFilter === 1, 'Filtering by Punjab shows exactly 1 card');

  // Reset filter to all
  await page.locator('.workshop-tab[data-filter="all"]').click();
  await page.waitForTimeout(300);
  assert(await page.locator('.workshop-card:visible').count() === 4, 'Reset filter displays all 4 cards');

  // Test 14: Workshop Registration Drawer Modal
  const jeevamruthaBookBtn = page.locator('.workshop-book-btn[data-workshop-id="ws-jeevamrutha"]');
  await jeevamruthaBookBtn.click();
  await page.waitForTimeout(400);

  const workshopModal = page.locator('#workshopModal');
  assert(await workshopModal.evaluate(el => el.classList.contains('is-open')), '#workshopModal opens on reserve seat click');

  const wsTitle = await page.locator('#workshopPreviewTitle').textContent();
  assert(wsTitle.includes('Jeevamrutha'), 'Modal preview title reflects Jeevamrutha');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_workshop_modal_register.png') });
  console.log('  📸 Captured 02_workshop_modal_register.png');

  // Test 15: Fill and submit workshop registration form
  await page.fill('#workshopFullName', 'Pooja Hegde');
  await page.fill('#workshopPhone', '+91 97766 55443');
  await page.fill('#workshopEmail', 'pooja.hegde@agrotest.org');
  await page.selectOption('#workshopSeats', '2');
  await page.fill('#workshopNotes', 'Bringing botanical sketchbook; excited to learn microbial cultures!');

  await page.click('#workshopSubmitBtn');
  await page.waitForTimeout(600);

  const wsPassModal = page.locator('#workshopPassModal');
  assert(await wsPassModal.evaluate(el => el.classList.contains('is-open')), '#workshopPassModal opens upon registration');

  const ticketRef = await page.locator('#workshopPassRefText').textContent();
  assert(ticketRef.startsWith('ODK-WS-'), `Workshop admission ref starts with ODK-WS- (got: ${ticketRef})`);

  const attendeeName = await page.locator('#workshopPassGuestName').textContent();
  assert(attendeeName === 'Pooja Hegde', 'Workshop pass reflects attendee name');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_workshop_admission_pass.png') });
  console.log('  📸 Captured 03_workshop_admission_pass.png');

  await page.locator('#closeWorkshopPassModalBtn').click();
  await page.waitForTimeout(300);

  // Test 16: Guest Logbook & Reviews Section
  const reviewsSection = page.locator('#reviews');
  await reviewsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  assert(await reviewsSection.isVisible(), 'Guest Logbook & Reviews section (#reviews) is visible');

  const statsBanner = page.locator('.reviews-stats-banner');
  assert(await statsBanner.isVisible(), 'Community trust & scorecard banner is visible');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_reviews_guest_logbook.png') });
  console.log('  📸 Captured 04_reviews_guest_logbook.png');

  // Test 17: Submit New Field Note / Review
  const writeReviewBtn = page.locator('#writeReviewBtn');
  await writeReviewBtn.click();
  await page.waitForTimeout(400);

  const reviewModal = page.locator('#reviewModal');
  assert(await reviewModal.evaluate(el => el.classList.contains('is-open')), '#reviewModal opens on write review click');

  await page.selectOption('#reviewRegion', 'sahyadri');
  await page.fill('#reviewGuestName', 'Ritu Sen');
  await page.fill('#reviewCity', 'Mumbai');
  await page.selectOption('#reviewRating', '5');
  await page.fill('#reviewTitle', 'Magical weekend with Ramrao & Savitri');
  await page.fill('#reviewComment', 'The warm earthen hearth food and muddy paddy walking was unforgettable! The kids did not ask for screens once.');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_review_modal_submission.png') });
  console.log('  📸 Captured 05_review_modal_submission.png');

  await page.click('#reviewSubmitBtn');
  await page.waitForTimeout(600);

  assert(await reviewModal.evaluate(el => !el.classList.contains('is-open')), '#reviewModal closes upon review submission');

  const firstReviewTitle = await page.locator('.review-card:first-child .review-title').textContent();
  assert(firstReviewTitle.includes('Magical weekend'), 'New review is dynamically prepended to the reviews grid');

  // Test 18: Lookup Workshop Admission Pass via #lookupModal
  const navLookupBtn = page.locator('#navLookupBtn');
  await navLookupBtn.click();
  await page.waitForTimeout(300);

  const lookupModal = page.locator('#lookupModal');
  assert(await lookupModal.evaluate(el => el.classList.contains('is-open')), '#lookupModal opens on My Pass nav button click');

  await page.fill('#lookupInput', ticketRef);
  await page.click('#lookupSubmitBtn');
  await page.waitForTimeout(600);

  assert(await wsPassModal.evaluate(el => el.classList.contains('is-open')), 'Lookup modal retrieves and displays #workshopPassModal for ODK-WS reference');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_lookup_workshop_pass.png') });
  console.log('  📸 Captured 06_lookup_workshop_pass.png');

  await page.locator('#closeWorkshopPassModalBtn').click();
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

    if (['desktop_1920x1080', 'tablet_768x1024', 'mobile_390x844', 'small_mobile_320x700'].includes(vp.name)) {
      const workshopsEl = page.locator('#workshops');
      await workshopsEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `07_responsive_${vp.name}.png`) });
      console.log(`  📸 Captured 07_responsive_${vp.name}.png`);
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
