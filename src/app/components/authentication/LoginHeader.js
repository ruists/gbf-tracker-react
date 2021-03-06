import React, { useState } from 'react'
import 'app/styles/auth.css'
import { useHistory } from 'react-router-dom'

export function LoginHeader(props) {
  const history = useHistory()
  const [error, setError] = useState(false)

  const submitLoginInput = async (e) => {
    e.preventDefault()
    const usr = document.getElementById('usernameLoginControl').value
    const pwd = document.getElementById('passwordLoginControl').value
    let result = await props.handleLogin(usr, pwd)

    if (result == 200) {
      setError(false)
      history.push('/')
    } else if (result == 401) {
      setError(true)
    }
    document.getElementById('loginForm')?.reset()
  }

  return (
    <div className='me-3'>
      <form className='d-flex' onSubmit={submitLoginInput} id='loginForm'>
        <input
          className='form-control me-2'
          id='usernameLoginControl'
          type='email'
          aria-label='Email'
          placeholder='Email'
        />
        <input
          className='form-control me-2'
          id='passwordLoginControl'
          type='password'
          aria-label='Password'
          placeholder='Password'
        />
        <button className='btn btn-secondary' type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}
