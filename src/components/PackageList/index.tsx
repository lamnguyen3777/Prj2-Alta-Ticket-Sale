import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackages } from "../../api/crudData";
import { TicketPackage } from "../../models/Ticket";
import { editTicket, resetTicket } from "../../slice/EditSlice";
import {
  updatePackageList,
  updatePackageListOrigin,
} from "../../slice/Filter/crudSlice";
import { displayAddModal, displayUpdateModal } from "../../slice/ModalSlice";
import { AppDispatch, RootState } from "../../store";
import { formatDate, formatTime } from "../../utils/dateTime";
import { exportCSV,FormatKey } from "../../utils/exportCSV";
import { searchPackage } from "../../utils/filter";
import { DateTime } from "../Calendar";

type Props = {};

const PackageList = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const [ticketList, setTicketList] = useState<TicketPackage[]>([]);
  const [keySearch, setKeySearch] = useState<string>("");
  const ticketListState = useSelector(
    (state: RootState) => state.crud.packageList
  );

  const handleDisplayUpdateModal = (newData: TicketPackage) => {
    dispatch(editTicket(newData));
    dispatch(displayUpdateModal());
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text: string, record: TicketPackage) =>
        ticketList.indexOf(record) + 1,
    },
    {
      title: "Mã gói",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên gói",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày áp dụng",
      dataIndex: "appliedDate",
      key: "appliedDate",
      render: (date: DateTime, item: TicketPackage) => (
        <div className="tb__datetime">
          <p>
            <span>{formatDate(date)}</span>
            <span>{formatTime(item.appliedTime)}</span>
          </p>
        </div>
      ),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expireDate",
      key: "expireDate",
      render: (date: DateTime, item: TicketPackage) => (
        <div className="tb__datetime">
          <p>
            <span>{formatDate(date)}</span>
            <span>{formatTime(item.appliedTime)}</span>
          </p>
        </div>
      ),
    },
    {
      title: "Giá vé (VNĐ/Vé)",
      dataIndex: "simplePrice",
      key: "simplePrice",
      render: (price: number) => <>{price > 0 ? <>{price} VNĐ</> : <></>}</>,
    },
    {
      title: "Giá Combo (VNĐ/Combo)",
      dataIndex: "comboPrice",
      key: "comboPrice",
      render: (price: number, item: TicketPackage) => (
        <>
          {price > 0 ? (
            <>
              {price} VNĐ/{item.quantityForCombo} vé
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <p
          className={`tb__status ${
            status === 0 ? "tb__status--unused" : "tb__status--expire"
          }`}
        >
          <span></span>
          {status === 0 ? "Đang áp dụng" : "Tắt"}
        </p>
      ),
    },
    {
      title: "",
      dataIndex: "update",
      key: "update",
      render: (status: number, item: TicketPackage) => (
        <p className="tb__edit" onClick={() => handleDisplayUpdateModal(item)}>
          <i className="bx bx-edit"></i>
          <span>Cập nhật </span>
        </p>
      ),
    },
  ];

  const handleDisplayAddModal = () => {
    dispatch(resetTicket());
    dispatch(displayAddModal());
  };

  useEffect(() => {
    getAllPackages()
      .then((res) => {
        dispatch(updatePackageList(res));
        setTicketList(searchPackage(keySearch, ticketListState));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [keySearch]);

  useEffect(() => {
    setTicketList(searchPackage(keySearch, ticketListState));
  }, [ticketListState]);

  const handleExportCSV = () =>{
    const mapKey: FormatKey<TicketPackage> = {
      id: 'Mã gói',
      name: 'Tên gói',
      appliedDate: 'Ngày áp dụng',
      appliedTime: 'Giờ áp dụng',
      expireDate: 'Ngày hết hạn',
      expireTime: 'Giờ hết hạn',
      simplePrice: 'Giá vé (VNĐ/Vé)',
      comboPrice: 'Giá Combo (VNĐ/Combo)',
      quantityForCombo: 'Số lượng vé combo',
      status: 'Tình trạng',
    }
    exportCSV({
      mapKey,
      list: ticketList,
    },"danh-sach-goi-ve.csv","package-list")
  }

  return (
    <div className="content__main">
      <div className="ticket__list">
        <p className="ticket__list__title title">Danh sách gói vé</p>
        <div className="ticket__features">
          <div className="header__search ticket__list__search">
            <input
              type="text"
              placeholder="Tìm bằng mã gói"
              value={keySearch}
              onChange={(e) => setKeySearch(e.target.value)}
            />
            <img src=".././imgs/search.svg" alt="" />
          </div>
          <div className="ticket__list__action">
            <button className="button" onClick={handleExportCSV}><a id="package-list">Xuất file (.csv)</a></button>
            <button className="button" onClick={handleDisplayAddModal}>
              Thêm gói vé
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
          className="table__list--package"
          
          
        />
      </div>
    </div>
  );
};

export default PackageList;
