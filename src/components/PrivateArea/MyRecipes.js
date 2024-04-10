import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import Recipe from "../Recipes/Recipe";
import { useEffect } from "react";

const MyRecipes = () => {
    const recipes = useSelector((state) => state.recipies.recipies);
    const user = useSelector((state) => state.login.user);

    return ( 
        <Container>
            <h1>המתכונים שלי</h1>
            {
                Array.isArray(recipes)&& recipes.filter((r)=>r.editorId===user.id).map((r)=>{
                    return (
                        <Recipe recipe = {r} allowed = {true} />
                    )
                })
            }
        </Container>
     );
}
 
export default MyRecipes;