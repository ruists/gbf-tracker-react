import React from "react";
import PropTypes from "prop-types";
import "app/styles/reference.css";

export function WeaponInfo(props) {
    const showHideClassName = props.show
      ? "modal fade display-block"
      : "modal fade display-none";
    let defined = props.item != undefined;
  
    return(<div></div>);
}

WeaponInfo.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    id: PropTypes.string,
    weapon: PropTypes.object
};