const http = require('http');
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots_phase2');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

function makeRequest(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: path,
      method: method,
      headers: { 'Content-Type': 'application/json' }
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
    req.end();
  });
}

async function runTests() {
  console.log('🌾 Starting Phase 2 Living Terroirs Automated Verification Suite...\n');
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

  // 1. REST API Endpoints
  console.log('--- 1. Testing Terroirs REST API Endpoints ---');

  // GET /api/terroirs
  const terroirsRes = await makeRequest('GET', '/api/terroirs');
  assert(terroirsRes.status === 200, 'GET /api/terroirs returns 200');
  assert(terroirsRes.data.success === true, 'GET /api/terroirs success is true');
  assert(terroirsRes.data.count === 4, '4 living terroirs returned');

  // Check structure of first terroir
  const t0 = terroirsRes.data.data[0];
  assert(typeof t0.soil_type === 'string' && t0.soil_type.length > 0, 'Terroir has soil_type: ' + t0.soil_type);
  assert(typeof t0.elevation === 'string' && t0.elevation.includes('Elevation'), 'Terroir has elevation: ' + t0.elevation);
  assert(Array.isArray(t0.calendar) && t0.calendar.length === 4, 'Terroir has 4-stage seasonal calendar');

  // GET /api/terroirs/sahyadri
  const sahyadriRes = await makeRequest('GET', '/api/terroirs/sahyadri');
  assert(sahyadriRes.status === 200, 'GET /api/terroirs/sahyadri returns 200');
  assert(sahyadriRes.data.data.farm_name === 'Sahyadri Heritage Agroforest', 'Sahyadri farm name matches');
  assert(sahyadriRes.data.data.soil_ph === '6.8 pH Balanced', 'Sahyadri soil pH matches: ' + sahyadriRes.data.data.soil_ph);

  // GET /api/terroirs/deccan
  const deccanRes = await makeRequest('GET', '/api/terroirs/deccan');
  assert(deccanRes.status === 200, 'GET /api/terroirs/deccan returns 200');
  assert(deccanRes.data.data.host_name === 'Ananya & Devraj', 'Deccan steward matches');

  // GET /api/terroirs/invalid
  const invalidRes = await makeRequest('GET', '/api/terroirs/unknown-region');
  assert(invalidRes.status === 404, 'Invalid terroir returns 404');

  // 2. Browser UI & Interactions
  console.log('\n--- 2. Testing Browser UI & Interactive Terroir Explorer (Playwright) ---');

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

  assert(consoleErrors.length === 0, `Page loaded with 0 console errors (found: ${consoleErrors.length})`);

  // Scroll to Terroirs section
  const terroirSection = page.locator('#terroirs');
  await terroirSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Verify initial card is Sahyadri
  const initialFarm = await page.locator('#terroirFarmName').textContent();
  assert(initialFarm === 'Sahyadri Heritage Agroforest', 'Initial terroir card displays Sahyadri: ' + initialFarm);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_terroir_explorer_sahyadri.png') });
  console.log('  📸 Screenshot captured: 01_terroir_explorer_sahyadri.png');

  // Switch to Deccan Plateau
  console.log('  Testing tab switch to Deccan Plateau...');
  await page.click('#tab-deccan');
  await page.waitForTimeout(500);

  const deccanFarm = await page.locator('#terroirFarmName').textContent();
  assert(deccanFarm === 'Ananya & Devraj Living Farm', 'Card smoothly transitioned to Deccan: ' + deccanFarm);

  const deccanWeather = await page.locator('#terroirWeatherText').textContent();
  assert(deccanWeather.includes('25°C'), 'Deccan weather text updated: ' + deccanWeather);

  // Switch to Cauvery Wetlands
  console.log('  Testing tab switch to Cauvery Wetlands...');
  await page.click('#tab-cauvery');
  await page.waitForTimeout(500);

  const cauveryFarm = await page.locator('#terroirFarmName').textContent();
  assert(cauveryFarm === 'Thanjavur Heirloom Rice Wetland', 'Card transitioned to Cauvery: ' + cauveryFarm);

  // Switch to Punjab Canal Plains
  console.log('  Testing tab switch to Punjab Canal Plains...');
  await page.click('#tab-punjab');
  await page.waitForTimeout(500);

  const punjabFarm = await page.locator('#terroirFarmName').textContent();
  assert(punjabFarm === 'Singh Ancestral Wheat & Mustard Farm', 'Card transitioned to Punjab: ' + punjabFarm);

  // Test Crop Calendar Expandable
  console.log('  Testing Crop Calendar toggle...');
  await page.click('#calendarToggleBtn');
  await page.waitForTimeout(400);

  const isCalVisible = await page.locator('#calendarBody').isVisible();
  assert(isCalVisible, 'Crop Calendar opened on toggle');

  const milestonesCount = await page.locator('.milestone-item').count();
  assert(milestonesCount === 4, `Rendered 4 seasonal milestones (found: ${milestonesCount})`);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_terroir_explorer_calendar_expanded.png') });
  console.log('  📸 Screenshot captured: 02_terroir_explorer_calendar_expanded.png');

  // Test Direct Pre-selection into Booking Engine
  console.log('  Testing "Experience This Terroir →" shortcut...');
  await page.click('#terroirBookBtn');
  await page.waitForTimeout(1000);

  // Verify booking form region is selected to punjab
  const selectedRegion = await page.locator('#regionSelect').inputValue();
  assert(selectedRegion === 'punjab', 'Booking form region pre-selected to punjab: ' + selectedRegion);

  // Verify live capacity banner reflects Punjab
  const availStatus = await page.locator('#availStatusText').textContent();
  assert(availStatus.includes('Singh Ancestral') || availStatus.includes('30'), 'Live capacity updated for pre-selected region: ' + availStatus);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_terroir_preselected_booking.png') });
  console.log('  📸 Screenshot captured: 03_terroir_preselected_booking.png');

  // 3. Responsive Verification
  console.log('\n--- 3. Testing Responsive Viewports for Terroir Explorer (Zero Overflow) ---');
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

    await terroirSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `04_terroir_${vp.name}.png`) });
    console.log(`  📸 Screenshot captured: 04_terroir_${vp.name}.png`);
  }

  await browser.close();

  console.log(`\n========================================`);
  console.log(`🎉 ALL PHASE 2 TESTS PASSED! (${passCount}/${testCount})`);
  console.log(`========================================\n`);
}

runTests().catch(err => {
  console.error('\n❌ TEST RUN FAILED:', err);
  process.exit(1);
});
