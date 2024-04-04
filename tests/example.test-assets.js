import{ test } from "@playwright/test";

test('test ignore test-assets', async () => {
    console.log('This test will not run ');
});