import React from "react";
import Box from "@mui/material/Box";
import KeyMetricsDashboard from "../components/keymetrics/KeyMetricsDashboard";
import ReportSelectionPanel from "../components/reports/ReportSelectionPanel";
import ReportModal from "../components/reports/ReportModal";
import Title from "../components/Title";
import { ProfileProps, ProfileReportsProps } from "../interfaces/interfaces";
import { useProfiles } from "../hooks/useProfiles";
import { useReports } from "../hooks/useReports";

const KeyMetrics = ({ profile }: KeyMetricsPageProps) => {
  const { profileID, selectedProfile, setProfile } = useProfiles();
  setProfile(profile.ID ? profile.ID : profileID);
  const { reports, reportID, setReport } = useReports();
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
  const [selectedReport, setSelectedReport] =
    React.useState<ProfileReportsProps | null>(null);

  const cancelApiRequests: any = React.useRef();
  const getCancelRequests = (cancelAllRequests: any) => {
    cancelApiRequests.current = cancelAllRequests;
  };

  React.useMemo(() => {
    if (reportID && reports.length > 0) {
      setSelectedReport(
        reports.find((r: ProfileReportsProps) => r.ID === reportID)
      );
      setReport(reportID);
    }
  }, [reportID, reports, setReport]);

  const handleReportModalClose = () => {
    if (typeof cancelApiRequests.current === "function") {
      cancelApiRequests.current();
    }
    setSelectedReport(null);
    setReport(null);
    setIsReportModalOpen(false);
  };

  const onReportSelect = React.useCallback(
    (report: ProfileReportsProps) => {
      setSelectedReport(report);
      setReport(report.ID);
      setIsReportModalOpen(true);
    },
    [setReport]
  );

  if (!selectedProfile || !reports) {
    return null;
  }
  return (
    <Box>
      <Title>{getProfileName(selectedProfile)}</Title>
      <KeyMetricsDashboard profile={selectedProfile} />
      {Object.keys(selectedProfile).length !== 0 && (
        <ReportSelectionPanel
          profile={selectedProfile}
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
          handleSelection={onReportSelect}
        />
      )}
      {selectedReport !== null && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={handleReportModalClose}
          profile={selectedProfile}
          report={selectedReport}
          cancelRequestsCallback={getCancelRequests}
        />
      )}
    </Box>
  );
};

const getProfileName = (profile: ProfileProps) => profile?.name || "";

interface KeyMetricsPageProps {
  /**
   * Profile object returned from DX API v2.0
   */
  profile: ProfileProps;
}

export default KeyMetrics;
