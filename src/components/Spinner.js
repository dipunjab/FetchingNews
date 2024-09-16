import React from 'react'
import spin from "../spin.gif"

const Spinner = () => {
    return (
      <div className='text-center'>
        <img src={spin} alt="loading" className='my-3'/>
      </div>
    )
}

export default Spinner