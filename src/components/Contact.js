import { Box, Button, Container, Typography } from "@material-ui/core";
import { TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import DialogMessage from "./Dialogs/DialogMessage";
import "../styles/Contact.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
const Contact = () => {
    const navigate = useNavigate();
    const [openSuccess, setOpenSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

    const handleCloseMessage = () => {
        setOpenSuccess(false);
        navigate("/");
        };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    let res = await axios.post(
      "https://localhost:7161/api/User/sendEmail",
      {
        content: message,
        email: email,
        name: name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(res.status === 200){
        setOpenSuccess(true);
    }
    console.log("res", res);
  };

  return (
    <Container
      className="contact"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Typography className="contact-title">צור קשר</Typography>
      <Box className="contact-body" style={{ display: "flex" }}>
        <Box className="contact-form">
          <form>
            <TextField
              className="contact-form-input"
              label="שם מלא"
              type="text"
              placeholder="שם מלא"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className="contact-form-input"
              label="אימייל"
              type="email"
              placeholder="אימייל"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className="contact-form-input"
              label="הודעה"
              placeholder="הודעה"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              className="contact-form-btn-submit"
            >
              שליחה{" "}
            </Button>
          </form>
        </Box>
        <Box className="contact-details">
          <Typography variant="h6">פרטי יצירת קשר</Typography>
          <Box className="detail-item">
            <CallIcon />
            <Typography>פל'</Typography>
            <Typography>054-1234567</Typography>
          </Box>
          <Box className="detail-item">
            <EmailIcon />
            <Typography>אימייל:</Typography>
            <Typography>delicious.recipes.website@gmail.com</Typography>
          </Box>
        </Box>
      </Box>
      <DialogMessage
                handleClick={handleCloseMessage}
                setOpen={setOpenSuccess}
                open={openSuccess}
                message={
                  "הודעתך התקבלה בהצלחה. נחזור אליך בהקדם. תודה!"
                }
              />
    </Container>
  );
};

export default Contact;
