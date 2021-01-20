import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Grid, makeStyles } from "@material-ui/core";

import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => ({
  box: {
    border: "2px solid #000000",
    borderRadius: "8px",
    margin: "8px",
    padding: "8px",
  },
}));

export default function Documents() {
  const classes = useStyles();

  return (
    <Dashboard>
      <Container maxWidth="md">
        <Grid container>
          <Grid item md={2} sm={6} xs={12} className={classes.box}>
            <NavLink to="/vehicle-handover-document">Vehicle Handover</NavLink>
          </Grid>
          <Grid item md={2} sm={6} xs={12} className={classes.box}>
            <NavLink to="/sales-invoice-document">Sales Invoice</NavLink>
          </Grid>
          <Grid item md={2} sm={6} xs={12} className={classes.box}>
            <NavLink to="/vehicle-purchase-cash-document">
              Vehicle Purchase Reciept - Cash
            </NavLink>
          </Grid>
          <Grid item md={2} sm={6} xs={12} className={classes.box}>
            <NavLink to="/vehicle-purchase-lease-document">
              Vehicle Purchase Reciept - Lease
            </NavLink>
          </Grid>
        </Grid>
      </Container>
    </Dashboard>
  );
}
