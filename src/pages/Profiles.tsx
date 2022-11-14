import { Box } from "@mui/material";
import ProfileItem from "../components/profiles/ProfileItem";
import { ProfileProps } from "../interfaces/interfaces";

const Profiles = ({ profiles = [], onClick }: ProfilesProps) => {
  const profileClick = (profile: ProfileProps) => {
    onClick(profile);
  };

  return (
    <Box
      sx={{
        m: "2rem",
        height: "100vh",
      }}
    >
      {[...profiles].map((profile) => (
        <ProfileItem
          clickHandler={() => profileClick(profile)}
          key={profile.name}
        >
          {profile.name}
        </ProfileItem>
      ))}
    </Box>
  );
};

interface ProfilesProps {
  profiles: ProfileProps[];
  onClick: Function;
}

export default Profiles;
