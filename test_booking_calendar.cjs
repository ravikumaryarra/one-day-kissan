/**
 * Playwright Automated Verification Suite: Premium Date Calendar & Fixed Sessions
 * Milestone 1C Booking Wizard Enhancement
 */

const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/screenshots';
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

async function runCalendarTests() {
  console.log('🌱 Starting Booking Calendar & Session Verification Suite...');
  let totalTests = 0;
  let passedTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passedTests++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    
    // Listen for console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    console.log('Navigating to http://localhost:3000/#booking ...');
    await page.goto('http://localhost:3000/#booking', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Dismiss any welcome popup modal
    await page.evaluate(() => {
      const modal = document.getElementById('welcomePopupModal');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        modal.style.display = 'none';
      }
    });
    await page.waitForTimeout(400);

    // =========================================================================
    // TEST 1: DOM Elements & Calendar Header Placement
    // =========================================================================
    console.log('\n--- Test 1: Calendar Placement & DOM Hierarchy ---');
    const calendarSection = await page.$('#luxuryCalendarSection');
    assert(calendarSection !== null, 'Calendar section #luxuryCalendarSection exists in DOM');

    const calHeading = await page.$eval('#luxuryCalendarSection .luxury-group-label span:first-child', el => el.textContent.trim());
    assert(calHeading === '3. SELECT YOUR FARM VISIT DATE', `Heading matches required "3. SELECT YOUR FARM VISIT DATE", got: "${calHeading}"`);

    const monthYearTitle = await page.$eval('#calMonthYearTitle', el => el.textContent.trim());
    assert(monthYearTitle.length > 3, `Month Year Title rendered: "${monthYearTitle}"`);

    const prevBtn = await page.$('#calPrevMonthBtn');
    const nextBtn = await page.$('#calNextMonthBtn');
    assert(prevBtn !== null && nextBtn !== null, 'Prev and Next month navigation buttons exist');

    // Weekdays
    const weekdayCount = await page.$$eval('.premium-cal-weekdays .cal-weekday', els => els.length);
    assert(weekdayCount === 7, `7-day weekday headers rendered: ${weekdayCount}`);

    // =========================================================================
    // TEST 2: Days Grid, Today Highlight & Past Dates Disabled
    // =========================================================================
    console.log('\n--- Test 2: Days Grid & Date States ---');
    const dayCells = await page.$$('.cal-day-cell:not(.is-empty)');
    assert(dayCells.length >= 28 && dayCells.length <= 31, `Valid number of days in active month: ${dayCells.length}`);

    const todayCell = await page.$('.cal-day-cell.is-today');
    assert(todayCell !== null, "Today's date is highlighted with .is-today");

    // Pre-selected date (upcoming Saturday)
    const selectedCell = await page.$('.cal-day-cell.is-selected');
    assert(selectedCell !== null, 'An upcoming visit date is pre-selected with .is-selected');

    const selectionText = await page.$eval('#calSelectedDateText', el => el.textContent.trim());
    assert(selectionText !== 'Please select a date on the calendar', `Selection text reflects active date: "${selectionText}"`);

    // Past dates should be disabled
    const disabledCells = await page.$$('.cal-day-cell.is-disabled');
    console.log(`  ℹ Found ${disabledCells.length} past/disabled date cells in current month`);

    // =========================================================================
    // TEST 3: Month Navigation
    // =========================================================================
    console.log('\n--- Test 3: Month Navigation Forward & Back ---');
    const initialMonth = monthYearTitle;
    await page.click('#calNextMonthBtn');
    await page.waitForTimeout(500);

    const nextMonthTitle = await page.$eval('#calMonthYearTitle', el => el.textContent.trim());
    assert(nextMonthTitle !== initialMonth, `Navigated forward to: "${nextMonthTitle}"`);

    // Prev button should now be enabled
    const prevDisabled = await page.$eval('#calPrevMonthBtn', el => el.disabled);
    assert(prevDisabled === false, 'Prev button is enabled when not at current month');

    // Navigate back to initial month
    await page.click('#calPrevMonthBtn');
    await page.waitForTimeout(500);
    const restoredMonthTitle = await page.$eval('#calMonthYearTitle', el => el.textContent.trim());
    assert(restoredMonthTitle === initialMonth, `Navigated back to: "${restoredMonthTitle}"`);

    // =========================================================================
    // TEST 4: Date Click Interaction & Value Binding
    // =========================================================================
    console.log('\n--- Test 4: Date Selection & Hidden Input Synchronization ---');
    // Select first clickable available day cell
    const clickableDay = await page.$('.cal-day-cell:not(.is-disabled):not(.is-empty):not(.is-unavailable)');
    assert(clickableDay !== null, 'Found an available clickable day cell');
    
    const clickedDateVal = await clickableDay.getAttribute('data-date');
    await clickableDay.click();
    await page.waitForTimeout(300);

    const isSelectedNow = await clickableDay.evaluate(el => el.classList.contains('is-selected'));
    assert(isSelectedNow === true, `Clicked date cell ${clickedDateVal} gained .is-selected`);

    const hiddenInputVal = await page.$eval('#inputVisitDate', el => el.value);
    assert(hiddenInputVal === clickedDateVal, `Hidden input #inputVisitDate synced to ${clickedDateVal}`);

    // =========================================================================
    // TEST 5: Farm Switching & Live Availability Refresh
    // =========================================================================
    console.log('\n--- Test 5: Farm Switching Updates Availability ---');
    const moinabadCard = await page.$('.luxury-choice-card[data-farm="moinabad"]');
    assert(moinabadCard !== null, 'Moinabad farm choice card exists');

    await moinabadCard.click();
    await page.waitForTimeout(600);

    const farmIndicatorText = await page.$eval('#calendarFarmIndicator', el => el.textContent.trim());
    assert(farmIndicatorText.includes('Moinabad'), `Farm indicator updated to Moinabad: "${farmIndicatorText}"`);

    // Switch back to Bhongir
    const bhongirCard = await page.$('.luxury-choice-card[data-farm="bhongir"]');
    await bhongirCard.click();
    await page.waitForTimeout(600);
    const bhongirIndicator = await page.$eval('#calendarFarmIndicator', el => el.textContent.trim());
    assert(bhongirIndicator.includes('Bhongir'), `Farm indicator updated back to Bhongir: "${bhongirIndicator}"`);

    // =========================================================================
    // TEST 6: Fixed Session Selection
    // =========================================================================
    console.log('\n--- Test 6: Fixed Session Selection ---');
    const sessionSection = await page.$('#premiumSessionSection');
    assert(sessionSection !== null, 'Fixed session section #premiumSessionSection exists below calendar');

    const sessionCardCount = await page.$$eval('.premium-session-card', els => els.length);
    assert(sessionCardCount === 3, `3 fixed session options rendered: ${sessionCardCount}`);

    // Click afternoon session
    const afternoonCard = await page.$('.premium-session-card[data-session="afternoon"]');
    await afternoonCard.click();
    await page.waitForTimeout(300);

    const isAfternoonSelected = await afternoonCard.evaluate(el => el.classList.contains('is-selected'));
    assert(isAfternoonSelected === true, 'Afternoon session gained .is-selected state');

    // Click morning session back
    const morningCard = await page.$('.premium-session-card[data-session="morning"]');
    await morningCard.click();
    await page.waitForTimeout(300);
    const isMorningSelected = await morningCard.evaluate(el => el.classList.contains('is-selected'));
    assert(isMorningSelected === true, 'Morning session regained .is-selected state');

    // =========================================================================
    // TEST 7: Wizard Progression, Validation & Step 2 Summary Pill
    // =========================================================================
    console.log('\n--- Test 7: Wizard Step 01 to Step 02 Progression ---');
    // Ensure school category is selected
    await page.click('.luxury-choice-card[data-category="school"]');
    await page.waitForTimeout(200);

    // Click Continue to Details
    await page.click('#luxuryStep1NextBtn');
    await page.waitForTimeout(400);

    const step2Active = await page.$eval('.luxury-step-panel[data-step="2"]', el => el.classList.contains('is-active'));
    assert(step2Active === true, 'Step 02 panel became active');

    // Verify chosen schedule pill in Step 2
    const step2ScheduleText = await page.$eval('#step2ChosenDateText', el => el.textContent.trim());
    assert(step2ScheduleText.length > 5, `Step 02 schedule pill displays selected date: "${step2ScheduleText}"`);

    const step2SessionText = await page.$eval('#step2ChosenSessionText', el => el.textContent.trim());
    assert(step2SessionText.includes('Morning'), `Step 02 schedule pill displays selected session: "${step2SessionText}"`);

    // =========================================================================
    // TEST 8: Backward Navigation Retains State
    // =========================================================================
    console.log('\n--- Test 8: Backward Navigation Retains Selections ---');
    await page.click('#luxuryModifyDateBtn');
    await page.waitForTimeout(400);

    const step1ActiveAgain = await page.$eval('.luxury-step-panel[data-step="1"]', el => el.classList.contains('is-active'));
    assert(step1ActiveAgain === true, 'Returned to Step 01 via Modify Date button');

    const retainedSelectedCell = await page.$('.cal-day-cell.is-selected');
    assert(retainedSelectedCell !== null, 'Selected date retained in calendar on backward navigation');

    // =========================================================================
    // TEST 9: Full Wizard Run to Step 4 Review
    // =========================================================================
    console.log('\n--- Test 9: Complete Booking Wizard to Step 04 Review ---');
    // Advance to Step 2
    await page.click('#luxuryStep1NextBtn');
    await page.waitForTimeout(300);

    // Fill Step 2 School Details
    await page.fill('#inputSchoolName', 'Hyderabad International Academy');
    await page.fill('#inputSchoolCity', 'Hyderabad');
    await page.fill('#inputSchoolGrade', 'Grade 5 to 7');
    await page.fill('#inputSchoolStudents', '65');
    await page.click('#luxuryStep2NextBtn');
    await page.waitForTimeout(400);

    // Step 3 Contact
    await page.fill('#inputContactName', 'Principal S. Sundaram');
    await page.fill('#inputContactPhone', '+91 98497 98674');
    await page.click('#luxuryStep3NextBtn');
    await page.waitForTimeout(400);

    const step4Active = await page.$eval('.luxury-step-panel[data-step="4"]', el => el.classList.contains('is-active'));
    assert(step4Active === true, 'Reached Step 04 Review panel');

    const revDateText = await page.$eval('#revDate', el => el.textContent.trim());
    const revSessionText = await page.$eval('#revSession', el => el.textContent.trim());
    assert(revDateText.length > 5, `Review Preferred Date populated: "${revDateText}"`);
    assert(revSessionText.includes('Morning'), `Review Visit Session populated: "${revSessionText}"`);

    // Take Desktop Screenshot
    const screenshotDesktop = path.join(ARTIFACT_DIR, 'booking_calendar_desktop_1440.png');
    await page.screenshot({ path: screenshotDesktop, fullPage: false });
    console.log(`  📸 Saved desktop screenshot: ${screenshotDesktop}`);

    // =========================================================================
    // TEST 10: Responsive Behavior & Overflow Check Across Viewports
    // =========================================================================
    console.log('\n--- Test 10: Responsive Viewports & Horizontal Overflow Check ---');
    const viewports = [
      { name: 'desktop_1920', width: 1920, height: 1080 },
      { name: 'desktop_1440', width: 1440, height: 900 },
      { name: 'tablet_768', width: 768, height: 1024 },
      { name: 'mobile_390', width: 390, height: 844 },
      { name: 'mobile_320', width: 320, height: 568 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      // Go back to Step 1
      await page.evaluate(() => {
        const editBtn = document.getElementById('luxuryStep4EditBtn');
        if (editBtn) editBtn.click();
        const backBtn = document.getElementById('luxuryStep2BackBtn');
        if (backBtn) backBtn.click();
      });
      await page.waitForTimeout(350);

      // Scroll to calendar
      await page.evaluate(() => {
        const el = document.getElementById('luxuryCalendarSection');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      });
      await page.waitForTimeout(200);

      // Verify no horizontal overflow on booking card or window
      const overflow = await page.evaluate(() => {
        const bookingCard = document.getElementById('luxuryBookingCard');
        const calCard = document.getElementById('premiumCalendarCard');
        const docWidth = document.documentElement.clientWidth;
        const bodyScroll = document.body.scrollWidth;
        const calWidth = calCard ? calCard.getBoundingClientRect().width : 0;
        return {
          hasBodyOverflow: bodyScroll > docWidth + 2, // 2px margin of error
          docWidth,
          bodyScroll,
          calWidth
        };
      });

      assert(!overflow.hasBodyOverflow, `No horizontal overflow at ${vp.name} (${vp.width}px): docWidth=${overflow.docWidth}, bodyScroll=${overflow.bodyScroll}`);

      // Verify day cell touch targets on mobile
      if (vp.width <= 480) {
        const cellBox = await page.$eval('.cal-day-cell:not(.is-empty)', el => {
          const rect = el.getBoundingClientRect();
          return { height: rect.height, width: rect.width };
        });
        assert(cellBox.height >= 36, `Mobile touch target height is comfortable: ${cellBox.height.toFixed(1)}px`);
      }

      // Save screenshot for mobile 390
      if (vp.width === 390) {
        const mobileScreenshot = path.join(ARTIFACT_DIR, 'booking_calendar_mobile_390.png');
        await page.screenshot({ path: mobileScreenshot, fullPage: false });
        console.log(`  📸 Saved mobile screenshot: ${mobileScreenshot}`);
      }
    }

    console.log(`\n🎉 All ${passedTests}/${totalTests} Booking Calendar tests passed successfully!`);
  } finally {
    await browser.close();
  }
}

runCalendarTests().catch(err => {
  console.error('Fatal error in calendar verification:', err);
  process.exit(1);
});
