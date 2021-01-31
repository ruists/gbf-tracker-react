import React from "react";
import "app/styles/reference.css";

export function SummonInfo(props) {
  const showHideClassName = props.show
    ? "modal fade display-block"
    : "modal fade display-none";
  let defined = props.summon != undefined;

  return (
    <div
      className={showHideClassName}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
      id={props.id ? props.id : ""}
    >
      <div className="modal-dialog modal-dialog-centered modal-sm text-center">
        {defined ? (
          <div className="modal-content">
            <div className="modal-header">
              <img
                src={props.summon.imgUrl}
                className="img-fluid mx-auto"
                alt={props.summon.name}
                title={props.summon.name}
              />
            </div>
            <div className="modal-body">
              <p>
                <b>Name: </b>
                {props.summon.name}
              </p>
              <p>
                <b>Element: </b>
                {props.summon.element.name}
              </p>
              <p>
                <b>Rarity: </b>
                {props.summon.rarity.name}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={props.handleClose}
                data-bs-dismiss="modal"
                aria-label="Close"
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
  );
}
