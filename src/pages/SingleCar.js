// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";

// import {
//   makeStyles,
//   Container,
//   Typography,
//   Grid,
//   CircularProgress,
//   Button,
// } from "@material-ui/core";

// import Dashboard from "./Dashboard";
// import { db } from "../util/config";

// const useStyles = makeStyles((theme) => ({
//   img: {
//     margin: "auto",
//     display: "block",
//     maxWidth: "100%",
//     maxHeight: "100%",
//   },
// }));

// export default function SingleCar(props) {
//   const location = useLocation();
//   const classes = useStyles();
//   const [loading, setLoading] = useState(false);
//   const [car, setCar] = useState({});
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     const data = db
//       .collection("cars")
//       .doc(props.match.params.car)
//       .get()
//       .then((result) => {
//         console.log(result.data());
//         setCar(result.data());

//         let imagesArray = [];

//         result.data().images.map((image) => {
//           imagesArray.push({ original: image, thumbnail: image });
//         });

//         setImages(imagesArray);
//         setLoading(false);
//       })

//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//     // console.log(value);
//   }, []);

//   const handleClick = () => {
//     setLoading(true);

//     db.collection("cars")
//       .doc(car.vehicle_number)
//       .delete()
//       .then((result) => {
//         setLoading(false);

//         props.history.push("/");
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   };

//   console.log(location);
//   console.log(props.match.params.car);
//   console.log(car);
//   console.log(images);

//   return (
//     <Dashboard>
//       <Container maxWidth="lg" style={{ textAlign: "left" }}>
//         {loading ? (
//           <Grid container justify="center" alignItems="center">
//             <CircularProgress />
//             <p>Loading ..</p>
//           </Grid>
//         ) : (
//           <Grid container>
//             <Grid item xs={12} md={8}>
//               <div
//                 style={{
//                   background: "#FFFFFF",
//                   padding: "20px",
//                 }}
//               >
//                 <Typography variant="body1" style={{ fontWeight: "bold" }}>
//                   <h1>TOYOTA STARLET</h1>
//                 </Typography>

//                 {images ? (
//                   <ImageGallery items={images} showPlayButton={false} />
//                 ) : null}

//                 <Grid
//                   item
//                   xs={12}
//                   md={8}
//                   item
//                   container
//                   direction="column"
//                   style={{ marginTop: "10px" }}
//                 >
//                   <h4 style={{ color: "gray" }}>More Details</h4>
//                 </Grid>

//                 <Grid
//                   item
//                   xs={12}
//                   md={8}
//                   container
//                   direction="column"
//                   style={{ marginTop: "20px" }}
//                 ></Grid>

//                 <Grid container direction="row" md={12}>
//                   <Grid item md={6} sm={6} xs={12}>
//                     <Typography>Full Option</Typography>
//                   </Grid>
//                   <Grid item md={6} sm={6} xs={12}>
//                     hi
//                   </Grid>
//                   <Grid item md={6} sm={6} x>
//                     hi
//                   </Grid>
//                   <Grid item md={6} sm={6} x>
//                     hi
//                   </Grid>
//                   <Grid item md={6} sm={6} x>
//                     hi
//                   </Grid>
//                   <Grid item md={6} sm={6} x>
//                     hi
//                   </Grid>
//                   <Grid item md={6} sm={6} x>
//                     hi
//                   </Grid>
//                 </Grid>
//               </div>
//             </Grid>

//             <Grid container item xs={12} md={4} direction="column">
//               <Grid item>
//                 <div
//                   style={{
//                     background: "#FFFFFF",
//                     padding: "25px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       background: "yellow",
//                       padding: "10px",
//                       textAlign: "center",
//                     }}
//                   >
//                     <h1>{car.prize}</h1>{" "}
//                     <h5 style={{ textAlign: "center" }}>
//                       Included Tax and Checkup
//                     </h5>
//                   </div>
//                 </div>
//               </Grid>
//               <Grid container item direction="column">
//                 <div
//                   style={{
//                     background: "#FFFFFF",
//                     padding: "25px",
//                   }}
//                 >
//                   <h4>SPECIFICATIONS</h4>
//                   <Grid
//                     xs={12}
//                     md={12}
//                     item
//                     container
//                     direction="row"
//                     style={{ marginTop: "20px" }}
//                   >
//                     <Grid item md={6} xs={6}>
//                       <Typography> Make</Typography>
//                     </Grid>
//                     <Grid item md={6} sx={6}>
//                       <Typography>{car.make}</Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid
//                     xs={12}
//                     md={12}
//                     item
//                     container
//                     direction="row"
//                     style={{ marginTop: "20px" }}
//                   >
//                     <Grid item md={6} xs={6}>
//                       <Typography> Model</Typography>
//                     </Grid>
//                     <Grid item md={6} xs={6}>
//                       <Typography>{car.modal}</Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid
//                     xs={12}
//                     md={12}
//                     item
//                     container
//                     direction="row"
//                     style={{ marginTop: "20px" }}
//                   >
//                     <Grid item md={6} xs={6}>
//                       <Typography> Registation Date</Typography>
//                     </Grid>
//                     <Grid item md={6} xs={6}>
//                       <Typography>{car.year_of_register}</Typography>
//                     </Grid>
//                   </Grid>

//                   <Grid
//                     xs={12}
//                     md={12}
//                     item
//                     container
//                     direction="row"
//                     style={{ marginTop: "20px" }}
//                   >
//                     <Grid item md={6} xs={6}>
//                       <Typography> Mileage</Typography>
//                     </Grid>
//                     <Grid item md={6} xs={6}>
//                       <Typography>{car.milage}</Typography>
//                     </Grid>
//                   </Grid>

//                   <Grid
//                     xs={12}
//                     md={12}
//                     item
//                     container
//                     direction="row"
//                     style={{ marginTop: "20px" }}
//                   >
//                     <Grid item md={6} xs={6}>
//                       <Typography> Trasmission</Typography>
//                     </Grid>
//                     <Grid item md={6} xs={6}>
//                       <Typography>{car.transmission}</Typography>
//                     </Grid>
//                   </Grid>

//                   <Grid
//                     xs={12}
//                     md={12}
//                     item
//                     container
//                     direction="row"
//                     style={{ marginTop: "20px" }}
//                   >
//                     <Grid item md={6} xs={6}>
//                       <Typography> Contact No.</Typography>
//                     </Grid>
//                     <Grid item md={6} xs={6}>
//                       <Typography>{car.contact_number}</Typography>
//                     </Grid>
//                   </Grid>

//                   <Grid
//                     xs={12}
//                     md={12}
//                     item
//                     container
//                     direction="row"
//                     style={{ marginTop: "20px" }}
//                   >
//                     <Grid item md={6} xs={6}>
//                       <Typography> Engine</Typography>
//                     </Grid>
//                     <Grid item md={6} xs={6}>
//                       <Typography>{car.engine_capacity}</Typography>
//                     </Grid>
//                   </Grid>
//                 </div>
//               </Grid>
//             </Grid>

//             <Button
//               onClick={handleClick}
//               style={{
//                 backgroundColor: "red",
//                 color: "white",
//                 padding: "10px",
//               }}
//             >
//               <b>Delete</b>
//             </Button>
//           </Grid>
//         )}
//       </Container>
//     </Dashboard>
//   );
// }
