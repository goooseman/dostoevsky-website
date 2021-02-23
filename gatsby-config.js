const api_base = "https://api.dostoevsky.io/api";
const api_token = "4137acbc9dcdc269b0fdeafc8b4b820f035d7f2f";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Token " + api_token,
};

const dataResponseType = {
  id: 0,
  category: null,
  name: "String",
  year: 0,
  part: "String",
  parameters: {
    acquittal: 0,
    addAcquittalOffences: 0,
    addAcquittalPersons: 0,
    addDismissalOffences: 0,
    addDismissalOtherOffences: 0,
    addDismissalOtherPersons: 0,
    addDismissalPersons: 0,
    addDisqualification: 0,
    addFine: 0,
    addFine100_300: 0,
    addFine1M: 0,
    addFine25_100: 0,
    addFine300_500: 0,
    addFine5: 0,
    addFine500_1M: 0,
    addFine5_25: 0,
    addFineSum: 0,
    addRestrain: 0,
    addTitlesWithdraw: 0,
    addTotalOffences: 0,
    addTotalPersons: 0,
    addUnfitToPleadOffences: 0,
    addUnfitToPleadPersons: 0,
    coerciveMeasures: 0,
    dismissalAbsenceOfEvent: 0,
    dismissalAmnesty: 0,
    dismissalCourtFine: 0,
    dismissalCourtFine100: 0,
    dismissalCourtFine25_100: 0,
    dismissalCourtFine5: 0,
    dismissalCourtFine5_25: 0,
    dismissalCourtFineSum: 0,
    dismissalOther: 0,
    dismissalReconciliation: 0,
    dismissalRepentance: 0,
    dismissalRepentance2: 0,
    exemptionAmnesty: 0,
    exemptionFromImprisonment: 0,
    exemptionOther: 0,
    noCrimeNecessity: 0,
    noCrimeOther: 0,
    "noCrimeSelf-defence": 0,
    primaryArrest: 0,
    primaryCommunityService: 0,
    primaryCorrectionalLabour: 0,
    primaryDisqualification: 0,
    primaryFine: 0,
    primaryFine100_300: 0,
    primaryFine1M: 0,
    primaryFine25_100: 0,
    primaryFine300_500: 0,
    primaryFine5: 0,
    primaryFine500_1M: 0,
    primaryFine5_25: 0,
    primaryFineSum: 0,
    primaryForcedLabour: 0,
    primaryImprisonment: 0,
    primaryImprisonment1: 0,
    primaryImprisonment10_15: 0,
    primaryImprisonment15_20: 0,
    primaryImprisonment1_2: 0,
    primaryImprisonment2_3: 0,
    primaryImprisonment3_5: 0,
    primaryImprisonment5_8: 0,
    primaryImprisonment8_10: 0,
    primaryImprisonmentUnderLowerLimit: 0,
    primaryLifeSentence: 0,
    primaryMilitaryDisciplinaryUnit: 0,
    primaryOther: 0,
    primaryRestrain: 0,
    primaryRestrain2009: 0,
    primaryRestrictionsInMilitaryService: 0,
    primarySuspended: 0,
    totalConvicted: 0,
    unfinishedOffence: 0,
  },
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({
  path: `.env.${process.env.ENV || process.env.NODE_ENV}`,
});

module.exports = {
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    FAST_REFRESH: true,
  },
  siteMetadata: {
    title: "Dostoevsky",
    description: "SEO description of dostoevsky",
    siteUrl: process.env.SITE_URL,
    embedsUrl: process.env.EMBEDS_URL,
    api: {
      base: api_base,
      token: api_token,
      headers,
    },
  },
  pathPrefix: "/",
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts/`,
        name: `articles`,
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
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Dostoevsky",
        short_name: "Dostoevsky",
        description: "SEO description of dostoevsky",
        homepage_url: process.env.SITE_URL,
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
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-7WCG41WREZ"],
      },
    },
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: `types/graphql-types.d.ts`,
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-typescript",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "api_server__",

        // enable disk caching
        allowCache: true,
        // if allowCache is true, then the cache will be purged after the
        // specified amount of time
        maxCacheDurationSeconds: 60 * 60 * 24 * 30, // 60 * 60 * 24,
        localSave: true,
        path: `${__dirname}/content/api-`,

        verboseOutput: true,
        entitiesArray: [
          {
            name: "data",

            // The url, this should be the endpoint you are attempting to pull data from
            // url: `https://ssapi.ovdinfo.org/api/data`,
            url: api_base + "/data/",
            method: "GET",
            verboseOutput: true,
            headers,

            schemaType: dataResponseType,

            // Request parameters
            // Only available from version 2.1.0
            params: {},
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-force-file-loader`,
      options: {
        rules: [
          "fonts" /* Matches Gatsby default rules for fonts */,
          "images" /* Matches Gatsby default rules for images */,
          "media" /* Matches Gatsby default rules for media (video/audio) */,
        ],
      },
    },
    "gatsby-plugin-uninline-styles",
    "gatsby-plugin-zeit-now",
  ],
};
