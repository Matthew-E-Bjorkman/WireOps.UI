import { useEffect } from "react";
import {
  setItems,
  setSelectedItem,
  setIsNewItem,
  useGetItemListQuery,
} from "../../store/inventorySlice";
import {
  Grid2,
  Button,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../store/store";
import ItemDetailPanel from "../../components/ItemDetailPanel/ItemDetailPanel";

const ItemsPage = () => {
  const dispatch = useDispatch();
  const { items, selectedItem, isNewItem } = useSelector(
    (state: AppRootState) => state.inventory
  );
  const { data: itemsList } = useGetItemListQuery();

  useEffect(() => {
    if (itemsList) {
      dispatch(setItems(items));
    }
  }, [itemsList]);

  const handleCreateItem = () => {
    dispatch(setIsNewItem(true));
    dispatch(setSelectedItem(null));
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, height: "100vh" }}>
      <Grid2 container spacing={3} sx={{ height: "100%" }}>
        {/* Left Panel - Table */}
        <Grid2
          size={{ xs: 12, md: 8 }}
          sx={{ height: "100%", overflow: "auto" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateItem}
            sx={{ mb: 2 }}
          >
            Create New Item
          </Button>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="items table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell>SKU</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={item.id}
                    hover
                    onClick={() => {
                      dispatch(setSelectedItem(item));
                      dispatch(setIsNewItem(false));
                    }}
                    selected={selectedItem?.id === item.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.description}
                    </TableCell>{" "}
                    <TableCell>{item.sku}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>

        {/* Right Panel - Edit Form */}
        <Grid2
          size={{ xs: 12, md: 4 }}
          sx={{
            height: "calc(100vh - 64px)",
            position: "sticky",
            top: 16,
            display: selectedItem || isNewItem ? "block" : "none",
          }}
        >
          <ItemDetailPanel selectedItem={selectedItem} isNewItem={isNewItem} />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default ItemsPage;
