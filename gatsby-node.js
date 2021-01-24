/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
let ukRf = require("./content/ук-рф.json");
const years = require("./content/years.json");
const {
  getRouteForClausePage,
  getRouteForIndexPage,
  LOCALE_CODES,
} = require("./gatsby-routing");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const IS_SEMI_BUILD = Boolean(process.env.IS_SEMI_BUILD);
  const IS_WITHOUT_EMBED = Boolean(process.env.IS_WITHOUT_EMBED);
  const IS_ONLY_EMBED = Boolean(process.env.IS_ONLY_EMBED);

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
    for (locale of LOCALE_CODES) {
      for (let year of years) {
        const indexPageViewModes = [
          IS_ONLY_EMBED ? undefined : "page",
          IS_WITHOUT_EMBED ? undefined : "iframe-top-clauses",
          IS_WITHOUT_EMBED ? undefined : "iframe-by-punishment",
        ];
        for (view of indexPageViewModes) {
          if (view === undefined) {
            continue;
          }
          createPage({
            path: getRouteForIndexPage(locale, year, view),
            component: path.resolve(`src/page-templates/index-year.tsx`),
            context: { year, view },
          });
        }
      }
    }

    for (let part of ukRf) {
      for (let section of part.children) {
        for (let chapter of section.children) {
          const context = {
            partRegex: `/^${chapter.id}[^\.]/i`,
            clauseRegex: `/^${chapter.id}[^\.]/i`,
            clauseId: chapter.id,
          };
          for (let locale of LOCALE_CODES) {
            for (let year of years) {
              const contextWithYear = {
                ...context,
                year: year,
              };
              const mainPageViewModes = [
                IS_ONLY_EMBED ? undefined : "page",
                IS_ONLY_EMBED ? undefined : "table",
                IS_ONLY_EMBED ? undefined : "focus",
                IS_WITHOUT_EMBED
                  ? undefined
                  : "iframe-table-common-main-by-result",
                IS_WITHOUT_EMBED
                  ? undefined
                  : "iframe-table-common-add-by-result",
                IS_WITHOUT_EMBED ? undefined : "iframe-by-result",
              ];
              for (const view of mainPageViewModes) {
                if (view === undefined) {
                  continue;
                }
                createPage({
                  path: getRouteForClausePage(
                    locale,
                    chapter.id,
                    year,
                    "main",
                    view
                  ),
                  component: path.resolve(`src/page-templates/clause-main.tsx`),
                  context: { ...contextWithYear, view },
                });
              }
              const partsPageViewModes = [
                IS_ONLY_EMBED ? undefined : "page",
                IS_ONLY_EMBED ? undefined : "table",
                IS_WITHOUT_EMBED ? undefined : "iframe-parts",
                IS_WITHOUT_EMBED ? undefined : "iframe-parts-by-result",
                IS_WITHOUT_EMBED ? undefined : "iframe-parts-by-punishment",
                IS_WITHOUT_EMBED ? undefined : "iframe-table-parts",
              ];
              for (const view of partsPageViewModes) {
                if (view === undefined) {
                  continue;
                }
                createPage({
                  path: getRouteForClausePage(
                    locale,
                    chapter.id,
                    year,
                    "parts",
                    view
                  ),
                  component: path.resolve(
                    `src/page-templates/clause-parts.tsx`
                  ),
                  context: { ...contextWithYear, view },
                });
              }
              createPage({
                path: getRouteForClausePage(
                  locale,
                  chapter.id,
                  year,
                  "full",
                  "page"
                ),
                component: path.resolve(`src/page-templates/clause-full.tsx`),
                context: contextWithYear,
              });
            }
          }
          const chronoPageViewModes = [
            IS_ONLY_EMBED ? undefined : "page",
            IS_ONLY_EMBED ? undefined : "table",
            IS_WITHOUT_EMBED ? undefined : "iframe-convicted-dynamics",
            IS_WITHOUT_EMBED ? undefined : "iframe-punishment-dynamics",
            IS_WITHOUT_EMBED ? undefined : "iframe-table-chronology-by-result",
            IS_WITHOUT_EMBED
              ? undefined
              : "iframe-table-chronology-by-punishment",
          ];
          for (const view of chronoPageViewModes) {
            if (view === undefined) {
              continue;
            }
            createPage({
              path: getRouteForClausePage(
                locale,
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
