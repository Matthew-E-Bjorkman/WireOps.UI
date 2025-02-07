import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Paper,
  Typography,
  Grid2,
  Select,
  MenuItem,
} from "@mui/material";
import {
  setIsEditingStaffer,
  useDeleteStafferMutation,
  useGetRolesQuery,
  useInviteStafferMutation,
} from "../../store/businessSlice";
import { AppRootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const StafferDetailPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteStaffer] = useDeleteStafferMutation();
  const [inviteStaffer] = useInviteStafferMutation();

  const { selectedStaffer, currentStaffer, company, roles } = useSelector(
    (state: AppRootState) => state.business
  );

  function handleDelete(): void {
    deleteStaffer({ id: selectedStaffer!.id }).then(() => {
      navigate("/staffers");
    });
  }

  function handleEdit(): void {
    dispatch(setIsEditingStaffer(true));
  }

  if (!selectedStaffer) return <Loading />;

  return (
    <Paper elevation={3} sx={{ p: 3, margin: "auto" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {selectedStaffer?.given_name} {selectedStaffer?.family_name}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid2 container rowSpacing={2} columnSpacing={2}>
          <Grid2 size={{ xs: 12, sm: 2 }} sx={{ alignContent: "center" }}>
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "end",
                fontWeight: 700,
                my: 0,
              }}
            >
              Email
            </InputLabel>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 10 }}>
            <TextField
              name="email"
              value={selectedStaffer?.email}
              variant="outlined"
              disabled
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 2 }} sx={{ alignContent: "center" }}>
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "end",
                fontWeight: 700,
                my: 0,
              }}
            >
              First Name
            </InputLabel>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 10 }}>
            <TextField
              name="givenName"
              value={selectedStaffer?.given_name}
              disabled
              fullWidth
              variant="outlined"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 2 }} sx={{ alignContent: "center" }}>
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "end",
                fontWeight: 700,
                my: 0,
              }}
            >
              Last Name
            </InputLabel>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 10 }}>
            <TextField
              name="familyName"
              value={selectedStaffer?.family_name}
              disabled
              fullWidth
              variant="outlined"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 2 }} sx={{ alignContent: "center" }}>
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "end",
                fontWeight: 700,
                my: 0,
              }}
            >
              Role
            </InputLabel>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 10 }}>
            <Select
              name="role"
              value={selectedStaffer?.role_id}
              disabled
              fullWidth
              variant="outlined"
            >
              {roles?.map((role) => (
                <MenuItem value={role.id}>{role.name}</MenuItem>
              ))}
            </Select>
          </Grid2>
        </Grid2>

        <Grid2
          container
          rowSpacing={2}
          columnSpacing={2}
          justifyContent="space-between"
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => inviteStaffer({ id: selectedStaffer!.id })}
              disabled={selectedStaffer?.user_id !== null}
            >
              Invite
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={
                selectedStaffer?.is_owner ||
                selectedStaffer?.id == currentStaffer?.id
              }
            >
              Delete Staffer
            </Button>
            <Button type="submit" variant="contained" onClick={handleEdit}>
              Edit Staffer
            </Button>
          </Box>
        </Grid2>
      </Box>
    </Paper>
  );
};

export default StafferDetailPanel;
