import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

export default function ContactWay(props) {

  // The way to contact
  const [contactWay, setContactWay] = useState(props.contact);

  const onContactWayChange = (e) => {
    setContactWay(e.target.value);
    props.onChange(e.target.value)
  }

  return (
    
    <div>
      <div className="col-mb-4">
        請留下聯絡方式:
      </div>
      <TextField
          id="contact-way"
          label="姓名及電話/電郵地址皆可接受"
          style={{ background: "white", borderRadius: "5px" }}
          placeholder={contactWay}
          onChange={onContactWayChange} 
          //helperText="請留下姓名及聯絡方式以便於聯絡"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
    </div>
  )
}
