import { useDispatch } from "react-redux";
import React from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Paper,
  Typography,
  Grid2,
} from "@mui/material";
import { setIsEditingCompany } from "../../store/businessSlice";
import { Company } from "../../types/Business/Company";

export interface CompanyDetailPanelProps {
  company: Company;
}

const CompanyDetailPanel = ({ company }: CompanyDetailPanelProps) => {
  const dispatch = useDispatch();
  function handleEdit(): void {
    dispatch(setIsEditingCompany(true));
  }

  return (
    <Paper elevation={3} sx={{ p: 3, margin: "auto", width: "100%" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {company.name}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid2 container rowSpacing={2} columnSpacing={2}>
          {company.address && (
            <React.Fragment>
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
                  name="address1"
                  value={company.address.address1}
                  disabled
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
                  name="address2"
                  value={company.address.address2}
                  disabled
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
                  name="city"
                  value={company.address.city}
                  disabled
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
                  name="stateProvince"
                  value={company.address.stateProvince}
                  disabled
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
                  name="country"
                  value={company.address.country}
                  disabled
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
                  name="postalCode"
                  value={company.address.postalCode}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid2>
            </React.Fragment>
          )}
          {!company.address && (
            <React.Fragment>
              <Grid2 size={{ xs: 12, sm: 2 }} sx={{ alignContent: "center" }}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    fontWeight: 700,
                    my: 0,
                  }}
                >
                  Address
                </InputLabel>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 10 }}>
                <TextField
                  name="address"
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid2>
            </React.Fragment>
          )}
        </Grid2>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button type="submit" variant="contained" onClick={handleEdit}>
            Edit Company
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CompanyDetailPanel;
