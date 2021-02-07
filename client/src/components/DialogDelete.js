import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogDelete = props => {

  // Opens Delete Confirmation Dialog
  const [openDelDialog, setOpenDelDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDelDialog(true);
  }

  const handleDialogClose = () => {
    setOpenDelDialog(false);
  }

  const handleDialogDelete = (e) => {
    setOpenDelDialog(false);
    props.onDelete();
  }

  return (
    <div>
      <Button 
        variant="contained" 
        color="secondary" 
        value="Delete"
        id={props.id} 
        onClick={handleDialogOpen}>
          刪除
      </Button>
      <Dialog
        open={openDelDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">確定要刪除這份報告嗎?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            報告一旦被刪除便無法復原。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleDialogClose} autoFocus>
            取消
          </Button>
          <Button variant="contained" color="secondary" value={props.id} onClick={handleDialogDelete}>
            刪除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogDelete;
