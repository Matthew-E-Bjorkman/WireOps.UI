import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Role } from "../../types/Business/Role";
import {
  setIsNewRole,
  setSelectedRole,
  setIsEditingRole,
} from "../../store/businessSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface RoleListTableProps {
  rolesList: Role[];
}

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1.0,
    minWidth: 100,
  },
];

export const RoleListTable = ({ rolesList }: RoleListTableProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <DataGrid
      rows={rolesList}
      columns={columns}
      onRowClick={(selectedRole) => {
        dispatch(
          setSelectedRole(
            rolesList.find((role) => role.id === selectedRole.row.id) || null
          )
        );
        dispatch(setIsNewRole(false));
        dispatch(setIsEditingRole(false));

        navigate(`/roles/${selectedRole.row.id}`);
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

export default RoleListTable;
