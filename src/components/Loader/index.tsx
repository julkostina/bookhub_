import React from 'react'
import './index.scss'
function Loader() {
  return (
    <div className='loader' data-testid='loader'>
      <div className="loader__image" data-testid='loader__image'></div>
    </div>
  )
}

export default Loader