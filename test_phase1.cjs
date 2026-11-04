const http = require('http');
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots_phase1');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Helper: HTTP request
function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
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
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🌾 Starting Phase 1 Full-Stack Automated Verification Suite...\n');
  let testCount = 0;
  let passCount = 0;

  function assert(cond, name) {
    testCount++;
    if (cond) {
      passCount++;
      console.log(`  ✓ PASS: ${name}`);
    } else {
      console.error(`  ✗ FAIL: ${name}`);
      throw new Error(`Assertion failed: ${name}`);
    }
  }

  // 1. Test REST API Endpoints
  console.log('--- 1. Testing REST API Endpoints ---');

  // GET /api/regions
  const regionsRes = await makeRequest('GET', '/api/regions');
  assert(regionsRes.status === 200, 'GET /api/regions returns 200');
  assert(regionsRes.data.success === true, 'GET /api/regions success is true');
  assert(regionsRes.data.data.length === 4, '4 agrarian regions returned');

  // GET /api/experiences
  const expRes = await makeRequest('GET', '/api/experiences');
  assert(expRes.status === 200, 'GET /api/experiences returns 200');
  assert(expRes.data.success === true, 'GET /api/experiences success is true');
  assert(expRes.data.data.length === 4, '4 experiences returned');

  // Dynamic future dates
  const futureDate1 = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
  const futureDate2 = new Date(Date.now() + 20 * 86400000).toISOString().split('T')[0];

  // GET /api/availability
  const availRes = await makeRequest('GET', `/api/availability?regionId=sahyadri&date=${futureDate1}`);
  assert(availRes.status === 200, 'GET /api/availability returns 200');
  assert(availRes.data.data.region_id === 'sahyadri', 'Availability matches requested region');
  assert(typeof availRes.data.data.remaining_slots === 'number', 'Remaining slots is numeric');
  const initialSlots = availRes.data.data.remaining_slots;

  // POST /api/bookings
  const bookingPayload = {
    fullName: 'Ananya Deshmukh',
    email: 'ananya@sahyadriagro.in',
    phone: '+91 98211 44332',
    regionId: 'sahyadri',
    experienceId: 'paddy',
    visitDate: futureDate1,
    travellers: '2 Adults (Couple)',
    guestCount: 2,
    dietaryNotes: 'Traditional woodfire thali, no refined sugar'
  };
  const bookRes = await makeRequest('POST', '/api/bookings', bookingPayload);
  assert(bookRes.status === 201, 'POST /api/bookings returns 201 Created');
  assert(bookRes.data.success === true, 'Booking response success is true');
  const createdBooking = bookRes.data.data;
  assert(createdBooking.booking_ref.startsWith('ODK-'), 'Booking ref follows ODK-YYYYMM-XXXX pattern: ' + createdBooking.booking_ref);
  assert(createdBooking.qr_code_data.startsWith('data:image/png;base64,'), 'QR code is valid base64 PNG data URL');
  assert(createdBooking.farm_name === 'Sahyadri Heritage Agroforest', 'Farm name joined correctly: ' + createdBooking.farm_name);

  // Check availability decremented
  const availAfter = await makeRequest('GET', `/api/availability?regionId=sahyadri&date=${futureDate1}`);
  assert(availAfter.data.data.remaining_slots === initialSlots - 2, `Capacity correctly decremented by 2 (was ${initialSlots}, now ${availAfter.data.data.remaining_slots})`);

  // GET /api/bookings/:ref
  const lookupRes = await makeRequest('GET', `/api/bookings/${createdBooking.booking_ref}`);
  assert(lookupRes.status === 200, 'GET /api/bookings/:ref returns 200');
  assert(lookupRes.data.data.full_name === 'Ananya Deshmukh', 'Lookup matches guest name');
  assert(lookupRes.data.data.host_name === 'Ramrao & Savitri Deshmukh', 'Lookup includes host steward');

  console.log('\n--- 2. Testing Browser UI & End-to-End User Flow (Playwright) ---');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check no fatal console errors
  assert(consoleErrors.length === 0, `Page loaded with 0 console errors (found: ${consoleErrors.length})`);

  // Scroll to booking section
  const bookingSection = page.locator('#booking');
  await bookingSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Check live availability element is present
  const availText = await page.locator('#availStatusText').textContent();
  assert(availText.length > 0, 'Live availability status banner rendered: "' + availText.trim() + '"');

  // Change region and verify availability updates
  await page.selectOption('#regionSelect', 'punjab');
  await page.waitForTimeout(600);
  const punjabAvail = await page.locator('#availStatusText').textContent();
  assert(punjabAvail.includes('Singh Ancestral') || punjabAvail.includes('Plains') || punjabAvail.includes('spots'), 'Availability updated for Punjab region: "' + punjabAvail.trim() + '"');

  // Reset to sahyadri
  await page.selectOption('#regionSelect', 'sahyadri');
  await page.waitForTimeout(400);

  // Fill in booking form
  await page.fill('#fullName', 'Devendra Patel');
  await page.fill('#emailAddress', 'devendra@kissanliving.org');
  await page.fill('#phoneNumber', '+91 98201 55443');
  await page.fill('#visitDate', futureDate2);
  await page.selectOption('#partySelect', '2a');
  await page.fill('#dietaryNotes', 'Jain food, boots size UK 9');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_booking_form_filled.png') });
  console.log('  📸 Screenshot captured: 01_booking_form_filled.png');

  // Submit form
  await page.click('#reserveSubmitBtn');
  console.log('  Submitted reservation form, waiting for Digital Pass modal...');

  // Wait for #passModal to be open
  await page.waitForSelector('#passModal.is-open', { timeout: 5000 });
  await page.waitForTimeout(800);

  // Verify modal contents
  const modalRef = await page.locator('#passRefText').textContent();
  assert(modalRef.startsWith('ODK-'), 'Pass modal displayed with valid reference: ' + modalRef);

  const modalGuest = await page.locator('#passGuestName').textContent();
  assert(modalGuest === 'Devendra Patel', 'Pass displays guest name: ' + modalGuest);

  const modalHost = await page.locator('#passHostName').textContent();
  assert(modalHost.includes('Ramrao'), 'Pass displays host steward: ' + modalHost);

  const qrSrc = await page.locator('#passQrImg').getAttribute('src');
  assert(qrSrc && qrSrc.length > 50, 'Gate check-in QR code rendered properly');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_digital_farm_pass_modal.png') });
  console.log('  📸 Screenshot captured: 02_digital_farm_pass_modal.png');

  // Test Copy Reference button
  await page.click('#copyRefBtn');
  await page.waitForTimeout(400);
  const toastText = await page.locator('#toastMessage').textContent();
  assert(toastText.includes('copied') || toastText.includes('Reference'), 'Toast notification appeared: ' + toastText);

  // Close pass modal
  await page.click('#closePassModalBtn');
  await page.waitForTimeout(400);
  const isPassOpen = await page.locator('#passModal').evaluate(el => el.classList.contains('is-open'));
  assert(!isPassOpen, 'Pass modal closed cleanly');

  // Test Pass Lookup Flow
  console.log('\n--- 3. Testing Pass Lookup Flow ---');
  await page.click('#openLookupBtn');
  await page.waitForSelector('#lookupModal.is-open', { timeout: 3000 });
  await page.waitForTimeout(300);

  await page.fill('#lookupInput', modalRef);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_lookup_modal_filled.png') });
  console.log('  📸 Screenshot captured: 03_lookup_modal_filled.png');

  await page.click('#lookupSubmitBtn');
  await page.waitForSelector('#passModal.is-open', { timeout: 5000 });
  await page.waitForTimeout(500);

  const retrievedRef = await page.locator('#passRefText').textContent();
  assert(retrievedRef === modalRef, 'Retrieved pass reference matches searched reference: ' + retrievedRef);
  await page.click('#closePassModalBtn');
  await page.waitForTimeout(300);

  // Viewport Responsive checks
  console.log('\n--- 4. Testing Responsive Viewports (Zero Overflow) ---');
  const viewports = [
    { name: 'desktop_1920x1080', width: 1920, height: 1080 },
    { name: 'tablet_768x1024', width: 768, height: 1024 },
    { name: 'mobile_390x844', width: 390, height: 844 },
    { name: 'small_mobile_320x700', width: 320, height: 700 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert(overflow <= 0, `Viewport ${vp.name} (${vp.width}x${vp.height}): 0px horizontal overflow (actual: ${Math.max(0, overflow)}px)`);

    // Screenshot booking section on this viewport
    await bookingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `04_responsive_${vp.name}.png`) });
    console.log(`  📸 Screenshot captured: 04_responsive_${vp.name}.png`);
  }

  await browser.close();

  console.log(`\n========================================`);
  console.log(`🎉 ALL TESTS PASSED! (${passCount}/${testCount})`);
  console.log(`========================================\n`);
}

runTests().catch(err => {
  console.error('\n❌ TEST RUN FAILED:', err);
  process.exit(1);
});
