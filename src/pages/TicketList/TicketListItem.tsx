import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import {
  CheckingTicketData,
  TicketListData,
  TicketPackage,
} from "../../models/Ticket";

import { editTicket } from "../../slice/EditSlice";
import { displayUpdateModal } from "../../slice/ModalSlice";
import { formatDate, formatTime } from "../../utils/dateTime";

interface Props {
  data: TicketListData | CheckingTicketData | TicketPackage;
  index: number;
  type: number;
}
interface TicketListItemProps {
  data: TicketListData;
}
interface CheckingListItemProps {
  data: CheckingTicketData;
}
interface PackageListItemProps {
  data: TicketPackage;
}

const TicketListItem = ({ data, index, type }: Props) => {
  const dispatch = useDispatch();

  const handleDisplayUpdateModal = () => {
    const newData = data as TicketPackage;

    dispatch(editTicket(newData));
    dispatch(displayUpdateModal());
  };
  const TicketListItem = ({ data }: TicketListItemProps) => {
    return (
      <tr className="body-list">
        <td className="tb__stt">{index}</td>
        <td className="tb__code">
          <p>{data.bookingCode}</p>
        </td>
        <td className="tb__quantity">
          <p>{data.ticketNumber}</p>
        </td>
        <td className="tb__name">
          <p>{data.name}</p>
        </td>
        <td
          className={`tb__status ${
            data.status === 0
              ? "tb__status--used"
              : data.status === 1
              ? "tb__status--unused"
              : "tb__status--expire"
          }`}
        >
          <span></span>{" "}
          {data.status === 0
            ? "Đã sử dụng"
            : data.status === 1
            ? "Chưa sử dụng"
            : "Hết hạn"}
        </td>
        <td className="tb__expire">
          <p>{formatDate(data.usingDate)}</p>
        </td>
        <td className="tb__start">
          <p>{formatDate(data.exportDate)}</p>
        </td>
        <td className="port">
          <p>Cổng {data.checkInPort}</p>
        </td>
        <td>
          <i className="bx bx-dots-vertical-rounded"></i>
        </td>
      </tr>
    );
  };
  const CheckingListItem = ({ data }: CheckingListItemProps) => {
    return (
      <tr className="body-list">
        <td className="tb__stt">{index}</td>
        <td className="tb__code">
          <p>{data.ticketNumber}</p>
        </td>

        <td className="tb__name">
          <p>{data.typeName}</p>
        </td>

        <td className="tb__expire">
          <p>{formatDate(data.usingDate)}</p>
        </td>

        <td className="port">
          <p>Cổng {data.checkInPort}</p>
        </td>
        <td className="checking__status">đã đối soát</td>
      </tr>
    );
  };
  const PackageListItem = ({ data }: PackageListItemProps) => {
    return (
      <tr className="body-list">
        <td className="tb__stt">{index}</td>
        <td className="tb__code">
          <p>{data.id}</p>
        </td>
        <td className="tb__quantity">
          <p>{data.name}</p>
        </td>
        <td className="tb__expire tb__datetime">
          <p>
            <span>{formatDate(data.appliedDate)}</span>
            <span>{formatTime(data.appliedTime)}</span>
          </p>
        </td>
        <td className="tb__start tb__datetime">
          <p>
            <span>{formatDate(data.expireDate)}</span>
            <span>{formatTime(data.expireTime)}</span>
          </p>
        </td>
        <td className="tb__name">
          {data.simplePrice && data.simplePrice > 0 ? (
            <p>{data.simplePrice} VNĐ</p>
          ) : (
            <></>
          )}
        </td>
        <td className="port">
          {data.comboPrice && (
            <p>
              {data.comboPrice} VNĐ/{data.quantityForCombo} vé
            </p>
          )}
        </td>
        <td
          className={`tb__status ${
            data.status === 0 ? "tb__status--unused" : "tb__status--expire"
          }`}
        >
          <span></span> {data.status === 0 ? "Đang áp dụng" : "Tắt"}
        </td>
        <td className="tb__edit" onClick={handleDisplayUpdateModal}>
          <p>
            <i className="bx bx-edit"></i>
            Cập nhật
          </p>
        </td>
      </tr>
    );
  };
  return (
    <>
      {type === 0 && <TicketListItem data={data as TicketListData} />}
      {type === 1 && <CheckingListItem data={data as CheckingTicketData} />}
      {type === 2 && <PackageListItem data={data as TicketPackage} />}
    </>
  );
};

export default TicketListItem;
