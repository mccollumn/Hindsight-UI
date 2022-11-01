import { ValueFormatterParams } from "ag-grid-community";
import {
  DimensionProps,
  ReportSubRowProps,
  ReportProps,
  ColumnDefProps,
  RowProps,
} from "../../interfaces/interfaces";

export const getDimensionNames = (reportData: ReportProps) => {
  if (reportData.definition === undefined) return [];
  let dimensionNames: Array<string> = [];
  const getName = (dimensions: DimensionProps) => {
    Object.entries(dimensions).forEach(([key, value]) => {
      if (key === "name" && value !== "Time") {
        dimensionNames.push(value);
      }
      if (key === "SubDimension" && value !== null) {
        getName(dimensions[key] as DimensionProps);
      }
    });
  };
  getName(reportData.definition.dimension);
  return dimensionNames;
};

export const getMeasures = (reportData: ReportProps) => {
  if (reportData.definition === undefined) return [];
  return reportData?.definition?.measures;
};

export const getMeasureNames = (reportData: ReportProps) => {
  const measures = getMeasures(reportData);
  return measures.map((measure) => measure.name);
};

export const generateColumnDefs = (reportData: ReportProps) => {
  if (reportData.definition === undefined) return [];
  const columnNames = [...getMeasureNames(reportData)];
  const columns = [...getMeasures(reportData)];
  return columnNames.reduce((colDefs: ColumnDefProps[], colName, index) => {
    return [
      ...colDefs,
      {
        field: colName,
        sort: index === 0 ? "desc" : "",
        filter: "agNumberColumnFilter",
        filterParams: { valueFormatter: getValueFormatter(columns) },
        valueFormatter: getValueFormatter(columns),
      },
    ];
  }, []);
};

export const getTotals = (reportData: ReportProps) => {
  if (reportData.definition === undefined) return [];
  return [Object.values(reportData.data)[0].measures];
};

export const getDimensionAttributes = (row: ReportSubRowProps) => {
  if (row.Attributes === null) return null;
  let attributes: Array<string> = [];
  Object.entries(row.Attributes).forEach(([attributeName, attributeValue]) => {
    if (attributeName !== "UrlLink") {
      attributes.push(attributeValue);
    }
  });
  return attributes.join(" - ");
};

export const getDimColumnHeader = (reportData: ReportProps) => {
  if (reportData.definition === undefined) return "";
  const dimNames = getDimensionNames(reportData);
  return dimNames.join(" > ");
};

export const getTableData = (reportData: ReportProps) => {
  if (reportData.definition === undefined) return [];
  let tableData: Array<RowProps> = [];

  const getRow = (
    allRows: ReportSubRowProps,
    level = 0,
    prevColValues: Array<string> = []
  ) => {
    Object.keys(allRows).forEach((entry) => {
      const attributeStr = getDimensionAttributes(allRows[entry] as any);

      let newColValues: Array<string> = prevColValues;
      newColValues[level] = attributeStr ? `${attributeStr}\n${entry}` : entry;
      newColValues.length = level + 1;

      const row: any = { Dimensions: newColValues.slice() };

      for (const [measure, measureValue] of Object.entries(
        allRows[entry].measures
      )) {
        row[measure] = measureValue;
      }

      tableData.push(row);

      if (allRows[entry].SubRows !== null) {
        getRow(
          allRows[entry].SubRows as ReportSubRowProps,
          level + 1,
          newColValues
        );
      }
    });
  };

  const allRows = Object.values(reportData.data)[0].SubRows;
  getRow(allRows);

  return tableData;
};

const getValueFormatter = (measures: Array<any>) => {
  return (params: ValueFormatterParams) => {
    const measureValue = params.value;
    if (measureValue === null) return;

    const measureName = params.colDef.field;
    const measureConfig = measures.find(
      (measure) => measure.name === measureName
    );
    const measureFormat = measureConfig?.measureFormatType;

    const measureFormatted = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(measureValue);

    if (measureFormat === "percent") {
      return measureFormatted + "%";
    }

    return measureFormatted;
  };
};
