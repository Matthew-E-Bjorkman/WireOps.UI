import { useGetRolesQuery } from "../../../store/businessSlice";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { AppRootState } from "../../../store/store";
import Copyright from "../../../components/Copyright";
import RoleListTable from "../../../components/RoleListTable/RoleListTable";
import { RoleListTableHeader } from "../../../components/RoleListTableHeader/RoleListTableHeader";
import Loading from "../../../components/Loading";

const RolesListPage = () => {
  const { roles, company } = useSelector(
    (state: AppRootState) => state.business
  );
  useGetRolesQuery(company?.id || "", { skip: !company });

  if (!company || !roles) {
    return <Loading />;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%" } }}>
      <RoleListTableHeader />
      <RoleListTable rolesList={roles} />
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default RolesListPage;
