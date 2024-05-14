import React from 'react';
import ReactPaginate from 'react-paginate';
import './Paginate.css';

type IPaginateComponent = {
  itemsPerPage: number;
  total: number;
  onClickItem: (page: number) => void;
  currentPage: number;
};
const Paginate: React.FC<IPaginateComponent> = ({
  itemsPerPage,
  total,
  onClickItem,
  currentPage,
}) => {
  const pageCount = Math.ceil(total / itemsPerPage);
  const handlePageClick = event => {
    onClickItem(event.selected);
  };
  if (currentPage > 0) {
    currentPage = currentPage - 1;
  }

  return (
    <div className={'common_paginate'}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={7}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName="selected"
        forcePage={currentPage}
      />
    </div>
  );
};

export default Paginate;
