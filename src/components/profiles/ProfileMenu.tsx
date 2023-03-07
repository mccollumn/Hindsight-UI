import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useProfiles } from "../../hooks/useProfiles";
import { ProfileProps } from "../../interfaces/interfaces";

const ProfileMenu = ({
  profiles = [],
  handleSelection,
  ...props
}: ProfileMenuProps) => {
  const { selectedProfile } = useProfiles();
  const [value, setValue] = React.useState(selectedProfile || {});
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: ProfileProps | null
  ) => {
    if (value === null) return;
    handleSelection(value, event);
  };

  React.useEffect(() => {
    setValue(selectedProfile || {});
  }, [selectedProfile]);

  return (
    <Autocomplete
      disablePortal
      id="profile-menu"
      options={profiles}
      sx={{
        width: 300,
        // TODO: Decide how this should be styled
        // "& .MuiInputBase-root": { backgroundColor: "white" },
        // "& .MuiFormLabel-root.Mui-focused": {
        //   color: "black",
        //   backgroundColor: "white",
        // },
      }}
      getOptionLabel={(option) => option?.name || ""}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a Profile"
          variant="filled"
          sx={{ backgroundColor: "white" }}
        />
      )}
      loading={profiles.length === 0}
      onChange={handleChange}
      value={value}
      freeSolo
      forcePopupIcon
      {...props}
    />
  );
};

interface ProfileMenuProps {
  /**
   * Array of profile objects returned from DX API v2
   */
  profiles: ProfileProps[];
  handleSelection: (
    value: ProfileProps,
    event: React.SyntheticEvent<Element, Event>
  ) => void;
  [x: string]: any;
}

export default ProfileMenu;
