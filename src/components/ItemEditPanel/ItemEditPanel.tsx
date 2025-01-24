import { useForm, Controller } from "react-hook-form";
import { updateItem, addItem } from "../../store/inventorySlice";
import { AppRootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../../types/Item";

const ItemEditPanel = () => {
  const dispatch = useDispatch();
  const { selectedItem, isNewItem } = useSelector(
    (state: AppRootState) => state.inventory
  );
  const { control, handleSubmit, reset } = useForm<Item>({
    defaultValues: selectedItem || {
      id: "",
      name: "",
      description: "",
      sku: "",
    },
  });

  const onSubmit = (data: Item) => {
    if (isNewItem) {
      dispatch(addItem({ ...data, id: Date.now().toString() }));
    } else {
      dispatch(updateItem(data));
    }
  };

  return <div></div>;
};

export default ItemEditPanel;
