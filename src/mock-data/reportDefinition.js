export const reportDefinition = {
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
  },
  dimension: {
    ID: "Url",
    name: "Pages",
    type: "data",
    Range: null,
    Properties: null,
    SubDimension: null,
  },
  measures: [
    {
      name: "Visits",
      accumulationType: null,
      ID: "Users-0",
      columnID: 0,
      measureFormatType: "numeric",
      AllowTotals: true,
      Sortable: false,
    },
    {
      name: "Views",
      accumulationType: null,
      ID: "Hits-0",
      columnID: 0,
      measureFormatType: "numeric",
      AllowTotals: true,
      Sortable: false,
    },
    {
      name: "Average Time Viewed",
      accumulationType: null,
      ID: "Time-0",
      columnID: 0,
      measureFormatType: "numeric",
      AllowTotals: true,
      Sortable: false,
    },
  ],
};