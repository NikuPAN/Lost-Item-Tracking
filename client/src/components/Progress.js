/*
This component is used to show to upload progress bar.
 */

import React from 'react'
import PropTypes from 'prop-types'

const Progress = ({percentage}) => {
  return (
    <div className="progress">
      <div 
        className="progress-bar progress-bar-striped progress-bar-animated bg-info" 
        role="progressbar" 
        style={{ width: `${percentage}%`}} 
      >
        {percentage}%
      </div>
    </div>
  )
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
}

export default Progress
