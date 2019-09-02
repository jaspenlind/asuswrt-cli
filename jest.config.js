module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  setupFilesAfterEnv: ["jest-extended"],
  moduleFileExtensions: ["ts", "js"],
  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/test/jest/flex.test-data"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/test/**/*.test.(ts|js)"],
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/{!(*.d.ts),}.{ts,js}"]
};
