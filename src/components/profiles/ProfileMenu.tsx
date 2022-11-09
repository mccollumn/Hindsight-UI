import * as React from "react";
import { Autocomplete, AutocompleteProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ProfileProps } from "../../interfaces/interfaces";

const ProfileMenu = ({
  profiles = [],
  handleSelection,
  ...props
}: ProfileMenuProps) => {
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: ProfileProps | null
  ) => {
    if (value === null) return;
    handleSelection(event, value);
  };

  return (
    <Autocomplete
      disablePortal
      id="profile-menu"
      options={profiles}
      sx={{
        width: 300,
        "& .MuiInputBase-root": { backgroundColor: "white" },
        //TODO: Decide how this should be styled
        "& .MuiFormLabel-root.Mui-focused": {
          color: "black",
          backgroundColor: "white",
        },
      }}
      getOptionLabel={(option) => option?.name || ""}
      renderInput={(params) => (
        <TextField {...params} label="Select a Profile" />
      )}
      loading={profiles.length === 0}
      onChange={handleChange}
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
    event: React.SyntheticEvent<Element, Event>,
    value: ProfileProps
  ) => void;
  [x: string]: any;
}

export default ProfileMenu;
