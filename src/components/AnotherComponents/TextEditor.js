import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { useDispatch, useSelector } from "react-redux";
import { setInstructions } from "../../store/addRecipeSlice";

function TextEditor() {
  const dispatch = useDispatch();
  const instructions = useSelector((state) => state.addRecipe.instructions);
  const handleChange = (e) => {
    dispatch(setInstructions(e));
    console.log(e);
    console.log(instructions);
  };

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <ReactQuill value={instructions}  onChange={(e)=>handleChange(e)}  />
      <style jsx>{`
        .ql-editor .ql-list {
          padding-left: 30px;

        }
        .ql-container {
          height: 40vh !important;

        }
      `}</style>
    </div>
  );
}

export default TextEditor;
