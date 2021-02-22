import React, { useState } from "react";
import "app/styles/auth.css";
import { useHistory } from "react-router-dom";

export function LoginHeader(props) {
  const history = useHistory();
  const [error, setError] = useState(false);

  const submitLoginInput = async (e) => {
    e.preventDefault();
    const usr = document.getElementById("usernameLoginControl").value;
    const pwd = document.getElementById("passwordLoginControl").value;
    let result = await props.handleLogin(usr, pwd);

    if (result == 200) {
      setError(false);
      history.push("/");
    } else if (result == 401) {
      setError(true);
    }
    document.getElementById("loginForm")?.reset();
  };

  return (
    <div className="me-3">
      <form className="d-flex" onSubmit={submitLoginInput} id="loginForm">
        <div className="form-floating">
          <input
            className="form-control me-2"
            id="usernameLoginControl"
            type="email"
            aria-label="E-mail"
          />
          <label for="usernameLoginControl">Email</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control me-2"
            id="passwordLoginControl"
            type="password"
            aria-label="Password"
          />
          <label for="passwordLoginControl">Password</label>
        </div>
        <button className="btn btn-secondary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
