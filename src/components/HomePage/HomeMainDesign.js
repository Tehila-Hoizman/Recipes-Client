import { ThemeProvider } from "@emotion/react";
import theme from "../Themes/CreateTheme";
import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import tHome from "../Themes/CreateThemeHome";
import "../../styles/HomeMainDesign.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DialogAnswer from "../Dialogs/DialogAnswer";
import { useState } from "react";
import { setIngredients, setType } from "../../store/addRecipeSlice";

const HomeMainDesign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isConnect = useSelector((state) => state.login.isConnect);
  const [openFailed, setOpenFailed] = useState(false);
  
  const goSignIn = () => {
    navigate("/signin");
  };

  const handleAddRecipeClick = () => {
    if (!isConnect) {
      setOpenFailed(true);
      return;
    }
    dispatch(setIngredients([{ name: "", amount: "", measure: "" }]));
    dispatch(setType("add"));
    navigate("/addRecipe");
  };
  
  return (
      <Container className="container">
        <Box className="content">
          <ThemeProvider theme={tHome}>
            <Typography>FooDeal</Typography>
            <ButtonGroup sx={{ display: "flex" }}>
              <Button
                sx={{
                  margin: "10px",
                  color: "white",
                  bgcolor: " #76110a",
                  borderRadius: "5px",
                  width:" 160px",
                  height: "48px",
                }}
                onClick={handleAddRecipeClick}
              >
                הוספת מתכון
              </Button>
              <Button
                sx={{
                  margin: "10px",
                  color: "#76110a",
                  bgcolor: "#f2ae05",
                  borderRadius: "5px",
                  width:" 160px",
                  height: "48px",
                }}
                onClick={() => navigate("/recipies")}
              >
                למתכונים שלנו
              </Button >
            </ButtonGroup>
          </ThemeProvider>
        </Box>
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
  );
};

export default HomeMainDesign;
