import { Staffer } from "../../types/Business/Staffer";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Paper,
  Typography,
  Grid2,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Role } from "../../types/Business/Role";
import { useSelector } from "react-redux";
import { AppRootState } from "../../store/store";

interface StafferEditPanelProps {
  selectedStaffer: Staffer;
  isNewStaffer: boolean;
  onSubmit: (staffer: Staffer) => void;
}

const StafferEditPanel = ({
  selectedStaffer,
  isNewStaffer,
  onSubmit,
}: StafferEditPanelProps) => {
  const [formData, setFormData] = useState<Staffer>({
    given_name: selectedStaffer.given_name,
    family_name: selectedStaffer.family_name,
    email: selectedStaffer.email,
    role_id: selectedStaffer.role_id,
  } as Staffer);

  const [touched, setTouched] = useState<Record<keyof Staffer, boolean>>({
    given_name: false,
    family_name: false,
    email: false,
    role_id: false,
  } as Record<keyof Staffer, boolean>);

  const { roles } = useSelector((state: AppRootState) => state.business);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      role_id: value,
    }));
    setTouched((prev) => ({
      ...prev,
      role_id: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isGivenNameValid =
    formData.given_name && formData.given_name.trim() !== "";
  const isFamilyNameValid =
    formData.family_name && formData.family_name.trim() !== "";
  const isEmailValid =
    formData.email &&
    formData.email.trim() !== "" &&
    formData.email.includes("@");

  return (
    <Paper elevation={3} sx={{ p: 3, margin: "auto" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {!isNewStaffer ? "Edit Staffer" : "Create New Staffer"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Grid2 container rowSpacing={2} columnSpacing={2}>
            <Grid2 size={{ xs: 12, sm: 2 }} sx={{ alignContent: "center" }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 700,
                  my: 0,
                }}
              >
                Email
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={touched.email && !isEmailValid}
                helperText={
                  touched.email && !isEmailValid ? "Email is required" : ""
                }
                variant="outlined"
                fullWidth
                required
                size="small"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2 }} sx={{ alignContent: "center" }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 700,
                  my: 0,
                }}
              >
                First Name
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="given_name"
                value={formData.given_name}
                onChange={handleChange}
                error={touched.given_name && !isGivenNameValid}
                helperText={
                  touched.given_name && !isGivenNameValid
                    ? "First Name is required"
                    : ""
                }
                required
                size="small"
                fullWidth
                variant="outlined"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2 }} sx={{ alignContent: "center" }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 700,
                  my: 0,
                }}
              >
                Last Name
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="family_name"
                value={formData.family_name}
                onChange={handleChange}
                error={touched.family_name && !isFamilyNameValid}
                helperText={
                  touched.family_name && !isFamilyNameValid
                    ? "Last Name is required"
                    : ""
                }
                required
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2 }} sx={{ alignContent: "center" }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 700,
                  my: 0,
                }}
              >
                Role
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <Select
                disabled={selectedStaffer?.is_owner}
                name="role"
                value={formData.role_id}
                onChange={handleRoleChange}
                fullWidth
                variant="outlined"
              >
                {roles?.map((role: Role) => (
                  <MenuItem value={role.id}>{role.name}</MenuItem>
                ))}
              </Select>
            </Grid2>
          </Grid2>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                !isGivenNameValid || !isFamilyNameValid || !isEmailValid
              }
            >
              {!isNewStaffer ? "Update Staffer" : "Create Staffer"}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default StafferEditPanel;
