import { test as base } from '@playwright/test';

import { attachScreenshotAfterEach } from '../utilities/screenshot.js';


// ======================================================
// CUSTOM PLAYWRIGHT FIXTURE
// ======================================================

export const test = base.extend({

  pageSetup: [

    async ({ page }, use) => {

      await use();

    },

    { auto: true }

  ]

});


// ======================================================
// SCREENSHOT AFTER EACH TEST
// ======================================================

test.afterEach(async ({ page }, testInfo) => {

  await attachScreenshotAfterEach(
    page,
    testInfo
  );

});


// ======================================================
// EXPECT
// ======================================================

export { expect } from '@playwright/test';