import React from "react";
import axios from "axios";
import {
  pageData,
  referringSiteData,
  browserVersionsData,
} from "../mock-data/agg.js";

const WT_DX_SERVER = process.env.REACT_APP_DX_SERVER;
const WT_DX_2_0_ENDPOINT = `${WT_DX_SERVER}/v2_0/ReportService`;
const WT_DX_USERNAME = process.env.REACT_APP_DX_USERNAME;
const WT_DX_PASSWORD = process.env.REACT_APP_DX_PASSWORD;

const useGetData = () => {
  const [response, setResponse] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState(200);

  const getWtData = React.useCallback(
    async ({ params = {}, profileID = "", reportID = "" }: getWtDataProps) => {
      try {
        const url = profileID
          ? `${WT_DX_2_0_ENDPOINT}/profiles/${profileID}/reports/${reportID}/`
          : `${WT_DX_2_0_ENDPOINT}/profiles/`;
        const urlParams = { ...params, format: "json" };

        setLoading(true);
        const res = await axios.get(url, {
          params: urlParams,
          auth: {
            username: WT_DX_USERNAME || "",
            password: WT_DX_PASSWORD || "",
          },
        });
        setResponse(res.data);
        setStatus(res.status);
        setLoading(false);

        return res.data;

        // Sending static data for now
        // setResponse(pageData);
      } catch (error: any) {
        setError(error);
        setStatus(error.response.status);
        setLoading(false);
        console.log("Error Retrieving Data:", error);
      }
    },
    []
  );
  return { response, loading, error, status, getWtData };
};

interface getWtDataProps {
  params?: any;
  profileID?: string;
  reportID?: string;
}

export default useGetData;
