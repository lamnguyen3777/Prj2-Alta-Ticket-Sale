import { Table } from "antd";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../api/crudData";
import { DateTime } from "../../components/Calendar";
import Pagination from "../../components/Pagination";
import TableList, { DataTable } from "../../components/TableList";
import { TicketListData } from "../../models/Ticket";
import { search } from "../../slice/Filter/filterSlice";
import {
  loadTicketList,
  requestUpdateStatus,
  updateDate,
} from "../../slice/LoadData/loadTicketList";
import {
  displayAddModal,
  displayChangeDateModal,
  displayFilterModal,
} from "../../slice/ModalSlice";
import { RootState } from "../../store";
import { formatDate } from "../../utils/dateTime";
import { exportCSV, FormatKey } from "../../utils/exportCSV";
import { filter } from "../../utils/filter";
import { search as searchList } from "../../utils/filter";
interface Props {}

export const LoadingContext = createContext(false);

const TicketList = (props: Props) => {
  const dispatch = useDispatch();
  const filterParams = useSelector((state: RootState) => state.filter.filter);
  const searchKey = useSelector((state: RootState) => state.filter.search);
  const ticketsFromStore = useSelector(
    (state: RootState) => state.tickets.list
  );
  const [ticketList, setTicketList] = useState<TicketListData[]>([]);
  const [displayTooltip, setDisplayTooltip] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [keySearch, setKeySearch] = useState<string>("");

  const handleDisplayTooltip = (index: number) => {
    setDisplayTooltip(index);
  };

  const handleUpdateTicket = (item: TicketListData) => {
    dispatch(requestUpdateStatus(item));
    setTimeout(() => {
      setDisplayTooltip(-1);
    }, 100);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text: string, record: TicketListData) =>
        ticketList.indexOf(record) + 1,
    },
    {
      title: "Booking code",
      dataIndex: "bookingCode",
      key: "bookingCode",
    },
    {
      title: "Số vé",
      dataIndex: "ticketNumber",
      key: "ticketNumber",
    },
    {
      title: "Tên sự kiện",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tình trạng sử dụng",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <p
          className={`tb__status ${
            status === 0
              ? "tb__status--used"
              : status === 1
              ? "tb__status--unused"
              : "tb__status--expire"
          }`}
        >
          <span></span>
          {status === 0
            ? "Đã sử dụng"
            : status === 1
            ? "Chưa sử dụng"
            : "Hết hạn"}
        </p>
      ),
    },
    {
      title: "Ngày sử dụng",
      dataIndex: "usingDate",
      key: "usingDate",
      render: (date: DateTime) => <>{formatDate(date)}</>,
    },
    {
      title: "Ngày Xuất vé",
      dataIndex: "exportDate",
      key: "exportDate",
      render: (date: DateTime) => <>{formatDate(date)}</>,
    },
    {
      title: "Cổng check-in",
      dataIndex: "checkInPort",
      key: "checkInPort",
      render: (port: number) => "Cổng " + port,
    },
    {
      options: "",
      dataIndex: "options",
      key: "options",
      render: (text: string, record: TicketListData) => (
        <div
          className="tickets__options__tooltip"
          onClick={(e) => {
            e.stopPropagation();
            handleDisplayTooltip(ticketList.indexOf(record));
          }}
        >
          {record.status === 1 && (
            <>
              <i className="bx bx-dots-vertical-rounded tickets__options"></i>

              <div
                className={`item__tooltip ${
                  displayTooltip === ticketList.indexOf(record) ? "display" : ""
                }`}
              >
                <li onClick={() => handleUpdateTicket(record)}>Sử dụng vé</li>
                <li
                  onClick={() => {
                    dispatch(displayChangeDateModal(record));
                    setTimeout(() => {
                      setDisplayTooltip(-1);
                    }, 200);
                  }}
                >
                  Đổi ngày sử dụng
                </li>
                <div className="triangle"></div>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllTickets()
      .then((res) => {
        dispatch(loadTicketList(res));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [filterParams, keySearch]);

  useEffect(() => {
    const list = searchList(keySearch, filter(filterParams, ticketsFromStore));
    setTicketList(list);
  }, [ticketsFromStore]);

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
        list: ticketList,
      },
      "export.csv",
      "export-csv"
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeySearch(e.target.value);
    dispatch(search(e.target.value));
  };

  return (
    <LoadingContext.Provider value={isLoading}>
      <div className="content__main">
        <div className="ticket__list">
          <p className="ticket__list__title title">Danh sách vé</p>
          <div className="ticket__features">
            <div className="header__search ticket__list__search">
              <input
                type="number"
                placeholder="Tìm bằng số vé"
                value={keySearch}
                onChange={handleSearch}
              />
              <img src="./imgs/search.svg" alt="" />
            </div>
            <div className="ticket__list__action">
              <button
                onClick={() => dispatch(displayFilterModal())}
                className="button"
              >
                <i className="bx bx-filter-alt"></i>Lọc
              </button>
              <button onClick={handleDownloadCSVFile} className="button">
                <a id="export-csv">Xuất file (.csv)</a>
              </button>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={ticketList}
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: false,
              pageSizeOptions: ["10", "20", "30"],
            }}
            className="ticket__list__table"
          />
        </div>
      </div>
    </LoadingContext.Provider>
  );
};

export default TicketList;
