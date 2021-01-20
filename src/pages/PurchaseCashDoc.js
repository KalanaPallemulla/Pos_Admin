import { Button, Divider, Grid, Typography } from "@material-ui/core";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import bat from "../assets/HeaderImage.jpeg";
import CheckIcon from "@material-ui/icons/Check";
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
              <h2>Vehicle Purchase Receipt</h2>
              <Typography style={{ marginTop: "20px" }}>09/02/2020</Typography>
            </Grid>
            <Typography style={{ textAlign: "center", fontSize: "25px" }}>
              <b>CAA 2344</b>
            </Typography>
            <Typography style={{ marginLeft: "50px", marginTop: "10px" }}>
              Seller
            </Typography>
            <div
              style={{
                marginTop: "10px",
                marginRight: "50px",
              }}
            >
              <Divider />
              <Grid style={{ marginTop: "15px" }}>
                <Typography>Name: Rashmika</Typography>
                <Typography>Address: Nugegoda</Typography>
                <Typography>Contact no: 077 7 777777</Typography>
              </Grid>
              <Divider style={{ marginTop: "15px" }} />
            </div>
            <Grid
              item
              style={{
                marginTop: "25px",
                maxWidth: "780px",
              }}
            >
              <Typography>
                In respect of the sale of Vehicle Registation no: CBD 6545,
                Make: Toyota, Model: Fortuner received a sum of Rupees 570 000
                in form of cash being the full and final sale consideration from
                Tilan Liyanage bearing N.I.C. no: 23456890v Resident of
                Papiliyana.
              </Typography>
              <Typography style={{ marginTop: "25px" }}>
                It is understood the vehicle is sold as seen, tried, by checking
                and the acceptance of the following documents a approved by the
                purchaser without any representaion, warranties, or conditions
                expresss or implied whatsoever.
              </Typography>
              <Typography style={{ marginTop: "25px" }}>
                1. Certificate of Registration of Motor vehicle
                <CheckIcon color="black" style={{ fontSize: "18px" }} />
              </Typography>
              <Typography>
                2. Vehicle Revenue License
                <CheckIcon color="black" style={{ fontSize: "18px" }} />
              </Typography>
              <Typography>
                3. Motor Insurance{" "}
                <CheckIcon color="black" style={{ fontSize: "18px" }} />
              </Typography>
              <Typography>
                4. Vehicle Trancfer Papers{" "}
                <CheckIcon color="black" style={{ fontSize: "18px" }} />
              </Typography>
              <Typography>
                5. Letter of Vehicle Lease Closure{" "}
                <CheckIcon color="black" style={{ fontSize: "18px" }} />
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              style={{
                marginTop: "30px",
                maxWidth: "780px",
              }}
            >
              <Grid>
                <Typography>
                  ................................................
                </Typography>
                <Typography>Director Family Cars (Pvt) Ltd. </Typography>
              </Grid>
              <Grid>
                <Typography>
                  ........................................
                </Typography>

                <Typography style={{ textAlign: "center" }}>
                  Purchaser
                </Typography>
              </Grid>
            </Grid>
            <Divider
              style={{
                marginTop: "20px",
              }}
            />
            <Grid
              item
              style={{
                marginTop: "20px",
              }}
            >
              <Typography>Office Use Only</Typography>
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{ marginTop: "15px" }}
              >
                <Typography>Contact NO: 011 2 456 456</Typography>
                <Typography>Email: Admin@familycars.com</Typography>
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
