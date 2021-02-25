import React from 'react'
import { AuthenticationHeader } from './authentication/AuthenticationHeader'
import { Link } from 'react-router-dom'

export function Header(props) {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <a className='navbar-brand'>GBF Collection</a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse ' id='navbarSupportedContent'>
          <ul className='off-set-md-1 navbar-nav me-auto ms-3'>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='refDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Reference
              </a>
              <ul className='dropdown-menu' aria-labelledby='refDropdown'>
                <li>
                  <Link className='dropdown-item' to='/refCharacter'>
                    Characters
                  </Link>
                </li>
                <li>
                  <Link className='dropdown-item' to='/refWeapon'>
                    Weapons
                  </Link>
                </li>
                <li>
                  <Link className='dropdown-item' to='/refSummon'>
                    Summons
                  </Link>
                </li>
              </ul>
            </li>
            {props.isAuthenticated && (
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  id='invDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Inventory
                </a>
                <ul className='dropdown-menu' aria-labelledby='invDropdown'>
                  <li>
                    <Link className='dropdown-item' to='/character'>
                      Characters
                    </Link>
                  </li>
                  <li>
                    <Link className='dropdown-item' to='/weapon'>
                      Weapons
                    </Link>
                  </li>
                  <li>
                    <Link className='dropdown-item' to='/summon'>
                      Summons
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
          <div className='d-flex justify-content-end'>
            <AuthenticationHeader
              handleLogin={props.handleLogin}
              handleLogout={props.handleLogout}
              userName={props.userName}
              isAuthenticated={props.isAuthenticated}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
