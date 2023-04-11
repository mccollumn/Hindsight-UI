import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const ReportCategoryTabs = ({
  categories,
  clickHandler,
}: ReportCategoryTabsProps) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    clickHandler(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        // maxWidth: { xs: 320, sm: 480, md: 720, lg: 1024, xl: 1920 },
        // bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="report category tabs"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "primary.light",
            height: "4px",
            bottom: "4%",
          },
        }}
      >
        {categories.map((tab: string, index: number) => (
          <Tab
            label={tab}
            key={index}
            {...a11yProps(index)}
            sx={{
              "&.MuiTab-textColorPrimary": {
                color: "grey.500",
              },
              "&.Mui-selected": {
                color: "grey.50",
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

interface ReportCategoryTabsProps {
  categories: any[];
  clickHandler: Function;
}

export default ReportCategoryTabs;
