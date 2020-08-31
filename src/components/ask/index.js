import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default ({ open, text, detail, yesFunction, noFunction }) => {
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {text}
        </DialogTitle>
        {
          detail ?
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {detail}
              </DialogContentText>
            </DialogContent>
            :
            <div/>
        }
        <DialogActions>
          <Button onClick={noFunction} autoFocus>
            No
          </Button>
          <Button onClick={yesFunction} color='primary'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
