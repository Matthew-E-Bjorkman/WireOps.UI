import OptionsMenu from "../OptionsMenu/OptionsMenu";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { AppRootState } from "../../store/store";
import React from "react";

export const UserBlock: React.FC = () => {
  const { currentStaffer } = useSelector(
    (state: AppRootState) => state.business
  );

  return (
    <Stack
      direction="row"
      sx={{
        p: 2,
        gap: 1,
        alignItems: "center",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      {currentStaffer && (
        <React.Fragment>
          <Avatar
            sizes="small"
            alt={currentStaffer?.given_name + " " + currentStaffer?.family_name}
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ width: "100%" }}>
            <Tooltip
              title={
                currentStaffer?.given_name + " " + currentStaffer?.family_name
              }
            >
              <Typography
                variant="body2"
                display={"block"}
                noWrap={true}
                width={119}
                sx={{
                  fontWeight: 500,
                  lineHeight: "16px",
                }}
              >
                {currentStaffer?.given_name} {currentStaffer?.family_name}
              </Typography>
            </Tooltip>
            <Tooltip title={currentStaffer?.email}>
              <Typography
                variant="caption"
                noWrap={true}
                display={"block"}
                width={119}
                sx={{
                  color: "text.secondary",
                }}
              >
                {currentStaffer?.email}
              </Typography>
            </Tooltip>
          </Box>
        </React.Fragment>
      )}
      {!currentStaffer && <Loading />}
      <OptionsMenu />
    </Stack>
  );
};

export default UserBlock;
