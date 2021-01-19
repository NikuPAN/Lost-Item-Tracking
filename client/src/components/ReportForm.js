import React, { Fragment, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { TextArea } from '@adobe/react-spectrum';

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
	const [uploadFile, setUploadedFile] = useState({});

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

	const onSubmitForm = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);
		// formData.append('dateTime', dateTime);
		// formData.append('photoDesc', photoDesc);
		// formData.append('contactWay', contactWay);

		try {
			const res = await axios.post('/upload', formData, {
				headers: {
					'Content-Type': 'multiport/form-data'
				}
			});

			const { fileName, filePath } = res.data;
			setUploadedFile({fileName, filePath});
		}
		catch (err) {
			if(err.response.status === 500) {
				console.log('There was a problem with the server.');
			}
			else {
				console.log(err.response.data.msg);
			}
		}
	}

	return (
		<Fragment>
			<form onSubmit={onSubmitForm}>
				
				<div onChange={onChangeOption}>
					<input type='radio' value='拾獲' name='gender' checked={option === '拾獲'}/> 拾獲&nbsp;&nbsp;
					<input type='radio' value='遺失' name='gender' checked={option === '遺失'}/> 遺失&nbsp;&nbsp;
				</div>
				<div className="multiline mb-4">
					<div className="col-mb-4 ">{option}時間:</div>
      		<DateTimePicker
        		onChange={onChangeDateTime}
        		value={dateTime}
      		/>
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
				<div className='custom-file mb-4'>
					<input type='file' className='custom-file-input' id='customFile' onChange={onChangeFile}/>
					<label className='custom-file-label' htmlFor='customFile'>
						{fileName}
					</label>
					<input type='submit' value='回報' className="btn btn-primary btn-block mt-4"/>
				</div>
			</form>
		</Fragment>
	);
};

export default ReportForm;