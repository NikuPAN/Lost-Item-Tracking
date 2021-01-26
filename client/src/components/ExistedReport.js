import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';

const ExistedReport = () => {

  const [images, setImages] = useState([]);

  const getAllReportFromDB = async() => {
    let response = await fetch('/findAllReport', {
      method: 'post',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    });

    let data = await response.json();
    console.log("From Existed Report.js...");
    console.log(data);
    return data;
  }

  const updateAllReport = () => {
    getAllReportFromDB();
      // .then(res =>
      //   res.map(report => {
      //       return {
      //         id: report.id,
      //         option: report.option,
      //         timestamp: report.timestamp,
      //         description: report.description,
      //         contact: report.contact
      //       };
      //   })
      // )
      // .then(infos => setImages(infos));
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
