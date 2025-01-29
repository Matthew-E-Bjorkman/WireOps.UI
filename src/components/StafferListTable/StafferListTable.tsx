import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Staffer } from "../../types/Business/Staffer";
import {
  setIsNewStaffer,
  setSelectedStaffer,
  setIsEditingStaffer,
} from "../../store/businessSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface StafferListTableProps {
  staffersList: Staffer[];
}

const columns: GridColDef[] = [
  {
    field: "email",
    headerName: "Email",
    flex: 1.0,
    minWidth: 100,
  },
  { field: "given_name", headerName: "First Name", flex: 1.0, minWidth: 80 },
  {
    field: "family_name",
    headerName: "Last Name",
    flex: 1.0,
    minWidth: 80,
  },
];

export const StafferListTable = ({ staffersList }: StafferListTableProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <DataGrid
      rows={staffersList}
      columns={columns}
      onRowClick={(selectedStaffer) => {
        dispatch(
          setSelectedStaffer(
            staffersList.find(
              (staffer) => staffer.id === selectedStaffer.row.id
            ) || null
          )
        );
        dispatch(setIsNewStaffer(false));
        dispatch(setIsEditingStaffer(false));

        navigate(`/staffers/${selectedStaffer.row.id}`);
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      hideFooterSelectedRowCount
      hideFooterPagination
      hideFooter
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
};

export default StafferListTable;
