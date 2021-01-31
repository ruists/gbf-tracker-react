import React from "react";
import "app/styles/reference.css";

export function ImageButton(props) {
  const handleClick = () => {
    props.handleClick(props.item);
  };
  const modalUsage = props.modalTarget != undefined;
  
  return (
    <React.Fragment>
      <div className="col-lg-1 col-md-2 col-sm-3 col-xs-4 row-grid row-grid-image">
        <img
          src={props.item.imgUrl}
          className="img-fluid rounded-1"
          alt={props.item.name}
          title={props.item.name}
          onClick={handleClick}
          data-bs-toggle={modalUsage ? "modal" : ""}
          data-bs-target={modalUsage ? props.modalTarget : ""}
        />
      </div>
    </React.Fragment>
  );
}
