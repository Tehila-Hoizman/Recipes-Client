import "../../styles/SignIn.css";
import { Navigate, useNavigate } from "react-router-dom";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { connect, getUser, openAlert, setStatus, setUser } from "../../store/loginSlice";
import theme from "../Themes/CreateTheme";
import { useTheme } from "@emotion/react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        FooDeal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const user = useSelector((state) => state.login.user);
  const status = useSelector((state) => state.login.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const resultAction = await dispatch(getUser({ email: data.get("email"), password: data.get("password") }));
      if (getUser.fulfilled.match(resultAction)) {
        dispatch(setStatus("init"));
        dispatch(connect());
        navigate("/");
      }
    } catch (err) {
      console.error('Failed to login: ', err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            className="icon-signIn"
            sx={{ m: 1 }}
            color={theme.palette.pink2}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            התחברות
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              className="outline"
              margin="normal"
              required
              fullWidth
              id="email"
              label="אימייל"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              className="outline"
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמה"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  className="outline"
                  color="primary"
                />
              }
              label="זכור אותי"
            />
            <Button
              className="btn-submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              התחברות
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" className="links-brown">
                  שכחת סיסמה?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2" className="links-brown">
                  {"אין לך חשבון? להרשמה"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
