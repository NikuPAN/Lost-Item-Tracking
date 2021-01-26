import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';

const ExistedReport = () => {

  const [images, setImages] = useState([]);

  async function getAllReport() {
		let response = await fetch("https://cronpublic.yasushi.me/record.json");
		let data = await response.json();
		// console.log(data);
		return data;
  }
  
	useEffect(() => {
    fetch('http://131.181.190.87:3001/all')
        .then(res => res.json())
        .then(data =>
        data.map(stock => {
      return {
        symbol: stock.symbol,
        name: stock.name,
        industry: stock.industry
      };
        })
      )
      .then(stocks => setRowData(stocks));
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
