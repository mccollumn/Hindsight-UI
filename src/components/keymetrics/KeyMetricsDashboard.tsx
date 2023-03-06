import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ResponsiveLine } from "@nivo/line";
import { formatISO, addSeconds, format } from "date-fns";
import Title from "../Title";
import { KeyMetricsProps, ProfileProps } from "../../interfaces/interfaces";
import { useKeyMetrics } from "../../hooks/useKeyMetrics";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const KeyMetricTile = ({ metricName, keyMetricsData }: KeyMetricTileProps) => {
  const [localData, setLocalData] = React.useState(keyMetricsData);
  React.useEffect(() => {
    setLocalData(keyMetricsData);
  }, [keyMetricsData]);

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
          axisBottom={null}
          enablePoints={false}
          data={getGraphData({ metricName, localData })}
          margin={{ top: 25, right: 40, bottom: 25, left: 50 }}
          tooltip={formatPointLabels}
        />
      </div>
    </Box>
  );
};

const KeyMetricsDashboard = ({ profile }: KeyMetricsDashboardProps) => {
  const { keyMetrics } = useKeyMetrics(profile);
  const [measureNames, setMeasureNames] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (!keyMetrics) return;
    setMeasureNames(getMeasures(keyMetrics));
  }, [keyMetrics]);

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
              {keyMetrics && (
                <KeyMetricTile metricName={name} keyMetricsData={keyMetrics} />
              )}
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

const getGraphData = ({ metricName, localData }: GetGraphDataProps) => {
  const dailyMetrics: any = Object.values(localData.data)[0].SubRows;
  if (dailyMetrics === null) return [];

  let trendData: Array<any> = [];
  Object.keys(dailyMetrics).forEach((day) => {
    const dayMetrics = dailyMetrics[day];
    const value = dayMetrics?.measures[metricName] || 0;
    trendData.push({
      x: convertDateString(day),
      y: value,
    });
  });
  return [{ id: "trend", data: trendData }];
};

const getTotal = ({ metricName, keyMetricsData }: KeyMetricTileProps) => {
  const measures = Object.values(keyMetricsData.data)[0].measures;
  const measureValue = measures[metricName as keyof Measures];
  if (metricName.toLowerCase().includes("bounce")) {
    return `${measureValue}%`;
  }
  if (metricName.toLowerCase().includes("time on site")) {
    const duration = addSeconds(new Date(0), measureValue);
    return format(duration, "m'm 'ss's'");
  }
  return measureValue;
};

const getMeasures = (keyMetricsData: KeyMetricsProps) => {
  if (keyMetricsData === null || keyMetricsData === undefined) return [];
  return Object.keys(Object.values(keyMetricsData.data)[0].measures);
};

const formatPointLabels = (obj: any) => {
  return obj.point.data.yFormatted;
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

interface GetGraphDataProps {
  metricName: string;
  localData: KeyMetricsProps;
}

export default KeyMetricsDashboard;
