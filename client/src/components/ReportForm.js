import React, { Fragment, useState } from 'react';
// import DateTimePicker from 'react-datetime-picker';
import { TextArea } from '@adobe/react-spectrum';
import Message from './Message';
import Progress from './Progress';
import DateTime from './DateTime';
import axios from 'axios';

const ReportForm = () => {

	// File Object
	const [file, setFile] = useState('');
	// File Name
	const [fileName, setFileName] = useState('請選擇要上傳的照片');
	// Photo Description
	const [photoDesc, setPhotoDesc] = useState('一個錢包...');
	// The way to contact
	const [contactWay, setContactWay] = useState('12345678/abc@example.com...');
	// Is it found or lost item? 0 = lost, 1 = found
	const [option, setOption] = useState('拾獲');
	// Time finding or losing
	const [dateTime, setDateTime] = useState(new Date());
	// Uploaded File
	const [uploadedFile, setUploadedFile] = useState({});
	// Message
	const [message, setMessage] = useState('');
	// Upload Progress
	const [uploadPercent, setUploadPercent] = useState(0);

	// Change Function
	const onChangeFile = (e) => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	}

	const onChangePhotoDesc = (e) => {
		//setPhotoDesc(e.target.value);
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
		console.log(e);
	}

	const resetForm = () => {
		setFile('');
		setFileName('請選擇要上傳的照片');
		setPhotoDesc('一個錢包...');
		setContactWay('12345678/abc@example.com...');
		setOption('拾獲');
	}

	const doUploadDetail = async() => {
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
      let res = await fetch('/addReport', {
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

	const onSubmitForm = async (e) => {
		e.preventDefault();
		// Upload Detail to database & Assign File ID.
		let fID = doUploadDetail();
		// Detail is uploaded to db successfully.
		console.log(fID);
		if(fID !== -1) {
			const formData = new FormData();
			formData.append('file', file);
			try {
				const res = await axios.post('/upload', formData, {
					headers: {
						'Content-Type': 'multiport/form-data'
					},
					onUploadProgress: progressEvent => {
						setUploadPercent(parseInt(Math.round((progressEvent.loaded * 100) /
						progressEvent.total)));

						// Clear Percentage after 10s.
						setTimeout(() => setUploadPercent(0), 3000);
					}
					
				});
				console.log(res.data);
				const { fileName, filePath } = res.data;
				setUploadedFile({ fileName, filePath });
				// console.log(uploadedFile);
				setMessage('File Uploaded!');
			}
			catch (err) {
				if(err.response.status === 500) {
					setMessage('There is a problem with the server. Please try again later');
				}
				else {
					setMessage(err.response.data.msg);
				}
			}
		} 
		else {
			setMessage('There is a problem uploading detail. Please try again later');
		}
	}

	return (
		<Fragment>
			{ message? <Message msg={message} /> : null }
			<form onSubmit={onSubmitForm}>
				<div onChange={onChangeOption}>
					<input type='radio' value='拾獲' name='gender' checked={option === '拾獲'}/> 拾獲&nbsp;&nbsp;
					<input type='radio' value='遺失' name='gender' checked={option === '遺失'}/> 遺失&nbsp;&nbsp;
				</div>
				<br/>
				<div className="multiline mb-4">
					<div className="col-mb-4 ">{option}時間:</div>
      			<DateTime	onChange={onChangeDateTime} option={option} />
    		</div>
				<div>
					<TextArea
						id='description'
						label='請形容這個物品:'
						isRequired 
						necessityIndicator='label'
						placeholder={photoDesc}
						onChange={onChangePhotoDesc}
						maxLength='500'
						width='100%'
						height='static-size-200'
						maxWidth='100%'
					/>
				</div>
				<br/>
				<div>
					<TextArea
						id='contact'
						label='請留下聯絡方式:'
						isRequired 
						necessityIndicator='label'
						placeholder={contactWay}
						onChange={onChangeContactWay}
						maxLength='500'
						width='100%'
						maxWidth='100%'
					/>
				</div>
				<br/>
				{ uploadPercent > 0 ?
					<Progress percentage={uploadPercent} /> 
				: null }
				<div className='custom-file mb-4'>
					<input type='file' className='custom-file-input' id='customFile' onChange={onChangeFile}/>
					<label className='custom-file-label' htmlFor='customFile'>
						{fileName}
					</label>
				</div>
				<input type='submit' value='回報' className="btn btn-primary btn-block mt-4"/>
			</form>
			{ uploadedFile.fileName ? 
				<div className='row mt-5'>
					<div className='col-md-6 m-auto'>
						<h3 className="text-center">檔案: { uploadedFile.fileName }</h3>
						{/* <h4 className="text-left">回報類型: { uploadedFile.option }物件</h4>
						<h4 className="text-left">回報時間: { uploadedFile.dateTime }</h4>
						<h4 className="text-left">物件形容: { uploadedFile.photoDesc }</h4>
						<h4 className="text-left">聯絡方式: { uploadedFile.contactWay }</h4> */}
						{/* <h3 className="text-center">{ uploadedFile.fileName }</h3> */}
						<img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
					</div>
				</div> 
				: null }
		</Fragment>
	);
};

export default ReportForm;