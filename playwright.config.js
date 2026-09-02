// @ts-check

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // ======================================================
  // TEST DIRECTORY
  // ======================================================

  testDir: './tests',

testMatch: '**/*.spec.js',


  // ======================================================
  // TEST EXECUTION
  // ======================================================

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,


  // ======================================================
  // ALLURE REPORTER
  // ======================================================

  reporter: [
    ['list'],
    ['allure-playwright']
  ],


  // ======================================================
  // COMMON SETTINGS
  // ======================================================

  use: {

    trace: 'on-first-retry',

    screenshot: 'only-on-failure'

  },


  // ======================================================
  // BROWSERS
  // ======================================================

  projects: [

    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'firefox',

      use: {
        ...devices['Desktop Firefox']
      }
    },

    {
      name: 'webkit',

      use: {
        ...devices['Desktop Safari']
      }
    }

  ]

});