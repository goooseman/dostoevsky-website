module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css)$": "identity-obj-proxy",
  },
  setupFiles: ["<rootDir>/__mocks__/matchMediaMock.js"],
  modulePaths: ["<rootDir>/"],
  collectCoverageFrom: [
    "src/**/*.ts?(x)",
    "!src/**/*.stories.tsx",
    "!src/**/index.ts?(x)",
  ],
  testPathIgnorePatterns: ["<rootDir>/.cache/", "<rootDir>/node_modules/"],
  globals: {
    "ts-jest": {
      diagnostics: false,
      tsConfig: "./tsconfig.node.json",
    },
  },
};
