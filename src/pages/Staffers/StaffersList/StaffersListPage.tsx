import { useGetStaffersQuery } from "../../../store/businessSlice";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { AppRootState } from "../../../store/store";
import Copyright from "../../../components/Copyright";
import StafferListTable from "../../../components/StafferListTable/StafferListTable";
import { StafferListTableHeader } from "../../../components/StafferListTableHeader/StafferListTableHeader";
import Loading from "../../../components/Loading";

const StaffersListPage = () => {
  const { staffers, company } = useSelector(
    (state: AppRootState) => state.business
  );
  useGetStaffersQuery(company?.id || "", { skip: !company });

  if (!company || !staffers) {
    return <Loading />;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%" } }}>
      <StafferListTableHeader />
      <StafferListTable staffersList={staffers} />
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default StaffersListPage;
