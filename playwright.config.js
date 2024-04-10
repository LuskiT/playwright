// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({
  path: './env/.env.main',
});
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  // Glob patterns or regular expressions to ignore test files.
  testIgnore: '*test-assets',
  // Glob patterns or regular expressions that match test files.
  testMatch: '*todo-tests/*.spec.js',
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `${process.env.BASE_URL}`,
    // Populates context with given storage state.
    // storageState: 'state.json',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // Folder for test artifacts such as screenshots, videos, traces, etc.
    outputDir: 'test-results',
    // Capture screenshot after each test failure.
    screenshot: 'off',//Options include 'off', 'on' and 'only-on-failure'
    // Record video only when retrying a test for the first time.
    video: 'off',//Options include: 'off', 'on', 'retain-on-failure' and 'on-first-retry'
    // Each test is given 30 seconds.
    timeout: 30 * 1000,
    // Emulates `'prefers-colors-scheme'` media feature.
    colorScheme: 'light', // or 'dark'
    // Context geolocation.
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    // Grants specified permissions to the browser context.
    permissions: ['geolocation'],    
    // Emulates the user locale.
    locale: 'en-GB',
    // Emulates the user timezone.
    timezoneId: 'Europe/London',
    // Whether to automatically download all the attachments.
    acceptDownloads: false,
    // An object containing additional HTTP headers to be sent with every request.
    // extraHTTPHeaders: { 'X-My-Header': 'value', },
    // Credentials for HTTP authentication.
    // httpCredentials: {  username: 'user', password: 'pass', },
    // Whether to ignore HTTPS errors during navigation.
    ignoreHTTPSErrors: true,
    // Whether to emulate network being offline.
    offline: false,
    // Proxy settings used for all pages in the test.
    // proxy: {  server: 'http://myproxy.com:3128',  bypass: 'localhost',  },
    // Maximum time each action such as `click()` can take. Defaults to 0 (no limit).
    actionTimeout: 0,
    // Name of the browser that runs tests. For example `chromium`, `firefox`, `webkit`.
    browserName: 'chromium',
    // Toggles bypassing Content-Security-Policy.
    bypassCSP: false,
    // Channel to use, for example "chrome", "chrome-beta", "msedge", "msedge-beta".
    channel: 'chrome',
    // Run browser in headless mode.
    headless: true,
  },
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,
    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },
    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the
      // total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.1,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
      // Viewport used for all pages in the context.
      viewport: { width: 1366, height: 768,},
    },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

