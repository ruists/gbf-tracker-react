import { BehaviorSubject } from "rxjs";

const currUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  register,
  currentUser: currUserSubject.asObservable(),
  get currentUserValue() {
    return currUserSubject.value;
  },
};

async function register(usr, pwd) {
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: usr, password: pwd }),
  };
  const registerUrl =
    process.env.REACT_APP_API + process.env.REACT_APP_API_SIGNUP;

  const res = await fetch(registerUrl, reqOptions);
  const result = await res.json();
  return { result: result, code: res.status };
}

async function login(usr, pwd) {
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: usr, password: pwd }),
  };
  const loginUrl = process.env.REACT_APP_API + process.env.REACT_APP_API_SIGNIN;

  const res = await fetch(loginUrl, reqOptions);
  const result = await res.json();
  const user = result.user;
  localStorage.setItem("currentUser", JSON.stringify(user));
  currUserSubject.next(user);
  return { result: result, code: res.status };
}

function logout() {
  localStorage.removeItem("currentUser");
  currUserSubject.next(null);
}
