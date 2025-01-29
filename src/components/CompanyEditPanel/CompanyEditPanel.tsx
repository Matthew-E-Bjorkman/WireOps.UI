import { Company } from "../../types/Business/Company";
import { Address } from "../../types/Common/Address";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Paper,
  Typography,
  Grid2,
} from "@mui/material";

interface CompanyEditPanelProps {
  company: Company;
  onSubmit: (staffer: Company) => void;
}

const CompanyEditPanel = ({ company, onSubmit }: CompanyEditPanelProps) => {
  const [formData, setFormData] = useState<Company>({
    id: company.id,
    name: company.name,
    address: {} as Address,
  } as Company);

  const [touched, setTouched] = useState<
    Record<keyof Company | keyof Address, boolean>
  >({
    id: false,
    name: false,
    address1: false,
    address2: false,
    city: false,
    stateProvince: false,
    country: false,
    postalCode: false,
  } as Record<keyof Company | keyof Address, boolean>);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");
    if (nameParts.length == 2) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [nameParts[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setTouched((prev) => ({
      ...prev,
      [nameParts[nameParts.length - 1]]: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isAddress1Valid = formData.address.address1?.trim() !== "";
  const isAddress2Valid = formData.address.address2?.trim() !== "";
  const isCityValid = formData.address.city?.trim() !== "";
  const isStateProvinceValid = formData.address.stateProvince?.trim() !== "";
  const isCountryValid = formData.address.country?.trim() !== "";
  const isPostalCodeValid = formData.address.postalCode?.trim() !== "";

  const isAddressValid =
    formData.address === null ||
    (isAddress1Valid &&
      isAddress2Valid &&
      isCityValid &&
      isStateProvinceValid &&
      isCountryValid &&
      isPostalCodeValid);

  return (
    <Paper elevation={3} sx={{ p: 3, margin: "auto" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Edit Company
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
                Address 1
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="address.address1"
                value={formData.address.address1}
                error={touched.address1 && !isAddress1Valid}
                onChange={handleChange}
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
                Address 2
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="address.address2"
                value={formData.address.address2}
                onChange={handleChange}
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
                City
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
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
                State
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="address.stateProvince"
                value={formData.address.stateProvince}
                onChange={handleChange}
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
                Country
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
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
                Zip Code
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid2>
          </Grid2>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isAddressValid}
            >
              Update Company
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default CompanyEditPanel;
