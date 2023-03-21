import { useGridApiRef } from "@mui/x-data-grid-premium";
import DataTable from "./DataTable";

const useDataTable = () => {
  const apiRef = useGridApiRef();
  return {
    DataTable,
    apiRef,
  };
};

export default useDataTable;
