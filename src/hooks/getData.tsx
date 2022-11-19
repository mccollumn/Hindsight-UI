import React from "react";
import axios from "axios";

// Test data
import { keyMetrics } from "../mock-data/keyMetrics";

const WT_DX_SERVER = process.env.REACT_APP_DX_SERVER;
const WT_DX_2_0_ENDPOINT = `${WT_DX_SERVER}/v2_0/ReportService`;
const WT_DX_USERNAME = process.env.REACT_APP_DX_USERNAME;
const WT_DX_PASSWORD = process.env.REACT_APP_DX_PASSWORD;

const useGetData = () => {
  const [response, setResponse] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState(200);
  const [controllers, setControllers] = React.useState<AbortController[]>([]);

  const getAxios = async (url: string, params: any) => {
    try {
      const urlParams = { ...params, format: "json" };

      const axiosController = new AbortController();
      setControllers((prev: any) => [...prev, axiosController]);
      setLoading(true);
      const res = await axios.get(url, {
        params: urlParams,
        auth: {
          username: WT_DX_USERNAME || "",
          password: WT_DX_PASSWORD || "",
        },
        signal: axiosController.signal,
      });
      setResponse(res.data);
      setStatus(res.status);
      setLoading(false);

      return res.data;
    } catch (error: any) {
      setError(error);
      setStatus(error.response.status);
      setLoading(false);
      console.log("Error Retrieving Data:", error);
    }
  };

  const getWtData = React.useCallback(
    async ({ params = {}, profileID = "", reportID = "" }: getWtDataProps) => {
      const url = profileID
        ? `${WT_DX_2_0_ENDPOINT}/profiles/${profileID}/reports/${reportID}/`
        : `${WT_DX_2_0_ENDPOINT}/profiles/`;
      const res = await getAxios(url, params);
      return res;
    },
    []
  );

  const getReportDefinition = React.useCallback(
    async ({ params = {}, profileID = "", reportID = "" }: getWtDataProps) => {
      const url = `${WT_DX_2_0_ENDPOINT}/profiles/${profileID}/reports/${reportID}/info`;
      const res = await getAxios(url, params);
      return res;
    },
    []
  );

  const getKeyMetrics = React.useCallback(
    async ({ params = {}, profileID = "" }: getWtDataProps) => {
      const url = `${WT_DX_2_0_ENDPOINT}/keymetrics/${profileID}`;
      // const res = await getAxios(url, params);
      // return res.data;

      // Sending mock data until API is fixed
      setResponse(keyMetrics);
      return keyMetrics;
    },
    []
  );

  const getDataQuery = async (parameters: Params) => {
    const [_key, { profileID = "", reportID = "", params = {} }] =
      parameters.queryKey;
    const url = profileID
      ? `${WT_DX_2_0_ENDPOINT}/profiles/${profileID}/reports/${reportID}/`
      : `${WT_DX_2_0_ENDPOINT}/profiles/`;
    const res = await getAxios(url, params);
    return res;
  };

  const getReportDefinitionQuery = async (parameters: Params) => {
    const [_key, { profileID = "", reportID = "", params = {} }] =
      parameters.queryKey;
    const url = `${WT_DX_2_0_ENDPOINT}/profiles/${profileID}/reports/${reportID}/info`;
    const res = await getAxios(url, params);
    return res;
  };

  const getKeyMetricsQuery = async (parameters: Params) => {
    const [_key, { params = {}, profileID = "" }] = parameters.queryKey;
    const url = `${WT_DX_2_0_ENDPOINT}/keymetrics/${profileID}`;
    // const res = await getAxios(url, params);
    // return res;

    // Sending mock data until API is fixed
    return keyMetrics;
  };

  const cancelAllRequests = React.useCallback(() => {
    controllers?.forEach((controller) => {
      controller.abort();
      console.log("Aborting:", controller);
    });
  }, [controllers]);

  return {
    response,
    loading,
    error,
    status,
    controllers,
    getWtData,
    getReportDefinition,
    getKeyMetrics,
    getDataQuery,
    getReportDefinitionQuery,
    getKeyMetricsQuery,
    cancelAllRequests,
  };
};

interface getWtDataProps {
  params?: any;
  profileID?: string;
  reportID?: string;
}

type Params = {
  queryKey: [string, { profileID?: string; reportID?: string; params?: any }];
  signal?: any;
};

export default useGetData;
