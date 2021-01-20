import { Button, Divider, Grid, Typography } from "@material-ui/core";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import bat from "../assets/HeaderImage.jpeg";

class Print extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "left",
          height: "1100px",
          backgroundColor: "gray",
        }}
      >
        <div style={{ backgroundColor: "white" }}>
          <img src={bat} alt="bat" style={{ width: "100%" }} />
          <Grid
            container
            direction="column"
            style={{ marginLeft: "50px", marginTop: "10px" }}
          >
            <Grid>
              <Typography>Date:</Typography>
            </Grid>
            <Grid>
              <Typography>Vehicle No:</Typography>
            </Grid>
          </Grid>
          <Grid style={{ marginLeft: "50px" }}>
            <Grid>
              <br />
              <Grid container direction="column">
                <Typography>Customer Name:</Typography>
              </Grid>
              <Grid container direction="column">
                <Grid>
                  <Typography>Contact No:</Typography>
                </Grid>
                <Grid>
                  <Typography>NIC No:</Typography>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid>
                  <Typography>Make and Model:</Typography>
                </Grid>
              </Grid>
              <Grid container direction="column">
                <Grid>
                  <Typography>Papers:</Typography>
                </Grid>
                <Grid>
                  <Typography>Finance:</Typography>
                </Grid>
              </Grid>
              <Grid container direction="column">
                <Grid>
                  <Typography>Licence Copy:</Typography>
                </Grid>
                <Grid>
                  <Typography>CR Copy:</Typography>
                </Grid>
              </Grid>
              <Grid container direction="column">
                <Grid>
                  <Typography>Milage:</Typography>
                </Grid>
                <Grid>
                  <Typography>YOM:</Typography>
                </Grid>
                <Grid>
                  <Typography>YOR:</Typography>
                </Grid>
              </Grid>
              <Grid container direction="column">
                <Grid>
                  <Typography>Transmission:</Typography>
                </Grid>

                <Grid>
                  <Typography>Engin Capacity:</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="row">
              <Grid>
                <Typography>Others:</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row">
              <Grid md={3}>
                <Typography>1:</Typography>
              </Grid>
              <Grid md={3}>
                <Typography>1:</Typography>
              </Grid>
              <Grid md={3}>
                <Typography>1:</Typography>
              </Grid>
              <Grid md={3}>
                <Typography>1:</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "0px", padding: "50px" }}>
            <Typography>
              Remark:
              ...........................................................................................................................................................
            </Typography>
          </Grid>
          <Grid container justify="center" alignItems="center">
            I agree to allow Family Cars Malabe to sell this Vehicle under the
            minimum
          </Grid>
          <Grid container justify="center" alignItems="center">
            price of ..................... (to owner's hand) pay Family Cars
            Malabe fee ....................
          </Grid>
          <Grid container justify="center" alignItems="center">
            on the complete the full transaction. I agree to provide the
            necessary documents for transfer
          </Grid>
          <Grid
            container
            justify="center"
            component="main"
            style={{
              marginTop: "20px",
              backgroundColor: "black",
              width: "700px",
              marginLeft: "90px",
            }}
          >
            <Typography style={{ color: "white" }}>
              Service Charges Are
            </Typography>
          </Grid>
          <Grid>
            <Grid container direction="row">
              {" "}
              <Typography style={{ marginLeft: "150px" }}>
                Below 2,000,000 Vehicles
              </Typography>
              <Typography style={{ marginLeft: "270px" }}>Rs.20,000</Typography>
            </Grid>
            <Grid container direction="row">
              {" "}
              <Typography style={{ marginLeft: "150px" }}>
                Up 2,000,000 to 4,000,000
              </Typography>
              <Typography style={{ marginLeft: "264px" }}>Rs.25,000</Typography>
            </Grid>
            <Grid container direction="row">
              {" "}
              <Typography style={{ marginLeft: "150px" }}>
                Up 4,000,000 Vehicles
              </Typography>
              <Typography style={{ marginLeft: "294px" }}>Rs.30,000</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: "60px" }}>
            <Typography style={{ marginLeft: "102px" }}>
              .......................................
            </Typography>
            <Typography style={{ marginLeft: "315px" }}>
              .......................................
            </Typography>
          </Grid>
          <Grid container direction="row">
            <Typography style={{ marginLeft: "120px" }}>
              Company Signature
            </Typography>
            <Typography style={{ marginLeft: "350px" }}>
              Customer Signature
            </Typography>
          </Grid>
        </div>
      </div>
    );
  }
}

const Example = () => {
  const componentRef = useRef();

  return (
    <div style={{ marginTop: "10px" }}>
      <ReactToPrint
        content={() => componentRef.current}
        trigger={() => (
          <Button style={{ backgroundColor: "#9e9e9e", marginLeft: "-10px" }}>
            Print this out!
          </Button>
        )}
      />

      <Button style={{ backgroundColor: "#9e9e9e", marginLeft: "10px" }}>
        Back To Home
      </Button>
      <Print ref={componentRef} />
    </div>
  );
};

export default Example;
