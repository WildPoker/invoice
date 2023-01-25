import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, Link, TextField, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "60vh",
      height: "60vh",
      margin: "20vh 0",
      minWidth: "20vh",
    },
  },
}));
const ForgotPassword = () => {
  const classes = useStyles();
  return (
    <div style={{ backgroundColor: "#b2bec3" }}>
      <Grid container justify="center">
        <div className={classes.root}>
          <Paper elevation={4}>
            <Grid container>
              <Grid item xs={12} container justify="center">
                <Typography variant="h5" style={{ margin: "2rem" }}>
                  FORGOT PASSWORD
                </Typography>
              </Grid>
              <Grid item xs={12} container justify="center">
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  style={{ margin: "2rem 2rem 1rem" }}
                />
              </Grid>
              <Grid item xs={12} container justify="center">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  style={{ margin: "1rem 2rem 2rem" }}
                >
                  Next
                </Button>
              </Grid>
              <Grid item xs={12} container justify="center">
                <hr style={{ width: "90%" }} />
              </Grid>
              <Grid item xs={12} container justify="center">
                <Link>Reset Password</Link>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Grid>
    </div>
  );
};

export default ForgotPassword;
