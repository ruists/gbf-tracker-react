import React from "react";
import PropTypes from "prop-types";

export function PaginationNumber(props) {
  const handleClick = (event) => {
    event.preventDefault();

    if (props.number == props.currentNumber) {
      return;
    }
    props.handleChange(props.number - 1);
  };

  let current = props.number == props.currentNumber;

  return (
    <li className={current ? "page-item active" : "page-item"}>
      {current ? (
        <span className="page-link">{props.number}</span>
      ) : (
        <a
          className="page-link"
          href="#"
          onClick={handleClick}
          aria-current="page"
        >
          {props.number}
        </a>
      )}
    </li>
  );
}

PaginationNumber.propTypes = {
  handleChange: PropTypes.func,
  default: PropTypes.bool,
  number: PropTypes.number,
  currentNumber: PropTypes.number,
};
