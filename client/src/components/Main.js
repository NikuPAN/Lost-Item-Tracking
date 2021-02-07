import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ReportForm from './ReportForm';
import ExistedReport from './ExistedReport';
import './Main.css';

const Main = () => {

  const [openForm, setOpenForm] = useState(false);

  const handleFormOpen = () => {
    setOpenForm(true);
  }

  const handleFormClose = () => {
    setOpenForm(false);
  }

  return (
    <div>
      <div className='form'>
        <Button variant="contained" color="primary" onClick={handleFormOpen}>
          回報
        </Button>
        <Dialog open={openForm} onClose={handleFormClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">回報遺失/拾獲物品</DialogTitle>
          <DialogContent>
            <DialogContentText>
              若遺失物品，請填寫遺失物品的經過、時間及地點，以便更快尋回失物。<br/>
              若拾獲物品，請形容物品特徵，並留下聯絡方式以便失主聯絡。
            </DialogContentText>
            <ReportForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className='report'>
        <ExistedReport />
      </div>
    </div>
  )
}

export default Main;
