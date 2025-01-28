import { Item } from "../../types/Inventory/Item";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "../../store/store";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Paper,
  Typography,
  Grid2,
} from "@mui/material";

interface ItemEditPanelProps {
  onSubmit: (item: Item) => void;
}

const ItemEditPanel = ({ onSubmit }: ItemEditPanelProps) => {
  const [formData, setFormData] = useState<Item>({
    name: "",
    sku: "",
    description: "",
  } as Item);

  const [touched, setTouched] = useState<Record<keyof Item, boolean>>({
    name: false,
    sku: false,
    description: false,
  } as Record<keyof Item, boolean>);

  const { selectedItem, isNewItem } = useSelector(
    (state: AppRootState) => state.inventory
  );

  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem);
    }
  }, [selectedItem]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isNameValid = formData.name?.trim() !== "";
  const isSkuValid = formData.sku?.trim() !== "";

  return (
    <Paper elevation={3} sx={{ p: 3, margin: "auto" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {!isNewItem ? "Edit Item" : "Create New Item"}
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
            <Grid2 size={{ xs: 12, sm: 2 }} sx={{ alignContent: "center" }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 700,
                  my: 0,
                }}
              >
                SKU
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                error={touched.sku && !isSkuValid}
                helperText={touched.sku && !isSkuValid ? "SKU is required" : ""}
                required
                fullWidth
                variant="outlined"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2 }}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  fontWeight: 700,
                  my: 0,
                }}
              >
                Description
              </InputLabel>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 10 }}>
              <TextField
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                variant="outlined"
                multiline
                fullWidth
                rows={4}
                slotProps={{
                  input: {
                    sx: {
                      minHeight: "100px",
                    },
                  },
                }}
              />
            </Grid2>
          </Grid2>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isNameValid || !isSkuValid}
            >
              {!isNewItem ? "Update Item" : "Create Item"}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default ItemEditPanel;
