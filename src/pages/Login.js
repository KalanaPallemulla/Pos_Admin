import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { app } from "../util/config";

// materual ui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import LoginContainer from "../components/LoginContainer";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

export default function Login(props) {
  const classes = useStyles();

  //hook form
  const { register, handleSubmit, errors } = useForm();
  const [loginErrors, setLoginErrors] = useState(null);

  const onSubmit = (data) => {
    console.log(data);

    const { email, password } = data;

    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        console.log(result);

        const token = await result.user.getIdToken();
        console.log(token);
        Cookies.set("Token", `Bearer ${token}`);

        props.history.push("/");
      })
      .catch((err) => {
        console.log(err, err.code);

        if (err.code === "auth/user-not-found") {
          setLoginErrors("User not found");
        }

        if (err.code === "auth/wrong-password") {
          setLoginErrors("Invalid password");
        }
      });
  };

  return (
    <div className={classes.paper}>
      <LoginContainer>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                placeholder="JohnDoe@gmail.com"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Email Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : null}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                placeholder="***********"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant="outlined"
                inputRef={register({
                  required: "Password Required",
                  minLength: { value: 6, message: "Password is too short" },
                })}
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password.message : null}
              />
            </Grid>

            <Grid item xs={12} sm={3} md={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>

            {loginErrors ? (
              <Grid item xs={12}>
                <Alert severity="error">{loginErrors}</Alert>
              </Grid>
            ) : null}

            <Grid item xs={12}>
              {"Not a registered user ? Register" + " "}
              <Link to="/signup">
                <b>Here</b>
              </Link>
            </Grid>
          </Grid>
        </form>
      </LoginContainer>
    </div>
  );
}
