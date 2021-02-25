import React from 'react'
import 'app/styles/error.css'

export function NotAuthenticated(props) {
  return (
    <div className='container-fluid mt-5 offset-md-3 lh-1'>
      <div className='row'>
        <h1 className='error-number text-start fw-bold'>401</h1>
      </div>
      <div className='col-md-6'>
        <p className='text-start text-muted fs-4 fw-bold'>
          You tried to access a restricted area.
        </p>
        <p className='text-start text-muted fs-4 fw-bold'>
          Please login into your account or register a new one.
        </p>
      </div>
    </div>
  )
}
