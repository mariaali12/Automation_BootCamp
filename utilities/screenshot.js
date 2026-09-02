import { test } from '@playwright/test';


// ======================================================
// SCREENSHOT DURING TEST
// ======================================================

export async function attachStepScreenshot(page, name) {

  const screenshot = await page.screenshot({
    fullPage: true
  });

  await test.info().attach(name, {
    body: screenshot,
    contentType: 'image/png'
  });

}


// ======================================================
// SCREENSHOT AFTER EACH TEST
// ======================================================

export async function attachScreenshotAfterEach(page, testInfo) {

  // Always attach final screenshot
  const finalScreenshot = await page.screenshot({
    fullPage: true
  });

  await testInfo.attach('Final Screenshot', {
    body: finalScreenshot,
    contentType: 'image/png'
  });


  // Attach failure screenshot only when test fails
  if (testInfo.status !== testInfo.expectedStatus) {

    const failureScreenshot = await page.screenshot({
      fullPage: true
    });

    await testInfo.attach('Failure Screenshot', {
      body: failureScreenshot,
      contentType: 'image/png'
    });

  }

}