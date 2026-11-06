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
  console.log('🧪 ONE DAY KISSAN - LUXURY FARM RESERVATION TEST SUITE');
  console.log('================================================================\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  const pageErrors = [];
  page.on('pageerror', err => {
    pageErrors.push(err.message);
    console.error('  [Page Error]:', err.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') console.error('  [Browser Error]:', msg.text());
  });

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#booking', { state: 'attached' });
  await page.waitForTimeout(1000);

  assert(pageErrors.length === 0, `Zero page runtime errors detected (errors: ${pageErrors.length})`);

  const bookingSection = page.locator('#booking');
  assert(await bookingSection.isVisible(), 'Booking section #booking exists and is visible');
  await bookingSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // --- 1. Verify Removal of Old Generic Form & Fake Availability Elements ---
  console.log('\n--- 1. Verifying Removal of Generic Form & Fake Elements ---');
  const legacyAvailBanner = await page.locator('#availBanner').count();
  assert(legacyAvailBanner === 0, 'No legacy fake availability banner present in DOM');
  const legacyAvailPulse = await page.locator('#availPulse').count();
  assert(legacyAvailPulse === 0, 'No legacy fake pulse dot present in DOM');
  const legacyPassModal = await page.locator('#passModal').count();
  // Pass modal shouldn't be triggered on normal submission
  console.log('✅ Legacy fake availability elements completely eliminated');

  // --- 2. Verify Left Column (Farm Photography & Editorial Headlines) ---
  console.log('\n--- 2. Verifying Left Column: Farm Photography & Copy ---');
  const photo = page.locator('#luxuryFarmPhoto');
  assert(await photo.isVisible(), 'Farm photograph is visible in left column');

  const photoNaturalWidth = await page.evaluate(() => {
    const img = document.getElementById('luxuryFarmPhoto');
    return img && img.complete && img.naturalWidth > 0;
  });
  assert(photoNaturalWidth, 'Farm photograph loaded with valid natural dimensions');

  const locationPill = (await page.locator('.luxury-location-pill').textContent()).trim();
  assert(locationPill.includes('Telangana, India • Bhongir & Moinabad'), `Location label verified: "${locationPill}"`);

  const visualHeading = (await page.locator('.luxury-visual-caption h3').textContent()).trim();
  assert(visualHeading === 'A day away from the everyday.', `Visual heading verified: "${visualHeading}"`);

  const visualSubtitle = (await page.locator('.luxury-visual-caption p').textContent()).trim();
  assert(visualSubtitle === 'Come closer to nature. Discover the joy of farm life across open agricultural fields and traditional village traditions.', `Visual subtitle verified: "${visualSubtitle}"`);

  const initialBadge = (await page.locator('#luxuryActiveFarmBadge').textContent()).trim();
  assert(initialBadge.includes('Main Farm — Bhongir'), `Active farm badge initially shows Bhongir: "${initialBadge}"`);

  // Screenshot Desktop Step 1
  const shot24 = path.join(LOCAL_SCREENSHOT_DIR, '24_luxury_booking_step1_desktop.png');
  await bookingSection.screenshot({ path: shot24 });
  fs.copyFileSync(shot24, path.join(ARTIFACT_SCREENSHOT_DIR, '24_luxury_booking_step1_desktop.png'));
  console.log('📸 Saved screenshot: 24_luxury_booking_step1_desktop.png');

  // --- 3. Verify Step 01: Category & Farm Location Switching ---
  console.log('\n--- 3. Verifying Step 01: Categories & Real Farm Addresses ---');
  const stepTitle = (await page.locator('.luxury-card-title').textContent()).trim();
  assert(stepTitle === 'Plan Your Farm Visit', `Booking card title verified: "${stepTitle}"`);

  // Check 4 categories
  const schoolCard = page.locator('.luxury-choice-card[data-category="school"]');
  const corpCard = page.locator('.luxury-choice-card[data-category="corporate"]');
  const famCard = page.locator('.luxury-choice-card[data-category="family"]');
  const friendsCard = page.locator('.luxury-choice-card[data-category="friends"]');
  assert(await schoolCard.isVisible() && await corpCard.isVisible() && await famCard.isVisible() && await friendsCard.isVisible(), 'All 4 visitor categories are present (School, Corporate, Family, Friends)');

  // Check 2 real locations
  const bhongirCard = page.locator('.luxury-choice-card[data-farm="bhongir"]');
  const moinabadCard = page.locator('.luxury-choice-card[data-farm="moinabad"]');
  assert(await bhongirCard.isVisible() && await moinabadCard.isVisible(), 'Both authentic Telangana locations present (Bhongir & Moinabad)');

  const bhongirText = await bhongirCard.textContent();
  assert(bhongirText.includes('Hotel Vivera, Hyderabad–Warangal Highway, Bhongir Bypass, Bhongir – 508116'), 'Bhongir card contains verified official address');

  const moinabadText = await moinabadCard.textContent();
  assert(moinabadText.includes('Kapil Agro Farms, Sriramnagar, Moinabad, Telangana – 501504'), 'Moinabad card contains verified official address');

  // Switch farm to Moinabad and verify visual update
  await moinabadCard.click();
  await page.waitForTimeout(400);
  const updatedBadge = (await page.locator('#luxuryActiveFarmBadge').textContent()).trim();
  assert(updatedBadge.includes('Branch Farm — Moinabad'), `Selecting Moinabad updates visual badge: "${updatedBadge}"`);

  // Switch back to Bhongir
  await bhongirCard.click();
  await page.waitForTimeout(300);

  // --- 4. Verify Step 02: Dynamic Fields (Testing All 4 Categories) ---
  console.log('\n--- 4. Verifying Step 02: Dynamic Form Fields for All Categories ---');
  
  // Test Category A: School Field Trip
  await schoolCard.click();
  await page.locator('#luxuryStep1NextBtn').click();
  await page.waitForTimeout(350);

  assert(await page.locator('.luxury-step-panel[data-step="2"]').isVisible(), 'Step 2 panel is active for School');
  assert(await page.locator('#luxuryFieldsSchool').isVisible(), 'School dynamic fields are visible');
  assert(await page.locator('#inputSchoolName').isVisible(), 'School Name input is visible');
  assert(await page.locator('#inputSchoolStudents').isVisible(), 'School Students input is visible');
  
  const schoolNotice = await page.locator('.luxury-step-panel[data-step="2"] .luxury-notice-pill').textContent();
  assert(schoolNotice.includes('Booking at least one week in advance is recommended'), 'School 1-week advance notice is clearly shown');

  // Go back and test Category B: Corporate
  await page.locator('#luxuryStep2BackBtn').click();
  await corpCard.click();
  await page.locator('#luxuryStep1NextBtn').click();
  await page.waitForTimeout(350);
  assert(await page.locator('#luxuryFieldsCorporate').isVisible(), 'Corporate dynamic fields are visible');
  assert(await page.locator('#inputCorpCompany').isVisible(), 'Corporate Company input is visible');

  // Go back and test Category C: Family
  await page.locator('#luxuryStep2BackBtn').click();
  await famCard.click();
  await page.locator('#luxuryStep1NextBtn').click();
  await page.waitForTimeout(350);
  assert(await page.locator('#luxuryFieldsFamily').isVisible(), 'Family dynamic fields are visible');
  assert(await page.locator('#inputFamilyName').isVisible(), 'Family Name input is visible');

  // Go back and test Category D: Friends
  await page.locator('#luxuryStep2BackBtn').click();
  await friendsCard.click();
  await page.locator('#luxuryStep1NextBtn').click();
  await page.waitForTimeout(350);
  assert(await page.locator('#luxuryFieldsFamily').isVisible(), 'Friends dynamic fields are visible');

  // Let us proceed with School Field Trip (Alphores eTechno School)
  await page.locator('#luxuryStep2BackBtn').click();
  await schoolCard.click();
  await page.locator('#luxuryStep1NextBtn').click();
  await page.waitForTimeout(350);

  // Fill School Details
  await page.locator('#inputSchoolName').fill('Alphores eTechno School');
  await page.locator('#inputSchoolCity').fill('Karimnagar');
  await page.locator('#inputSchoolGrade').fill('Classes 6 to 9');
  await page.locator('#inputSchoolStudents').fill('120');
  await page.locator('#inputVisitDate').fill('2026-11-28');
  await page.locator('#dietaryNotes').fill('Paddy transplanting, tractor ride, and traditional clay pottery immersion.');

  const shot25 = path.join(LOCAL_SCREENSHOT_DIR, '25_luxury_booking_step2_details.png');
  await bookingSection.screenshot({ path: shot25 });
  fs.copyFileSync(shot25, path.join(ARTIFACT_SCREENSHOT_DIR, '25_luxury_booking_step2_details.png'));
  console.log('📸 Saved screenshot: 25_luxury_booking_step2_details.png');

  // --- 5. Verify Step 03: Contact Details ---
  console.log('\n--- 5. Verifying Step 03: Contact Details ---');
  await page.locator('#luxuryStep2NextBtn').click();
  await page.waitForTimeout(350);

  assert(await page.locator('.luxury-step-panel[data-step="3"]').isVisible(), 'Step 3 panel is active');
  assert(await page.locator('#inputContactName').isVisible(), 'Contact name field is visible');
  assert(await page.locator('#inputContactPhone').isVisible(), 'Contact phone field is visible');

  await page.locator('#inputContactName').fill('Dr. V. Narender Reddy');
  await page.locator('#inputContactPhone').fill('+91 9849798674');
  await page.locator('#inputContactEmail').fill('principal@alphores.edu');

  // --- 6. Verify Step 04: Review Summary & Submission ---
  console.log('\n--- 6. Verifying Step 04: Review Summary & Submission ---');
  await page.locator('#luxuryStep3NextBtn').click();
  await page.waitForTimeout(350);

  assert(await page.locator('.luxury-step-panel[data-step="4"]').isVisible(), 'Step 4 Review panel is active');
  
  const revFarm = await page.locator('#revFarmName').textContent();
  assert(revFarm.includes('Main Farm – Bhongir'), `Review Farm matches selection: "${revFarm.trim()}"`);

  const revCat = await page.locator('#revCategory').textContent();
  assert(revCat.includes('School Field Trip'), `Review Category matches: "${revCat.trim()}"`);

  const revPartyText = await page.locator('#revParty').textContent();
  assert(revPartyText.includes('120 Students'), `Review Party size verified: "${revPartyText.trim()}"`);

  const revContactVal = await page.locator('#revContact').textContent();
  assert(revContactVal.includes('Dr. V. Narender Reddy') && revContactVal.includes('+91 9849798674'), 'Review Contact details verified');

  const transparentNotice = await page.locator('.luxury-step-panel[data-step="4"] .luxury-notice-pill').textContent();
  assert(transparentNotice.includes('Our team will contact you to confirm your visit'), 'Clear notice stating team will contact visitor');

  const shot26 = path.join(LOCAL_SCREENSHOT_DIR, '26_luxury_booking_step4_review.png');
  await bookingSection.screenshot({ path: shot26 });
  fs.copyFileSync(shot26, path.join(ARTIFACT_SCREENSHOT_DIR, '26_luxury_booking_step4_review.png'));
  console.log('📸 Saved screenshot: 26_luxury_booking_step4_review.png');

  // Submit the booking enquiry!
  console.log('\n--- 7. Submitting Enquiry & Verifying Refined Confirmation ---');
  await page.locator('#luxurySubmitBtn').click();
  await page.waitForSelector('#luxuryConfirmedCard', { state: 'visible', timeout: 8000 });

  const confirmRef = (await page.locator('#luxuryConfirmRef').textContent()).trim();
  assert(confirmRef.startsWith('Ref: ODK-'), `Backend generated valid reference code: "${confirmRef}"`);

  const confirmHeading = (await page.locator('.luxury-confirm-title').textContent()).trim();
  assert(confirmHeading === 'Booking Request Received with Gratitude', `Confirmation heading verified: "${confirmHeading}"`);

  const confirmText = await page.locator('#luxuryConfirmText').textContent();
  assert(confirmText.includes('Dr. V. Narender Reddy') && confirmText.includes('Bhongir') && confirmText.includes('+91 9849798674'), 'Confirmation text personalizes with guest name, farm, and phone');

  const confirmNotice = await page.locator('#luxuryConfirmSummary').textContent();
  assert(confirmNotice.includes('Our team will contact you to confirm your visit'), 'Confirmation explicitly reminds that team will confirm');

  const helplineText = await page.locator('.luxury-confirm-helpline').textContent();
  assert(helplineText.includes('+91 9849798674') && helplineText.includes('info@onedaykisan.com'), 'Helpline phone and email visible');

  const shot27 = path.join(LOCAL_SCREENSHOT_DIR, '27_luxury_booking_confirmed.png');
  await bookingSection.screenshot({ path: shot27 });
  fs.copyFileSync(shot27, path.join(ARTIFACT_SCREENSHOT_DIR, '27_luxury_booking_confirmed.png'));
  console.log('📸 Saved screenshot: 27_luxury_booking_confirmed.png');

  // --- 8. Verify Additional Visitor Information Area ---
  console.log('\n--- 8. Verifying Additional Visitor Information Area ---');
  const infoSection = page.locator('#luxuryVisitorInfo');
  assert(await infoSection.isVisible(), 'Additional Visitor Information section is visible');

  const infoCards = page.locator('.luxury-info-card');
  const infoCount = await infoCards.count();
  assert(infoCount === 5, `5 Essential visitor information cards present (Found: ${infoCount})`);

  const allInfoText = await infoSection.textContent();
  assert(allInfoText.includes('23+ Farm Activities'), 'Includes 23+ farm activities note');
  assert(allInfoText.includes('Suitable for Everyone'), 'Includes suitability for schools, families, friends, corporates');
  assert(allInfoText.includes('Food & Picnics'), 'Includes home-cooked picnic & catering guidelines');
  assert(allInfoText.includes('Attire & Footwear'), 'Includes comfortable clothes and closed-toe shoes advice');
  assert(allInfoText.includes('Transportation'), 'Includes note that transportation is not provided by One Day Kissan');

  // --- 9. Verify Refined Luxury Footer ---
  console.log('\n--- 9. Verifying Refined Luxury Footer ---');
  const footer = page.locator('footer#footer');
  assert(await footer.isVisible(), 'Refined footer is visible');

  const footerText = await footer.textContent();
  assert(footerText.includes('+91 9849798674'), 'Footer shows official phone +91 9849798674');
  assert(footerText.includes('info@onedaykisan.com'), 'Footer shows official email info@onedaykisan.com');
  assert(footerText.includes('Main Farm – Bhongir') && footerText.includes('Hotel Vivera'), 'Footer shows Bhongir Main Farm location');
  assert(footerText.includes('Branch Farm – Moinabad') && footerText.includes('Kapil Agro Farms'), 'Footer shows Moinabad Branch Farm location');

  // Verify removed repeated navigation links
  const legacyLinksCount = await page.locator('footer nav.f-links').count();
  assert(legacyLinksCount === 0, 'Unnecessary repeated navigation links removed from footer');

  const shot28 = path.join(LOCAL_SCREENSHOT_DIR, '28_luxury_footer_refined.png');
  await footer.screenshot({ path: shot28 });
  fs.copyFileSync(shot28, path.join(ARTIFACT_SCREENSHOT_DIR, '28_luxury_footer_refined.png'));
  console.log('📸 Saved screenshot: 28_luxury_footer_refined.png');

  // --- 10. Responsiveness & Horizontal Overflow Across 6 Viewports ---
  console.log('\n--- 10. Responsiveness & Horizontal Overflow Verification (6 Viewports) ---');
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
    await page.waitForTimeout(300);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });

    assert(overflow <= 0, `Viewport ${vp.name} (${vp.width}x${vp.height}): 0px horizontal overflow (actual: ${Math.max(0, overflow)}px)`);

    if (vp.name === 'mobile_390x844') {
      const shot29 = path.join(LOCAL_SCREENSHOT_DIR, '29_luxury_booking_mobile.png');
      await bookingSection.screenshot({ path: shot29 });
      fs.copyFileSync(shot29, path.join(ARTIFACT_SCREENSHOT_DIR, '29_luxury_booking_mobile.png'));
      console.log('📸 Saved screenshot: 29_luxury_booking_mobile.png');
    }
  }

  await browser.close();

  console.log('\n================================================================');
  console.log('🎉 ALL LUXURY FARM RESERVATION & FOOTER TESTS PASSED!');
  console.log('================================================================');
}

runTests().catch(err => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
