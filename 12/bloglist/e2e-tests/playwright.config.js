// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const webServerConfig = [
  {
    command: 'npm run dev',
    cwd: '../frontend',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  }
]

if (process.env.CI) {
  webServerConfig.push({
    command: 'npm run start:e2e-tests',
    cwd: '../backend',
    url: 'http://localhost:3000/api/health',
    reuseExistingServer: !process.env.CI,
    env: {
      TEST_MONGODB_URI: process.env.TEST_MONGODB_URI,
      SECRET: process.env.SECRET,
      PORT: 3003
    },
  })
} else {
  webServerConfig.push({
    command: 'npm run start:e2e-tests-local',
    cwd: '../backend',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  })
}

export default defineConfig({
  testDir: './tests',
  /* Do not run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

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
  webServer: webServerConfig,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
});

