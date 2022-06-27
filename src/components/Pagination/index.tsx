import { List } from "antd";
import React from "react";
import { TicketListData } from "../../models/Ticket";
import { formatDate } from "../../utils/dateTime";
import { DataListType } from "../TableList";
import ReactPaginate from "react-paginate";
import { useState } from "react";
interface Props {
  data: DataListType;
  onChangePage: (page: number) => void
}

interface Page {
  selected: number;
}

const Pagination = ({ data, onChangePage}: Props) => {
  const [pageCount, setPageCount] = useState<number>(20);

  const handlePageClick = (selectedItem: Page) => {
    const item = selectedItem.selected;
    onChangePage(item);
  };
  return (
    <>
      {/* <ul className="pagination">
        <li className="prev">
          <i className="bx bxs-left-arrow"></i>
        </li>
        <li className="paginate__item">1</li>
        <li className="paginate__item">2</li>
        <li className="paginate__item">3</li>
        <li className="paginate__item">...</li>
        <li className="paginate__item">20</li>
        <li className="next">
          <i className="bx bxs-right-arrow"></i>
        </li>
      </ul> */}

      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        containerClassName="pagination"
        pageClassName="paginate__item"
        previousClassName="prev"
        nextClassName="next"
        activeClassName="active"
      />
    </>
  );
};

export default Pagination;
