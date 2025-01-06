import React from "react";
import Alert from "react-bootstrap/esm/Alert";

export interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <Alert variant="danger">
      <Alert.Heading>Oh no! An error occurred!</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}
