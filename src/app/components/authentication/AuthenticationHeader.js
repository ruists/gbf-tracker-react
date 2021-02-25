import React from 'react'
import { LoginHeader } from './LoginHeader'
import { Link, useHistory } from 'react-router-dom'

export function AuthenticationHeader(props) {
  const history = useHistory()

  const logout = () => {
    props.handleLogout()

    history.push('/')
  }

  return props.isAuthenticated ? (
    <React.Fragment>
      <span className='navbar-text me-3'>{props.userName}</span>
      <button className='btn btn-secondary' type='button' onClick={logout}>
        Logout
      </button>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <LoginHeader handleLogin={props.handleLogin} />
      <Link className='btn btn-secondary' type='button' to='/register'>
        Register
      </Link>
    </React.Fragment>
  )
}
