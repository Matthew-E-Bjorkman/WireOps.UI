import { Box, Grid2 } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../../store/store";
import Copyright from "../../../components/Copyright";
import StafferDetailPanel from "../../../components/StafferDetailPanel/StafferDetailPanel";
import StafferEditPanel from "../../../components/StafferEditPanel/StafferEditPanel";
import StafferDetailList from "../../../components/StafferDetailList/StafferDetailList";
import { Staffer } from "../../../types/Business/Staffer";
import {
  setSelectedStaffer,
  setIsEditingStaffer,
  setIsNewStaffer,
  useAddStafferMutation,
  useEditStafferMutation,
} from "../../../store/businessSlice";
import Loading from "../../../components/Loading";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const StaffersDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { staffers, selectedStaffer, isEditingStaffer, isNewStaffer } =
    useSelector((state: AppRootState) => state.business);

  const [createStaffer] = useAddStafferMutation();
  const [updateStaffer] = useEditStafferMutation();

  function onFormSubmit(staffer: Staffer): void {
    if (isNewStaffer) {
      createStaffer(staffer).then((result) =>
        postFormSubmit(result.data, result.error)
      );
    } else {
      updateStaffer(staffer).then((result) =>
        postFormSubmit(result.data, result.error)
      );
    }
  }

  function postFormSubmit(
    staffer: Staffer | undefined,
    error: FetchBaseQueryError | SerializedError | undefined
  ): void {
    if (staffer) {
      const wasNewStaffer = isNewStaffer;
      dispatch(setSelectedStaffer(staffer));
      dispatch(setIsEditingStaffer(false));
      dispatch(setIsNewStaffer(false));
      if (wasNewStaffer) {
        navigate(`/staffers/${staffer.id}`);
      }
    }

    if (error) {
      console.error(error);
    }
  }

  if (!staffers || !selectedStaffer) {
    return <Loading />;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%" } }}>
      <Grid2
        container
        spacing={3}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid2 size={{ xs: 0, md: 3 }}>
          <StafferDetailList staffersList={staffers} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }}>
          {!isEditingStaffer && <StafferDetailPanel />}
          {isEditingStaffer && (
            <StafferEditPanel
              selectedStaffer={selectedStaffer!}
              isNewStaffer={isNewStaffer}
              onSubmit={onFormSubmit}
            />
          )}
        </Grid2>
      </Grid2>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default StaffersDetailPage;
