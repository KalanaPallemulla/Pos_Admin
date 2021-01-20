import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useForm, ErrorMessage, Controller } from "react-hook-form";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();

  const { handleSubmit, errors, control } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{ float: "left" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          className={classes.formControl}
          error={Boolean(errors.wordlevel)}
        >
          <InputLabel id="demo-controlled-open-select-label">
            Transmission
          </InputLabel>
          <Controller
            as={
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            }
            name="wordlevel"
            rules={{ required: "this is required" }}
            control={control}
            defaultValue=""
          />
          <FormHelperText>
            {errors.wordlevel && errors.wordlevel.message}
          </FormHelperText>
        </FormControl>
      </form>
    </div>
  );
}
