import React, { useState, Fragment } from "react";
import { useForm, ErrorMessage, Controller } from "react-hook-form";

import Dashboard from "../pages/Dashboard";
import FileUploader from "../components/FileUploader";

import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import {
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  MenuItem,
  InputLabel,
  Select,
  Button,
  Typography,
  LinearProgress,
  CircularProgress,
  Backdrop,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { db, bucket, storageRef } from "../util/config";

import { Modals } from "../items/Modals";
import { Makes } from "../items/Makes";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: "25px",
    marginBottom: "25px",
    textAlign: "left",
  },
}));

const AddVehicle = (props) => {
  const classes = useStyles();

  //hook form
  const { register, handleSubmit, control, errors } = useForm();
  const [loginErrors, setLoginErrors] = useState(null);

  //chaeckboxes
  const [state, setState] = React.useState({
    openPapers: false,
    finance: false,
    licenceCopy: false,
    CrCopy: false,
    wheel: false,
    tools: false,
    gumBottle: false,
    jack: false,
    pumpKit: false,
    ac: false,
    alloyWheels: false,
    powerSteering: false,
    reactableMirrors: false,
    riverseCam: false,
    spoiler: false,
    cruiseControl: false,
    subWoofers: false,
    fogLamp: false,
    multimediaSetup: false,
    powerShutters: false,
    welcomeLight: false,
    wayCamera: false,
    autoBreak: false,
    reverseSensor: false,
    paddleShifters: false,
    smartKey: false,
    scopeKey: false,
    senonLight: false,
    powerAriel: false,
    pushStart: false,
    autoDoor: false,
    crystalLight: false,
    headlightWasher: false,
    backseatScreens: false,
    safety: false,
    airBagsOne: false,
    airBagsTwo: false,
    airBagsFour: false,
    airBagsEight: false,
    headUpDisplay: false,
    fullOption: false,
    multiFunction: false,
    abs: false,
    forWheel: false,
  });

  const handleChangeCheckBox = (event) => {
    console.log(event);
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //date
  const [selectedDate, setDate] = useState("2020-01-01");

  const handleDateChange = () => {
    setDate(moment().format("YYYY-MM-DD"));
  };

  //images
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImages = (pictures) => {
    // console.log(pictures);
    setImages(pictures);
    // console.log(images);
  };

  //submit
  const onSubmit = async (data) => {
    setLoading(true);

    console.log(data);
    console.log(selectedDate);
    console.log(state);
    console.log(images);

    const {
      vnumber,
      cusname,
      conumber,
      nic,
      cnumber,
      color,
      yom,
      yor,
      enginec,
      transmission,
      make,
      modal,
      milage,
      prize,
    } = data;

    console.log(transmission, make, modal);

    const {
      openPapers,
      finance,
      licenceCopy,
      CrCopy,
      wheel,
      tools,
      gumBottle,
      jack,
      pumpKit,
      ac,
      alloyWheels,
      powerSteering,
      reactableMirrors,
      riverseCam,
      spoiler,
      cruiseControl,
      subWoofers,
      fogLamp,
      multimediaSetup,
      powerShutters,
      welcomeLight,
      wayCamera,
      autoBreak,
      reverseSensor,
      paddleShifters,
      smartKey,
      scopeKey,
      senonLight,
      powerAriel,
      pushStart,
      autoDoor,
      crystalLight,
      headlightWasher,
      backseatScreens,
      safety,
      abs,
      airBagsOne,
      airBagsTwo,
      airBagsFour,
      airBagsEight,
      headUpDisplay,
      fullOption,
      multiFunction,
      forWheel,
    } = state;

    // let imageUpload = images.map((image) => {
    //   setCurrentImage(image);
    //   const url = uploadImageAsPromise(image);
    //   console.log(url);
    // });

    let promises = [];

    images.map((image) => {
      promises.push(bucket.ref(`cars/${vnumber}/${uuidv4()}`).put(image));
      // promises.push(uploadImageAsPromise(image));
    });

    Promise.all(promises)
      .then((results) => {
        console.log(results);

        let promises = [];

        results.map((result) => {
          promises.push(result.ref.getDownloadURL());
        });

        Promise.all(promises).then(async (results) => {
          console.log(results);

          try {
            const result = await db.collection("cars").doc(vnumber).set({
              selectedDate,
              vehicle_number: vnumber,
              customer_name: cusname,
              contact_number: conumber,
              nic_number: nic,
              chassie_number: cnumber,
              color,
              year_of_manufacture: yom,
              year_of_register: yor,
              engine_capacity: enginec,
              transmission,
              make,
              modal,
              milage,
              prize,
              openPapers,
              finance,
              licenceCopy,
              CrCopy,
              wheel,
              tools,
              gumBottle,
              jack,
              pumpKit,
              ac,
              alloyWheels,
              powerSteering,
              reactableMirrors,
              riverseCam,
              spoiler,
              cruiseControl,
              subWoofers,
              fogLamp,
              multimediaSetup,
              powerShutters,
              welcomeLight,
              wayCamera,
              autoBreak,
              reverseSensor,
              paddleShifters,
              smartKey,
              scopeKey,
              senonLight,
              powerAriel,
              pushStart,
              autoDoor,
              crystalLight,
              headlightWasher,
              backseatScreens,
              safety,
              abs,
              airBagsOne,
              airBagsTwo,
              airBagsFour,
              airBagsEight,
              headUpDisplay,
              fullOption,
              forWheel,
              multiFunction,
              images: results,
            });
            console.log(result, "after doc updated");
            setLoading(false);
            props.history.push("/");
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        });
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });

    // result[0].ref.getDownloadURL().then((url) => {
    //   console.log(url);
    // });
    // result[1].ref.getDownloadURL().then((url) => {
    //   console.log(url);
    // });

    // let filesCount = images.length;

    // for (let i = 0; i < filesCount; i++) {
    //   setCurrentImage(images[i]);
    //   const url = uploadImageAsPromise(images[i], i + 1);
    //   console.log(i, "image-id");
    //   console.log(url);
    // }

    // // console.log(imageUpload);

    //Handle waiting to upload each file using promise
    // function uploadImageAsPromise(imageFile, count) {
    //   return new Promise(function (resolve, reject) {
    //     var storageRef = bucket.ref(`cars/${uuidv4()}`);

    //     //Upload file

    //     var uploadTask = storageRef.put(imageFile);

    //     //Update progress bar
    //     uploadTask.on(
    //       "state_changed",
    //       function progress(snapshot) {
    //         console.log(snapshot);

    //         let percentage =
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         setProgress({ percentage, count });
    //         setSnapshot({ snapshot, count, percentage });

    //         console.log(percentage);
    //       },
    //       function error(err) {
    //         console.log(err);
    //       },
    //       function complete() {
    //         uploadTask.snapshot.ref
    //           .getDownloadURL()
    //           .then(function (downloadURL) {
    //             console.log("File available at", downloadURL);
    //             setImageUrls(imageUrls.concat(downloadURL));
    //             return downloadURL;
    //           });
    //       }
    //     );
    //   });
    // }

    // console.log(imageUrls);
    // console.log(imageUrls.length);
    // console.log(images.length);
  };

  return (
    <Fragment>
      <Dashboard>
        <Container maxWidth="md">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography
              variant="h4"
              className={classes.heading}
              style={{ marginBottom: "50px" }}
            >
              Add Vehicle
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

            <Grid
              container
              component="main"
              maxWidth="md"
              spacing={2}
              style={{ marginTop: "25px" }}
            >
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
                  id="cusname"
                  name="cusname"
                  label="Customer Name"
                  placeholder="John Doe"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Customer Name Required",
                  })}
                  error={errors.cusname ? true : false}
                  helperText={errors.cusname ? errors.cusname.message : null}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <TextField
                  id="conumber"
                  name="conumber"
                  label="Contact Number"
                  placeholder="078-5340697"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Contact Number Required",
                  })}
                  error={errors.conumber ? true : false}
                  helperText={errors.conumber ? errors.conumber.message : null}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <TextField
                  id="nic"
                  name="nic"
                  label="NIC Number"
                  placeholder="9817012122V"
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
            </Grid>

            <Grid container component="main" maxWidth="md" spacing={2}>
              <Grid item md={3} sm={6} xs={12}>
                <TextField
                  id="cnumber"
                  name="cnumber"
                  label="Chassie Number"
                  placeholder="34234242424234"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Chassie Number Required",
                  })}
                  error={errors.cnumber ? true : false}
                  helperText={errors.cnumber ? errors.cnumber.message : null}
                />
              </Grid>

              <Grid item md={3} sm={6} xs={12}>
                <TextField
                  id="color"
                  name="color"
                  label="Color"
                  placeholder="Black"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Color Required",
                  })}
                  error={errors.color ? true : false}
                  helperText={errors.color ? errors.color.message : null}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <TextField
                  id="yom"
                  name="yom"
                  label="YOM"
                  placeholder="1998"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "YOM Required",
                  })}
                  error={errors.yom ? true : false}
                  helperText={errors.yom ? errors.yom.message : null}
                />
              </Grid>

              <Grid item md={3} sm={6} xs={12}>
                <TextField
                  id="yor"
                  name="yor"
                  label="YOR"
                  placeholder="2000"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "YOR Required",
                  })}
                  error={errors.yor ? true : false}
                  helperText={errors.yor ? errors.yor.message : null}
                />
              </Grid>
            </Grid>

            <Grid container component="main" maxWidth="md" spacing={2}>
              <Grid item md={3} sm={6} xs={12}>
                <TextField
                  id="enginec"
                  name="enginec"
                  label="Engine Capacity"
                  placeholder="1000"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Engine Capacity Required",
                  })}
                  error={errors.enginec ? true : false}
                  helperText={errors.enginec ? errors.enginec.message : null}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <TextField
                  id="milage"
                  name="milage"
                  label="Milage"
                  placeholder="89000"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Milage Capacity Required",
                  })}
                  error={errors.milage ? true : false}
                  helperText={errors.milage ? errors.milage.message : null}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <TextField
                  id="prize"
                  name="prize"
                  label="Prize"
                  placeholder="890000"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  inputRef={register({
                    required: "Prize Capacity Required",
                  })}
                  error={errors.prize ? true : false}
                  helperText={errors.prize ? errors.prize.message : null}
                />
              </Grid>
            </Grid>

            <Grid
              container
              component="main"
              maxWidth="md"
              spacing={2}
              style={{ marginTop: "25px" }}
            >
              <Grid item md={2} sm={6} xs={12}>
                <FormControl
                  error={Boolean(errors.transmission)}
                  style={{ float: "left" }}
                >
                  <InputLabel id="transmission">Transmission</InputLabel>
                  <Controller
                    name="transmission"
                    rules={{ required: "this is required" }}
                    control={control}
                    defaultValue="automatic"
                    as={
                      <Select>
                        <MenuItem key="automatic" value="automatic">
                          Automatic
                        </MenuItem>
                        <MenuItem key="manual" value="manual">
                          Manual
                        </MenuItem>
                        <MenuItem key="triptonic" value="triptonic">
                          Triptonic
                        </MenuItem>
                      </Select>
                    }
                  />
                  <FormHelperText>
                    {errors.transmission && errors.transmission.message}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item md={2} sm={6} xs={12}>
                <FormControl
                  error={Boolean(errors.make)}
                  style={{ float: "left" }}
                >
                  <InputLabel id="demo-controlled-open-select-label">
                    Make
                  </InputLabel>
                  <Controller
                    as={
                      <Select>
                        {Makes.map((make) => {
                          return (
                            <MenuItem key={make.key} value={make.key}>
                              {make.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    }
                    name="make"
                    rules={{ required: "Make is required" }}
                    control={control}
                    defaultValue={"alfa-romeo"}
                  />
                  <FormHelperText>
                    {errors.make && errors.make.message}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item md={2} sm={6} xs={12}>
                <FormControl
                  error={Boolean(errors.modal)}
                  style={{ float: "left" }}
                >
                  <InputLabel id="demo-controlled-open-select-label">
                    Modal
                  </InputLabel>
                  <Controller
                    as={
                      <Select>
                        {Modals.map((modal) => {
                          return (
                            <MenuItem key={modal.key} value={modal.key}>
                              {modal.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    }
                    name="modal"
                    rules={{ required: "Modal is required" }}
                    control={control}
                    defaultValue={"800"}
                  />
                  <FormHelperText>
                    {errors.yor && errors.yor.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              component="main"
              maxWidth="md"
              spacing={2}
              style={{ marginTop: "25px" }}
            >
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="openPapers"
                  control={
                    <Checkbox
                      name="openPapers"
                      color="primary"
                      checked={state.openPapers}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Open papaers"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="finance"
                  control={
                    <Checkbox
                      name="finance"
                      color="primary"
                      checked={state.finance}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Finance"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="licenceCopy"
                  control={
                    <Checkbox
                      name="licenceCopy"
                      color="primary"
                      checked={state.licenceCopy}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Licence Copy"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="CrCopy"
                  control={
                    <Checkbox
                      name="CrCopy"
                      color="primary"
                      checked={state.CrCopy}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="CR Copy"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="wheel"
                  control={
                    <Checkbox
                      name="wheel"
                      color="primary"
                      checked={state.wheel}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Wheel"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="tools"
                  control={
                    <Checkbox
                      name="tools"
                      color="primary"
                      checked={state.tools}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Tools"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>

            <Grid container component="main" maxWidth="md" spacing={2}>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="gumBottle"
                  control={
                    <Checkbox
                      name="gumBottle"
                      color="primary"
                      checked={state.gumBottle}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Gum Bottle"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="jack"
                  control={
                    <Checkbox
                      name="jack"
                      color="primary"
                      checked={state.jack}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Jack"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="pumpKit"
                  control={
                    <Checkbox
                      name="pumpKit"
                      color="primary"
                      checked={state.pumpKit}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Pump Kit"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="ac"
                  control={
                    <Checkbox
                      name="ac"
                      color="primary"
                      checked={state.ac}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="AC"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="alloyWheels"
                  control={
                    <Checkbox
                      name="alloyWheels"
                      color="primary"
                      checked={state.alloyWheels}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Alloy Wheels"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="powerSteering"
                  control={
                    <Checkbox
                      name="powerSteering"
                      color="primary"
                      checked={state.powerSteering}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Power Steering"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>

            <Grid container component="main" maxWidth="md" spacing={2}>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="reactableMirrors"
                  control={
                    <Checkbox
                      name="reactableMirrors"
                      color="primary"
                      checked={state.reactableMirrors}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Reactable Mirrors"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="riverseCam"
                  control={
                    <Checkbox
                      name="riverseCam"
                      color="primary"
                      checked={state.riverseCam}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Riverse Cam"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="spoiler"
                  control={
                    <Checkbox
                      name="spoiler"
                      color="primary"
                      checked={state.spoiler}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Spoiler"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="cruiseControl"
                  control={
                    <Checkbox
                      name="cruiseControl"
                      color="primary"
                      checked={state.cruiseControl}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Cruise Control"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="subWoofers"
                  control={
                    <Checkbox
                      name="subWoofers"
                      color="primary"
                      checked={state.subWoofers}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Sub Woofers"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="fogLamp"
                  control={
                    <Checkbox
                      name="fogLamp"
                      color="primary"
                      checked={state.fogLamp}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Fog Lamp"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>

            <Grid container component="main" maxWidth="md" spacing={2}>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="multimediaSetup"
                  control={
                    <Checkbox
                      name="multimediaSetup"
                      color="primary"
                      checked={state.multimediaSetup}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Multimedia Setup"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="powerShutters"
                  control={
                    <Checkbox
                      name="powerShutters"
                      color="primary"
                      checked={state.powerShutters}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Power Shutters"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="welcomeLight"
                  control={
                    <Checkbox
                      name="welcomeLight"
                      color="primary"
                      checked={state.welcomeLight}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Welcome Light"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="wayCamera"
                  control={
                    <Checkbox
                      name="wayCamera"
                      color="primary"
                      checked={state.wayCamera}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="4 Way Camera"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="autoBreak"
                  control={
                    <Checkbox
                      name="autoBreak"
                      color="primary"
                      checked={state.autoBreak}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Auto Break"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="reverseSensor"
                  control={
                    <Checkbox
                      name="reverseSensor"
                      color="primary"
                      checked={state.reverseSensor}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Reverse Sensor"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>

            <Grid container component="main" maxWidth="md" spacing={2}>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="paddleShifters"
                  control={
                    <Checkbox
                      name="paddleShifters"
                      color="primary"
                      checked={state.paddleShifters}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Paddle Shifters"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="smartKey"
                  control={
                    <Checkbox
                      name="smartKey"
                      color="primary"
                      checked={state.smartKey}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Smart Key"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="scopeKey"
                  control={
                    <Checkbox
                      name="scopeKey"
                      color="primary"
                      checked={state.scopeKey}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Scope Key"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="senonLight"
                  control={
                    <Checkbox
                      name="senonLight"
                      color="primary"
                      checked={state.senonLight}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Senon Light"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="powerAriel"
                  control={
                    <Checkbox
                      name="powerAriel"
                      color="primary"
                      checked={state.powerAriel}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Power Ariel"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="pushStart"
                  control={
                    <Checkbox
                      name="pushStart"
                      color="primary"
                      checked={state.pushStart}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Push Start"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>

            <Grid container component="main" maxWidth="md" spacing={2}>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="crystalLight"
                  control={
                    <Checkbox
                      name="crystalLight"
                      color="primary"
                      checked={state.crystalLight}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Crystal Light"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="headlightWasher"
                  control={
                    <Checkbox
                      name="headlightWasher"
                      color="primary"
                      checked={state.headlightWasher}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Headlight Washer"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="backseatScreens"
                  control={
                    <Checkbox
                      name="backseatScreens"
                      color="primary"
                      checked={state.backseatScreens}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Backseat Screens"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="safety"
                  control={
                    <Checkbox
                      name="safety"
                      color="primary"
                      checked={state.safety}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Safety"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="abs"
                  control={
                    <Checkbox
                      name="abs"
                      color="primary"
                      checked={state.abs}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="ABS"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="forWheel"
                  control={
                    <Checkbox
                      name="forWheel"
                      color="primary"
                      checked={state.forWheel}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="4 Wheel"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>

            <Grid container component="main" maxWidth="md" spacing={2}>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="headUpDisplay"
                  control={
                    <Checkbox
                      name="headUpDisplay"
                      color="primary"
                      checked={state.headUpDisplay}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Head-up Display"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="fullOption"
                  control={
                    <Checkbox
                      name="fullOption"
                      color="primary"
                      checked={state.fullOption}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Full Option"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="multiFunction"
                  control={
                    <Checkbox
                      name="multiFunction"
                      color="primary"
                      checked={state.multiFunction}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Multi Function"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="autoDoor"
                  control={
                    <Checkbox
                      name="autoDoor"
                      color="primary"
                      checked={state.autoDoor}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="Auto Door"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="airBagsOne"
                  control={
                    <Checkbox
                      name="airBagsOne"
                      color="primary"
                      checked={state.airBagsOne}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="1 Air Bag"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="airBagsTwo"
                  control={
                    <Checkbox
                      name="airBagsTwo"
                      color="primary"
                      checked={state.airBagsTwo}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="2 Air Bags"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>

            <Grid container component="main" maxWidth="md" spacing={2}>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="airBagsFour"
                  control={
                    <Checkbox
                      name="airBagsFour"
                      color="primary"
                      checked={state.airBagsFour}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="4 Air Bags"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={2} sm={6} xs={12}>
                <FormControlLabel
                  style={{ float: "left" }}
                  value="airBagsEight"
                  control={
                    <Checkbox
                      name="airBagsEight"
                      color="primary"
                      checked={state.airBagsEight}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="8 Air Bags"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>

            <Grid
              container
              component="main"
              maxWidth="md"
              spacing={2}
              style={{ marginTop: "25px" }}
            >
              <FileUploader onSubmit={handleImages} />
            </Grid>

            {/* <Grid
            container
            component="main"
            maxWidth="md"
            spacing={2}
            style={{ marginTop: "25px" }}
          > */}
            {/* {loadingImagesUploaded ? (
              <LinearProgress
                progress={progress}
                snapshot={snapshot}
                currentImage={currentImage}
              ></LinearProgress>
            ) : null} */}

            {/* {images.map((image, index) => {
              console.log(image, index);
              return (
                <LinearProgress
                  progress={progress}
                  snapshot={snapshot}
                  image={image}
                  currentImage={currentImage}
                />
              );
            })} */}
            {/* {imageUrls.map((url) => {
              return <p>{url}</p>;
            })} */}

            {/* {images.map((image, index) => {
              return (
                <ImageUploadPreview
                  image={image}
                  snapshot={snapshot}
                  currentImage={currentImage}
                  progress={progress}
                />
              );
            })} */}
            {/* </Grid> */}

            <Grid
              container
              item
              xs={12}
              sm={2}
              md={2}
              justify="flex-end"
              style={{ marginTop: "25px" }}
            >
              {loading ? (
                <>
                  <CircularProgress />
                  <p>Adding car to the inventory...</p>
                </>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              )}
            </Grid>
          </form>
        </Container>
      </Dashboard>
    </Fragment>
  );
};

export default AddVehicle;

// const storageRef = bucket.ref();

//     const imageUrl = await Promise.all(
//       images.map(async (image) => {
//         const uploadTask = storageRef.child(`cars/${uuidv4()}`).put(image);
//         const url = await new Promise((resolve, reject) => {
//           uploadTask.on(
//             "state_changed",
//             () => {},
//             (error) => reject(error),
//             async () => {
//               const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
//               resolve(downloadUrl);
//             }
//           );

//           return db
//             .collection("cars")
//             .doc(vnumber)
//             .set({
//               selectedDate,
//               vehicle_number: vnumber,
//               customer_number: cusname,
//               contact_number: conumber,
//               nic_number: nic,
//               chassie_number: cnumber,
//               color,
//               year_of_manufacture: yom,
//               year_of_register: yor,
//               engine_capacity: enginec,
//               transmission,
//               make,
//               modal,
//               openPapers,
//               finance,
//               licenceCopy,
//               CrCopy,
//               wheel,
//               tools,
//               gumBottle,
//               jack,
//               pumpKit,
//               ac,
//               alloyWheels,
//               powerSteering,
//               reactableMirrors,
//               riverseCam,
//               spoiler,
//               cruiseControl,
//               subWoofers,
//               fogLamp,
//               multimediaSetup,
//               powerShutters,
//               welcomeLight,
//               wayCamera,
//               autoBreak,
//               reverseSensor,
//               paddleShifters,
//               smartKey,
//               scopeKey,
//               senonLight,
//               powerAriel,
//               pushStart,
//               autoDoor,
//               crystalLight,
//               headlightWasher,
//               backseatScreens,
//               safety,
//               abs,
//               airBagsOne,
//               airBagsTwo,
//               airBagsFour,
//               airBagsEight,
//               headUpDisplay,
//               fullOption,
//               multiFunction,
//             })
//             .then((res) => {
//               console.log(res);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }).catch((error) => console.log(error));
//       })
//     );
