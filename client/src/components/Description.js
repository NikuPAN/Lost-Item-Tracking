import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

export default function Description(props) {

  // Photo Description
	const [photoDesc, setPhotoDesc] = useState(props.description);

  const onDescriptionChange = (e) => {
    setPhotoDesc(e.target.value);
    props.onChange(e.target.value)
  }

  return (
    
    <div>
      <div className="col-mb-4">
        請形容事件經過:
      </div>
      <TextField
          id="description"
          label="請描述遺失物品、時間與地點等以便於尋獲"
          style={{ background: "white", borderRadius: "5px" }}
          placeholder={photoDesc}
          onChange={onDescriptionChange} 
          fullWidth
          multiline
          rows="4"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
    </div>
  )
}
