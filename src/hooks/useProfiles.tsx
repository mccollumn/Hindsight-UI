import React from "react";
import useGetData from "./useGetData";
import { useQueryParam, StringParam } from "use-query-params";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";

export const useProfiles = () => {
  const { auth } = React.useContext(AuthContext);
  const { getDataQuery } = useGetData();
  const {
    isLoading,
    isSuccess,
    isError,
    data: profiles,
  } = useQuery(["profiles", {}], getDataQuery, {
    enabled: auth !== null,
  });

  const [profile, setProfile] = useQueryParam("profile", StringParam);

  const selectedProfile = React.useMemo(() => {
    if (!profiles) return undefined;
    if (!profile) return undefined;

    return profiles.find((p: any) => {
      return p.ID === profile;
    });
  }, [profile, profiles]);

  console.log("useProfiles profiles:", profiles);
  console.log("useProfiles selected profile:", selectedProfile);
  console.log("useProfiles profile id:", profile);

  return { profiles, profileID: profile, selectedProfile, setProfile };
};