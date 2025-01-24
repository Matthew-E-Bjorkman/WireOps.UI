import React from "react";
import { useLocation, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  "&:hover": {
    textDecoration: "underline",
  },
}));

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const routeSegments = location.pathname.split("/").filter(Boolean);
  const paths = routeSegments.map((segment, index) => {
    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: `/${routeSegments.slice(0, index + 1).join("/")}`,
    };
  });

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1" component={StyledLink} to="/">
        Home
      </Typography>
      {paths.map((segment, index) => (
        <Typography
          key={index}
          variant="body1"
          component={index < paths.length - 1 ? StyledLink : "span"}
          to={index < paths.length - 1 ? segment.path : undefined}
          sx={{ color: "text.primary", fontWeight: 600 }}
        >
          {segment.name}
        </Typography>
      ))}
    </StyledBreadcrumbs>
  );
}
