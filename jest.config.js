// const { pathsToModuleNameMapper } = require("ts-jest/utils");
// const { compilerOptions } = require("./tsconfig");

module.exports = {
  collectCoverageFrom: ["test/**/*.{js,jsx,ts,tsx}", "!test/**/*.d.ts"],
  setupFiles: ["<rootDir>/config/polyfills.js"],
  testMatch: ["<rootDir>/src/**/?(*.)spec.(j|t)s?(x)"],
  testEnvironment: "node",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.tsx?$": "<rootDir>/config/jest/typescriptTransform.js",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es/)"],
  moduleNameMapper: {
    "@components/(.*)$": "<rootDir>/src/components/$1",
    "@utils/(.*)$": "<rootDir>/src/utils/$1",
    "@validator/(.*)$": "<rootDir>/src/validator/$1",
    "@constants/(.*)$": "<rootDir>/src/constants/$1"
  },
  moduleFileExtensions: [
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "web.js",
    "js",
    "web.jsx",
    "jsx",
    "json",
    "node",
    "mjs"
  ],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json"
    }
  }
};
