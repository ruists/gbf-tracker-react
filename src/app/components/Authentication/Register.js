import React, {useState} from "react";
import "app/styles/auth.css";
import { useHistory } from "react-router-dom";

export function Register(props) {
  const history = useHistory();
  const [error, setError] = useState("");

  async function submitInput(e) {
    e.preventDefault();
    const usr = document.getElementById("usernameControl").value;
    const pwd = document.getElementById("passwordControl").value;
    let result = await props.handleRegistration(usr, pwd);
    if (result === 201) {
      setError("");
      history.push("/");
    } else if (result === 409) {
      setError("This account already exists.");
    } else {
      setError("An error occurred, try again later.");
    }
  }

  return (
    <div className="text-center offset-md-3 col-md-6 mt-4 registration">
      <h2 className="mb-4">Register</h2>
      <form className="row" onSubmit={submitInput}>
        <div className="mb-3 row">
          <label
            htmlFor="usernameControl"
            className="form-label col-sm-2 col-form-label"
          >
            <b>Email</b>
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="usernameControl"
              required
            />
          </div>
        </div>
        <div className="mb-1 row">
          <label
            htmlFor="passwordControl"
            className="form-label col-sm-2 col-form-label"
          >
            <b>Password</b>
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="passwordControl"
              required
            />
          </div>
        </div>
        <div className="row d-flex">
          <div className="text-center text-danger">{error}</div>
          <div className="col-auto align-self-center mx-auto mt-3">
            <button type="submit" className="btn btn-secondary mb-3">
              Create account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
