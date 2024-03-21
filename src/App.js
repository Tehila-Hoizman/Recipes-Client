import ResponsiveAppBar from "./components/NavBar2";
import { ThemeProvider } from "@emotion/react";
import theme from "./components/Themes/CreateTheme";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "./store/categoriesSlice";
import { fetchRecipies } from "./store/recipiesSlice";
import { fetchIngredients } from "./store/ingredientsSlice";
import { fetchMeasures } from "./store/measuresSlice";
import { setStatus } from "./store/loginSlice";
import { fetchComments } from "./store/commentsSlice";
import Footer from "./components/Footer";
import Routes from "./components/RouterRoutes";
import "./App.css";
import RouterRoutes from "./components/RouterRoutes";

function App() {
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
        <RouterRoutes/></div>
        <Footer/>
      </div>
    </ThemeProvider>
  );
}

export default App;
