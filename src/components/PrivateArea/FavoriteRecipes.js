import { useSelector } from "react-redux";
import Recipe from "../Recipes/Recipe";
import { useEffect } from "react";

const FavoriteRecipes = () => {
  const user = useSelector((state => state.login.user))
  const recipes = useSelector((state => state.recipies.recipies))
  const followers = useSelector((state => state.login.user.followers))
useEffect(()=>{
console.log("followers",followers);
},[,followers])
  return <>
  {
    Array.isArray(followers)&& followers.map(f=>{
      let r = recipes.find(x=>x.id==f.recipeId);
      if(r)
      return(
        <Recipe recipe = {r}/>
      )
    })
  }
  </>;
};

export default FavoriteRecipes;
