import React from "react";
import PropTypes from "prop-types";

export function PaginationNumber(props) {
  const handleClick = () => {
    props.handleChange(props.number-1);
  };

  const idField = props.groupName + props.number;

  return (
      <React.Fragment>
        <input 
            type="radio"
            className="btn-check"
            name={props.groupName}
            id={idField}
            onChange={handleClick}
            checked={props.number == props.currentNumber}
        />
        <label className="btn btn-outline-primary" htmlFor={idField}>
            {props.number}
        </label>
      </React.Fragment>
  );
}

PaginationNumber.propTypes = {
  handleChange: PropTypes.func,
  default: PropTypes.bool,
  number: PropTypes.number,
  currentNumber: PropTypes.number,
  groupName: PropTypes.string
};