import React from 'react'
import PropTypes from 'prop-types'

export function FilterButton(props) {
  const handleClick = () => {
    if (props.itemContent != undefined) {
      props.handleChange(props.groupName, props.itemContent)
    } else {
      props.handleChange(props.groupName, props.itemName)
    }
  }

  const idField = props.groupName + props.itemName

  return (
    <React.Fragment>
      <input
        type='radio'
        className='btn-check'
        name={props.groupName}
        id={idField}
        onClick={handleClick}
        defaultChecked={props.default}
      />
      <label className='btn btn-outline-primary' htmlFor={idField}>
        {props.itemName}
      </label>
    </React.Fragment>
  )
}

FilterButton.propTypes = {
  groupName: PropTypes.string,
  itemName: PropTypes.string,
  default: PropTypes.bool,
  handleChange: PropTypes.func,
}
