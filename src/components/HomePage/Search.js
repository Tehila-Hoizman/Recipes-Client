import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Search.css";

const Search = () => {
  return (
    <>
      <div className="mb-3 search-box d-flex justify-content-center">
        {/* <FontAwesomeIcon className="glass-search" icon="fa-solid fa-magnifying-glass" /> */}
        <input
          type="email"
          className="form-control w-50  p-2 search-box-inp"
          id="search-box"
          placeholder="חפש מתכון/ קטגוריה..."
        />
      </div>

    </>
  );
};

export default Search;
