import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ReportCategoryTabs from "./ReportCategoryTabs";
import ReportItem from "./ReportItem";
import SearchInput from "../form/SearchInput";
import { ProfileReportsProps, ProfileProps } from "../../interfaces/interfaces";
import useGetData from "../../hooks/getData";

const TabPanel = ({
  value,
  index,
  reports = [],
  setSelectedReport,
  ...props
}: TabPanelProps) => {
  const handleReportClick = (event: any, children: any) => {
    const report: ProfileReportsProps | undefined = reports.find(
      (report: ProfileReportsProps) => report.name === children
    );
    setSelectedReport(report);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...props}
    >
      {value === index && (
        <Grid container spacing={2} sx={{ p: 3 }}>
          {reports.map((report: any, index: number) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <ReportItem clickHandler={handleReportClick}>
                {report.name}
              </ReportItem>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

const ReportSelectionPanel = ({
  profile,
  handleSelection,
}: ReportSelectionPanelProps) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selectedReport, setSelectedReport] =
    React.useState<ProfileReportsProps | undefined>();

  const {
    response: profileReports = [],
    loading,
    error,
    status,
    getWtData: getProfileReports,
  } = useGetData();

  React.useEffect(() => {
    if (Object.keys(profile).length === 0) return;
    getProfileReports({ profileID: profile?.ID });
  }, [getProfileReports, profile]);
  console.log("Reports:", profileReports);

  const [reports, setReports] = React.useState(profileReports);
  const [filteredReports, setFilteredReports] = React.useState(profileReports);

  React.useEffect(() => {
    if (profileReports.length === 0) return;
    setReports(profileReports);
  }, [profileReports]);

  const handleTabChange = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      setFilteredReports(reports);
      return;
    }
    setFilteredReports(
      reports.filter((report: ProfileReportsProps) =>
        report.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const categories: string[] = getCategories(reports);

  React.useEffect(() => {
    if (selectedReport === undefined) return;
    if (selectedReport) {
      handleSelection(selectedReport);
    }
  }, [selectedReport, handleSelection]);

  React.useEffect(() => {
    if (reports.length === 0) return;
    setFilteredReports(reports);
  }, [reports]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "1rem",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <ReportCategoryTabs
          categories={categories}
          clickHandler={handleTabChange}
        />
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "end",
            minWidth: 100,
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
            padding: "0 1em .5em",
          }}
          className={"search"}
        >
          <SearchInput
            label="Find a Report"
            variant="standard"
            searchHandler={handleSearch}
          />
        </Box>
      </Box>
      {categories.map((category: string, index: number) => {
        const categoryReports = getCategoryReports(
          filteredReports,
          categories,
          index
        );
        return (
          <TabPanel
            value={selectedTab}
            index={index}
            key={index}
            reports={categoryReports as []}
            setSelectedReport={setSelectedReport}
          />
        );
      })}
    </Box>
  );
};

const getCategories = (reports: ProfileReportsProps[]) => {
  if (reports === undefined) return [];
  const categories = [
    ...new Set(
      reports.map((report: ProfileReportsProps) => {
        const category = report.Category;
        return category ? category : "Standard";
      })
    ),
  ].sort();
  categories.splice(0, 0, "All");
  return categories;
};

const getCategoryReports = (
  reports: ProfileReportsProps[],
  categories: string[],
  tabIndex: number
) => {
  if (reports === undefined) return [];

  const category =
    categories[tabIndex] === "Standard" ? null : categories[tabIndex];

  let categoryReports;
  if (category === "All") {
    categoryReports = reports;
  } else {
    categoryReports = reports.filter(
      (report: ProfileReportsProps) => category === report.Category
    );
  }
  return categoryReports.sort(
    (a: ProfileReportsProps, b: ProfileReportsProps) => {
      if (a.name > b.name) {
        return 1;
      }
      return -1;
    }
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  reports: [];
  setSelectedReport: React.Dispatch<
    React.SetStateAction<ProfileReportsProps | undefined>
  >;
}

interface ReportSelectionPanelProps {
  /**
   * Profile object returned from DX API v2.0
   */
  profile: ProfileProps;
  handleSelection: (selectedReport: ProfileReportsProps) => void;
}

export default ReportSelectionPanel;