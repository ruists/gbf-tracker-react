import React from "react";

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
            onClick={handleClick}
            defaultChecked={props.default}
            checked={props.number == props.currentNumber}
        />
        <label className="btn btn-outline-primary" htmlFor={idField}>
            {props.number}
        </label>
      </React.Fragment>
  );
}
