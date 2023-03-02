import { MouseEvent } from "react";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import KeyMetricsLabels from "./KeyMetricsLabels";
import { styled } from "@mui/material/styles";
import { ProfileProps } from "../../interfaces/interfaces";

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

const ProfileItem = ({ children, profile, clickHandler }: ProfileItemProps) => {
  const handleClick = (event: MouseEvent) => {
    clickHandler(event, children);
  };

  if (profile) {
    return (
      <ProfileButton variant="outlined" onClick={handleClick}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>{children}</Grid>
          <Grid item>
            <KeyMetricsLabels profile={profile} />
          </Grid>
        </Grid>
      </ProfileButton>
    );
  }

  return (
    <ProfileButton variant="outlined" onClick={handleClick}>
      {children}
    </ProfileButton>
  );
};

interface ProfileItemProps {
  children: any;
  profile?: ProfileProps;
  clickHandler: (event: MouseEvent, children: any) => void;
}

export default ProfileItem;
