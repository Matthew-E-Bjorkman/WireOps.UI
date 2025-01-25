import {
  setSelectedItem,
  setIsNewItem,
  setIsEditingItem,
} from "../../store/inventorySlice";
import { Grid2, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Item } from "../../types/Inventory/Item";

export interface ItemListTableHeaderProps {
  isReducedSize?: boolean;
}

export const ItemListTableHeader = ({
  isReducedSize = false,
}: ItemListTableHeaderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateItem = () => {
    dispatch(setSelectedItem({} as Item));
    dispatch(setIsNewItem(true));
    dispatch(setIsEditingItem(true));

    navigate("/items/00000000-0000-0000-0000-000000000000");
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
              Items
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateItem}
            >
              Create Item
            </Button>
          </Grid2>
        </Grid2>
      )}
      {isReducedSize && (
        <Grid2 container spacing={2} columns={12}>
          <Grid2 size={{ xs: 12, sm: 9 }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Items
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateItem}
            >
              New
            </Button>
          </Grid2>
        </Grid2>
      )}
    </React.Fragment>
  );
};
