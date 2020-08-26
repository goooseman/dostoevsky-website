const dataRequest = {
  breakdown: ["part", "year"],
  filter: {},
  param: [
    "acquittal",
    "addAcquittalOffences",
    "addAcquittalPersons",
    "addDismissalOffences",
    "addDismissalOtherOffences",
    "addDismissalOtherPersons",
    "addDismissalPersons",
    "addDisqualification",
    "addFine",
    "addFine100_300",
    "addFine1M",
    "addFine25_100",
    "addFine300_500",
    "addFine5",
    "addFine500_1M",
    "addFine5_25",
    "addFineSum",
    "addRestrain",
    "addTitlesWithdraw",
    "addTotalOffences",
    "addTotalPersons",
    "addUnfitToPleadOffences",
    "addUnfitToPleadPersons",
    "coerciveMeasures",
    "dismissalAbsenceOfEvent",
    "dismissalAmnesty",
    "dismissalCourtFine",
    "dismissalCourtFine100",
    "dismissalCourtFine25_100",
    "dismissalCourtFine5",
    "dismissalCourtFine5_25",
    "dismissalCourtFineSum",
    "dismissalOther",
    "dismissalReconciliation",
    "dismissalRepentance",
    "dismissalRepentance2",
    "exemptionAmnesty",
    "exemptionFromImprisonment",
    "exemptionOther",
    "noCrimeNecessity",
    "noCrimeOther",
    "noCrimeSelf-defence",
    "primaryArrest",
    "primaryCommunityService",
    "primaryCorrectionalLabour",
    "primaryDisqualification",
    "primaryFine",
    "primaryFine100_300",
    "primaryFine1M",
    "primaryFine25_100",
    "primaryFine300_500",
    "primaryFine5",
    "primaryFine500_1M",
    "primaryFine5_25",
    "primaryFineSum",
    "primaryForcedLabour",
    "primaryImprisonment",
    "primaryImprisonment1",
    "primaryImprisonment10_15",
    "primaryImprisonment15_20",
    "primaryImprisonment1_2",
    "primaryImprisonment2_3",
    "primaryImprisonment3_5",
    "primaryImprisonment5_8",
    "primaryImprisonment8_10",
    "primaryImprisonmentUnderLowerLimit",
    "primaryLifeSentence",
    "primaryMilitaryDisciplinaryUnit",
    "primaryOther",
    "primaryRestrain",
    "primaryRestrain2009",
    "primaryRestrictionsInMilitaryService",
    "primarySuspended",
    "totalConvicted",
    "unfinishedOffence",
  ],
};

const dataResponseType = {
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
  part: 0,
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
  part: "String",
  year: "String",
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Dostoevsky",
    description: "SEO description of dostoevsky",
    siteUrl: process.env.SITE_URL,
  },
  pathPrefix: "/",
  plugins: [
    "gatsby-plugin-postcss",
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
        allowCache: false,
        // if allowCache is true, then the cache will be purged after the
        // specified amount of time
        maxCacheDurationSeconds: 60 * 60 * 24,
        localSave: true,
        path: `${__dirname}/content/api-`,

        verboseOutput: false,
        entitiesArray: [
          {
            name: "data",

            // The url, this should be the endpoint you are attempting to pull data from
            url: `https://ssapi.ovdinfo.org/api/data`,

            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
            // Request body
            data: dataRequest,

            schemaType: dataResponseType,

            // Request parameters
            // Only available from version 2.1.0
            params: {},
          },
        ],
      },
    },
  ],
};
