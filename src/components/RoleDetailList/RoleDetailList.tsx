import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Role } from "../../types/Business/Role";
import {
  setIsEditingRole,
  setIsNewRole,
  setSelectedRole,
} from "../../store/businessSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RoleListTableHeader } from "../RoleListTableHeader/RoleListTableHeader";
import { Box } from "@mui/material";

export interface RoleDetailListProps {
  roles: Role[];
  selectedRole?: Role | null;
}

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "name",
    flex: 0.5,
    minWidth: 100,
  },
];

export const RoleDetailList = ({
  roles,
  selectedRole = null,
}: RoleDetailListProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box>
      <RoleListTableHeader isReducedSize />
      <DataGrid
        rows={roles}
        columns={columns}
        rowSelectionModel={selectedRole ? [selectedRole.id] : []}
        columnHeaderHeight={0}
        onRowClick={(selectedRow) => {
          dispatch(
            setSelectedRole(
              roles.find((role) => role.id === selectedRow.row.id) || null
            )
          );
          dispatch(setIsNewRole(false));
          dispatch(setIsEditingRole(false));

          navigate(`/roles/${selectedRow.row.id}`);
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

export default RoleDetailList;
