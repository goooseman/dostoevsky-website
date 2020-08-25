/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const ukRf = require("./content/ук-рф.json");
const years = require("./content/years.json");

const getRouteForClausePage = (clauseId, year, page, view) => {
  let route = `/${clauseId}/${year}/`;
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
        for (let year of years) {
          const context = {
            partRegex: `/^${chapter.id}[^\.]/i`,
            year: year.toString(),
            clauseId: chapter.id,
          };
          createPage({
            path: getRouteForClausePage(chapter.id, year, "", "page"),
            component: path.resolve(`src/page-templates/clause-main.tsx`),
            context,
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
            try {
              createPage({
                path: getRouteForClausePage(chapter.id, year, "parts", view),
                component: path.resolve(`src/page-templates/clause-parts.tsx`),
                context: { ...context, view },
              });
            } catch (e) {
              if (!(e instanceof Error)) {
                throw e;
              }
              if (e.message !== "Page does not exists") {
                throw e;
              }
            }
          }
          createPage({
            path: getRouteForClausePage(chapter.id, year, "chronology", "page"),
            component: path.resolve(`src/page-templates/clause-chronology.tsx`),
            context,
          });
          createPage({
            path: getRouteForClausePage(chapter.id, year, "full", "page"),
            component: path.resolve(`src/page-templates/clause-full.tsx`),
            context,
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
