import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Item } from "../../types/Inventory/Item";
import {
  setIsEditingItem,
  setIsNewItem,
  setSelectedItem,
} from "../../store/inventorySlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AppRootState } from "../../store/store";
import React from "react";
import { ItemListTableHeader } from "../ItemListTableHeader/ItemListTableHeader";
import { Box } from "@mui/material";

export interface ItemDetailListProps {
  itemsList: Item[];
  selectedItem?: Item | null;
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 0.5, minWidth: 100 },
];

export const ItemDetailList = ({
  itemsList,
  selectedItem = null,
}: ItemDetailListProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box>
      <ItemListTableHeader isReducedSize />
      <DataGrid
        rows={itemsList}
        columns={columns}
        rowSelectionModel={selectedItem ? [selectedItem.id] : []}
        columnHeaderHeight={0}
        onRowClick={(selectedRow) => {
          dispatch(
            setSelectedItem(
              itemsList.find((item) => item.id === selectedRow.row.id) || null
            )
          );
          dispatch(setIsNewItem(false));
          dispatch(setIsEditingItem(false));

          navigate(`/items/${selectedRow.row.id}`);
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        hideFooter
        density="compact"
        slots={{
          columnHeaders: () => null,
        }}
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
    </Box>
  );
};

export default ItemDetailList;
