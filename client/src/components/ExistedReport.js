import React, { useState } from 'react'

const ExistedReport = () => {

  const [images, setImages] = useState([]);

  async function getAllReport() {
		let response = await fetch("https://cronpublic.yasushi.me/record.json");
		let data = await response.json();
		// console.log(data);
		return data;
	}

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
