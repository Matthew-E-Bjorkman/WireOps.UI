import { Paper, Typography } from "@mui/material";
import { Item } from "../../types/Inventory/Item";
import ItemEditPanel from "../ItemEditPanel/ItemEditPanel";

interface ItemDetailPanelProps {
  selectedItem: Item | null;
  isNewItem: boolean;
}

const ItemDetailPanel = ({ selectedItem, isNewItem }: ItemDetailPanelProps) => {
  return (
    <Paper
      sx={{
        p: 3,
        height: "100%",
        overflow: "auto",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {selectedItem || isNewItem ? (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {isNewItem ? "Create New Item" : "Edit Item"}
          </Typography>
          <ItemEditPanel />
        </>
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
          Select an item or create a new one
        </Typography>
      )}
    </Paper>
  );
};

export default ItemDetailPanel;
