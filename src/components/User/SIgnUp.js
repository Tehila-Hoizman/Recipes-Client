import "../../styles/SignIn.css";
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
import { json, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import theme from "../Themes/CreateTheme";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  connect,
  getUser,
  setStatus,
  setUser,
} from "../../store/loginSlice";
import { Input } from "@mui/material";
import DialogMessage from "../Dialogs/DialogMessage";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import "../../styles/SignUp.css"
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

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const status = useSelector((state) => state.login.status);
  const [isOk, setIsOk] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [firstNameInValid,setfirstNameInValid] = useState("");
  const [lastNameInValid,setLastNameInValid] = useState("");
  const [emailInValid,setEmailInValid] = useState("");
  const [passwordInValid,setPasswordInValid] = useState("");

  const connectSite =()=>{
    dispatch(connect());
    navigate("/");
  }
  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
const isValid = (data)=>{
  let flag = true;
  if(data.get("firstName")==""){
    setfirstNameInValid("שדה חובה");
    flag=false;
  }else{
    setfirstNameInValid("");
  }
  if(data.get("lastName")==""){
    setLastNameInValid("שדה חובה");
    flag=false;
  }else{
    setLastNameInValid("");
  }
  if(data.get("email")==""){
    setEmailInValid("שדה חובה");
    flag=false;
  }else{
    if(!validateEmail(data.get("email")))
    setEmailInValid("אימייל לא חוקי");
  else{
    setEmailInValid("");
  }
  }
  if(data.get("password")==""){
    setPasswordInValid("שדה חובה");
    flag=false;
  }else{
    setPasswordInValid("");
  }
return flag;
}
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(isValid(data)){
    try{
    let res = await axios.post(`https://localhost:7161/api/User/isEmailExist`, { email: data.get("email") }, // Send email as JSON
    {
      headers: {
        'Content-Type': 'application/json' // Specify content type as JSON
      }
    });
    if(!res.data){
      setEmailInValid("");
      console.log("data", data);
      let obj = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        level: 0,
        wantNewsletter: 0,
        // FilelImage:data.get("image-upload").name == "" ? null : data.get("image-upload"),
        urlImage: null,
      };
  
      setIsOk(true);
      console.log("obj", obj);
      let res = await dispatch(addUser(obj));
  
      if (addUser.fulfilled.match (res)) {
        await dispatch(setStatus("init"));
        console.log("sdhjkafhisyu");
        setOpenSuccess(true);
  
        }
  
    }else{
      // alert("this email already exist");
      setEmailInValid("מייל זה כבר רשום במערכת")
    }
  }catch(err){
    throw new Error(err.message);
  }
}
  };


  return (
    <ThemeProvider theme={theme}>
      <Container className="sign-up" component="main" maxWidth="xs">
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
            className="icon-signUp"
            sx={{ m: 1, bgcolor: "secondary.main" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            הרשמה
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="שם פרטי"
                  sx={{marginBottom:"4px"}}
                  autoFocus
                />
                                <Typography className="error" sx={{fontSize:"0.7rem"}}>{firstNameInValid}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="שם משפחה"
                  name="lastName"
                  autoComplete="family-name"
                  sx={{marginBottom:"4px"}}
                />
                                <Typography className="error" sx={{fontSize:"0.7rem"}}>{lastNameInValid}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="אימייל"
                  name="email"
                  autoComplete="email"
                  sx={{marginBottom:"4px"}}
                />
                <Typography className="error" sx={{fontSize:"0.7rem"}}>{emailInValid}</Typography>
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  required
                  fullWidth
                  name="password"
                  label="סיסמה"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                /> */}
                <PasswordInput                   sx={{marginBottom:"4px"}}/>
                <Typography className="error" sx={{fontSize:"0.7rem"}}>{passwordInValid}</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
              <Button
              className="btn-submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              הרשמה
            </Button>
            </Grid>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signIn" variant="body2" className="links-brown">
                  יש לך כבר חשבון? להתחברות
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <DialogMessage setOpen={setOpenSuccess} open={openSuccess} handleClick={connectSite} message="נרשמת בהצלחה"/>

      </Container>
    </ThemeProvider>
  );
}
