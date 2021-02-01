import React from "react";
import PropTypes from "prop-types";

export function Title(props) {
    return (
        <h3 className="row justify-content-center">{props.text}</h3>
    );
}

Title.propTypes = {
    text: PropTypes.string
};