import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import "../../styles/PrivateArea/EditRecipeDialog.css";
import EditRecipe from "./EditRecipe";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditRecipeDialog() {
  const recipes = useSelector((state) => state.recipies.recipies);
  const [open, setOpen] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("../../privateArea");
  };

  const handleSave = () => {
    setOpen(false);
    navigate("../../privateArea");
  }

  useEffect(() => {
    setRecipe(recipes.find((r) => r.id === id));
  }, [id]);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar className="header-btns">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            {/* <Button
              color="inherit"
              onClick={handleSave}
              variant="outlined"
              startIcon={<SaveIcon />}
              className="save-recipe-changes-btn"
            >
              שמירה
            </Button> */}
          </Toolbar>
        </AppBar>
        <EditRecipe/>
      </Dialog>
    </React.Fragment>
  );
}
