import React from 'react'
import { LoginHeader } from './LoginHeader'
import { Link, useHistory, useLocation } from 'react-router-dom'

export function AuthenticationHeader(props) {
  const history = useHistory()
  const location = useLocation()

  function logout() {
    const referenceRoutes = 'ref'

    props.handleLogout()

    if (!location.pathname.includes(referenceRoutes)) history.push('/')
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
