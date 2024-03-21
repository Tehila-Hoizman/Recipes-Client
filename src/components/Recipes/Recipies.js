import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Recipe from "./Recipe.js";
import { CircularProgress } from "@material-ui/core";
import Search from "../HomePage/Search.js";
import { useState } from "react";
import "../../styles/Recipes.css";
const Recipies = () => {
  const recipies = useSelector((state) => state.recipies.recipies);
  const status = useSelector((state) => state.recipies.status);
  const [search, setSearch] = useState("");
  const [filteredRecipies, setFilteredRecipies] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setFilteredRecipies([...recipies]);
  }
  ,[]);
  useEffect(() => {
    console.log("recipies", recipies);
    setFilteredRecipies(recipies.filter((recipe) => recipe.name.includes(search)));
  }
  , [search]);
  return (
    <>

      {recipies&&Array.isArray(recipies)&&recipies.length > 0 && (
        <div>
          <div className="header-recipes">
          <h1>המתכונים שלנו</h1>
          </div>
          <Search  setSearch = {setSearch} search = {search}/>
          {status === "pending" && (
            <div
              className="loading"
              style={{
                height: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress disableShrink />
            </div>
          )}
          {status === "fulfilled" &&
            filteredRecipies.map((v, i) => <Recipe recipe={v} key={i} />)}
        </div>
      )}
    </>
  );
};

export default Recipies;
