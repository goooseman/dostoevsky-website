/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allApiServerData(filter: { id: { ne: "dummy" } }) {
        edges {
          node {
            part
            year
          }
        }
      }
    }
  `);

  result.data.allApiServerData.edges.forEach(({ node }) => {
    createPage({
      path: `${node.part}-${node.year}`,
      component: path.resolve(`src/templates/Case/CasePage.tsx`),
      context: {
        partRegex: `/^${node.part}/i`,
        year: node.year,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src/"),
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
