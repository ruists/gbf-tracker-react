import React from "react";

export class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">GBF Collection</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-md-2 offset-md-1">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="referenceDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  href="#"
                >
                  Reference
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="referenceDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Characters
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Weapons
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Summons
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}
