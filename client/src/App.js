import React, { Component } from 'react';
import RequestUpload from './components/RequestUpload';
import './App.css';

const App = () => (
  <div className='container mt-4'>
    <h4 className="display-4 text-center mb-4">
      <i className="fab fa-react"></i> Lost Item Tracking
    </h4>
    <RequestUpload />
  </div>
);

export default App;
