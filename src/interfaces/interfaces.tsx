import { LineSvgProps } from "@nivo/line";

export interface DimensionProps {
  ID: string;
  name: string;
  type: string;
  Range: { startperiod: string; endperiod: string } | null;
  Properties: string | null;
  SubDimension: DimensionProps | null;
}

export interface MeasureProps {
  name: string;
  accumulationType: string | null;
  ID: string;
  columnID: number;
  measureFormatType: string | null;
  AllowTotals: boolean;
  Sortable: boolean;
}

export interface ReportPropertyProps {
  isHierarchy: boolean;
  intervalsEnabled: boolean;
  IsSearchable: boolean;
  internalID: string;
  IsRealTimeCompatible: boolean;
  ProfileCategory: string | null;
  totals?: string;
  ContainsRealtimeData?: boolean;
  LastUpdate?: string;
  datasource?: string;
  enginesearchtime?: string;
}

export interface ReportDefinitionProps {
  accountID: number;
  profileID: string;
  ID: string;
  name: string;
  language: string | null;
  isRealtime: boolean;
  type: string;
  properties: ReportPropertyProps;
  dimension: DimensionProps;
  measures: MeasureProps[];
}

export interface ReportSubRowProps {
  [dimensionValue: string]: {
    Attributes: ReportAttributeProps | null;
    measures: any;
    SubRows: ReportSubRowProps | null;
  };
}

export interface ReportAttributeProps {
  Title?: string;
  UrlLink?: string;
}

export interface ReportDataProps {
  [dateRange: string]: {
    measures: any;
    SubRows: ReportSubRowProps;
  };
}

export interface ReportProps {
  definition: ReportDefinitionProps;
  data: ReportDataProps;
}

export interface ColumnDefProps {
  field: string;
}

export type RowProps = {
  Dimensions: Array<string>;
} & {
  [measure: string]: number;
};

export interface ReportDateRangeProps {
  start_period: string;
  end_period: string;
}

export interface GridDimensionProps {
  rowIndex: number;
  key: string;
}

export interface ProfileProps {
  ID?: string;
  name?: string;
  AccountID?: number;
  TimeZoneID?: number;
}

export interface ProfileReportsProps {
  accountID: number;
  profileID: string | null;
  name: string;
  ID: string;
  language: string | null;
  type: string | null;
  Category: string | null;
  IsHierarchy: boolean;
  IntervalsEnabled: boolean;
  IsRealtimeCompatible: boolean;
  properties: string | null;
}

export interface KeyMetricsProps {
  data: {
    [dateRange: string]: {
      Attributes: string | null;
      measures: {
        "Page Views": number;
        Visits: number;
        Visitors: number;
        "Bounce Rate": number;
        "Avg. Time on Site": number;
        "Avg. Visitors per Day": number;
        "Page Views per Visit": number;
        "New Visitors": number;
      };
      SubRows: Omit<KeyMetricsProps, "data"> | null;
    };
  };
}

export type WtLineProps = Omit<LineSvgProps, "data">;
