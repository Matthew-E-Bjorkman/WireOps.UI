import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Staffer } from "../../types/Business/Staffer";
import {
  setIsEditingStaffer,
  setIsNewStaffer,
  setSelectedStaffer,
} from "../../store/businessSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StafferListTableHeader } from "../StafferListTableHeader/StafferListTableHeader";
import { Box } from "@mui/material";

export interface StafferDetailListProps {
  staffersList: Staffer[];
  selectedStaffer?: Staffer | null;
}

const columns: GridColDef[] = [
  {
    field: "display_name",
    headerName: "displayName",
    flex: 0.5,
    minWidth: 100,
  },
];

export const StafferDetailList = ({
  staffersList,
  selectedStaffer = null,
}: StafferDetailListProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const staffers = staffersList.map((staffer) => {
    return {
      ...staffer,
      display_name: `${staffer.given_name} ${staffer.family_name}`,
    };
  });

  return (
    <Box>
      <StafferListTableHeader isReducedSize />
      <DataGrid
        rows={staffers}
        columns={columns}
        rowSelectionModel={selectedStaffer ? [selectedStaffer.id] : []}
        columnHeaderHeight={0}
        onRowClick={(selectedRow) => {
          dispatch(
            setSelectedStaffer(
              staffers.find((staffer) => staffer.id === selectedRow.row.id) ||
                null
            )
          );
          dispatch(setIsNewStaffer(false));
          dispatch(setIsEditingStaffer(false));

          navigate(`/staffers/${selectedRow.row.id}`);
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        hideFooter
        density="compact"
        slots={{
          columnHeaders: () => null,
        }}
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
    </Box>
  );
};

export default StafferDetailList;
