import { Route, Routes } from "react-router";
import Home from "./HomePage/Home";
import SignIn from "./User/SignIn";
import SignUp from "./User/SIgnUp";
import Account from "./User/Account";
import Recipies from "./Recipes/Recipies";
import RecipeDetails2 from "./Recipes/RecipeDetails2";
import AllCategories from "./Categories/AllCategories";
import CategoryDetails from "./Categories/CategoryDetails";
import AllEditors from "./Editors/AllEditors";
import EditorDetails from "./Editors/EditorDetails";
import PrivateAreaPage from "./PrivateArea/PrivateAreaPage";
import EditRecipeDialog from "./Recipes/EditRecipeDialog";
import AddCategory from "./Categories/AddCategory";
import NotFound from "./NotFound";
import AddRecipe from "./Recipes/AddRecipe";
import Contact from "./Contact";

const RouterRoutes = () => {
    return ( 
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
        <Route path="contact"  element={ <Contact/>}/>
      </Routes>
     );
}
 
export default RouterRoutes;