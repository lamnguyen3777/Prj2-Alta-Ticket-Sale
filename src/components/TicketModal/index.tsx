import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TicketPackage } from "../../models/Ticket";
import { editTicket } from "../../slice/EditSlice";
import { requestCreatePackage, requestUpdatePackage } from "../../slice/Filter/crudSlice";
import { hiddenModal, ModalStatus } from "../../slice/ModalSlice";
import { AppDispatch, RootState } from "../../store";
import { DateTime } from "../Calendar";
import Checkbox from "../Checkbox";
import DatePicker from "../DatePicker";
import TimePicker, { Time } from "../TimePicker";

type Props = {};

type InputForm = Required<TicketPackage>;

interface PackageTypes {
  check: number[];
}

const TicketModal = (props: Props) => {
  const modalState = useSelector((state: RootState) => state.modal.modalState);
  const editData = useSelector((state: RootState) => state.edit.edit);
  const isLoading = useSelector((state: RootState)=>state.crud.isLoading)
  const dispatch: AppDispatch = useDispatch();

  const initialForm: InputForm = {
    id: "",
    name: "",
    appliedDate: { day: 0, month: 0, year: 0 },
    expireDate: { day: 0, month: 0, year: 0 },
    appliedTime: { hour: 0, minute: 0, second: 0 },
    expireTime: { hour: 0, minute: 0, second: 0 },
    comboPrice: 0,
    quantityForCombo: 0,
    simplePrice: 0,
    status: 0,
  };
  const [inputForm, setInputForm] = useState<InputForm>({
    ...initialForm,
  });

  const [priceCheck,setPriceCheck] = useState<number[]>([]);

  const handleCheckType = (type: number) => {
    if (priceCheck.length === 0) {
     setPriceCheck([
       ...priceCheck,type
     ])
    } else {
      if (priceCheck.includes(type)) {
        setPriceCheck(
          [...priceCheck.filter((item) => item !== type)]
        )
      } else {
        setPriceCheck([
          ...priceCheck,type
        ])
      }
    }
  };

  const handleSubmitModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(priceCheck.length >= 1 && inputForm.name.trim() !== ""){
      if(editData.id === ''){
        // create package
        dispatch(requestCreatePackage(inputForm))
      }
      else{
        // edit package
        dispatch(requestUpdatePackage(inputForm))
      }
    }
  };

  useEffect(() => {
    const simplePrice = editData.simplePrice > 0 ? 1 : -1;
    const comboPrice = editData.quantityForCombo > 0 ? 2 : -1;
    setInputForm({
      ...inputForm,
      ...editData,
      
    });
    setPriceCheck(
      [simplePrice, comboPrice]
    )
  }, [editData]);

  const handleGetUsingDate = (date: DateTime) => {
    setInputForm({
      ...inputForm,
      appliedDate: date,
    });
  };
  const handleGetExpireDate = (date: DateTime) => {
    setInputForm({
      ...inputForm,
      expireDate: date,
    });
  };

  const handleGetAppliedTime = (time: Time) => {
    dispatch(
      editTicket({
        ...inputForm,
        appliedTime: time,
      })
    );
  };
  const handleGetExpireTime = (time: Time) => {
    dispatch(
      editTicket({
        ...inputForm,
        expireTime: time,
      })
    );
  };


  return (
    <form
      className={
        modalState === ModalStatus.ADD_MODAL ||
        modalState === ModalStatus.UPDATE_MODAL
          ? "ticket__modal ticket__modal--display"
          : "ticket__modal"
      }
      onSubmit={handleSubmitModal}
    >
      <p className="ticket__modal__title title__modal">
        {editData.id !== "" ? "C???p nh???t th??ng tin g??i" : "Th??m g??i v??"}
      </p>
      <div className="ticket__modal__name">
        {editData.id !== "" && (
          <div className="ticket__modal__name__item item__id">
            <h5 className="sub__title">
              M?? s??? ki???n <span>*</span>
            </h5>
            <input
              type="text"
              className="name__input"
              placeholder="Nh???p m?? s??? ki???n"
              value={inputForm.id}
              onChange={(e) =>
                setInputForm({ ...inputForm, id: e.target.value })
              }
            />
          </div>
        )}
        <div className="ticket__modal__name__item">
          <h5 className="sub__title">
            {editData.id !== "" ? "T??n s??? ki???n" : "T??n g??i v??"} <span>*</span>
          </h5>
          <input
            type="text"
            className="name__input"
            placeholder={
              editData.id !== "" ? "Nh???p t??n s??? ki???n" : "Nh???p t??n g??i v??"
            }
            value={inputForm.name}
            onChange={(e) =>
              setInputForm({ ...inputForm, name: e.target.value })
            }
          />
        </div>
      </div>
      <div className="ticket__modal__date">
        <div className="modal__date__item">
          <p className="sub__title">Ng??y ??p d???ng</p>
          <div className="modal__date__main">
            <div className="modal__date">
              <DatePicker
                onGetDate={handleGetUsingDate}
                type={1}
                date={inputForm.appliedDate}
                pos="bottom-right"
              />
            </div>
            <div className="modal__date">
              <TimePicker
                time={editData.appliedTime}
                onGetTime={handleGetAppliedTime}
              />
            </div>
          </div>
        </div>
        <div className="modal__date__item">
          <p className="sub__title">Ng??y h???t h???n</p>
          <div className="modal__date__main">
            <div className="modal__date">
              <DatePicker
                onGetDate={handleGetExpireDate}
                type={1}
                date={inputForm.expireDate}
                pos="bottom-left"  
              />
            </div>
            <div className="modal__date">
              <TimePicker
                time={editData.expireTime}
                onGetTime={handleGetExpireTime}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ticket__modal__price">
        <p className="sub__title modal__price__title">Gi?? v?? s??? d???ng</p>
        <div className="modal__price__item">
          <label htmlFor="simple__price">
            <div className="price__input__line">
              <Checkbox
                id="simple__price"
                isChecked={priceCheck.includes(1) ? true : false}
                value={"1"}
                text="V?? l??? (vn??/v??) v???i gi??"
                onChecked={() => handleCheckType(1)}
              />
              <input
                type="number"
                placeholder="Gi?? v??"
                className="ticket__price"
                value={inputForm.simplePrice > 0 ? inputForm.simplePrice : ""}
                onChange={(e) =>
                  setInputForm({
                    ...inputForm,
                    simplePrice: Number(e.target.value),
                  })
                }
                disabled={!priceCheck.includes(1)}
              />{" "}
              <span>/ v??</span>
            </div>
          </label>
        </div>
        <div className="modal__price__item">
          <label htmlFor="combo__price">
            <div className="price__input__line">
              <Checkbox
                id="combo__price"
                isChecked={
                  priceCheck.includes(2)
                    ? true
                    : false
                }
                value="2"
                text="Compo v?? v???i gi??"
                onChecked={() => handleCheckType(2)}
              />
              <input
                type="number"
                placeholder="Gi?? v??"
                className="ticket__price"
                value={inputForm.comboPrice > 0 ? inputForm.comboPrice : ""}
                onChange={(e) =>
                  setInputForm({
                    ...inputForm,
                    comboPrice: Number(e.target.value),
                  })
                }
                disabled={!priceCheck.includes(2)}
              />{" "}
              <span>/</span>
              <input
                type="number"
                placeholder="S???"
                className="ticket__price--short"
                value={
                  inputForm.quantityForCombo > 0
                    ? inputForm.quantityForCombo
                    : ""
                }
                onChange={(e) =>
                  setInputForm({
                    ...inputForm,
                    quantityForCombo: Number(e.target.value),
                  })
                }
                disabled={!priceCheck.includes(2)}
              />{" "}
              <span> v??</span>
            </div>
          </label>
        </div>
        <div className="ticket__modal__status">
          <p className="sub__title">T??nh tr???ng</p>
          <select
            onChange={(e) =>
              setInputForm({ ...inputForm, status: Number(e.target.value) })
            }
            value={inputForm.status}
          >
            <option value={0}>??ang ??p d???ng</option>
            <option value={1}>T???t</option>
          </select>
        </div>
        <p className="ticket__modal__note">
          <span>*</span> l?? th??ng tin b???t bu???c
        </p>
        <div className="ticket__modal__actions">
          <button className="button" type="button" onClick={() => dispatch(hiddenModal())}>
            H???y
          </button>
          <button className="button button--fill" type="submit">L??u</button>
        </div>
      </div>
    </form>
  );
};

export default TicketModal;
