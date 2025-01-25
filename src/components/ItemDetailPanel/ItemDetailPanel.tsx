import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Paper,
  Typography,
  Grid2,
} from "@mui/material";
import { setIsEditingItem } from "../../store/inventorySlice";
import { AppRootState } from "../../store/store";

const ItemDetailPanel = () => {
  const dispatch = useDispatch();
  function handleEdit(): void {
    dispatch(setIsEditingItem(true));
  }

  const { selectedItem } = useSelector(
    (state: AppRootState) => state.inventory
  );

  return (
    <Paper elevation={3} sx={{ p: 3, margin: "auto" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {selectedItem?.name}
      </Typography>

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
              value={selectedItem?.name}
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
              SKU
            </InputLabel>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 10 }}>
            <TextField
              name="sku"
              value={selectedItem?.sku}
              disabled
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
              value={selectedItem?.description || ""}
              variant="outlined"
              disabled
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
          <Button type="submit" variant="contained" onClick={handleEdit}>
            Edit Item
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ItemDetailPanel;
