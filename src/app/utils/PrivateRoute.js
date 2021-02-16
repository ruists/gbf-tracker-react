import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authenticationService } from "app/services/authentication.service";

export function PrivateRoute({ children, ...rest }) {
  let user = authenticationService.currentUserValue
    ? authenticationService.currentUserValue()
    : null;

  return (
    <Route
      {...rest}
      render={({ location }) => (user ? children : <Redirect to="/401" />)}
    />
  );
}
