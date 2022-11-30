import React from "react";
import Box from "@mui/material/Box";
import KeyMetricsDashboard from "../components/keymetrics/KeyMetricsDashboard";
import ReportSelectionPanel from "../components/reports/ReportSelectionPanel";
import ReportModal from "../components/reports/ReportModal";
import Title from "../components/Title";
import { ProfileProps, ProfileReportsProps } from "../interfaces/interfaces";

const KeyMetrics = ({ profile }: KeyMetricsPageProps) => {
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
  const [selectedReport, setSelectedReport] =
    React.useState<ProfileReportsProps | null>(null);

  const cancelApiRequests: any = React.useRef();
  const getCancelRequests = (cancelAllRequests: any) => {
    cancelApiRequests.current = cancelAllRequests;
  };

  const handleReportModalOpen = () => {
    setIsReportModalOpen(true);
  };

  const handleReportModalClose = () => {
    cancelApiRequests.current();
    setSelectedReport(null);
    setIsReportModalOpen(false);
  };

  const onReportSelect = React.useCallback((report: ProfileReportsProps) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  }, []);

  return (
    <Box>
      <Title>{getProfileName(profile)}</Title>
      <KeyMetricsDashboard profile={profile} />
      {Object.keys(profile).length !== 0 && (
        <ReportSelectionPanel
          profile={profile}
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
          handleSelection={onReportSelect}
        />
      )}
      {selectedReport !== null && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={handleReportModalClose}
          profile={profile}
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
