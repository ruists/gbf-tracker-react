import React from "react";
import PropTypes from "prop-types";
import { PaginationNumber } from "./PaginationNumber";
import "app/styles/reference.css";

export function Pagination(props) {
  let pageNumbers =
    props.pageMax <= 1
      ? [1]
      : [...Array(props.pageMax).keys()].map((val) => val + 1);
  let prevDisabled = props.currentPage == 1;
  let nextDisabled = props.currentPage == props.pageMax;
  let prevClassName = prevDisabled ? "page-item disabled" : "page-item";
  let nextClassName = nextDisabled ? "page-item disabled" : "page-item";

  const handlePrev = (event) => {
    event.preventDefault();

    if (prevDisabled) {
      return;
    }
    props.handleChange(props.currentPage - 2);
  };

  const handleNext = (event) => {
    event.preventDefault();

    if (nextDisabled) {
      return;
    }
    props.handleChange(props.currentPage);
  };

  return (
    <nav aria-label="Data Pagination">
      {props.pageMax > 1 ? (
        <ul className="pagination pagination-lg justify-content-center">
          <li className={prevClassName}>
            {prevDisabled ? (
              <span className="page-link">Previous</span>
            ) : (
              <a className="page-link" href="#!" onClick={handlePrev}>
                Previous
              </a>
            )}
          </li>
          {pageNumbers.map((number) => (
            <PaginationNumber
              handleChange={props.handleChange}
              key={number}
              number={number}
              currentNumber={props.currentPage}
            />
          ))}
          <li className={nextClassName}>
            {nextDisabled ? (
              <span className="page-link">Next</span>
            ) : (
              <a className="page-link" href="#!" onClick={handleNext}>
                Next
              </a>
            )}
          </li>
        </ul>
      ) : (
        <div></div>
      )}
    </nav>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pageMax: PropTypes.number,
  handleChange: PropTypes.func,
};
