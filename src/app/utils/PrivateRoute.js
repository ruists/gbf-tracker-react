import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authenticationService } from 'app/services/authentication.service'

export function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = authenticationService?.currentUserValue !== null
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? children : <Redirect to='/401' />
      }
    />
  )
}
