import {
  setSelectedStaffer,
  setIsNewStaffer,
  setIsEditingStaffer,
} from "../../store/businessSlice";
import { Grid2, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Staffer } from "../../types/Business/Staffer";

export interface StafferListTableHeaderProps {
  isReducedSize?: boolean;
}

export const StafferListTableHeader = ({
  isReducedSize = false,
}: StafferListTableHeaderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateStaffer = () => {
    dispatch(setSelectedStaffer({} as Staffer));
    dispatch(setIsNewStaffer(true));
    dispatch(setIsEditingStaffer(true));

    navigate("/staffers/00000000-0000-0000-0000-000000000000");
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
              Staffers
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateStaffer}
            >
              Create Staffer
            </Button>
          </Grid2>
        </Grid2>
      )}
      {isReducedSize && (
        <Grid2 container spacing={2} columns={12}>
          <Grid2 size={{ xs: 12, sm: 9 }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Staffers
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateStaffer}
            >
              New
            </Button>
          </Grid2>
        </Grid2>
      )}
    </React.Fragment>
  );
};
