module.exports = {
  plugins: {
    "postcss-normalize": {},
    "postcss-custom-properties": {
      preserve: true,
      importFrom: "src/styles/themes/default.css",
    },
    "postcss-custom-media": {
      preserve: false,
      importFrom: "src/styles/breakpoints.ts",
    },
    autoprefixer: {},
    cssnano: {
      preset: "default",
    },
  },
};
