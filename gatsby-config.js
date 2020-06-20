/* eslint-disable @typescript-eslint/camelcase */

const caseType = {
  exemptionAmnesty: 0,
  exemptionFromImprisonment: 0,
  exemptionOther: 0,
  part: "String",
  year: 0,
};

module.exports = {
  siteMetadata: {
    title: "Gatstrap",
    description: "Gatsby starter for bootstrap a blog",
    siteUrl: "https://gatstrap.netlify.com",
    author: "jaxx2104",
    twitter: "jaxx2104",
    adsense: "",
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/posts/`,
        name: "posts",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/images/`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
              wrapperStyle: "margin-bottom: 1.0725rem;",
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Gatstrap",
        short_name: "Gatstrap",
        description: "Gatsby starter for bootstrap a blog",
        homepage_url: "https://gatstrap.netlify.com",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#673ab7",
        display: "standalone",
        icons: [
          {
            src: "/img/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "",
      },
    },
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: `types/graphql-types.d.ts`,
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-twitter",
    "gatsby-plugin-typescript",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "internal__",

        // The url, this should be the endpoint you are attempting to pull data from
        url: `https://ssapi.ovdinfo.org/api/data`,

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Request body
        data: {
          breakdown: ["year"],
          filter: {
            part: ["105ч.2"],
            year: [2013, 2014],
          },
          param: [
            "exemptionAmnesty",
            "exemptionFromImprisonment",
            "exemptionOther",
          ],
        },

        // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
        // using this name. i.e. posts.json
        name: `cases`,

        schemaType: caseType,

        // Request parameters
        // Only available from version 2.1.0
        params: {},

        // enable disk caching
        allowCache: false,
        // if allowCache is true, then the cache will be purged after the
        // specified amount of time
        maxCacheDurationSeconds: 60 * 60 * 24,

        verboseOutput: true,
      },
    },
  ],
};
