const path = require("path");
const webpack = require("webpack");

module.exports = {
  stories: ["../src/**/*.stories.(tsx|mdx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-storysource",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-viewport/register",
    "@storybook/addon-a11y/register",
  ],
  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader");
    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
    ];
    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve("@babel/plugin-proposal-class-properties"),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve("babel-plugin-remove-graphql-queries"),
    ];
    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"];
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
        plugins: [
          require.resolve("@babel/plugin-proposal-class-properties"),
          // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
          require.resolve("babel-plugin-remove-graphql-queries"),
        ],
      },
    });

    config.resolve.extensions.push(".ts", ".tsx");

    config.module.rules.find(
      (rule) => rule.test.toString() === "/\\.css$/"
    ).exclude = /\.module\.css$/;

    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            camelCase: "dashesOnly",
            localIdentName: "[name]--[local]--[hash:base64:5]",
            modules: true,
            importLoaders: 1,
          },
        },
        "postcss-loader",
      ],
    });

    config.module.rules.push({
      test: /\.stories\.tsx?$/,
      exclude: [/node_modules/],
      loaders: [
        {
          loader: require.resolve("@storybook/source-loader"),
          options: { parser: "typescript" },
        },
      ],
      enforce: "pre",
    });

    // https://www.npmjs.com/package/react-docgen-typescript-loader
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            // Provide the path to your tsconfig.json so that your stories can
            // display types from outside each individual story.
            tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
          },
        },
      ],
    });

    config.resolve.alias = {
      src: path.resolve(__dirname, "../src/"),
      content: path.resolve(__dirname, "../content/"),
      types: path.resolve(__dirname, "../types/"),
    };

    config.plugins.push(
      new webpack.EnvironmentPlugin({
        DISABLE_TARGEM_WARNINGS: true,
      })
    );

    return config;
  },
};
