import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipies, removeRecipe } from "../../store/recipiesSlice.js";
import Recipe from "./Recipe.js";
import { CircularProgress } from "@material-ui/core";
const Recipies = () => {
  const recipies = useSelector((state) => state.recipies.recipies);
  const status = useSelector((state) => state.recipies.status);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(status);
    console.log(recipies);
    console.log("in useeffect");
    // if (status != 'fulfilled')
    //     dispatch(fetchRecipies())
  }, []);
  return (
    <>

      {recipies&&Array.isArray(recipies)&&recipies.length > 0 && (
        <div>
          <h1>המתכונים שלנו</h1>
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
            recipies.map((v, i) => <Recipe recipe={v} key={i} />)}
        </div>
      )}
    </>
  );
};

export default Recipies;
