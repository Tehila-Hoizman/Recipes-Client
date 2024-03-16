import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogMessage(props) {
  const {open, setOpen,message,handleClick} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickBtn = () => {
    handleClose();
    handleClick();
  }
  return (
    <React.Fragment>
      <Dialog
      className='dialog-msg'
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className='dialog-msg-content'>
          <DialogContentText id="alert-dialog-description" className='dialog-msg-description'>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-msg-actions'>
          <Button onClick={handleClickBtn} autoFocus className='dialog-msg-btn'>
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
