import { MouseEvent } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const ReportButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  justifyContent: "left",
  position: "relative",
  padding: theme.spacing(1),
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(0),
  textTransform: "none",
  textAlign: "left",
}));

const ReportItem = ({ children, clickHandler, ...props }: ReportItemProps) => {
  const handleClick = (event: MouseEvent) => {
    clickHandler(event, children);
  };

  return (
    <ReportButton variant="outlined" onClick={handleClick} {...props}>
      {children}
    </ReportButton>
  );
};

interface ReportItemProps {
  children: any;
  clickHandler: (event: MouseEvent, children: any) => void;
}

export default ReportItem;
