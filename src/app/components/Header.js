import React from "react";
import { Link } from "react-router-dom";

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
                    <Link className="dropdown-item" to="/refCharacter">
                      Characters
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/refWeapon">
                      Weapons
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/refSummon">
                      Summons
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {!this.props.isAuthenticated && (
              <Link className="nav-link text-muted" to="/register">
                Register
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
