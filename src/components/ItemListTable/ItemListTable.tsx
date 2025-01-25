import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Item } from "../../types/Inventory/Item";
import {
  setIsNewItem,
  setSelectedItem,
  setIsEditingItem,
} from "../../store/inventorySlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface ItemListTableProps {
  itemsList: Item[];
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 0.5, minWidth: 100 },
  {
    field: "sku",
    headerName: "SKU",
    flex: 0.5,
    minWidth: 80,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1.5,
    minWidth: 100,
  },
];

export const ItemListTable = ({ itemsList }: ItemListTableProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <DataGrid
      rows={itemsList}
      columns={columns}
      onRowClick={(selectedItem) => {
        dispatch(
          setSelectedItem(
            itemsList.find((item) => item.id === selectedItem.row.id) || null
          )
        );
        dispatch(setIsNewItem(false));
        dispatch(setIsEditingItem(false));

        navigate(`/items/${selectedItem.row.id}`);
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      hideFooterSelectedRowCount
      hideFooterPagination
      hideFooter
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
};

export default ItemListTable;
