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
  console.log('🧪 ONE DAY KISSAN - FARM EXPERIENCES SECTION VERIFICATION');
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

  // --- 1. Verify Removal of Shopping Hampers & Crates ---
  console.log('\n--- 1. Verifying Removal of Harvest Hampers & Shopping Elements ---');
  const oldHampersSection = await page.locator('#hampers').count();
  assert(oldHampersSection === 0, 'Old #hampers section is completely removed from DOM');

  const oldHamperCards = await page.locator('.hamper-card').count();
  assert(oldHamperCards === 0, 'No shopping hamper cards remain in DOM');

  const oldHamperReserveBtns = await page.locator('.hamper-reserve-btn').count();
  assert(oldHamperReserveBtns === 0, 'No "Reserve Crate" shopping buttons remain');

  const oldHamperStockPills = await page.locator('.hamper-stock-pill').count();
  assert(oldHamperStockPills === 0, 'No shopping stock counters ("crates left") remain');

  const oldHamperModal = await page.locator('#hamperModal').count();
  assert(oldHamperModal === 0, 'Old #hamperModal is completely removed');

  // --- 2. Verify Presence of New Farm Experiences Section ---
  console.log('\n--- 2. Verifying New Farm Experiences Section Architecture ---');
  const expSection = page.locator('#experiences');
  assert(await expSection.isVisible(), '#experiences section exists and is visible');

  const expTitle = await page.locator('.experiences-title').textContent();
  assert(expTitle.includes('Real farm life, lived and learned.'), `Section title verified: "${expTitle.trim()}"`);

  const disclaimer = await page.locator('.experiences-disclaimer').textContent();
  assert(disclaimer.includes('Bhongir') && disclaimer.includes('Moinabad'), 'Location availability note verified');

  // Verify 5 category tab buttons
  const catBtns = page.locator('.exp-cat-btn');
  const catCount = await catBtns.count();
  assert(catCount === 5, `Exactly 5 experience categories present (Found: ${catCount})`);

  // --- 3. Test Each of the 5 Experience Categories ---
  console.log('\n--- 3. Testing Interactive Exploration of All 5 Categories ---');
  const expectedCategories = [
    {
      num: '01',
      name: 'Hands-on Farming',
      expectedActivities: ['Ploughing & Paddy Transplantation', 'Paddy Life Cycle', 'Vegetable', 'Cotton Life Cycle'],
      minCards: 4
    },
    {
      num: '02',
      name: 'Animals & Nature',
      expectedActivities: ['Domestic Animals', 'Exotic Birds', 'Walk-in Bird Aviary', 'Bird Nest Exploration'],
      minCards: 4
    },
    {
      num: '03',
      name: 'Traditional Village Skills',
      expectedActivities: ['Pottery', 'Dung Cake Making', 'Scarecrow Making', 'Traditional Hand Grinding'],
      minCards: 4
    },
    {
      num: '04',
      name: 'Farming & Water Heritage',
      expectedActivities: ['Earthworm Experience', 'Persian Wheel', 'Archimedes Screw', 'Reservoir', 'Water Well', 'Hand Water Pump', 'Mota Bavi', 'Rainwater Harvesting'],
      minCards: 8
    },
    {
      num: '05',
      name: 'Farm Fun',
      expectedActivities: ['Tractor Joy Ride', 'Grass Castle', 'Polyhouse', 'Farmer Watch Tower', 'DJ Music'],
      minCards: 5
    }
  ];

  for (let i = 0; i < expectedCategories.length; i++) {
    const cat = expectedCategories[i];
    console.log(`\nTesting Category ${cat.num}: ${cat.name}...`);

    // Click Category tab
    const tabBtn = page.locator(`.exp-cat-btn[data-cat="${i}"]`);
    await tabBtn.click();
    await page.waitForTimeout(300);

    // Verify Active Class
    const isActive = await tabBtn.evaluate(el => el.classList.contains('is-active'));
    assert(isActive, `Category ${cat.num} tab is active`);

    // Verify Spotlight Banner
    const spotBadge = await page.locator('#expSpotlightBadge').textContent();
    assert(spotBadge.includes(cat.num), `Spotlight badge includes ${cat.num} (actual: "${spotBadge.trim()}")`);

    // Verify Activity Cards
    const cards = page.locator('.exp-card');
    const cardCount = await cards.count();
    assert(cardCount >= cat.minCards, `Category ${cat.name} displays ${cardCount} activities (>= ${cat.minCards})`);

    // Verify images in this category load with naturalWidth > 0
    const imagesValid = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('#expActivitiesGrid .exp-card-image'));
      return imgs.every(img => img.complete && img.naturalWidth > 0);
    });
    assert(imagesValid, `All activity images in Category ${cat.num} load successfully with valid natural dimensions`);

    // Screenshot Category 01 & Category 04
    if (i === 0) {
      const shotPath = path.join(LOCAL_SCREENSHOT_DIR, '10_experiences_cat01_farming.png');
      await expSection.screenshot({ path: shotPath });
      fs.copyFileSync(shotPath, path.join(ARTIFACT_SCREENSHOT_DIR, '10_experiences_cat01_farming.png'));
      console.log(`📸 Saved screenshot: 10_experiences_cat01_farming.png`);
    } else if (i === 3) {
      const shotPath = path.join(LOCAL_SCREENSHOT_DIR, '11_experiences_cat04_water_heritage.png');
      await expSection.screenshot({ path: shotPath });
      fs.copyFileSync(shotPath, path.join(ARTIFACT_SCREENSHOT_DIR, '11_experiences_cat04_water_heritage.png'));
      console.log(`📸 Saved screenshot: 11_experiences_cat04_water_heritage.png`);
    }
  }

  // --- 4. Test Activity Details Modal ---
  console.log('\n--- 4. Testing Activity Detail Modal Interaction ---');
  // Switch back to Category 01 and click first card
  await page.locator('.exp-cat-btn[data-cat="0"]').click();
  await page.waitForTimeout(250);

  const firstCard = page.locator('.exp-card').first();
  const cardTitle = (await firstCard.locator('.exp-card-title').textContent()).trim();
  await firstCard.locator('.exp-card-explore-btn').click();
  await page.waitForTimeout(400);

  const modal = page.locator('#experienceModal');
  const isModalOpen = await modal.evaluate(el => el.classList.contains('is-open') || el.classList.contains('active'));
  assert(isModalOpen, 'Experience detail modal opened');

  const modalTitle = (await page.locator('#expModalTitle').textContent()).trim();
  assert(modalTitle === cardTitle, `Modal displays correct activity title: "${modalTitle}"`);

  const modalDesc = (await page.locator('#expModalFullDesc').textContent()).trim();
  assert(modalDesc.length > 50, 'Modal contains rich official description from official website');

  const modalImgValid = await page.evaluate(() => {
    const img = document.getElementById('expModalImg');
    return img && img.complete && img.naturalWidth > 0;
  });
  assert(modalImgValid, 'Modal activity photo loaded with valid dimensions');

  // Screenshot Modal
  const modalShot = path.join(LOCAL_SCREENSHOT_DIR, '12_experience_detail_modal.png');
  await page.locator('#expModalCard').screenshot({ path: modalShot });
  fs.copyFileSync(modalShot, path.join(ARTIFACT_SCREENSHOT_DIR, '12_experience_detail_modal.png'));
  console.log(`📸 Saved screenshot: 12_experience_detail_modal.png`);

  // --- 5. Test Booking Connection ---
  console.log('\n--- 5. Testing Booking System Connection ---');
  const bookBtn = page.locator('#expModalBookBtn');
  await bookBtn.click();
  await page.waitForTimeout(600);

  // Modal should be closed
  const isModalClosed = !(await modal.evaluate(el => el.classList.contains('is-open') || el.classList.contains('active')));
  assert(isModalClosed, 'Modal closed upon clicking book visit');

  // Notes field in booking should be populated with the activity
  const dietaryVal = await page.locator('#dietaryNotes').inputValue();
  assert(dietaryVal.includes(modalTitle), `Booking form pre-populated with activity preference: "${dietaryVal}"`);

  // Toast confirmation displayed
  const toastVisible = await page.locator('#toastMessage').evaluate(el => el.classList.contains('is-visible') || window.getComputedStyle(el).opacity > 0);
  assert(toastVisible, 'Toast notification displayed confirming activity selection');

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
      const mobileShot = path.join(LOCAL_SCREENSHOT_DIR, '13_experiences_mobile.png');
      await expSection.screenshot({ path: mobileShot });
      fs.copyFileSync(mobileShot, path.join(ARTIFACT_SCREENSHOT_DIR, '13_experiences_mobile.png'));
      console.log(`📸 Saved screenshot: 13_experiences_mobile.png`);
    }
  }

  await browser.close();
  console.log('\n================================================================');
  console.log('🎉 ALL FARM EXPERIENCES TESTS PASSED SUCCESSFULLY!');
  console.log('================================================================');
}

runTests().catch(err => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
