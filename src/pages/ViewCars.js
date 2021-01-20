import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { NavLink } from "react-router-dom";

import { db } from "../util/config";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import {
  Container,
  CircularProgress,
  Button,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function SimpleTable() {
  const classes = useStyles();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const data = db
      .collection("cars")
      .get()
      .then((querySnapshot) => {
        let carsList = [];

        console.log(querySnapshot.docs);
        querySnapshot.docs.map((doc) => {
          carsList.push(doc.data());
          console.log(doc.data());
        });
        setCars(carsList);
        setLoading(false);
      })

      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    // console.log(value);
  }, []);

  return (
    <Dashboard>
      <Container maxWidth="md">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <TextField
              style={{ float: "left", marginBottom: "25px" }}
              label="Find Car"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Vehicle Number</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Make</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Modal</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Customer Name</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Customer Number</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Color</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Engine Capacity</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Show more</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cars.map((car) => (
                    <TableRow key={car.vehicle_number}>
                      <TableCell component="th" scope="row">
                        {car.vehicle_number}
                      </TableCell>
                      <TableCell align="right">{car.make}</TableCell>
                      <TableCell align="right">{car.modal}</TableCell>
                      <TableCell align="right">{car.customer_name}</TableCell>
                      <TableCell align="right">{car.contact_number}</TableCell>
                      <TableCell align="right">{car.color}</TableCell>
                      <TableCell align="right">{car.engine_capacity}</TableCell>
                      <TableCell align="right">
                        <NavLink
                          to={`view_cars/${car.vehicle_number}`}
                          className={classes.navlink}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                          >
                            View
                          </Button>
                        </NavLink>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </Dashboard>
  );
}
