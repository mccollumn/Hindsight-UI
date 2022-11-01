export const pageData = {
  definition: {
    accountID: 1,
    profileID: "St6eSCNa8k8",
    ID: "18d039ae0360",
    name: "Pages",
    language: null,
    isRealtime: false,
    type: "dimensional",
    properties: {
      isHierarchy: false,
      intervalsEnabled: true,
      IsSearchable: true,
      internalID: "toppages_v",
      IsRealTimeCompatible: true,
      ProfileCategory: null,
      totals: "all",
      ContainsRealtimeData: false,
      LastUpdate: "Unknown",
      datasource: "engine",
      enginesearchtime: "4283.2085",
    },
    dimension: {
      ID: "Time",
      name: "Time",
      type: "period",
      Range: { startperiod: "2022m01d01", endperiod: "2022m01d05" },
      Properties: null,
      SubDimension: {
        ID: "Url",
        name: "Pages",
        type: "data",
        Range: null,
        Properties: null,
        SubDimension: null,
      },
    },
    measures: [
      {
        name: "Visits",
        accumulationType: null,
        ID: "Users-0",
        columnID: 0,
        measureFormatType: null,
        AllowTotals: true,
        Sortable: false,
      },
      {
        name: "Views",
        accumulationType: null,
        ID: "Hits-0",
        columnID: 0,
        measureFormatType: null,
        AllowTotals: true,
        Sortable: false,
      },
      {
        name: "Average Time Viewed",
        accumulationType: null,
        ID: "Time-0",
        columnID: 0,
        measureFormatType: null,
        AllowTotals: true,
        Sortable: false,
      },
    ],
  },
  data: {
    "01/01/2022-01/05/2022": {
      measures: { Visits: null, Views: 1529.0, "Average Time Viewed": null },
      SubRows: {
        "http://www.webtrends.com/": {
          Attributes: {
            Title: "Webtrends Analytics — Webtrends",
            UrlLink: "http://www.webtrends.com/",
          },
          measures: {
            Visits: 640.0,
            Views: 832.0,
            "Average Time Viewed": 63.0,
          },
          SubRows: null,
        },
        "http://www.webtrends.com/support/help-center/": {
          Attributes: {
            Title: "Help Center — Webtrends",
            UrlLink: "http://www.webtrends.com/support/help-center/",
          },
          measures: { Visits: 69.0, Views: 79.0, "Average Time Viewed": 82.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/legal/privacy-statement/": {
          Attributes: {
            Title: "Privacy Statement — Webtrends",
            UrlLink: "http://www.webtrends.com/legal/privacy-statement/",
          },
          measures: { Visits: 57.0, Views: 60.0, "Average Time Viewed": 5.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/products/analytics-for-web-apps/saas/": {
          Attributes: {
            Title: "Analytics For Web Apps: Overview (SaaS) — Webtrends",
            UrlLink:
              "http://www.webtrends.com/products/analytics-for-web-apps/saas/",
          },
          measures: { Visits: 51.0, Views: 63.0, "Average Time Viewed": 42.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/about-us/": {
          Attributes: {
            Title: "About Us — Webtrends",
            UrlLink: "http://www.webtrends.com/about-us/",
          },
          measures: { Visits: 42.0, Views: 49.0, "Average Time Viewed": 47.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/products/analytics-for-sharepoint/saas/": {
          Attributes: {
            Title: "Analytics For SharePoint®: Overview (SaaS) — Webtrends",
            UrlLink:
              "http://www.webtrends.com/products/analytics-for-sharepoint/saas/",
          },
          measures: { Visits: 41.0, Views: 54.0, "Average Time Viewed": 97.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/get-demo/": {
          Attributes: {
            Title: "Schedule Demo — Webtrends",
            UrlLink: "http://www.webtrends.com/get-demo/",
          },
          measures: { Visits: 40.0, Views: 47.0, "Average Time Viewed": 43.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/legal/security-statement/": {
          Attributes: {
            Title: "Security Statement — Webtrends",
            UrlLink: "http://www.webtrends.com/legal/security-statement/",
          },
          measures: { Visits: 34.0, Views: 37.0, "Average Time Viewed": 63.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/support/downloads/": {
          Attributes: {
            Title: "Downloads — Webtrends",
            UrlLink: "http://www.webtrends.com/support/downloads/",
          },
          measures: { Visits: 23.0, Views: 25.0, "Average Time Viewed": 23.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/resources/tutorials/": {
          Attributes: {
            Title: "Tutorials — Webtrends",
            UrlLink: "http://www.webtrends.com/resources/tutorials/",
          },
          measures: { Visits: 22.0, Views: 26.0, "Average Time Viewed": 23.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/about-us/contact-us/": {
          Attributes: {
            Title: "Contact Us — Webtrends",
            UrlLink: "http://www.webtrends.com/about-us/contact-us/",
          },
          measures: { Visits: 20.0, Views: 20.0, "Average Time Viewed": 224.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/legal/terms-of-subscription-service/": {
          Attributes: {
            Title: "Terms of Subscription Service — Webtrends",
            UrlLink:
              "http://www.webtrends.com/legal/terms-of-subscription-service/",
          },
          measures: { Visits: 19.0, Views: 21.0, "Average Time Viewed": 105.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/resources/articles/": {
          Attributes: {
            Title: "Articles — Webtrends",
            UrlLink: "http://www.webtrends.com/resources/articles/",
          },
          measures: { Visits: 19.0, Views: 22.0, "Average Time Viewed": 10.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/nojavascript": {
          Attributes: {
            Title: "",
            UrlLink: "http://www.webtrends.com/nojavascript",
          },
          measures: { Visits: 17.0, Views: 21.0, "Average Time Viewed": 338.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/products/analytics-for-microsoft-teams/saas/":
          {
            Attributes: {
              Title:
                "Analytics For Microsoft Teams®: Overview (SaaS) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-microsoft-teams/saas/",
            },
            measures: { Visits: 16.0, Views: 16.0, "Average Time Viewed": 8.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/resources/white-papers/": {
          Attributes: {
            Title: "White Papers — Webtrends",
            UrlLink: "http://www.webtrends.com/resources/white-papers/",
          },
          measures: { Visits: 10.0, Views: 11.0, "Average Time Viewed": 23.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/about-us/partners/": {
          Attributes: {
            Title: "Partners — Webtrends",
            UrlLink: "http://www.webtrends.com/about-us/partners/",
          },
          measures: { Visits: 9.0, Views: 11.0, "Average Time Viewed": 31.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/resources/webinars/": {
          Attributes: {
            Title: "Webinars — Webtrends",
            UrlLink: "http://www.webtrends.com/resources/webinars/",
          },
          measures: { Visits: 9.0, Views: 12.0, "Average Time Viewed": 12.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/products/analytics-for-sharepoint/saas/how-we-compare/":
          {
            Attributes: {
              Title:
                "Analytics For SharePoint®: How We Compare (SaaS) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-sharepoint/saas/how-we-compare/",
            },
            measures: { Visits: 9.0, Views: 13.0, "Average Time Viewed": 16.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/products/webtrends-analytics-on-premises-roadmap/":
          {
            Attributes: {
              Title: "Webtrends Analytics On-Premises Roadmap — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/webtrends-analytics-on-premises-roadmap/",
            },
            measures: { Visits: 9.0, Views: 14.0, "Average Time Viewed": 76.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/products/analytics-for-web-apps/on-premises/":
          {
            Attributes: {
              Title:
                "Analytics For Web Apps: Overview (On Premises) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-web-apps/on-premises/",
            },
            measures: {
              Visits: 7.0,
              Views: 10.0,
              "Average Time Viewed": 130.0,
            },
            SubRows: null,
          },
        "http://www.webtrends.com/support/support-packages/": {
          Attributes: {
            Title: "Support Packages — Webtrends",
            UrlLink: "http://www.webtrends.com/support/support-packages/",
          },
          measures: { Visits: 7.0, Views: 7.0, "Average Time Viewed": 10.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/products/analytics-for-sharepoint/saas/architecture/":
          {
            Attributes: {
              Title:
                "Analytics For SharePoint®: Architecture (SaaS) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-sharepoint/saas/architecture/",
            },
            measures: { Visits: 6.0, Views: 9.0, "Average Time Viewed": 31.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/products/analytics-for-sharepoint/saas/reports/":
          {
            Attributes: {
              Title: "Analytics For SharePoint®: Reports (SaaS) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-sharepoint/saas/reports/",
            },
            measures: { Visits: 5.0, Views: 7.0, "Average Time Viewed": 16.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/legal/cookie-policy/": {
          Attributes: {
            Title: "Cookie Policy — Webtrends",
            UrlLink: "http://www.webtrends.com/legal/cookie-policy/",
          },
          measures: { Visits: 5.0, Views: 6.0, "Average Time Viewed": 461.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/products/analytics-for-web-apps/saas/reports/":
          {
            Attributes: {
              Title: "Analytics For Web Apps: Reports (SaaS) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-web-apps/saas/reports/",
            },
            measures: { Visits: 5.0, Views: 5.0, "Average Time Viewed": 28.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/products/analytics-for-sharepoint/on-premises/":
          {
            Attributes: {
              Title:
                "Analytics For SharePoint®: Overview (On Premises) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-sharepoint/on-premises/",
            },
            measures: { Visits: 4.0, Views: 5.0, "Average Time Viewed": 11.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/products/analytics-for-web-apps/saas/architecture/":
          {
            Attributes: {
              Title: "Analytics For Web Apps: Architecture (SaaS) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-web-apps/saas/architecture/",
            },
            measures: { Visits: 4.0, Views: 4.0, "Average Time Viewed": 8.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/legal/professional-services-terms-and-conditions/":
          {
            Attributes: {
              Title: "Professional Services Terms and Conditions — Webtrends",
              UrlLink:
                "http://www.webtrends.com/legal/professional-services-terms-and-conditions/",
            },
            measures: { Visits: 4.0, Views: 4.0, "Average Time Viewed": 7.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/legal/gdpr-faq/": {
          Attributes: {
            Title: "GDPR FAQ — Webtrends",
            UrlLink: "http://www.webtrends.com/legal/gdpr-faq/",
          },
          measures: { Visits: 3.0, Views: 3.0, "Average Time Viewed": 108.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/products/analytics-for-sharepoint/": {
          Attributes: {
            Title: "Analytics for SharePoint® — Webtrends",
            UrlLink:
              "http://www.webtrends.com/products/analytics-for-sharepoint/",
          },
          measures: { Visits: 3.0, Views: 3.0, "Average Time Viewed": 33.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/portfolio-items/analytics-10-foundations-part-1/":
          {
            Attributes: {
              Title: "Analytics 10 Foundations Part 1 — Webtrends",
              UrlLink:
                "http://www.webtrends.com/portfolio-items/analytics-10-foundations-part-1/",
            },
            measures: { Visits: 3.0, Views: 3.0, "Average Time Viewed": 19.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/legal/website-terms-of-use/": {
          Attributes: {
            Title: "Website Terms of Use — Webtrends",
            UrlLink: "http://www.webtrends.com/legal/website-terms-of-use/",
          },
          measures: { Visits: 2.0, Views: 2.0, "Average Time Viewed": 0.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/products/analytics-for-microsoft-teams/saas/architecture/":
          {
            Attributes: {
              Title:
                "Analytics For Microsoft Teams®: Architecture (SaaS) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-microsoft-teams/saas/architecture/",
            },
            measures: { Visits: 2.0, Views: 2.0, "Average Time Viewed": 31.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/articles/corporate-communications-in-a-pandemic-how-much-is-too-much-and-for-how-long/":
          {
            Attributes: {
              Title:
                "Corporate Communications in a Pandemic: How Much is Too Much, and for How Long? — Webtrends",
              UrlLink:
                "http://www.webtrends.com/articles/corporate-communications-in-a-pandemic-how-much-is-too-much-and-for-how-long/",
            },
            measures: { Visits: 2.0, Views: 3.0, "Average Time Viewed": 0.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/products/analytics-for-web-apps/on-premises/reports/":
          {
            Attributes: {
              Title:
                "Analytics For Web Apps: Reports (On Premises) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-web-apps/on-premises/reports/",
            },
            measures: { Visits: 2.0, Views: 2.0, "Average Time Viewed": 15.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/products/analytics-for-microsoft-teams/saas/reports/":
          {
            Attributes: {
              Title:
                "Analytics For Microsoft Teams®: Reports (SaaS) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-microsoft-teams/saas/reports/",
            },
            measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 0.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/products/analytics-for-microsoft-teams/saas/how-we-compare/":
          {
            Attributes: {
              Title:
                "Analytics For Microsoft Teams®: How We Compare (SaaS) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-microsoft-teams/saas/how-we-compare/",
            },
            measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 41.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/Resources/WebAnalyticsGlossary.aspx": {
          Attributes: {
            Title: "Page not found — Webtrends",
            UrlLink:
              "http://www.webtrends.com/Resources/WebAnalyticsGlossary.aspx",
          },
          measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 9.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/products/analytics-for-sharepoint/on-premises/reports/":
          {
            Attributes: {
              Title:
                "Analytics For SharePoint®: Reports (On Premises) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-sharepoint/on-premises/reports/",
            },
            measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 0.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/resources/landing/keep-your-sharepoint-data-secure-with-analytics-on-premises/":
          {
            Attributes: {
              Title:
                "Keep Your SharePoint Data Secure with Analytics On Premises — Webtrends",
              UrlLink:
                "http://www.webtrends.com/resources/landing/keep-your-sharepoint-data-secure-with-analytics-on-premises/",
            },
            measures: { Visits: 1.0, Views: 2.0, "Average Time Viewed": 67.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/products/analytics-for-web-apps/on-premises/architecture/":
          {
            Attributes: {
              Title:
                "Analytics For Web Apps: Architecture (On Premises) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-web-apps/on-premises/architecture/",
            },
            measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 25.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/products/analytics-for-sharepoint/on-premises/architecture/":
          {
            Attributes: {
              Title:
                "Analytics For SharePoint®: Architecture (On Premises) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-sharepoint/on-premises/architecture/",
            },
            measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 114.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/articles/whats-working-for-our-sharepoint-analytics-customers-during-covid-19/":
          {
            Attributes: {
              Title:
                "What’s Working for Our SharePoint Analytics Customers During COVID-19 — Webtrends",
              UrlLink:
                "http://www.webtrends.com/articles/whats-working-for-our-sharepoint-analytics-customers-during-covid-19/",
            },
            measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 237.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/products/analytics-for-sharepoint/on-premises/how-we-compare/":
          {
            Attributes: {
              Title:
                "Analytics For SharePoint®: How We Compare (On Premises) — Webtrends",
              UrlLink:
                "http://www.webtrends.com/products/analytics-for-sharepoint/on-premises/how-we-compare/",
            },
            measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 47.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/legal/ccpa-faq/": {
          Attributes: {
            Title: "CCPA FAQ — Webtrends",
            UrlLink: "http://www.webtrends.com/legal/ccpa-faq/",
          },
          measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 15.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/portfolio-items/analytics-10-foundations-part-2/":
          {
            Attributes: {
              Title: "Analytics 10 Foundations Part 2 — Webtrends",
              UrlLink:
                "http://www.webtrends.com/portfolio-items/analytics-10-foundations-part-2/",
            },
            measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 109.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/webinars/sharepoint-analytics-use-case-overview/":
          {
            Attributes: {
              Title: "Page not found — Webtrends",
              UrlLink:
                "http://www.webtrends.com/webinars/sharepoint-analytics-use-case-overview/",
            },
            measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 0.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/about-us/client-success": {
          Attributes: {
            Title: "Page not found — Webtrends",
            UrlLink: "http://www.webtrends.com/about-us/client-success",
          },
          measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 0.0 },
          SubRows: null,
        },
        "https://www.webtrends.com/nojavascript": {
          Attributes: {
            Title: "",
            UrlLink: "https://www.webtrends.com/nojavascript",
          },
          measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 0.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/wtaa-st-t2/": {
          Attributes: {
            Title: "Page not found — Webtrends",
            UrlLink: "http://www.webtrends.com/wtaa-st-t2/",
          },
          measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 0.0 },
          SubRows: null,
        },
        "http://www.webtrends.com/portfolio-items/fundamentals-of-analysis-part-1-kpis/":
          {
            Attributes: {
              Title: "Fundamentals of Analysis Part 1 – KPIs — Webtrends",
              UrlLink:
                "http://www.webtrends.com/portfolio-items/fundamentals-of-analysis-part-1-kpis/",
            },
            measures: { Visits: 1.0, Views: 2.0, "Average Time Viewed": 135.0 },
            SubRows: null,
          },
        "http://www.webtrends.com/portfolio_category/foundations/": {
          Attributes: {
            Title: "Foundations Archives — Webtrends",
            UrlLink: "http://www.webtrends.com/portfolio_category/foundations/",
          },
          measures: { Visits: 1.0, Views: 3.0, "Average Time Viewed": 5.0 },
          SubRows: null,
        },
      },
    },
  },
};

// export const pageData = {
//   definition: {
//     accountID: 1,
//     profileID: "02bENH9vMK8",
//     ID: "18d039ae0360",
//     name: "Pages",
//     language: null,
//     isRealtime: false,
//     type: "dimensional",
//     properties: {
//       isHierarchy: false,
//       intervalsEnabled: true,
//       IsSearchable: true,
//       internalID: "toppages_v",
//       IsRealTimeCompatible: true,
//       ProfileCategory: null,
//       totals: "all",
//       ContainsRealtimeData: false,
//       LastUpdate: "08/04/2022 20:21:36",
//       datasource: "engine",
//       enginesearchtime: "2104.0144",
//     },
//     dimension: {
//       ID: "Time",
//       name: "Time",
//       type: "period",
//       Range: { startperiod: "2021m01d02", endperiod: "2021m01d02" },
//       Properties: null,
//       SubDimension: {
//         ID: "Url",
//         name: "Pages",
//         type: "data",
//         Range: null,
//         Properties: null,
//         SubDimension: null,
//       },
//     },
//     measures: [
//       {
//         name: "Visits",
//         accumulationType: null,
//         ID: "Users-0",
//         columnID: 0,
//         measureFormatType: null,
//         AllowTotals: true,
//         Sortable: false,
//       },
//       {
//         name: "Views",
//         accumulationType: null,
//         ID: "Hits-0",
//         columnID: 0,
//         measureFormatType: null,
//         AllowTotals: true,
//         Sortable: false,
//       },
//       {
//         name: "Average Time Viewed",
//         accumulationType: null,
//         ID: "Time-0",
//         columnID: 0,
//         measureFormatType: null,
//         AllowTotals: true,
//         Sortable: false,
//       },
//     ],
//   },
//   data: {
//     "01/02/2021-01/02/2021": {
//       measures: { Visits: null, Views: 29.0, "Average Time Viewed": null },
//       SubRows: {
//         "http://www.mydomain.com/page3.aspx": {
//           Attributes: {
//             Title: "Page Title3",
//             UrlLink: "http://www.mydomain.com/page3.aspx",
//           },
//           measures: { Visits: 6.0, Views: 6.0, "Average Time Viewed": 1.0 },
//           SubRows: null,
//         },
//         "http://www.mydomain.com/page1.aspx": {
//           Attributes: {
//             Title: "Page Title1",
//             UrlLink: "http://www.mydomain.com/page1.aspx",
//           },
//           measures: { Visits: 6.0, Views: 6.0, "Average Time Viewed": 0.0 },
//           SubRows: null,
//         },
//         "http://www.mydomain.com/page4.aspx": {
//           Attributes: {
//             Title: "Page Title4",
//             UrlLink: "http://www.mydomain.com/page4.aspx",
//           },
//           measures: { Visits: 6.0, Views: 6.0, "Average Time Viewed": 18.0 },
//           SubRows: null,
//         },
//         "http://www.mydomain.com/page2.aspx": {
//           Attributes: {
//             Title: "Page Title2",
//             UrlLink: "http://www.mydomain.com/page2.aspx",
//           },
//           measures: { Visits: 6.0, Views: 6.0, "Average Time Viewed": 19.0 },
//           SubRows: null,
//         },
//         "http://www.mydomain.com/page5.aspx": {
//           Attributes: {
//             Title: "Page Title5",
//             UrlLink: "http://www.mydomain.com/page5.aspx",
//           },
//           measures: { Visits: 4.0, Views: 4.0, "Average Time Viewed": 0.0 },
//           SubRows: null,
//         },
//         "http://www.mydomain.com/page6.aspx": {
//           Attributes: {
//             Title: "Page Title5",
//             UrlLink: "http://www.mydomain.com/page6.aspx",
//           },
//           measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 0.0 },
//           SubRows: null,
//         },
//       },
//     },
//   },
// };

export const pageData2 = {
  definition: {
    accountID: 1,
    profileID: "02bENH9vMK8",
    ID: "18d039ae0360",
    name: "Pages",
    language: null,
    isRealtime: false,
    type: "dimensional",
    properties: {
      isHierarchy: false,
      intervalsEnabled: true,
      IsSearchable: true,
      internalID: "toppages_v",
      IsRealTimeCompatible: true,
      ProfileCategory: null,
      totals: "all",
      ContainsRealtimeData: false,
      LastUpdate: "08/04/2022 20:21:36",
      datasource: "engine",
      enginesearchtime: "2104.0144",
    },
    dimension: {
      ID: "Time",
      name: "Time",
      type: "period",
      Range: { startperiod: "2021m01d03", endperiod: "2021m01d03" },
      Properties: null,
      SubDimension: {
        ID: "Url",
        name: "Pages",
        type: "data",
        Range: null,
        Properties: null,
        SubDimension: null,
      },
    },
    measures: [
      {
        name: "Visits",
        accumulationType: null,
        ID: "Users-0",
        columnID: 0,
        measureFormatType: null,
        AllowTotals: true,
        Sortable: false,
      },
      {
        name: "Views",
        accumulationType: null,
        ID: "Hits-0",
        columnID: 0,
        measureFormatType: null,
        AllowTotals: true,
        Sortable: false,
      },
      {
        name: "Average Time Viewed",
        accumulationType: null,
        ID: "Time-0",
        columnID: 0,
        measureFormatType: null,
        AllowTotals: true,
        Sortable: false,
      },
    ],
  },
  data: {
    "01/03/2021-01/03/2021": {
      measures: { Visits: null, Views: 29.0, "Average Time Viewed": null },
      SubRows: {
        "http://www.mydomain.com/page3.aspx": {
          Attributes: {
            Title: "Page Title3",
            UrlLink: "http://www.mydomain.com/page3.aspx",
          },
          measures: { Visits: 2.0, Views: 6.0, "Average Time Viewed": 1.0 },
          SubRows: null,
        },
        "http://www.mydomain.com/page1.aspx": {
          Attributes: {
            Title: "Page Title1",
            UrlLink: "http://www.mydomain.com/page1.aspx",
          },
          measures: { Visits: 10.0, Views: 6.0, "Average Time Viewed": 0.0 },
          SubRows: null,
        },
        "http://www.mydomain.com/page4.aspx": {
          Attributes: {
            Title: "Page Title4",
            UrlLink: "http://www.mydomain.com/page4.aspx",
          },
          measures: { Visits: 6.0, Views: 6.0, "Average Time Viewed": 18.0 },
          SubRows: null,
        },
        "http://www.mydomain.com/page2.aspx": {
          Attributes: {
            Title: "Page Title2",
            UrlLink: "http://www.mydomain.com/page2.aspx",
          },
          measures: { Visits: 8.0, Views: 6.0, "Average Time Viewed": 19.0 },
          SubRows: null,
        },
        "http://www.mydomain.com/page5.aspx": {
          Attributes: {
            Title: "Page Title5",
            UrlLink: "http://www.mydomain.com/page5.aspx",
          },
          measures: { Visits: 4.0, Views: 4.0, "Average Time Viewed": 0.0 },
          SubRows: null,
        },
        "http://www.mydomain.com/page6.aspx": {
          Attributes: {
            Title: "Page Title5",
            UrlLink: "http://www.mydomain.com/page6.aspx",
          },
          measures: { Visits: 1.0, Views: 1.0, "Average Time Viewed": 0.0 },
          SubRows: null,
        },
      },
    },
  },
};

export const referringSiteData = {
  definition: {
    accountID: 1,
    profileID: "02bENH9vMK8",
    ID: "92b64724c3ce",
    name: "Referring Site",
    language: null,
    isRealtime: false,
    type: "dimensional",
    properties: {
      isHierarchy: false,
      intervalsEnabled: true,
      IsSearchable: true,
      internalID: "topreferingsites",
      IsRealTimeCompatible: true,
      ProfileCategory: null,
      totals: "all",
      ContainsRealtimeData: false,
      LastUpdate: "08/04/2022 20:21:36",
      datasource: "engine",
      enginesearchtime: "1890.0052",
    },
    dimension: {
      ID: "Time",
      name: "Time",
      type: "period",
      Range: { startperiod: "2021m01d02", endperiod: "2021m01d03" },
      Properties: null,
      SubDimension: {
        ID: "Url",
        name: "Referring Site",
        type: "data",
        Range: null,
        Properties: null,
        SubDimension: null,
      },
    },
    measures: [
      {
        name: "Visits",
        accumulationType: null,
        ID: "Users-0",
        columnID: 0,
        measureFormatType: null,
        AllowTotals: true,
        Sortable: false,
      },
    ],
  },
  data: {
    "01/02/2021-01/03/2021": {
      measures: { Visits: 6.0 },
      SubRows: {
        "http://www.google.com/": {
          Attributes: { UrlLink: "http://www.google.com/" },
          measures: { Visits: 6.0 },
          SubRows: null,
        },
      },
    },
  },
};

export const browserVersionsData = {
  definition: {
    accountID: 1,
    profileID: "02bENH9vMK8",
    ID: "95df19b6d9f3",
    name: "Browsers by Version",
    language: null,
    isRealtime: false,
    type: "dimensional",
    properties: {
      isHierarchy: true,
      intervalsEnabled: true,
      IsSearchable: true,
      internalID: "topbrowserversions_v",
      IsRealTimeCompatible: true,
      ProfileCategory: null,
      totals: "all",
      ContainsRealtimeData: false,
      LastUpdate: "08/04/2022 20:21:36",
      datasource: "engine",
      enginesearchtime: "1924.0065",
    },
    dimension: {
      ID: "Time",
      name: "Time",
      type: "period",
      Range: { startperiod: "2021m01d01", endperiod: "2021m01d05" },
      Properties: null,
      SubDimension: {
        ID: "Desc",
        name: "Browsers by Version",
        type: "data",
        Range: null,
        Properties: null,
        SubDimension: {
          ID: "Desc",
          name: "Version",
          type: "data",
          Range: null,
          Properties: null,
          SubDimension: null,
        },
      },
    },
    measures: [
      {
        name: "Views",
        accumulationType: null,
        ID: "Hits-0",
        columnID: 0,
        measureFormatType: null,
        AllowTotals: true,
        Sortable: false,
      },
      {
        name: "Visits",
        accumulationType: null,
        ID: "Users-0",
        columnID: 0,
        measureFormatType: null,
        AllowTotals: true,
        Sortable: false,
      },
    ],
  },
  data: {
    "01/02/2021-01/03/2021": {
      measures: { Views: 30.0, Visits: 6.0 },
      SubRows: {
        Safari: {
          Attributes: null,
          measures: { Views: 30.0, Visits: 6.0 },
          SubRows: {
            "5.0.5": {
              Attributes: null,
              measures: { Views: 30.0, Visits: 6.0 },
              SubRows: null,
            },
          },
        },
      },
    },
  },
};
