import { MouseEvent } from "react";
import { Box } from "@mui/material";
import ProfileItem from "./ProfileItem";
import { useNavigate } from "react-router-dom";

const ProfileList = ({ profileNames, setSection }: ProfileListProps) => {
  const navigate = useNavigate();
  const profileClick = (event: MouseEvent, children: any) => {
    setSection("reports");
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        m: "2rem",
        height: "100vh",
      }}
    >
      {[...profileNames].map((name) => (
        <ProfileItem clickHandler={profileClick} key={name}>
          {name}
        </ProfileItem>
      ))}
    </Box>
  );
};

interface ProfileListProps {
  profileNames: string[];
  setSection: any;
}

export default ProfileList;
