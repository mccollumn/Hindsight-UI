import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BarChartIcon from "@mui/icons-material/BarChart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import KeyMetricsLabel from "./KeyMetricsLabel";
import { useKeyMetrics } from "../../hooks/useKeyMetrics";
import { ProfileProps } from "../../interfaces/interfaces";

const KeyMetricsLabels = ({ profile }: KeyMetricsLabelsProps) => {
  const { keyMetrics } = useKeyMetrics(profile);
  if (!keyMetrics) return null;

  const metricsToDisplay = [
    { name: "Page Views", icon: <VisibilityIcon />, enabled: true },
    { name: "Visits", icon: <BarChartIcon />, enabled: true },
    { name: "Visitors", enabled: false },
    {
      name: "Bounce Rate",
      icon: <AirlineStopsIcon />,
      symbol: "%",
      enabled: true,
    },
    { name: "Avg. Time on Site", enabled: false },
    {
      name: "Avg. Visitors per Day",
      enabled: false,
    },
    {
      name: "Page Views per Visit",
      enabled: false,
    },
    { name: "New Visitors", enabled: false },
  ];
  const metrics: any = Object.values(keyMetrics.data)[0].measures;

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "absolute",
        right: "2%",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <Grid container item spacing={2}>
        {metricsToDisplay.map((metric) => {
          if (!metric.enabled) return null;
          const value = metric.symbol
            ? `${metrics[metric.name]}${metric.symbol}`
            : `${metrics[metric.name]}`;
          const icon = metric.icon ? metric.icon : undefined;
          return (
            <Grid item key={metric.name}>
              <KeyMetricsLabel
                label={metric.name}
                metric={value}
                icon={icon}
                key={metric.name}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

interface KeyMetricsLabelsProps {
  profile: ProfileProps;
}

export default KeyMetricsLabels;
