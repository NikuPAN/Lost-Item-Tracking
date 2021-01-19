import React, { Component, useState } from 'react'

const ExistedReport = () => {

  const [images, setImages] = useState([]);

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
