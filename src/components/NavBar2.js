import * as React from "react";
import "../styles/NavBar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@emotion/react";
import theme from "./Themes/CreateTheme";
import tBtn from "./Themes/CreateThemeBtn";
import { Link, useNavigate } from "react-router-dom";
import tBtnBg from "./Themes/CreateThemeBtnBg";
import { useDispatch, useSelector } from "react-redux";
import { disconnect, getImage, setImage, setImageProfile } from "../store/loginSlice";
import { setIngredients, setType } from "../store/addRecipeSlice";
import { useEffect, useState } from "react";
import DialogAnswer from "./Dialogs/DialogAnswer";

const pages = ["קטגוריות", "העורכים שלנו", "מתכונים","צור קשר"];
const settings = ["פרופיל", "אזור אישי", "התנתקות"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector((state) => state.login.user);
  const type = useSelector((state) => state.addRecipe.type);
  // const image = useSelector((state) => state.login.user.urlImage)||"";
  const isConnect = useSelector((state) => state.login.isConnect);
  // let image=useSelector((state)=>state.login.image);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openFailed, setOpenFailed] = useState(false);

  const goSignIn = () => {
    navigate("/signin");
  };
  // useEffect(() => {
  //   if (user.urlUpdateImage) {
  //     const base64String = user.urlUpdateImage; // replace with your base64 string
  //     const filename = user.urlImage;

  //     fetch(base64String)
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         const file = new File([blob], filename, { type: "image/jpeg" });
  //         console.log(file);
  //         dispatch(setImageProfile(file));

  //       });
  //   }
  // }, []);
  const handleAddRecipeClick = async() => {
    handleCloseNavMenu();
    if (!isConnect) {
      setOpenFailed(true);
      return;
    }
    let r = await dispatch(await setType("add"));
    console.log("type",type);
    dispatch(setIngredients([{ name: "", amount: "", measure: "" }]));
    navigate("/addRecipe");
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleButtonClick = (setting) => {
    handleCloseUserMenu();
    switch (setting) {
      case "התנתקות":
        dispatch(disconnect());
        navigate("/");
        break;
      case "פרופיל":
        navigate("myAccount");
        break;
        case "אזור אישי":
          navigate("privateArea");
          break;
      default:
        break;
    }
  };
  const handleCloseNavMenu = (name) => {
    switch (name) {
      case "מתכונים":
        navigate("recipies");
        break;
      case "קטגוריות":
        navigate("categories");
        break;
      case "העורכים שלנו":
        navigate("editors");
        break;
        case "צור קשר":
          navigate("contact");
          break;
      default:
        break;
    }
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // useEffect(() => {
  //   console.log("image", image);

  // }, [image]);
  return (
    <ThemeProvider theme={theme}>
      <AppBar
      
        position="static"
        color="white"
        style={{ fontFamily: "assistant !important",position: 'sticky', top: 0,zIndex:100 }}
      >
        <Container 
          maxWidth="xl"
          className="navBar-con"
          sx={{
            bgcolor: "#311e1b",
            minWidth: "100% !important",
            margin: "0px !important",
          }}
        >
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                className="logo-foodeal"
                src="../../logo.png"
                alt="Logo"
                style={{
                  width: "60%",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "15vh",
                }}
              />{" "}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{color:"white !important"}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center" className="navbar-item">
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/*  לוגו תמונה למסך קטן - תפריט */}
            {/*  לוגו טקסט למסך קטן  - תפריט */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                className="logo-foodeal"
                src="../../logo.png"
                alt="Logo"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "15vh",
                }}
              />{" "}
            </Typography>
            <Box
              sx={{
                marginRight: "4%",
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              <ThemeProvider theme={tBtn}>
                {pages.map((page) => (
                  <Button
                    className="navbar-item"
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{ my: 2, color: "#f1b114 !important", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </ThemeProvider>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "block" },
                marginRight: { xs: "0px" },
              }}
            >
              <ThemeProvider theme={tBtn}>
                <ThemeProvider theme={tBtnBg}>
                  <Button
                    key="addRecipe"
                    onClick={handleAddRecipeClick}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "inline-block",
                      marginRight: { xs: "0px" },
                    }}
                    className="navbar-btn-add-recipe"
                  >
                    הוספת מתכון
                  </Button>
                </ThemeProvider>
                {!isConnect && (
                  <Link
                    to="signUp"
                    className="col-1 navbar-item p-1 align-items-stretch flex-fill"
                  >
                    <Button
                      key="signUp"
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "#f1b114 !important",
                        display: "inline-block",
                        marginRight: { xs: "0px" },
                      }}
                    >
                      הרשמה
                    </Button>
                  </Link>
                )}
                {!isConnect && (
                  <Link
                    to="signIn"
                    className="col-1 navbar-item p-1 align-items-stretch flex-fill"
                  >
                    <Button
                      key="signIn"
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "#f1b114 !important ",
                        display: "inline-block",
                      }}
                    >
                      התחברות
                    </Button>
                  </Link>
                )}
              </ThemeProvider>
            </Box>
            {isConnect && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: "primary" }}>
                      {
                        <img
                          src={user.urlImage&&user.urlImage!=""&&user.urlImage!="error" ? user.urlImage : "../../images/profile.png"}
                          className="profile-image"
                        />
                      }
                      {/* {user.firstName[0]} */}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleButtonClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
          <DialogAnswer
            setOpen={setOpenFailed}
            open={openFailed}
            message="על מנת להוסיף מתכון עליך להתחבר לאתר"
            btn1="להתחברות"
            btn2="ביטול"
            handleBtn1={goSignIn}
            handleBtn2={() => {}}
          />
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
