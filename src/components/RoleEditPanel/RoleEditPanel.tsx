import { Role, Actions, Resources } from "../../types/Business/Role";
import React, { useState, useEffect } from "react";
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
import { CheckBox } from "@mui/icons-material";

interface RoleEditPanelProps {
  selectedRole: Role;
  isNewRole: boolean;
  onSubmit: (role: Role) => void;
}

const RoleEditPanel = ({
  selectedRole,
  isNewRole,
  onSubmit,
}: RoleEditPanelProps) => {
  const [formData, setFormData] = useState<Role>({
    name: selectedRole.name,
    is_admin: selectedRole.is_admin,
    permissions: selectedRole.permissions ?? [],
  } as Role);

  const [touched, setTouched] = useState<Record<keyof Role, boolean>>({
    name: false,
    is_admin: false,
    permissions: false,
  } as Record<keyof Role, boolean>);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(":")) {
      const [resource, action] = name.split(":");
      const permissions = formData.permissions;

      const index = permissions.findIndex(
        (perm) => perm.action === action && perm.resource === resource
      );

      if (index === -1) {
        permissions.push({ resource, action });
      } else {
        permissions.splice(index, 1);
      }

      setFormData((prev) => ({
        ...prev,
        permissions,
      }));
      setTouched((prev) => ({
        ...prev,
        permissions: true,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isNameValid = formData.name && formData.name.trim() !== "";

  return (
    <Paper elevation={3} sx={{ p: 3, margin: "auto" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {!isNewRole ? "Edit Role" : "Create New Role"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Grid2 container rowSpacing={2} columnSpacing={2}>
            <Grid2 size={{ xs: 12, sm: 2 }} sx={{ alignContent: "center" }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  fontWeight: 700,
                  my: 0,
                }}
              >
                Name
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={touched.name && !isNameValid}
                helperText={
                  touched.name && !isNameValid ? "Name is required" : ""
                }
                required
                size="small"
                fullWidth
                variant="outlined"
              />
            </Grid2>
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
                  <Checkbox
                    name={"is_admin"}
                    checked={formData.is_admin}
                    onChange={handleChange}
                  />
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
                      {(
                        Object.keys(Actions) as Array<keyof typeof Actions>
                      ).map((action) => (
                        <Stack spacing={1} alignItems="center" minWidth={50}>
                          {action}
                          <Checkbox
                            name={`${resource}:${action}`}
                            checked={formData.permissions.some(
                              (perm) =>
                                perm.action === action &&
                                perm.resource === resource
                            )}
                            onChange={handleChange}
                          />
                        </Stack>
                      ))}
                    </Grid2>
                  </Grid2>
                </>
              )
            )}
          </Grid2>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isNameValid}
            >
              {!isNewRole ? "Update Role" : "Create Role"}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default RoleEditPanel;
