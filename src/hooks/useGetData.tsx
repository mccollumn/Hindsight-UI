import React from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { KeyMetricsProps } from "../interfaces/interfaces";

const DX_ENDPOINT =
  window?.config?.DX_ENDPOINT || process.env.REACT_APP_DX_ENDPOINT;

const useGetData = () => {
  const { auth } = React.useContext(AuthContext);
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
          username: auth?.username || "",
          password: auth?.password || "",
        },
        signal: axiosController.signal,
      });
      setResponse(res.data);
      setStatus(res.status);
      setLoading(false);

      return res.data;
    } catch (error: any) {
      setError(error);
      setStatus(499);
      setLoading(false);
      console.error("Error Retrieving Data:", error);
    }
  };

  const getWtData = React.useCallback(
    async ({ params = {}, profileID = "", reportID = "" }: getWtDataProps) => {
      const url = profileID
        ? `${DX_ENDPOINT}/profiles/${profileID}/reports/${reportID}/`
        : `${DX_ENDPOINT}/profiles/`;
      const res = await getAxios(url, params);
      return res;
    },
    []
  );

  const getReportDefinition = React.useCallback(
    async ({ params = {}, profileID = "", reportID = "" }: getWtDataProps) => {
      const url = `${DX_ENDPOINT}/profiles/${profileID}/reports/${reportID}/info`;
      const res = await getAxios(url, params);
      return res;
    },
    []
  );

  const getKeyMetrics = React.useCallback(
    async ({ params = {}, profileID = "" }: getWtDataProps) => {
      const url = `${DX_ENDPOINT}/keymetrics/${profileID}`;
      const res = await getAxios(url, params);
      return res.data as KeyMetricsProps;
    },
    []
  );

  const getDataQuery = async (parameters: Params) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, { profileID = "", reportID = "", params = {} }] =
      parameters.queryKey;
    const url = profileID
      ? `${DX_ENDPOINT}/profiles/${profileID}/reports/${reportID}/`
      : `${DX_ENDPOINT}/profiles/`;
    const res = await getAxios(url, params);
    return res;
  };

  const getReportDefinitionQuery = async (parameters: Params) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, { profileID = "", reportID = "", params = {} }] =
      parameters.queryKey;
    const url = `${DX_ENDPOINT}/profiles/${profileID}/reports/${reportID}/info`;
    const res = await getAxios(url, params);
    return res;
  };

  const getKeyMetricsQuery = async (parameters: Params) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, { params = {}, profileID = "" }] = parameters.queryKey;
    const url = `${DX_ENDPOINT}/keymetrics/${profileID}`;
    const res = await getAxios(url, params);
    return res as KeyMetricsProps;
  };

  const getReportPeriodsQuery = async (parameters: Params) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_key, { profileID = "", params = {} }] = parameters.queryKey;
    const url = `${DX_ENDPOINT}/profiles/${profileID}/periods/`;
    const res = await getAxios(url, params);
    return res;
  };

  const cancelAllRequests = React.useCallback(() => {
    controllers?.forEach((controller) => {
      controller.abort();
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
    getReportPeriodsQuery,
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
