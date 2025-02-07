import { Box, Grid2 } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../../store/store";
import Copyright from "../../../components/Copyright";
import RoleDetailPanel from "../../../components/RoleDetailPanel/RoleDetailPanel";
import RoleEditPanel from "../../../components/RoleEditPanel/RoleEditPanel";
import RoleDetailList from "../../../components/RoleDetailList/RoleDetailList";
import { Role } from "../../../types/Business/Role";
import {
  setSelectedRole,
  setIsEditingRole,
  setIsNewRole,
  useAddRoleMutation,
  useEditRoleMutation,
} from "../../../store/businessSlice";
import Loading from "../../../components/Loading";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const RolesDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roles, selectedRole, isEditingRole, isNewRole } = useSelector(
    (state: AppRootState) => state.business
  );

  const [createRole] = useAddRoleMutation();
  const [updateRole] = useEditRoleMutation();

  function onFormSubmit(role: Role): void {
    if (isNewRole) {
      createRole(role).then((result) =>
        postFormSubmit(result.data, result.error)
      );
    } else {
      updateRole(role).then((result) =>
        postFormSubmit(result.data, result.error)
      );
    }
  }

  function postFormSubmit(
    role: Role | undefined,
    error: FetchBaseQueryError | SerializedError | undefined
  ): void {
    if (role) {
      const wasNewRole = isNewRole;
      dispatch(setSelectedRole(role));
      dispatch(setIsEditingRole(false));
      dispatch(setIsNewRole(false));
      if (wasNewRole) {
        navigate(`/roles/${role.id}`);
      }
    }

    if (error) {
      console.error(error);
    }
  }

  if (!roles || !selectedRole) {
    return <Loading />;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%" } }}>
      <Grid2
        container
        spacing={3}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid2 size={{ xs: 0, md: 3 }}>
          <RoleDetailList roles={roles} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }}>
          {!isEditingRole && <RoleDetailPanel />}
          {isEditingRole && (
            <RoleEditPanel
              selectedRole={selectedRole!}
              isNewRole={isNewRole}
              onSubmit={onFormSubmit}
            />
          )}
        </Grid2>
      </Grid2>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default RolesDetailPage;
