import { Box, Button, Container, Input, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { set } from "immutable";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addCategory } from "../../store/categoriesSlice";
import { useEffect } from "react";
import "../../styles/AddCategory.css";
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import DialogMessage from "../Dialogs/DialogMessage";
import { useNavigate } from "react-router";
const AddCategorySchema = Yup.object().shape({
  name: Yup.string().required("זהו שדה חובה"),
  file: Yup.mixed()
  .required("זהו שדה חובה")
  .test("fileSize", "הקובץ גדול מדי", (value) => {
    return value && value.size <= 1048576; // 1 MB
  })
  .test("fileType", "הקובץ לא נתמך", (value) => {
    return value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
  }),//   im: Yup.string().required("זהו שדה חובה"),
});
const AddCategory = () => {
    const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    filelImage: null,
    urlImage: "",

  });
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();

  const succeed =()=>{
    navigate("/");
  }

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      console.error("No file selected");
      setIsImageSelected(false);
      return;
    }
    const formData = new FormData();
    formData.append("Image", selectedFile);
    setFile(formData);

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
    reader.readAsDataURL(selectedFile);
    setIsImageSelected(true);
    formik.setFieldValue("file", e.currentTarget.files[0]);

  };

  const formik = useFormik({
    initialValues: {
      name: "",
      file:null,
    },

    validationSchema: AddCategorySchema,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      setCategory({
        ...category,
        name: values.name,
        // filelImage: file.get("Image"),
      });
      console.log("category", category);
      handleSubmit();
    },
  });
  useEffect(() => {
    if (formik.values.name !== category.name || (file && file.get("Image") !== category.filelImage)) {
      setCategory({
        ...category,
        name: formik.values.name,
        filelImage: file ? file.get("Image") : null,
      });
    }
  }, [formik.values, file]);

  const handleSubmit = async (event) => {

    // setCategory({...category,filelImage: file.get("Image")})
    if (formik.values.name && file) 
{

    let res = await dispatch(addCategory(category));
    console.log(res);
    if (addCategory.fulfilled.match(res)) {
      setOpenSuccess(true);
    //   dispatch(setUser(obj));
    }
}
  };
  return (
    <Container className="add-category">
      <Box className="add-category-box">
      <h1>הוספת קטגוריה</h1>
      <form onSubmit={formik.handleSubmit}>

      <label htmlFor="name" className="label">
        שם
      </label>
      <Box className="add-category-filed">
      <TextField
        id="name"
        // label="שם"
        variant="outlined"
        fullWidth
        className="input"
        {...formik.getFieldProps("name")}
      />
      {formik.touched.name && formik.errors.name && (
        <div className="error">{formik.errors.name}</div>
      )}</Box>
    <Box  className="add-category-filed add-category-image" style={{margin:"30px"}}>
    <label htmlFor="image-upload" className="custom-file-upload">
  <span>
    <AddPhotoAlternateRoundedIcon />
    הוספת תמונה
      </span>
</label>
<Input
  type="file"
  onChange={(e)=>handleImageUpload(e)}
  accept="image/*"
  id="image-upload"
  name="image-upload"
  style={{ display: "none" }}
/>
{/* {formik.values.file && <p  className="display-image-name">{formik.values.file.name}</p>} */}
{selectedImage && <img className="display-image" src={selectedImage} alt="Selected" />}
{formik.touched.file && formik.errors.file && (
  <div className="error">{formik.errors.file}</div>
)}</Box>
      <Button
        className="add-category-btn-submit"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        הוספה
      </Button>
        </form>
        </Box>
        <DialogMessage setOpen={setOpenSuccess} open={openSuccess} handleClick={succeed} message="הקטגוריה נוספה בהצלחה"/>

    </Container>
  );
};

export default AddCategory;
