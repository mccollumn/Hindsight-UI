import Box from "@mui/material/Box";
import KeyMetricsDashboard from "../components/keymetrics/KeyMetricsDashboard";
import ReportSelectionPanel from "../components/reports/ReportSelectionPanel";
import Title from "../components/Title";
import { KeyMetricsProps } from "../interfaces/interfaces";
import { ProfileReportsProps } from "../interfaces/interfaces";


const KeyMetrics = ({keyMetricsData, profileName, reports, handleSelection}: KeyMetricsPageProps) => {
    return (
        <Box>
            <Title>{profileName}</Title>
            <KeyMetricsDashboard keyMetricsData={keyMetricsData}/>
            <ReportSelectionPanel reports={reports} handleSelection={handleSelection}/>
        </Box>
    )
}

interface KeyMetricsPageProps {
    keyMetricsData: KeyMetricsProps;
    profileName: string;
    reports: ProfileReportsProps[];
    handleSelection: (selectedReport: ProfileReportsProps) => void;
}

export default KeyMetrics;