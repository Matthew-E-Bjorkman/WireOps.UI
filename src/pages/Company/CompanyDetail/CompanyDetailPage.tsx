import { Box, Grid2 } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../../store/store";
import Copyright from "../../../components/Copyright";
import CompanyDetailPanel from "../../../components/CompanyDetailPanel/CompanyDetailPanel";
import CompanyEditPanel from "../../../components/CompanyEditPanel/CompanyEditPanel";
import { Company } from "../../../types/Business/Company";
import {
  setIsEditingCompany,
  useEditCompanyMutation,
} from "../../../store/businessSlice";
import Loading from "../../../components/Loading";

const CompanysDetailPage = () => {
  const { company, isEditingCompany } = useSelector(
    (state: AppRootState) => state.business
  );

  const dispatch = useDispatch();

  const [updateCompany] = useEditCompanyMutation();

  function onFormSubmit(company: Company): void {
    updateCompany(company);
    dispatch(setIsEditingCompany(false));
  }

  if (!company) {
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
        {!isEditingCompany && <CompanyDetailPanel company={company!} />}
        {isEditingCompany && (
          <CompanyEditPanel company={company!} onSubmit={onFormSubmit} />
        )}
      </Grid2>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default CompanysDetailPage;
