import Chip from "@mui/material/Chip";

const KeyMetricsLabel = ({
  metric,
  label,
  icon,
  ...props
}: KeyMetricsLabelProps) => {
  const textContent = `${label}: ${metric}`;
  return (
    <Chip label={textContent} color="primary" variant="outlined" icon={icon} />
  );
};

export default KeyMetricsLabel;

interface KeyMetricsLabelProps {
  metric: number | string;
  label: string;
  icon?: React.ReactElement;
}
