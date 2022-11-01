import Box from "@mui/material/Box";

const KeyMetrics = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        right: "10%",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      Views: 10
      <br></br>
      Visits: 1
    </Box>
  );
};

export default KeyMetrics;
