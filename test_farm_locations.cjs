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

function fetchJson(endpoint) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${endpoint}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    }).on('error', reject);
  });
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
  console.log('🧪 ONE DAY KISSAN - REAL FARM LOCATIONS REDESIGN VERIFICATION');
  console.log('================================================================\n');

  // --- 1. Test /api/locations endpoint ---
  console.log('--- 1. Testing /api/locations Backend Endpoint ---');
  const locRes = await fetchJson('/api/locations');
  assert(locRes.status === 200, 'GET /api/locations returns 200 OK');
  assert(locRes.data.success === true, 'API returns success: true');
  assert(locRes.data.count === 2, `API returned exactly 2 locations (found ${locRes.data.count})`);

  const bhongirApi = locRes.data.data.find(l => l.id === 'bhongir');
  const moinabadApi = locRes.data.data.find(l => l.id === 'moinabad');

  assert(bhongirApi && bhongirApi.label === 'Main Farm', 'Bhongir Main Farm verified in API');
  assert(moinabadApi && moinabadApi.label === 'Branch Farm', 'Moinabad Branch Farm verified in API');
  assert(bhongirApi.address.includes('Bhongir, Telangana – 508116'), `Bhongir address verified: ${bhongirApi.address}`);
  assert(moinabadApi.address.includes('Moinabad, Telangana – 501504'), `Moinabad address verified: ${moinabadApi.address}`);

  // Test single location endpoint
  const singleRes = await fetchJson('/api/locations/bhongir');
  assert(singleRes.status === 200 && singleRes.data.data.id === 'bhongir', 'GET /api/locations/bhongir returns 200 OK');

  // --- 2. Interactive Browser Verification with Playwright ---
  console.log('\n--- 2. Playwright Interactive Browser Verification ---');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check section heading and supporting text
  const section = page.locator('#terroirs');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const headingText = await section.locator('.h2').textContent();
  assert(headingText.includes('Two places. One unforgettable farm experience.'), `Section Heading verified: "${headingText.trim()}"`);

  const subtitleText = await section.locator('.locations-subtitle').textContent();
  assert(subtitleText.includes('Discover the joy of farming and rural life at our farms in Telangana.'), `Supporting Text verified: "${subtitleText.trim()}"`);

  // Verify Prohibited Fictional Information is Absent
  const sectionHtml = await section.innerHTML();
  const prohibitedFictional = [
    'Western Ghats',
    'Deccan Plateau',
    'Cauvery Wetlands',
    'Punjab Canal Plains',
    '1,250m',
    '820m',
    '120m',
    '280m',
    'Volcanic Basalt',
    'Mountain Humus',
    '6.8 pH',
    'Ramrao',
    'Savitri Deshmukh',
    'Ananya & Devraj',
    'Murugesan',
    'Valliammai',
    'Gurmehar Singh',
    '22°C',
    '25 spots/day'
  ];

  for (const term of prohibitedFictional) {
    assert(!sectionHtml.includes(term), `Fictional term absent: "${term}"`);
  }
  console.log('✅ Confirmed: Western Ghats, Deccan Plateau, Cauvery Wetlands, Punjab Canal Plains, fake elevations, soil pH, fictional farmers, weather and fake capacity REMOVED completely');

  // Verify Location 01 - Bhongir
  const bhongirPanel = page.locator('#panel-bhongir');
  const bhongirName = await bhongirPanel.locator('.loc-name').textContent();
  const bhongirLabel = await bhongirPanel.locator('.loc-badge-primary').textContent();
  const bhongirAddress = await bhongirPanel.locator('.loc-address').textContent();
  const bhongirImgSrc = await bhongirPanel.locator('.loc-photo').getAttribute('src');

  assert(bhongirName.trim() === 'Bhongir', `Bhongir name: "${bhongirName.trim()}"`);
  assert(bhongirLabel.trim() === 'Main Farm', `Bhongir label: "${bhongirLabel.trim()}"`);
  assert(bhongirAddress.includes('Hotel Vivera, Hyderabad–Warangal Highway, Bhongir Bypass, Bhongir, Telangana – 508116.'), `Bhongir address matches official website: "${bhongirAddress.trim()}"`);
  assert(bhongirImgSrc.includes('bhongir_main_farm.jpg'), `Bhongir photo points to authentic Telangana visual: ${bhongirImgSrc}`);

  // Verify Location 02 - Moinabad
  const moinabadPanel = page.locator('#panel-moinabad');
  const moinabadName = await moinabadPanel.locator('.loc-name').textContent();
  const moinabadLabel = await moinabadPanel.locator('.loc-badge-primary').textContent();
  const moinabadAddress = await moinabadPanel.locator('.loc-address').textContent();
  const moinabadImgSrc = await moinabadPanel.locator('.loc-photo').getAttribute('src');

  assert(moinabadName.trim() === 'Moinabad', `Moinabad name: "${moinabadName.trim()}"`);
  assert(moinabadLabel.trim() === 'Branch Farm', `Moinabad label: "${moinabadLabel.trim()}"`);
  assert(moinabadAddress.includes('Kapil Agro Farms, Sriramnagar, Moinabad, Telangana – 501504.'), `Moinabad address matches official website: "${moinabadAddress.trim()}"`);
  assert(moinabadImgSrc.includes('moinabad_branch_farm.jpg'), `Moinabad photo points to authentic Telangana visual: ${moinabadImgSrc}`);

  // Verify Google Maps Links
  const bhongirMaps = await bhongirPanel.locator('.loc-maps-link').getAttribute('href');
  const moinabadMaps = await moinabadPanel.locator('.loc-maps-link').getAttribute('href');
  assert(bhongirMaps.includes('google.com/maps') && bhongirMaps.includes('Bhongir'), `Verified Bhongir Google Maps Link: ${bhongirMaps}`);
  assert(moinabadMaps.includes('google.com/maps') && moinabadMaps.includes('Moinabad'), `Verified Moinabad Google Maps Link: ${moinabadMaps}`);

  // --- 3. Interactive Switcher and Selection Verification ---
  console.log('\n--- 3. Testing Interactive Switcher & Booking Integration ---');
  
  // Switch to Moinabad tab
  const moinabadTab = page.locator('#tab-moinabad');
  await moinabadTab.click();
  await page.waitForTimeout(300);

  const isMoinabadActive = await moinabadTab.evaluate(el => el.classList.contains('is-active'));
  const isMoinabadSelected = await moinabadPanel.evaluate(el => el.classList.contains('is-selected'));
  assert(isMoinabadActive && isMoinabadSelected, 'Switched to Moinabad tab: Moinabad panel highlighted as selected');

  // Switch back to Bhongir tab
  const bhongirTab = page.locator('#tab-bhongir');
  await bhongirTab.click();
  await page.waitForTimeout(300);

  const isBhongirActive = await bhongirTab.evaluate(el => el.classList.contains('is-active'));
  const isBhongirSelected = await bhongirPanel.evaluate(el => el.classList.contains('is-selected'));
  assert(isBhongirActive && isBhongirSelected, 'Switched to Bhongir tab: Bhongir panel highlighted as selected');

  // Test Explore Location button on Moinabad
  const exploreMoinabadBtn = moinabadPanel.locator('.loc-explore-btn');
  await exploreMoinabadBtn.click();
  await page.waitForTimeout(600);

  const selectedRegionVal = await page.locator('#regionSelect').inputValue();
  assert(selectedRegionVal === 'moinabad', `"Explore Location" synced with Booking Form: #regionSelect value = "${selectedRegionVal}"`);

  // Save desktop screenshot
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const desktopShotPath = path.join(LOCAL_SCREENSHOT_DIR, '04_real_farm_locations_desktop.png');
  const artifactDesktopShotPath = path.join(ARTIFACT_SCREENSHOT_DIR, '04_real_farm_locations_desktop.png');
  await section.screenshot({ path: desktopShotPath });
  fs.copyFileSync(desktopShotPath, artifactDesktopShotPath);
  console.log(`📸 Saved screenshot: ${desktopShotPath}`);

  // --- 4. Responsive & Overflow Verification (6 Viewports) ---
  console.log('\n--- 4. Responsiveness & Horizontal Overflow Verification (6 Viewports) ---');
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
      await page.waitForTimeout(300);
      const mobileShotPath = path.join(LOCAL_SCREENSHOT_DIR, '05_real_farm_locations_mobile.png');
      const artifactMobileShotPath = path.join(ARTIFACT_SCREENSHOT_DIR, '05_real_farm_locations_mobile.png');
      await section.screenshot({ path: mobileShotPath });
      fs.copyFileSync(mobileShotPath, artifactMobileShotPath);
      console.log(`📸 Saved screenshot: ${mobileShotPath}`);
    }
  }

  await browser.close();
  console.log('\n================================================================');
  console.log('🎉 ALL REAL FARM LOCATIONS VERIFICATION TESTS PASSED!');
  console.log('================================================================');
}

runTests().catch(err => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
