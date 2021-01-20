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
          <Grid style={{ padding: "50px" }}>
            <Grid container direction="column" style={{ marginTop: "10px" }}>
              <h2>Vehicle Purchease Receipt</h2>
              <Grid>
                <Typography>Date:</Typography>
              </Grid>
              <Grid>
                <Typography>Seller:</Typography>
              </Grid>
            </Grid>

            <Grid container justify="center" alignItems="center">
              <Typography variant="h6">Vehicle No</Typography>
            </Grid>
            <Divider />
            <Grid container direction="column" style={{ marginTop: "20px" }}>
              <Grid>
                <Typography>Name:</Typography>
              </Grid>
              <Grid>
                <Typography>Address:</Typography>
              </Grid>{" "}
              <Grid>
                <Typography>Contact No:</Typography>
              </Grid>
            </Grid>
            <Divider style={{ marginTop: "10px" }} />
            <Grid container direction="column" style={{ marginTop: "20px" }}>
              <Grid style={{ maxWidth: "780px" }}>
                <Typography>
                  In respect of the sale of Vehicle Registation No:Vehicle NO,
                  Make: make, Model:model given to us by the owners for sale was
                  offered to customer name a resident Customer Address, for
                  price and accepted Rupees price in cash.
                </Typography>
              </Grid>

              <Grid style={{ maxWidth: "780px", marginTop: "15px" }}>
                <Typography>
                  Finance facilities have been obtained by the purchaser for the
                  remaining Rupees:PRICE from FINACE COMPANY and it is hereby
                  promised to intervene as required to obtain the cheque
                  expeditously. Based on those agreements and promises, we
                  handled over the vehilce to the buyer today.
                </Typography>
              </Grid>
              <Grid container justify="flex-start">
                <Grid>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    direction="column"
                    style={{ marginTop: "30px" }}
                  >
                    <Typography>
                      ......................................
                    </Typography>
                    <Typography>Director Family Cars (Pvt) Ltd.</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Typography style={{ marginTop: "30px" }}>
                  Accepted the vehilce in the proper condition on the above
                  agreements and promises
                </Typography>
              </Grid>

              <Grid container justify="flex-start">
                <Grid>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    direction="column"
                    style={{ marginTop: "30px" }}
                  >
                    <Typography>
                      ......................................
                    </Typography>
                    <Typography>Purcheaser</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Divider style={{ marginTop: "30px" }}></Divider>
            <Grid container direction="column" style={{ marginTop: "10px" }}>
              <Grid>Office Use Only</Grid>
              <Grid style={{ marginTop: "30px" }}>
                <Grid container direction="row" justify="space-between">
                  <Grid>Contact No:(123) 456-7890</Grid>
                  <Grid>Email: Admin@familcars.componentRef</Grid>
                </Grid>
              </Grid>
            </Grid>
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
