/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const ukRf = require("./content/ук-рф.json");
const years = require("./content/years.json");

const getRouteForClausePage = (clauseId, year, page, view) => {
  let route = `/${clauseId}/`;
  if (year) {
    route += `${year}/`;
  }
  if (page !== "") {
    route += `${page}/`;
  }
  if (view !== "page") {
    route += `${view}/`;
  }
  return route;
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  for (let part of ukRf) {
    for (let section of part.children) {
      for (let chapter of section.children) {
        const context = {
          partRegex: `/^${chapter.id}[^\.]/i`,
          clauseId: chapter.id,
        };
        for (let year of years) {
          const contextWithYear = {
            partRegex: `/^${chapter.id}[^\.]/i`,
            clauseRegex: `/^${chapter.id}[^\.]/i`,
            year: year.toString(),
            clauseId: chapter.id,
          };
          createPage({
            path: getRouteForClausePage(chapter.id, year, "", "page"),
            component: path.resolve(`src/page-templates/clause-main.tsx`),
            context: contextWithYear,
          });
          const partsPageViewModes = [
            "page",
            "table",
            "iframe-parts",
            "iframe-parts-by-result",
            "iframe-parts-by-punishment",
            "iframe-table-parts",
          ];
          for (const view of partsPageViewModes) {
            createPage({
              path: getRouteForClausePage(chapter.id, year, "parts", view),
              component: path.resolve(`src/page-templates/clause-parts.tsx`),
              context: { ...contextWithYear, view },
            });
          }
          createPage({
            path: getRouteForClausePage(chapter.id, year, "full", "page"),
            component: path.resolve(`src/page-templates/clause-full.tsx`),
            context: contextWithYear,
          });
        }

        const chronoPageViewModes = [
          "page",
          "table",
          "iframe-convicted-dynamics",
          "iframe-punishment-dynamics",
          "iframe-table-chronology-by-result",
          "iframe-table-chronology-by-punishment",
        ];
        for (const view of chronoPageViewModes) {
          createPage({
            path: getRouteForClausePage(
              chapter.id,
              undefined,
              "chronology",
              view
            ),
            component: path.resolve(`src/page-templates/clause-chronology.tsx`),
            context: { ...context, view },
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
