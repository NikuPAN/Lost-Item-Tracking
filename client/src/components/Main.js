import React from 'react';
import ReportForm from './ReportForm';
import ExistedReport from './ExistedReport';
import './Main.css';

const Main = () => {
  return (
    <div>
      <div className='form'>
        <ReportForm />
      </div>
      <div className='report'>
        <ExistedReport />
      </div>
    </div>
  )
}

export default Main;
