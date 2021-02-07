import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Message from './Message';
import DateTime from './DateTime';
import Description from './Description';
import ContactWay from './ContactWay';


const DialogUpdate = props => {

  // Opens Delete Confirmation Dialog
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  // Photo Description
	const [photoDesc, setPhotoDesc] = useState(props.desc);
	// The way to contact
	const [contactWay, setContactWay] = useState(props.contact);
	// Is it found or lost item? 0 = lost, 1 = found
	const [option, setOption] = useState(props.option);
	// Time finding or losing
	const [dateTime, setDateTime] = useState(props.time);
	// Message
	const [message, setMessage] = useState('');

  // Change Callback Function
  const handleDialogOpen = () => {
    setOpenUpdateDialog(true);
  }

  const handleDialogClose = () => {
    setOpenUpdateDialog(false);
  }

  const handleDialogUpdate = (e) => {
    setOpenUpdateDialog(false);
    props.onUpdate();
  }

	const onChangePhotoDesc = (e) => {
		setPhotoDesc(e);
	}

	const onChangeContactWay = (e) => {
		setContactWay(e);
	}

	const onChangeOption = (e) => {
		setOption(e.target.value);
	}

	const onChangeDateTime = (e) => {
		setDateTime(e);
	}

	const resetForm = () => {
		setOption(props.option);
		setPhotoDesc('例: 本人於今天早上9時遺失一個錢包...');
		setContactWay('12345678/abc@example.com...');
		
  }

  const doUpdateDetail = async() => {
    if(photoDesc === '' || photoDesc === null) {
      return;
    }
    if(contactWay === '' || contactWay === null) {
      return;
		}
		console.log('uploadDetail is called.');
		
		// convert text to int before upload to db.
		let opt = (option === '拾獲') ? 1 : 0;

		// convert date time to timestamp before upload to db.
		let ts = new Date(dateTime).getTime()/1000;

		let fileID = -1;

    try {
      let res = await fetch('/editReport', {
        method: 'post',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
					option: opt,
      		timestamp: ts,
      		description: photoDesc,
      		contact: contactWay
        })
      });

      let result = await res.json();
      if(result && result.success === true) {
				fileID = result.id;
      }
      else {
				setMessage(result.msg);
				fileID = -1;
      }
    }
    catch(e) {
      console.log(e);
      resetForm();
		}
		return fileID;
  }
  
  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        value="Update"
        id={props.id} 
        onClick={handleDialogOpen}>
          更新
      </Button>
      <Dialog
        open={openUpdateDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">更新資訊</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            請更新報告資訊或修正錯誤，若誤點可以點擊表格以外地方收起此對話框。
          </DialogContentText>
          { message? <Message msg={message} /> : null }
          <div onChange={onChangeOption}>
					<label>請選擇回報類型:&nbsp;</label>
            <input type='radio' value='拾獲' checked={option === '拾獲'}/> 拾獲&nbsp;&nbsp;
            <input type='radio' value='遺失' checked={option === '遺失'}/> 遺失&nbsp;&nbsp;
          </div>
          <div className="multiline mb-4">
            <div className="col-mb-4">{option}時間:</div>
              <DateTime	onChange={onChangeDateTime} dateTime={dateTime} option={option} />
          </div>
          <div>
            <Description description={photoDesc} 
              onChange={onChangePhotoDesc}/>
          </div>
          <br/>
          <div>
            <ContactWay 
              contact={contactWay}
              onChange={onChangeContactWay}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleDialogClose} color="primary" autoFocus>
            取消
          </Button>
          <Button variant="outlined" value={props.id} onClick={handleDialogUpdate} color="secondary">
            更新
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogUpdate;
