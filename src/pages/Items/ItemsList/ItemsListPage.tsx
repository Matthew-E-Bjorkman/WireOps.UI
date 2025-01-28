import { useGetItemListQuery } from "../../../store/inventorySlice";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { AppRootState } from "../../../store/store";
import Copyright from "../../../components/Copyright";
import ItemListTable from "../../../components/ItemListTable/ItemListTable";
import { ItemListTableHeader } from "../../../components/ItemListTableHeader/ItemListTableHeader";
import Loading from "../../../components/Loading";

const ItemsListPage = () => {
  const { items } = useSelector((state: AppRootState) => state.inventory);
  useGetItemListQuery();

  if (!items) {
    return <Loading />;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <ItemListTableHeader />
      <ItemListTable itemsList={items} />
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default ItemsListPage;
