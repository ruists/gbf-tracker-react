import React from "react";
import { Login } from "./Login";
import { Link, useHistory } from "react-router-dom";

export function AuthenticationHeader(props) {
  const history = useHistory();

  const logout = () => {
    props.handleLogout();
    history.push("/");
  };

  return props.isAuthenticated ? (
    <React.Fragment>
      <span className="navbar-text me-3">{props.userName}</span>
      <button className="btn btn-secondary" type="button" onClick={logout}>
        Logout
      </button>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Login handleLogin={props.handleLogin} />
      <Link className="btn btn-secondary" to="/register">
        Register
      </Link>
    </React.Fragment>
  );
}
