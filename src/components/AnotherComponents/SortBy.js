import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SortBy = () => {
    const categories = useSelector((state) => state.categories.categories);
    return ( 
        <Container>
            <Box>
                <h1>החדשים שלנו</h1>
                <Box>
                    {categories.map((c) => {
                        return (
                            <Box className="">
                                <Link to={`/recipes/${c.id}`}>{c.title}</Link>
                            </Box>
                        );
                    })}
                </Box>
                <Link to="/categories">לכל הקטגוריות</Link>
            </Box>
        </Container>
     );
}
 
export default SortBy;