import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { CssBaseline } from "@material-ui/core";

export default function LoginContainer({ children }) {
  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        {children}
      </Container>
    </div>
  );
}
