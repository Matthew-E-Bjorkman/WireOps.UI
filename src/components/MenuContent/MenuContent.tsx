import { useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

const mainListItems = [
  { text: "Home", path: "/", icon: <HomeRoundedIcon /> },
  { text: "Items", path: "/items", icon: <AnalyticsRoundedIcon /> },
  { text: "Company", path: "/company", icon: <AssignmentRoundedIcon /> },
  { text: "Roles", path: "/roles", icon: <AssignmentRoundedIcon /> },
  { text: "Staff", path: "/staffers", icon: <PeopleRoundedIcon /> },
  { text: "Example", path: "/example", icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: "Settings", path: "/settings", icon: <SettingsRoundedIcon /> },
  { text: "About", path: "/about", icon: <InfoRoundedIcon /> },
  { text: "Feedback", path: "/feedback", icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const navigate = useNavigate();

  // Get route segments
  const location = useLocation();
  const route = location.pathname;

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate(item.path)}
          >
            <ListItemButton selected={route === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate(item.path)}
          >
            <ListItemButton selected={route === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
