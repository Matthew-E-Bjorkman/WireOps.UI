import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "../MenuContent/MenuContent";
import CardAlert from "../CardAlert/CardAlert";
import OptionsMenu from "../OptionsMenu/OptionsMenu";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

import { AppRootState } from "../../store/store";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const { current_staffer } = useSelector(
    (state: AppRootState) => state.business
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
          minHeight: 56,
          maxHeight: 56,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500, lineHeight: "20px" }}>
          WireOps Text Logo
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
        <CardAlert />
      </Box>
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
        <Avatar
          sizes="small"
          alt={current_staffer?.given_name + " " + current_staffer?.family_name}
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ width: "100%" }}>
          <Tooltip
            title={
              current_staffer?.given_name + " " + current_staffer?.family_name
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
              {current_staffer?.given_name} {current_staffer?.family_name}
            </Typography>
          </Tooltip>
          <Tooltip title={current_staffer?.email}>
            <Typography
              variant="caption"
              noWrap={true}
              display={"block"}
              width={119}
              sx={{
                color: "text.secondary",
              }}
            >
              {current_staffer?.email}
            </Typography>
          </Tooltip>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
