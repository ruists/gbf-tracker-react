import React from 'react'
import PropTypes from 'prop-types'
import 'app/styles/reference.css'

export function CharacterInfo(props) {
  const showHideClassName = props.show
    ? 'modal fade display-block'
    : 'modal fade display-none'
  let defined = props.character != undefined

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
                src={props.character.imgUrl}
                className='img-fluid mx-auto'
                alt={props.character.name}
                title={props.character.name}
              />
            </div>
            <div className='modal-body'>
              <p>
                <b>Name: </b>
                {props.character.name}
              </p>
              <p>
                <b>Maximum Uncap: </b>
                {props.character.maxUncap}
              </p>
              <p>
                <b>Race: </b>
                {props.character.race.map((race, index) =>
                  index == 0 ? race.name : '  |  ' + race.name
                )}
              </p>
              <p>
                <b>Style: </b>
                {props.character.style.name}
              </p>
              <p>
                <b>Element: </b>
                {props.character.element.name}
              </p>
              <p>
                <b>Rarity: </b>
                {props.character.rarity.name}
              </p>
              <p>
                <b>Weapon Type: </b>
                {props.character.weaponType.map((type, index) =>
                  index == 0 ? type.name : '  |  ' + type.name
                )}
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

CharacterInfo.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  id: PropTypes.string,
  character: PropTypes.object,
}
