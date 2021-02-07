import React, { useState, useEffect } from 'react';
import dinner from './dinner.png';
import DialogUpdate from './DialogUpdate';
import DialogDelete from './DialogDelete';

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
      // console.log(data.data);
      return data.data;
    }
    return null;
  }

  const onUpdateReport = (e) => {
    console.log("Updated Report ID: " + e);
  }

  const onDeleteReport = (e) => {
    console.log("Deleted Report ID: " + e);
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
  }, [reports]);

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

  return (
    <div className="container">
      {reports.map(img => (
        <div className="box">
          <div className="imgBox">
            <img src={dinner} alt=""></img>
            {/* pass the id from here instead of returning from children - Faster */}
            <DialogUpdate 
              id={img.id}
              option={img.option===0?'遺失':'拾獲'}
              time={img.timestamp}
              desc={img.description}
              contact={img.contact}
              onUpdate={() => onUpdateReport(img.id)}
            />
            {/* pass the id from here instead of returning from children - Faster */}
            <DialogDelete 
              id={img.id} 
              onDelete={() => onDeleteReport(img.id)}
            /> 
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
    </div>
  )
}

export default ExistedReport;