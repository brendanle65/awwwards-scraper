module.exports = {
  /** Specifies how to partition the tests in a monorepo */
  projects: [
    {
      /* Label that will be recognised by jest */
      displayName: 'scrapers',
      /* Inherit ts-jest's default configuration */
      preset: 'ts-jest',
      /** The glob patterns Jest uses to detect test files */
      testMatch: ['<rootDir>/packages/scrapers/**/*.test.ts']
    },
    {
      displayName: 'utils',
      preset: 'ts-jest',
      testMatch: ['<rootDir>/packages/utils/**/*.test.ts']
    },
    {
      displayName: 'aggregate',
      preset: 'ts-jest',
      testMatch: ['<rootDir>/scripts/aggregate/**/*.test.ts']
    },
    {
      displayName: 'download',
      preset: 'ts-jest',
      testMatch: ['<rootDir>/scripts/download/**/*.test.ts']
    }
  ]
};
