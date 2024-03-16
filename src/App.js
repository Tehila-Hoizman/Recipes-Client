import "./App.css";
import { Route, Routes } from "react-router";
import AddRecipe from "./components/Recipes/AddRecipe";
import Home from "./components/HomePage/Home";
import ResponsiveAppBar from "./components/NavBar2";
import { ThemeProvider } from "@emotion/react";
import theme from "./components/Themes/CreateTheme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIngredients } from "./store/addRecipeSlice";
import Recipies from "./components/Recipes/Recipies";
import { getCategories } from "./store/categoriesSlice";
import { fetchRecipies } from "./store/recipiesSlice";
import { fetchIngredients } from "./store/ingredientsSlice";
import { fetchMeasures } from "./store/measuresSlice";
import { Alert } from "@mui/material";
import { useState } from "react";
import { setStatus } from "./store/loginSlice";
import RecipeDetails2 from "./components/Recipes/RecipeDetails2";
import { fetchComments } from "./store/commentsSlice";
import AllCategories from "./components/Categories/AllCategories";
import CategoryDetails from "./components/Categories/CategoryDetails";
import EditorDetails from "./components/Editors/EditorDetails";
import AllEditors from "./components/Editors/AllEditors";
import PrivateAreaPage from "./components/PrivateArea/PrivateAreaPage";
import SignIn from "./components/User/SignIn";
import SignUp from "./components/User/SIgnUp";
import Account from "./components/User/Account";
import NotFound from "./components/NotFound";
import EditRecipeDialog from "./components/Recipes/EditRecipeDialog";
import Footer from "./components/Footer";
import AddCategory from "./components/Categories/AddCategory";
function App() {
  // const status = useSelector((state) => state.login.status);
  const alert = useSelector((state) => state.login.alert);
  const title = useSelector((state) => state.login.alert);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchMeasures());
      dispatch(getCategories());
      await dispatch(fetchIngredients());
      dispatch(fetchRecipies());
      dispatch(setStatus("init"));
      dispatch(fetchComments());
    };
    fetchData();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App  bg-body-tertiary">
        <ResponsiveAppBar />
        <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="addRecipe" element={<AddRecipe />} />
          <Route path="myAccount" element={<Account />} />
          <Route path="recipies" element={<Recipies />} />
          <Route path="recipies/:id" element={<RecipeDetails2 />} />
          <Route path="categories" element={<AllCategories />} />
          <Route path="categories/:id" element={<CategoryDetails />} />
          <Route path="editors" element={<AllEditors />} />
          <Route path="editors/:id" element={<EditorDetails />} />
          <Route path="privateArea" element={<PrivateAreaPage />} />
          <Route path="editRecipe/:id" element={<EditRecipeDialog />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="*"  element={ <NotFound/>}/>
        </Routes>
        </div>
        <Footer/>

      </div>
    </ThemeProvider>
  );
}

export default App;
