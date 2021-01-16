import React, { Fragment, useState } from 'react';

const RequestUpload = () => {

	// File Object
	const [file, setFile] = useState('');
	// File Name
	const [fileName, setFileName] = useState('Choose File');
	// Photo Description
	const [photoDesc, setPhotoDesc] = useState('Enter Description');
	// Is it found or lost item? 0 = lost, 1 = found
	const [option, setOption] = useState(0);

	const onChangeFile = (e) => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name)
	}

	return (
		<Fragment>
			<form>
				<div className='custom-file mb-4'>
					<input type='file' className='custom-file-input' id='customFile' onChange={onChangeFile}/>
					<label className='custom-file-label' htmlFor='customFile'>
						{fileName}
					</label>
				</div>
				<input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
			</form>
		</Fragment>
	);
};

export default RequestUpload;