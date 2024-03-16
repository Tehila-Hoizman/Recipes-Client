import HomeMainDesign from "./HomeMainDesign";
import ByCategories from "../Categories/ByCategories";
import Search from "./Search";
import AllEditors from "../Editors/AllEditors";
import ByEditors from "../Editors/ByEditors";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }
  ,[]);
  return (
    <>
      <HomeMainDesign />
      <Search  />
      <ByCategories/>

      <ByEditors/>
      <Search/>
      <Search/>
    </>
  );
};

export default Home;
