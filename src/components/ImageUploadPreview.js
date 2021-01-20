import React, { useState } from "react";
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
} from "@material-ui/core";

import LinearProgress from "../components/LinearProgress";

export default function ImageUploadPreview({
  image,
  snapshot,
  currentImage,
  progress,
  key,
}) {
  const [thumbnail, setThumbnail] = useState();
  // console.log(image);

  if (image) {
    let reader = new FileReader();
    reader.onload = (e) => {
      setThumbnail(e.target.result);
    };
    reader.readAsDataURL(image);
  }

  console.log(snapshot);
  // console.log(progress.count);
  // console.log(key);
  return (
    <Grid container maxWidth="md">
      <Grid item xs={12} md={6}>
        <Grid item xs={12} md={6}>
          <img src={thumbnail} alt="image" style={{ width: "100%" }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <h5>{image.name}</h5>
        </Grid>

        <Grid item xs={12} md={6}>
          <LinearProgress progress={snapshot.percentage} />
        </Grid>
      </Grid>
    </Grid>
  );
}
