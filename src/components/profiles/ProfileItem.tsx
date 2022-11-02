import { MouseEvent } from "react";
import { Button } from "@mui/material";
import KeyMetricsLabel from "./KeyMetricsLabel";
import { styled } from "@mui/material/styles";

const ProfileButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  width: "100%",
  justifyContent: "left",
  position: "relative",
  padding: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  textTransform: "none",
  textAlign: "left",
}));

const ProfileItem = ({ children, clickHandler }: ProfileItemProps) => {
  const handleClick = (event: MouseEvent) => {
    clickHandler(event, children);
  };

  return (
    <ProfileButton variant="outlined" onClick={handleClick}>
      {children}
      <KeyMetricsLabel />
    </ProfileButton>
  );
};

interface ProfileItemProps {
  children: any;
  clickHandler: (event: MouseEvent, children: any) => void;
}

export default ProfileItem;
