import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function DateTime(props) {

  const fullDate = new Date()
  const formatted_date = (fullDate.getFullYear()
    + "-" + (fullDate.getMonth()<10?"0"+(fullDate.getMonth() + 1):fullDate.getMonth())
    + "-" + (fullDate.getDate()<10?"0"+fullDate.getDate():fullDate.getDate()) 
    + "T" 
    + (fullDate.getHours()<10?"0"+fullDate.getHours():fullDate.getHours())
    + ":" + (fullDate.getMinutes()<10?"0"+fullDate.getMinutes():fullDate.getMinutes())
    + ":" + (fullDate.getSeconds()<10?"0"+fullDate.getSeconds():fullDate.getSeconds())
    );
  const [ dateTime, setDateTime ] = useState(formatted_date);
  // const [ label ] = useState(`${props.option} 時間`)

  const onChangeDateTime = (e) => {
    setDateTime(e.target.value);
    props.onChange(e.target.value);
  }

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      // marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 250, 
      color: 'white',
      fontWeight: 'bold',
      background: 'white',
    },
  }));

  const classes = useStyles();
  return (
    <form className={classes.container} noValidate>
    <TextField
      id="datetime"
      //label={label}
      type="datetime-local"
      defaultValue={dateTime}
      onChange={onChangeDateTime}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </form>
  )
}
