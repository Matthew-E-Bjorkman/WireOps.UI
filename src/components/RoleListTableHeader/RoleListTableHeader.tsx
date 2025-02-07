import {
  setSelectedRole,
  setIsNewRole,
  setIsEditingRole,
} from "../../store/businessSlice";
import { Grid2, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Role } from "../../types/Business/Role";

export interface RoleListTableHeaderProps {
  isReducedSize?: boolean;
}

export const RoleListTableHeader = ({
  isReducedSize = false,
}: RoleListTableHeaderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateRole = () => {
    dispatch(setSelectedRole({} as Role));
    dispatch(setIsNewRole(true));
    dispatch(setIsEditingRole(true));

    navigate("/roles/00000000-0000-0000-0000-000000000000");
  };

  return (
    <React.Fragment>
      {!isReducedSize && (
        <Grid2
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          <Grid2 size={{ xs: 12, sm: 9 }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Roles
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateRole}
            >
              Create Role
            </Button>
          </Grid2>
        </Grid2>
      )}
      {isReducedSize && (
        <Grid2 container spacing={2} columns={12}>
          <Grid2 size={{ xs: 12, sm: 9 }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Roles
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateRole}
            >
              New
            </Button>
          </Grid2>
        </Grid2>
      )}
    </React.Fragment>
  );
};
