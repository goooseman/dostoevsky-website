/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const ukRf = require("./content/ук-рф.json");
const years = require("./content/years.json");

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  for (let part of ukRf) {
    for (let section of part.children) {
      for (let chapter of section.children) {
        for (let year of years) {
          createPage({
            path: `/${chapter.key}/${year}`,
            component: path.resolve(`src/page-templates/clause.tsx`),
            context: {
              partRegex: `/^${chapter.key}/i`,
              year: year.toString(),
              clauseId: chapter.key,
            },
          });
        }
      }
    }
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src/"),
        content: path.resolve(__dirname, "content/"),
        types: path.resolve(__dirname, "types/"),
      },
    },
    plugins: [
      new WebpackShellPluginNext({
        onBuildStart: {
          scripts: ["npm run intl:generate-json"],
          blocking: true,
          parallel: false,
        },
      }),
    ],
  });
};
