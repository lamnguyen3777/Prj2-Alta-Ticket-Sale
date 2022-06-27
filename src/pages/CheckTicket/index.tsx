import { Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../api/crudData";
import { DateTime } from "../../components/Calendar";
import DatePicker from "../../components/DatePicker";
import Pagination from "../../components/Pagination";
import Radio from "../../components/Radio";
import TableList, { DataTable } from "../../components/TableList";
import { CheckingTicketData, TicketListData } from "../../models/Ticket";
import { checkingFilter } from "../../slice/Filter/filterSlice";
import { RootState } from "../../store";
import { compareTo, formatDate, getNow } from "../../utils/dateTime";
import { exportCSV, FormatKey } from "../../utils/exportCSV";
import { filterCheckingList, search } from "../../utils/filter";
interface Props {}

type CheckType = -1 | 0 | 1;
// 0 is all. 1 is check, 2 is uncheck

export interface CheckingFilter {
  status?: CheckType;
  dateFrom: DateTime;
  dateTo: DateTime;
  searchKey: string;
}

const CheckTicket = (props: Props) => {
  const dispatch = useDispatch();

  const [filterInput, setFilterInput] = useState<CheckingFilter>({
    status: -1,
    searchKey: "",
    dateFrom: { day: 0, month: 0, year: 0 },
    dateTo: { day: 0, month: 0, year: 0 },
  });

  const filterParams = useSelector(
    (state: RootState) => state.filter.checkingFilter
  );

  const [checkList, setCheckList] = useState<TicketListData[]>([]);

  const [isValidateCoupleDate, setValidateCoupleDate] = useState<number>(-1);

  const handleCheckTicket = (checkType: number) => {
    setFilterInput({ ...filterInput, status: checkType as CheckType });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text: string, item: TicketListData) =>
        checkList.indexOf(item) + 1,
    },
    {
      title: "Số vé",
      dataIndex: "ticketNumber",
      key: "ticketNumber",
    },
    {
      title: "Ngày sử dụng",
      dataIndex: "usingDate",
      key: "usingDate",
      render: (date: DateTime) => <>{formatDate(date)}</>,
    },
    {
      title: "Tên loại vé",
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: "Cổng Check-in",
      dataIndex: "checkInPort",
      key: "checkInPort",
      render: (port: number) => "Cổng " + port,
    },
    {
      title: "",
      dataIndex: "checkStatus",
      key: "checkStatus",
      render: (status: number) => (
        <p className={status === 0 ? "status--uncheck" : "status--checked"}>
          {status === 0 ? "Đã đối soát" : "Chưa đối soát"}
        </p>
      ),
    },
  ];

  const hanldeGetDateFrom = (date: DateTime) => {
    setFilterInput({
      ...filterInput,
      dateFrom: date,
    });
  };
  const hanldeGetDateTo = (date: DateTime) => {
    setFilterInput({
      ...filterInput,
      dateTo: date,
    });
  };

  useEffect(() => {
    getAllTickets()
      .then((res) => {
        const list = search(
          filterInput.searchKey,
          filterCheckingList(filterInput, res)
        );
        // const list = searchList(keySearch,filter(filterParams, res));

        setCheckList(list);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [filterParams]);

  useEffect(() => {
    if (filterInput.dateFrom && filterInput.dateTo) {
      if (!compareTo(filterInput.dateFrom, filterInput.dateTo)) {
        setValidateCoupleDate(1);
      } else {
        setValidateCoupleDate(-1);
      }
    }
  }, [filterInput.dateFrom, filterInput.dateTo]);

  const handleFilter = () => {
    isValidateCoupleDate !== 1 && dispatch(checkingFilter(filterInput));
  };

  const handleDownloadCSVFile = () => {
    const mapKey: FormatKey<TicketListData> = {
      bookingCode: "Booking code",
      checkInPort: "Cổng check-in",
      checkStatus: "Trạng thái đối soát",
      exportDate: "Ngày hết hạn",
      name: "Tên sự kiện",
      status: "Tình trạng sử dụng",
      ticketNumber: "Số vé",
      typeName: "Tên loại vé",
      usingDate: "Ngày sử dụng",
    };
    exportCSV(
      {
        mapKey,
        list: checkList,
      },
      "doi-soat-ve.csv",
      "check-list"
    );
  };
  return (
    <div className="check__ticket">
      <div className="check__ticket__main">
        <p className="title">Đối soát vé</p>
        <div className="ticket__features check__features">
          <div className="header__search ticket__list__search">
            <input
              type="number"
              placeholder="Tìm bằng số vé"
              value={filterInput.searchKey}
              onChange={(e) => {
                setFilterInput({ ...filterInput, searchKey: e.target.value });
                dispatch(
                  checkingFilter({ ...filterInput, searchKey: e.target.value })
                );
              }}
            />
            <img src="./imgs/search.svg" alt="" />
          </div>
          <div className="check__ticket__action">
            <button
              className="button button--fill"
              onClick={handleDownloadCSVFile}
            >
              <a id="check-list">Chốt đối soát</a>
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={checkList}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: false,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      </div>
      <div className="check__ticket__filter">
        <p className="check__filter__title">Lọc vé</p>
        <div className="check__filter__main">
          <p>Tình trạng đối soát</p>
          <div className="check__filter__checkbox">
            <Radio
              id="all"
              name="filter"
              text="Tất cả"
              value={-1}
              onChecked={handleCheckTicket}
              isChecked={filterInput.status === -1 ? true : false}
            />
            <Radio
              id="check"
              name="filter"
              text="Đã đối soát"
              value={0}
              onChecked={handleCheckTicket}
              isChecked={filterInput.status === 0 ? true : false}
            />
            <Radio
              id="uncheck"
              name="filter"
              text="Chưa đối soát"
              value={1}
              onChecked={handleCheckTicket}
              isChecked={filterInput.status === 1 ? true : false}
            />
          </div>
          <p>Loại vé</p>
          <span className="check">Vé cổng</span>
          <p className="f">Từ ngày</p>
          <div
            className={`filter__date__pic filter--gray ${
              isValidateCoupleDate === 1 ? "invalid" : ""
            }`}
          >
            {/* <span>01/05/2022</span> <i className="bx bx-calendar"></i> */}
            <DatePicker
              date={filterInput.dateFrom}
              onGetDate={hanldeGetDateFrom}
              type={1}
              pos="bottom-right"
            />
          </div>
          <p className="f">Đến ngày</p>
          <div
            className={`filter__date__pic filter--orange ${
              isValidateCoupleDate === 1 ? "invalid" : ""
            }`}
          >
            <DatePicker
              date={filterInput.dateTo}
              onGetDate={hanldeGetDateTo}
              type={1}
              pos="bottom-right"
            />
            {/* <span>dd/mm/yy</span> <i className="bx bx-calendar"></i> */}
          </div>
        </div>
        <button className="button filter__btn" onClick={handleFilter}>
          Lọc
        </button>
      </div>
    </div>
  );
};

export default CheckTicket;
