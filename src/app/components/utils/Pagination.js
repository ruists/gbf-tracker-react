import React from "react";
import { PaginationNumber } from "./PaginationNumber";
import "app/styles/reference.css";

export function Pagination(props) {
  let pageNumbers =
    props.pageMax <= 1
      ? [1]
      : [...Array(props.pageMax).keys()].map((val) => val + 1);

  return (
    <React.Fragment>
      {props.pageMax > 1 ? (
        <div
          className="btn-group filter-button-group"
          role="group"
          aria-label="pagination"
        >
          {pageNumbers.map((number) => (
            <PaginationNumber
              handleChange={props.handleChange}
              key={number}
              default={number == 1}
              number={number}
              currentNumber={props.currentPage}
              groupName="pagination"
            />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
}
