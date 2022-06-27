import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TicketListData } from "../../models/Ticket";
import { requestUpdateStatus } from "../../slice/LoadData/loadTicketList";
import { displayChangeDateModal, hiddenModal, ModalStatus } from "../../slice/ModalSlice";
import { RootState } from "../../store";
import { DateTime } from "../Calendar";
import DatePicker from "../DatePicker";

type Props = {};

const ChangeDateModal = (props: Props) => {
  const ticket = useSelector((state: RootState) => state.modal.changeDateModal);
  const dispatch = useDispatch();
  
  const handleGetDate = (date: DateTime) => {
      dispatch(displayChangeDateModal({...ticket,usingDate: date} as TicketListData))
  };

  const isDisplayModal = useSelector(
    (state: RootState) => state.modal.modalState
  );

  useEffect(()=>{

  },[ticket])

  return (
    <div
      className={`change__modal ${
        isDisplayModal === ModalStatus.CHANGE_DATE_MODAL
          ? "change__modal--display"
          : ""
      }`}
    >
      <p className="change__modal__title">Đổi ngày sử dụng vé</p>
      <div className="change__modal__main">
        <div className="change__main__title">
          <span>Số vé</span>
          <span>Loại vé</span>
          <span>Tên sự kiện</span>
          <span>Hạn sử dụng</span>
        </div>
        <div className="change__main__content">
          <span>{ticket?.bookingCode}</span>
          <span>{ticket?.typeName} </span>
          <span>{ticket?.name}</span>
          <div className="change__main__date">
            <DatePicker
              onGetDate={handleGetDate}
              type={1}
              date={
                ticket
                  ? {
                      day: ticket.usingDate.day,
                      month: ticket.usingDate.month,
                      year: ticket.usingDate.year,
                    }
                  : { day: 0, month: 0, year: 0 }
              }
            />
          </div>
        </div>
      </div>
      <div className="change__main__actions">
        <button className="button" onClick={() => dispatch(hiddenModal())}>
          Hủy
        </button>
        <button className="button button--fill" onClick={()=>dispatch(requestUpdateStatus(ticket as TicketListData))}>Lưu</button>
      </div>
    </div>
  );
};

export default ChangeDateModal;
