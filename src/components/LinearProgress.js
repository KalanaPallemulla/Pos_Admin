import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress as Linear } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "25px",
  },
});

export default function LinearDeterminate({ progress }) {
  const classes = useStyles();

  // const [progress, setProgress] = useState(0);

  // let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  // setProgress(percentage);
  // console.log(percentage);

  // console.log(progress);
  // console.log(snapshot);
  // console.log(currentImage);

  return (
    <div className={classes.root}>
      <Linear variant="determinate" value={progress} />
      <p>{progress + "%"}</p>
    </div>
  );
}
