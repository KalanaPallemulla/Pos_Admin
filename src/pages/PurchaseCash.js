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

function PurchaseCash() {
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
          .collection("purchase_cash")
          .doc(data.vnumber)
          .set({
            vnumber: data.vnumber,
            date: selectedDate,
            seller: data.seller,
            owner_name: data.ownername,
            owner_contact: data.ownercontact,
            owner_address: data.owneraddress,
            customer_name: data.cname,
            customer_nic: data.nic,
            customer_address: data.customeraddress,
            prize: data.prize,
            vehicle_registration: vreg,
            vehicle_revenue: vrev,
            motor_insurance: minsurance,
            vehicle_transfer: vtransfer,
            vehicle_lease: vlease,
            make: carData.make,
            modal: carData.modal,
          })
          .then(async (result) => {
            console.log(result);

            return db
              .collection("cars")
              .doc(data.vnumber)
              .delete()
              .then((result) => {
                console.log("car deleted");
                console.log(result);
              })
              .catch((err) => {
                console.log(err);
              });
          });
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
            Purchase - Cash
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

          <Grid container component="main" spacing={3}>
            <Grid item md={3} sm={6} xs={12}>
              <FormControl
                error={Boolean(errors.seller)}
                style={{ float: "left" }}
              >
                <InputLabel id="seller">Seller</InputLabel>
                <Controller
                  name="seller"
                  rules={{ required: "this is required" }}
                  control={control}
                  defaultValue="nalin"
                  as={
                    <Select>
                      <MenuItem key="nalin" value="nalin">
                        NALIN FERNANDO
                      </MenuItem>
                      <MenuItem key="saketha" value="saketha">
                        SAKETHA BATANGALA
                      </MenuItem>
                      <MenuItem key="manjula" value="manjula">
                        MANJULA THEWAHETTI
                      </MenuItem>
                    </Select>
                  }
                />
                <FormHelperText>
                  {errors.seller && errors.seller.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

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
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="ownername"
                name="ownername"
                label="Owner Name"
                placeholder="susantha"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Owner Name Required",
                })}
                error={errors.ownername ? true : false}
                helperText={errors.ownername ? errors.ownername.message : null}
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="ownercontact"
                name="ownercontact"
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
                error={errors.ownercontact ? true : false}
                helperText={
                  errors.ownercontact ? errors.ownercontact.message : null
                }
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="owneraddress"
                name="owneraddress"
                label="Owner Address"
                placeholder="colombo 15"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Owner Address Required",
                })}
                error={errors.owneraddress ? true : false}
                helperText={
                  errors.owneraddress ? errors.owneraddress.message : null
                }
              />
            </Grid>
          </Grid>

          <Grid container component="main" spacing={3}>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="cname"
                name="cname"
                label="Customer Name"
                placeholder="Nimal Pathirana"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Customer Name Required",
                })}
                error={errors.cname ? true : false}
                helperText={errors.cname ? errors.cname.message : null}
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="nic"
                name="nic"
                label="NIC Number"
                placeholder="981801011v"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "NIC Number Required",
                })}
                error={errors.nic ? true : false}
                helperText={errors.nic ? errors.nic.message : null}
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <TextField
                id="customeraddress"
                name="customeraddress"
                label="Customer Address"
                placeholder="298B, Colombo 7"
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
                id="prize"
                name="prize"
                label="Selling Prize"
                placeholder="120000"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Selling Prize Required",
                })}
                error={errors.prize ? true : false}
                helperText={errors.prize ? errors.prize.message : null}
              />
            </Grid>
          </Grid>

          <Grid container component="main" spacing={3}>
            <Grid item md={3} sm={6} xs={12}>
              <FormControlLabel
                style={{ float: "left" }}
                value="vreg"
                control={
                  <Checkbox
                    name="vreg"
                    color="primary"
                    checked={state.vreg}
                    onChange={handleChangeCheckBox}
                  />
                }
                label="Certificate of registration of motor vehicle"
                labelPlacement="end"
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <FormControlLabel
                style={{ float: "left" }}
                value="vrev"
                control={
                  <Checkbox
                    name="vrev"
                    color="primary"
                    checked={state.vrev}
                    onChange={handleChangeCheckBox}
                  />
                }
                label="Vehicle revenue license"
                labelPlacement="end"
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <FormControlLabel
                style={{ float: "left" }}
                value="minsurance"
                control={
                  <Checkbox
                    name="minsurance"
                    color="primary"
                    checked={state.minsurance}
                    onChange={handleChangeCheckBox}
                  />
                }
                label="Motor insurance"
                labelPlacement="end"
              />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <FormControlLabel
                style={{ float: "left" }}
                value="vtransfer"
                control={
                  <Checkbox
                    name="vtransfer"
                    color="primary"
                    checked={state.vtransfer}
                    onChange={handleChangeCheckBox}
                  />
                }
                label="Vehicle transfer papers"
                labelPlacement="end"
              />
            </Grid>
          </Grid>

          <Grid container component="main" spacing={3}>
            <Grid item md={3} sm={6} xs={12}>
              <FormControlLabel
                style={{ float: "left" }}
                value="vlease"
                control={
                  <Checkbox
                    name="vlease"
                    color="primary"
                    checked={state.vlease}
                    onChange={handleChangeCheckBox}
                  />
                }
                label="Letter of vehicle lease closure"
                labelPlacement="end"
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

export default PurchaseCash;
