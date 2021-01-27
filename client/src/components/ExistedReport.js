import React, { useState, useEffect } from 'react';

const ExistedReport = () => {

  const [images, setImages] = useState([]);
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
      console.log("From Existed Report.js...");
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

  return (
    <div className="container">

      {images.map(img => (
        <div className="box">
          
        </div>
      ))}

    </div>
  )
}

export default ExistedReport;
