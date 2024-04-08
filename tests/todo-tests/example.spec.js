// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('emulation context geolocation', async ({ page }) => {
  await page.goto('https://www.openstreetmap.org');
  await expect(page).toHaveTitle('OpenStreetMap');
  await page.getByLabel('Show My Location').click();
});

test('use dark color cheme', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.waitForTimeout(3 * 1000);
});

test.describe('tests with annotation', {
  annotation: {
    type: 'hint',
    description: 'Annotation for each tests inside this .describe block',
  },
}, () => {
  test.skip('playwright will skip this test', async ({ page }) => {
    console.log('this test will never run');
  });

  test('playwright will skip this test for firefox browser', async ({ browserName }) => {
    test.skip(browserName === 'firefox', 'Still working on it');
    console.log('this test will never run on the firefox browser');
  });

  test.fail('the result of this test all time will be a fail', async () => {
    console.log('test with fail anotation');
  });

  test.fixme('also fail the  test but playwright will not run this test, as opposed to the fail annotation', async () => {
    console.log('test with fixme anotation');
  });

  test('slow anotation test', async () => {
    test.slow();
    console.log('marks the test as slow and triples the test timeout');
  });
});

test.describe('tests with tag', { tag: '@report' }, () => {
  test('test only for firefox browser', { tag: '@firefox' }, () => {
    console.log('firefox')
  });
});

test('multiple tags test', {
  tag: ['@slow', '@vrt', '@test', '@chromeonly']
}, async () => {
  console.log('this test contains a multiple tag');
});

test('annotate a single test', {
  annotation: [
    {
      type: 'issue',
      description: 'https://github.com/microsoft/playwright/issues/23180'
    },
    {
      type: 'info',
      description: 'second custom annotation for this test',
    },
  ]
}, async () => {
  console.log('This test has custom annotation.');
});