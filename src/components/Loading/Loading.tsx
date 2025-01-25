import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
  message = "Loading...",
  color = "primary",
}) => {
  return (
    <Box
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
        fullScreen && {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(0, 0, 0, 0.8)",
          zIndex: 9999,
        },
      ]}
    >
      <CircularProgress
        size={80}
        color={color}
        sx={{ mb: message ? 2 : 0 }}
        aria-label="Loading spinner"
      />
      {message && (
        <Typography variant="body1" color="textSecondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loading;
