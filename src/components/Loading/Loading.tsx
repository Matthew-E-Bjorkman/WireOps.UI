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
      height={fullScreen ? "100vh" : "100%"}
      width={fullScreen ? "100vw" : "100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        size={fullScreen ? 100 : "1rem"}
        color={color}
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
