import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogAnswer(props) {
  const {open, setOpen,message,btn1,btn2,handleBtn1,handleBtn2} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickBtn1 = () => {
    handleClose();
    handleBtn1();
  }
  const handleClickBtn2 = () => {
    handleClose();
    handleBtn2();
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickBtn1}>{btn1}</Button>
          <Button onClick={handleClickBtn2} autoFocus>
            {btn2}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
