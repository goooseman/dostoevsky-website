/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
let ukRf = require("./content/ук-рф.json");
const years = require("./content/years.json");
const { getRouteForClausePage } = require("./gatsby-routing");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const IS_SEMI_BUILD = Boolean(process.env.IS_SEMI_BUILD);
  if (IS_SEMI_BUILD) {
    ukRf = ukRf.slice(3, 4); // Leave only first 1 clause group
  }

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            html
            frontmatter {
              slug
              tag
              title
              teaser
              date
              author
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    console.log(result.errors);
  } else {
    // console.log("got articles");
    // console.debug(result.data);
    result.data.allMarkdownRemark.edges.forEach(
      async ({ node }) =>
        await createPage({
          path: node.frontmatter.slug,
          component: require.resolve("./src/page-templates/article-full.tsx"),
          context: {
            article: { ...node.frontmatter, html: node.html },
            slug: node.frontmatter.slug,
          },
        })
    );
  }
  if (!Boolean(process.env.IS_BLOG_BUILD)) {
    // Create a separate index for every year, but not first one (the first one is default index)
    for (let year of years.slice(1)) {
      createPage({
        path: `/${year}/`,
        component: path.resolve(`src/page-templates/index-year.tsx`),
        context: { year },
      });
    }

    for (let part of ukRf) {
      for (let section of part.children) {
        for (let chapter of section.children) {
          const context = {
            partRegex: `/^${chapter.id}[^\.]/i`,
            clauseRegex: `/^${chapter.id}/i`,
            clauseId: chapter.id,
          };
          for (let year of years) {
            const contextWithYear = {
              partRegex: `/^${chapter.id}[^\.]/i`,
              clauseRegex: `/^${chapter.id}/i`,
              year: year,
              clauseId: chapter.id,
            };
            const mainPageViewModes = [
              "page",
              "table",
              "focus",
              "iframe-table-common-main-by-result",
              "iframe-table-common-add-by-result",
              "iframe-by-result",
            ];
            for (const view of mainPageViewModes) {
              createPage({
                path: getRouteForClausePage(chapter.id, year, "main", view),
                component: path.resolve(`src/page-templates/clause-main.tsx`),
                context: { ...contextWithYear, view },
              });
            }
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
              component: path.resolve(
                `src/page-templates/clause-chronology.tsx`
              ),
              context: { ...context, view },
            });
          }
        }
      }
    }
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: { fs: "empty" },
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
