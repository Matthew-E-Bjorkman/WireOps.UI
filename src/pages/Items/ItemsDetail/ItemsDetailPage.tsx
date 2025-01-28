import { Box, Grid2 } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../../store/store";
import Copyright from "../../../components/Copyright";
import ItemDetailPanel from "../../../components/ItemDetailPanel/ItemDetailPanel";
import ItemEditPanel from "../../../components/ItemEditPanel/ItemEditPanel";
import ItemDetailList from "../../../components/ItemDetailList/ItemDetailList";
import { Item } from "../../../types/Inventory/Item";
import {
  setSelectedItem,
  setIsEditingItem,
  setIsNewItem,
  useAddItemMutation,
  useEditItemMutation,
} from "../../../store/inventorySlice";

const ItemsDetailPage = () => {
  const dispatch = useDispatch();
  const { items, isEditingItem, isNewItem } = useSelector(
    (state: AppRootState) => state.inventory
  );

  const [createItem] = useAddItemMutation();
  const [updateItem] = useEditItemMutation();

  function onFormSubmit(item: Item): void {
    if (isNewItem) {
      createItem(item);
    } else {
      updateItem(item);
    }
    dispatch(setSelectedItem(item));
    dispatch(setIsEditingItem(false));
    dispatch(setIsNewItem(false));
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Grid2
        container
        spacing={3}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid2 size={{ xs: 0, md: 3 }}>
          <ItemDetailList itemsList={items} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }}>
          {!isEditingItem && <ItemDetailPanel />}
          {isEditingItem && <ItemEditPanel onSubmit={onFormSubmit} />}
        </Grid2>
      </Grid2>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default ItemsDetailPage;
