import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import axios from "axios";

const NewRecipes = (props) => {
    // let recipes = props.recipes;
    const [recipes, setRecipes] = useState([]);
    
    useEffect((text) => {
        axios.get('https://localhost:7161/api/Category')
            .then((response) => {
                console.log("succeed");
                console.log(response.data);
                setRecipes(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
    <div>
        <h1>החדשים שלנו....</h1>
        {
            recipes.map((v,i) => <Recipe recipe={v} key={i}/>)
        }
    </div>
    );
}

export default NewRecipes;