import React, { useState, useEffect } from 'react';
import dinner from './dinner.png';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const ExistedReport = () => {

  // const [images, setImages] = useState([]);
  const [reports, setReports] = useState([]);

  const getAllReportFromDB = async() => {
    let response = await fetch('/findAllReport', {
      method: 'post',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    });

    let data = await response.json();
    if(data && data.success === true) {
      // console.log("From Existed Report.js...");
      console.log(data.data);
      return data.data;
    }
    return null;
  }

  const updateAllReport = () => {
    getAllReportFromDB()
      .then(res =>
        res.map(report => {
            return {
              id: report.id,
              option: report.option,
              timestamp: report.timestamp,
              description: report.description,
              contact: report.contact
            };
        })
      )
      .then(infos => setReports(infos));
  }
  
  useEffect(() => {
    updateAllReport();
  }, []);

  const timestampToSTDTime = (timestamp) => {

    let date = new Date(timestamp);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();

    let STDTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2);
    return STDTime;
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="container">
      {reports.map(img => (
        <div className="box">
          <div className="imgBox">
            <img src={dinner} alt=""></img>
            <Button variant="contained" color="primary" value="更新" id={img.id}>更新</Button>
            <Button variant="contained" color="secondary" value="刪除" id={img.id}>刪除</Button>
          </div>
          <div className="details">
            <div className="content">
              <h5 data-status={img.option}><b>{img.option===0?"失":"報"}</b> 於 {timestampToSTDTime(img.timestamp)}</h5>
              <p>{img.description}，
              {img.option===0?"如拾獲":"欲取回"}請聯絡: {img.contact}</p>
            </div>
          </div>
        </div>
      ))}
      {/* <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div> */}
    </div>
  )
}

export default ExistedReport;
