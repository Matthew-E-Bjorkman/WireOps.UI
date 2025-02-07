import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Paper,
  Typography,
  Grid2,
  Stack,
  Checkbox,
} from "@mui/material";
import {
  setIsEditingRole,
  useDeleteRoleMutation,
} from "../../store/businessSlice";
import { AppRootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Actions, Resources } from "../../types/Business/Role";

const RoleDetailPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteRole] = useDeleteRoleMutation();

  const { selectedRole, currentStaffer } = useSelector(
    (state: AppRootState) => state.business
  );

  function handleDelete(): void {
    deleteRole({ id: selectedRole!.id }).then(() => {
      navigate("/roles");
    });
  }

  function handleEdit(): void {
    dispatch(setIsEditingRole(true));
  }

  return (
    <Paper elevation={3} sx={{ p: 3, margin: "auto" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {selectedRole?.name}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid2 container rowSpacing={2} columnSpacing={2}>
          <Grid2 size={{ xs: 12 }}>
            <Typography component="h2" variant="h6">
              Permissions
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 2 }} key={"admin"} alignContent="center">
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "start",
                fontWeight: 700,
                my: 0,
              }}
            >
              Admin
            </InputLabel>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 10 }}>
            <Grid2 container columnSpacing={2}>
              <Stack spacing={1} alignItems="center" minWidth={50}>
                admin
                <Box>
                  <Checkbox
                    disabled
                    name={"is_admin"}
                    checked={selectedRole?.is_admin}
                    sx={{ mx: 2 }}
                  />
                </Box>
              </Stack>
            </Grid2>
          </Grid2>
          {(Object.keys(Resources) as Array<keyof typeof Resources>).map(
            (resource) => (
              <>
                <Grid2
                  size={{ xs: 12, sm: 2 }}
                  key={resource}
                  alignContent="center"
                >
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      fontWeight: 700,
                      my: 0,
                    }}
                  >
                    {resource.charAt(0).toUpperCase() + resource.slice(1)}
                  </InputLabel>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 10 }}>
                  <Grid2 container columnSpacing={2}>
                    {(Object.keys(Actions) as Array<keyof typeof Actions>).map(
                      (action) => (
                        <Stack spacing={1} alignItems="center" minWidth={50}>
                          {action}
                          <Box>
                            <Checkbox
                              disabled
                              name={`${resource}:${action}`}
                              checked={selectedRole?.permissions.some(
                                (perm) =>
                                  perm.action === action &&
                                  perm.resource === resource
                              )}
                            />
                          </Box>
                        </Stack>
                      )
                    )}
                  </Grid2>
                </Grid2>
              </>
            )
          )}
        </Grid2>

        <Grid2
          container
          rowSpacing={2}
          columnSpacing={2}
          justifyContent="space-between"
        >
          <Box sx={{ display: "flex", gap: 2 }}></Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={
                selectedRole?.is_owner_role ||
                selectedRole?.id === currentStaffer?.role_id
              }
            >
              Delete Role
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={handleEdit}
              disabled={
                selectedRole?.is_owner_role ||
                selectedRole?.id === currentStaffer?.role_id
              }
            >
              Edit Role
            </Button>
          </Box>
        </Grid2>
      </Box>
    </Paper>
  );
};

export default RoleDetailPanel;
