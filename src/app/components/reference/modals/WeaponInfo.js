import React from 'react'
import PropTypes from 'prop-types'
import 'app/styles/reference.css'

export function WeaponInfo(props) {
  const showHideClassName = props.show
    ? 'modal fade display-block'
    : 'modal fade display-none'
  let defined = props.weapon != undefined

  return (
    <div
      className={showHideClassName}
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      aria-hidden='true'
      id={props.id ? props.id : ''}
    >
      <div className='modal-dialog modal-dialog-centered modal-sm text-center'>
        {defined ? (
          <div className='modal-content'>
            <div className='modal-header'>
              <img
                src={props.weapon.imgUrl}
                className='img-fluid mx-auto'
                alt={props.weapon.name}
                title={props.weapon.name}
              />
            </div>
            <div className='modal-body'>
              <p>
                <b>Name: </b>
                {props.weapon.name}
              </p>
              <p>
                <b>Element: </b>
                {props.weapon.element.name}
              </p>
              <p>
                <b>Rarity: </b>
                {props.weapon.rarity.name}
              </p>
              <p>
                <b>Weapon Type: </b>
                {props.weapon.weaponType.name}
              </p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={props.handleClose}
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

WeaponInfo.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  id: PropTypes.string,
  weapon: PropTypes.object,
}
