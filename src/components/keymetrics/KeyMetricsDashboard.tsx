import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ResponsiveLine } from "@nivo/line";
import { formatISO } from "date-fns";
import Title from "../Title";
import useGetData from "../../hooks/getData";
import { KeyMetricsProps, ProfileProps } from "../../interfaces/interfaces";
import { DateContext } from "../../providers/DateProvider";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const KeyMetricTile = ({ metricName, keyMetricsData }: KeyMetricTileProps) => {
  return (
    <Box>
      <Title>{getTotal({ metricName, keyMetricsData })}</Title>
      <Typography>{metricName}</Typography>
      <div style={{ height: 200 }}>
        <ResponsiveLine
          isInteractive={true}
          useMesh={true}
          enableSlices={false}
          xScale={{
            type: "time",
            format: "%Y-%m-%d",
            useUTC: false,
            precision: "day",
          }}
          xFormat={"time:%Y-%m-%d"}
          enableGridX={false}
          yScale={{ type: "linear", min: "auto", max: "auto" }}
          axisBottom={{
            format: "%b %d",
            tickValues: "every 2 days",
          }}
          axisLeft={
            {
              // format: ">-.2~f",
            }
          }
          pointSize={10}
          pointBorderWidth={1}
          pointBorderColor={{
            from: "color",
            modifiers: [["darker", 0.3]],
          }}
          data={getGraphData({ metricName, keyMetricsData })}
          margin={{ top: 25, right: 40, bottom: 25, left: 50 }}
        />
      </div>
    </Box>
  );
};

const KeyMetricsDashboard = ({ profile }: KeyMetricsDashboardProps) => {
  const { response, loading, error, status, getKeyMetrics } = useGetData();
  const { wtStartDate, wtEndDate } = React.useContext(DateContext);

  React.useEffect(() => {
    getKeyMetrics({
      profileID: profile?.ID,
      params: { start_period: wtStartDate, end_period: wtEndDate },
    });
  }, [getKeyMetrics, profile?.ID, wtEndDate, wtStartDate]);
  console.log("Key metrics:", response);
  console.log("WT start date:", wtStartDate);
  console.log("WT end date:", wtEndDate);

  const [measureNames, setMeasureNames] = React.useState<string[]>([]);
  React.useEffect(() => {
    setMeasureNames(getMeasures(response));
  }, [response]);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "2rem" }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        {measureNames.map((name, index) => (
          <Grid xs={12} sm={6} md={4} xl={3} key={index}>
            <Item>
              <KeyMetricTile metricName={name} keyMetricsData={response} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const convertDateString = (dateStr: string) => {
  const date = new Date(dateStr);
  return formatISO(date, { representation: "date" });
};

const getGraphData = ({ metricName, keyMetricsData }: KeyMetricTileProps) => {
  const dailyMetrics: any = Object.values(keyMetricsData.data)[0].SubRows;
  if (dailyMetrics === null) return [];

  let trendData: Array<any> = [];
  for (const key of Object.keys(dailyMetrics)) {
    const value = dailyMetrics[key];
    if (value) {
      trendData.push({
        x: convertDateString(key),
        y: value.measures[metricName],
      });
    }
  }
  return [{ id: "trend", data: trendData }];
};

const getTotal = ({ metricName, keyMetricsData }: KeyMetricTileProps) => {
  const measures = Object.values(keyMetricsData.data)[0].measures;
  return measures[metricName as keyof Measures];
};

const getMeasures = (keyMetricsData: KeyMetricsProps) => {
  if (keyMetricsData === null || keyMetricsData === undefined) return [];
  return Object.keys(Object.values(keyMetricsData.data)[0].measures);
};

interface KeyMetricTileProps {
  metricName: string;
  keyMetricsData: KeyMetricsProps;
}

interface KeyMetricsDashboardProps {
  profile: ProfileProps;
}

interface Measures {
  "Page Views": number;
  Visits: number;
  Visitors: number;
  "Bounce Rate": number;
  "Avg. Time on Site": number;
  "Avg. Visitors per Day": number;
  "Page Views per Visit": number;
  "New Visitors": number;
}

export default KeyMetricsDashboard;
