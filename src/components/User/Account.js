import "../../styles/Account.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { json, useNavigate } from "react-router";
import axios from "axios";
import theme from "../Themes/CreateTheme";
import { useDispatch, useSelector } from "react-redux";
import { connect, setAlert, setUser, updateUser } from "../../store/loginSlice";
import { Input } from "antd";
import PersonIcon from "@mui/icons-material/Person";
import { Alert } from "@mui/material";
import { useEffect } from "react";
import { set } from "immutable";
import { useState } from "react";
import DialogMessage from "../Dialogs/DialogMessage";

export default function Account() {
  const isConnect = useSelector((state) => state.login.isConnect);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const status = useSelector((state) => state.login.status);
  const [file, setFile] = React.useState(user.UrlImage);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const alert = useSelector((state) => state.login.alert);
  // const image = user && user.urlUpdateImage ? user.urlUpdateImage : null;
  const image = useSelector((state) => state.login.user.urlUpdateImage);
  const imageUrl = useSelector((state) => state.login.user.urlImage);
  const [openSuccess, setOpenSuccess] = useState(false);


  const handleClose =()=>{
    setOpenSuccess(false);
    navigate("/");
  }
  useEffect(() => {
    if (image&&image!="error"&&image=="") {
      const base64String = image; // replace with your base64 string
      const filename = imageUrl;

      fetch(base64String)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], filename, { type: "image/jpeg" });
          console.log(file);
          dispatch(setUser({...user,urlUpdateImage:file}));
        });
      setSelectedImage(image);
    }
  }, []);
  let selectedFile = image;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    let obj = {
      id: user.id,
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: user.email,
      password: data.get("password"),
      level: 0,
      wantNewsletter: 0,
      filelImage:user.urlUpdateImage,
      urlImage: null,
    };
    console.log(obj);
    console.log("user", user);
    let res =await dispatch(updateUser(user));
    console.log(res);
    if (updateUser.fulfilled.match(res)) {
      dispatch( setUser(obj));
    }
  };
React.useEffect(() => {
  console.log("user-after-refresh: ", user);
    if (isConnect === false) {
      navigate("/login");
    }

  }, [isConnect]);
  useEffect(() => {
    if(image)
    setSelectedImage(image);
  }, []);

  const handleImageUpload = (e) => {
    selectedFile = e.target.files[0];
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("Image", selectedFile);
    setFile(formData);

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(selectedFile);
    console.log("selectedFile", selectedFile);
    console.log("selectedImage", selectedImage);
    console.log("file", file);
    dispatch(setUser({...user,urlUpdateImage:selectedFile}));
  };
  const handleChange = (e) => {
    let obj = { ...user };
    obj[e.target.name] = e.target.value;
    dispatch(setUser(obj));
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
            className="icon-signUp"
            sx={{ m: 1, bgcolor: "secondary.main" }}
          >
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            החשבון שלי
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
                  onChange={(e) => handleChange(e)}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="שם פרטי"
                  autoFocus
                  value={user.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="שם משפחה"
                  name="lastName"
                  autoComplete="family-name"
                  value={user.lastName}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="סיסמה"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={{ height: "50px" }} xs={12}>
        <label htmlFor="image-upload"> תמונה של המתכון</label>
        <Input
          type="file"
          onChange={handleImageUpload}
          accept="image/*" // Specify accepted file types (images in this case)
          sx={{
            display: "none",
            height: "100px",
            bgcolor: "transparent",
          }} // Hide the default input style
          id="image-upload" // Set a unique id for the input
          name="urlUpdateImage" // Set a unique id for the input
        />

        {selectedImage && <img className="display-image" src={selectedImage} />}
      </Grid>
              <Box>
                <img
                  src={selectedImage&&selectedImage!="error" ? selectedImage : "../../images/profile.png"}
                  alt="profile"
                  className="profile-image-display"
                  style={{ width: "100px"}}
                />
                </Box>
            </Grid>
            <Button
              className="btn-submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              עידכון
            </Button>
          </Box>
        </Box>
        <DialogMessage setOpen={setOpenSuccess} open={openSuccess} handleClick={handleClose} message="נרשמת בהצלחה"/>

      </Container>
    </ThemeProvider>
  );
}
