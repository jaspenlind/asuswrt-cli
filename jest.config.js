// // jest.config.js
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { pathsToModuleNameMapper } = require("ts-jest/utils");
// // In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// // which contains the path mapping (ie the `compilerOptions.paths` option):
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  // roots: [SRC_PATH],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  setupFilesAfterEnv: ["jest-extended"],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //   prefix: "<rootDir>/"
  // }),
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
