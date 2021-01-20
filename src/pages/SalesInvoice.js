import React, { useState } from "react";
import { useForm, ErrorMessage, Controller } from "react-hook-form";

import Dashboard from "./Dashboard";

import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Button,
  Select,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Container,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

import moment from "moment";
import { db } from "../util/config";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: "25px",
    marginBottom: "25px",
    textAlign: "left",
  },
}));

function SalesInvoice() {
  const classes = useStyles();

  //hook form
  const { register, handleSubmit, control, errors } = useForm();
  const [loginErrors, setLoginErrors] = useState(null);

  //date
  const [selectedDate, setDate] = useState("2020-01-01");

  const handleDateChange = () => {
    setDate(moment().format("YYYY-MM-DD"));
  };

  //chaeckboxes
  const [state, setState] = React.useState({
    vreg: false,
    vrev: false,
    minsurance: false,
    vtransfer: false,
    vlease: false,
  });

  const handleChangeCheckBox = (event) => {
    console.log(event);
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //submit
  const onSubmit = async (data) => {
    console.log(data);
    console.log(state);

    const { vreg, vrev, minsurance, vtransfer, vlease } = state;

    const result = db
      .collection("cars")
      .doc(data.vnumber)
      .get()
      .then(async (doc) => {
        console.log(doc.data());

        let carData = doc.data();

        return db
          .collection("sales_invoice")
          .doc(data.vnumber)
          .set({
            vnumber: data.vnumber,
            date: selectedDate,
            seller: data.seller,
            customer_name: data.customername,
            customer_nic: data.nic,
            customer_address: data.customeraddress,
            customer_number: data.contactnumber,
            full_amount: data.fullamount,
            non_refundable: data.nonrefundable,
            balance: data.balance,
            make: carData.make,
            modal: carData.modal,
          })
          .then(async (result) => {
            console.log(result);
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => {
        console.log(err);
        console.log("no document found");
      });
  };

  return (
    <Dashboard>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography
            variant="h4"
            className={classes.heading}
            style={{ marginBottom: "50px" }}
          >
            Sales Invoice
          </Typography>

          <Grid container component="main" spacing={3}>
            <Grid item md={3} sm={6} xs={12}>
              <DatePicker
                disableFuture
                openTo="year"
                format="DD/MM/yyyy"
                label="Date"
                views={["year", "month", "date"]}
                value={selectedDate}
                onChange={handleDateChange}
                style={{ float: "left" }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" className={classes.heading}>
            Buyer Details
          </Typography>

          <Grid container component="main" spacing={3}>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="customername"
                name="customername"
                label="Customer Name"
                placeholder="nimal"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Customer Name Required",
                })}
                error={errors.customername ? true : false}
                helperText={
                  errors.customername ? errors.customername.message : null
                }
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="customeraddress"
                name="customeraddress"
                label="Customer Address"
                placeholder="colombo 7"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Customer Address Required",
                })}
                error={errors.customeraddress ? true : false}
                helperText={
                  errors.customeraddress ? errors.customeraddress.message : null
                }
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="contactnumber"
                name="contactnumber"
                label="Contact Number"
                placeholder="0785340697"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Contact Number Required",
                })}
                error={errors.contactnumber ? true : false}
                helperText={
                  errors.contactnumber ? errors.contactnumber.message : null
                }
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="nic"
                name="nic"
                label="NIC"
                placeholder="colombo 15"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "NIC Required",
                })}
                error={errors.nic ? true : false}
                helperText={errors.nic ? errors.nic.message : null}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" className={classes.heading}>
            Vehicle Details
          </Typography>

          <Grid container component="main" spacing={3}>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="vnumber"
                name="vnumber"
                label="Vehicle Number"
                placeholder="ABC1234"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Vehicle Number Required",
                })}
                error={errors.vnumber ? true : false}
                helperText={errors.vnumber ? errors.vnumber.message : null}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" className={classes.heading}>
            Payment Details
          </Typography>

          <Grid container component="main" spacing={3}>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="fullamount"
                name="fullamount"
                label="Full Amount"
                placeholder="2400"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Full Amount Required",
                })}
                error={errors.fullamount ? true : false}
                helperText={
                  errors.fullamount ? errors.fullamount.message : null
                }
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="nonrefundable"
                name="nonrefundable"
                label="Non Refundable Reservation"
                placeholder="2400"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Non Refundable Reservation Required",
                })}
                error={errors.nonrefundable ? true : false}
                helperText={
                  errors.nonrefundable ? errors.nonrefundable.message : null
                }
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="balance"
                name="balance"
                label="Balance"
                placeholder="2400"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Balance Required",
                })}
                error={errors.balance ? true : false}
                helperText={errors.balance ? errors.balance.message : null}
              />
            </Grid>
          </Grid>

          <Grid container component="main" spacing={3}>
            <Grid item md={3} sm={6} xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Purchase
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Dashboard>
  );
}

export default SalesInvoice;
