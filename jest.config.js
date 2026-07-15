/**
 * Jest configuration for ConT Public Demo
 */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["**/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^@cont-public/(.*)$": "<rootDir>/packages/$1/src",
  },
  collectCoverageFrom: [
    "packages/**/src/**/*.ts",
    "!packages/**/src/**/*.d.ts",
  ],
  coverageThreshold: {
    global: {
      lines: 70,
      functions: 70,
      branches: 65,
      statements: 70,
    },
  },
};
