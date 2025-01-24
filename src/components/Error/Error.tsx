import Alert from "@mui/material/Alert";
import React from "react";

export interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <Alert>
      <div>Oh no! An error occurred!</div>
      <p>{message}</p>
    </Alert>
  );
}
