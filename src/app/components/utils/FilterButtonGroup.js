import React from "react";
import PropTypes from "prop-types";
import { FilterButton } from "./FilterButton";
import { capitalize } from "app/utils/utils.js";
import "app/styles/reference.css";

export function FilterButtonGroup(props) {
  let idAll = props.name + "All";
  return (
    <div
      className="btn-group filter-button-group"
      role="group"
      aria-label={capitalize(props.name)}
    >
      <FilterButton
        groupName={props.name}
        itemName="All"
        itemContent=""
        handleChange={props.handleChange}
        default={true}
      />
      {props.items.map((item, index) => (
        <FilterButton
          key={index}
          groupName={props.name}
          itemName={item.name}
          handleChange={props.handleChange}
          default={false}
        />
      ))}
    </div>
  );
}

FilterButtonGroup.propTypes = {
  items: PropTypes.array,
  name: PropTypes.string,
  handleChange: PropTypes.func
};