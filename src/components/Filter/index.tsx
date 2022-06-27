import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../slice/Filter/filterSlice";
import { hiddenModal, ModalStatus } from "../../slice/ModalSlice";
import { RootState } from "../../store";
import Calendar, { DateTime } from "../Calendar";
import Checkbox from "../Checkbox";
import DatePicker from "../DatePicker";
import Radio from "../Radio";

type Props = {};

export type CheckItem = "1" | "2" | "3" | "4" | "5";

export type CheckAll = "0";

type CheckType = CheckAll | CheckItem[];

export interface FilterInput {
  dateFrom?: DateTime;
  dateTo?: DateTime;
  status: number;
  checkInPorts: CheckType;
}

const Filter = (props: Props) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal.modalState);
  const [radioValue, setRadioValue] = useState<number>(-1);
  const fakeDate = {day: 0, month: 0, year: 0};
  const [filterForm, setFilterForm] = useState<FilterInput>({
    status: -1,
    checkInPorts: "0",
    dateFrom: fakeDate,
    dateTo: fakeDate,
  });

  const handleFilter = () => {
    dispatch(filter({
      ...filterForm
    }))
    dispatch(hiddenModal())
  };

  const handleGetChecked = (value: string) => {
    if (value === "0") {
      if (filterForm.checkInPorts === "0") {
        setFilterForm({
          ...filterForm,
          checkInPorts: [],
        });
      
      } else {
        setFilterForm({
          ...filterForm,
          checkInPorts: value,
        });
    
      }
    } else {
      let newCheckList = [...(filterForm.checkInPorts as CheckItem[])];
      const isChecked = filterForm.checkInPorts.includes(value as CheckItem);

      if (filterForm.checkInPorts === "0") {
        newCheckList = [];
      }
      if (newCheckList.length === 4) {
        setFilterForm({
          ...filterForm,
          checkInPorts: "0",
        });
     
      } else {
        if (isChecked) {
          setFilterForm({
            ...filterForm,
            checkInPorts: [...newCheckList.filter((item) => item !== value)],
          });
       
        } else {
          setFilterForm({
            ...filterForm,
            checkInPorts: [
              ...(newCheckList as CheckItem[]),
              value as CheckItem,
            ],
          });
          
        }
      }
    }
  };

  const handleGetRadioValue = (value: number) => {
    
    setRadioValue(value);
    setFilterForm({
      ...filterForm,
      status: value,
    });
  };

  const handleGetDateFrom = (date: DateTime) => {
    setFilterForm({
      ...filterForm,
      dateFrom: date,
    });
    

  };
  const handleGetDateTo = (date: DateTime) => {
   
    setFilterForm({
      ...filterForm,
      dateTo: date,
    });
  };
  const handleResetDateFrom = () =>{
    setFilterForm({
      ...filterForm,
      dateFrom: fakeDate
    })
  }
  const handleResetDateTo = () =>{
    setFilterForm({
      ...filterForm,
      dateTo: fakeDate
    })
  }
  return (
    <div
      className={
        modalState === ModalStatus.FILTER_MODAL
          ? "filter filter--display"
          : "filter"
      }
    >
      <p className="filter__title">Lọc vé</p>
      <div className="filter__date">
        <div className="filter__from">
          <p className="filter__sub__title">Từ ngày</p>
          <DatePicker onGetDate={handleGetDateFrom} type={1} date={filterForm.dateFrom as DateTime} pos="bottom-right" onResetDate={handleResetDateFrom}/>
        </div>
        <div className="filter__from">
          <p className="filter__sub__title">Đến ngày</p>
          <DatePicker onGetDate={handleGetDateTo} type={1} date={filterForm.dateTo as DateTime} pos="bottom-left" onResetDate={handleResetDateTo}/>
        </div>
      </div>
      <div className="filter__status">
        <p className="filter__sub__title">Tình trạng sử dụng</p>
        <div className="filter__radio">
          <Radio
            id="all"
            name="filter__status"
            value={-1}
            isChecked={radioValue === -1 ? true : false}
            onChecked={handleGetRadioValue}
            text="Tất cả"
          />
          <Radio
            id="used"
            name="filter__status"
            value={0}
            isChecked={radioValue === 0 ? true : false}
            onChecked={handleGetRadioValue}
            text="Đã sử dụng"
          />
          <Radio
            id="unused"
            name="filter__status"
            value={1}
            isChecked={radioValue === 1 ? true : false}
            onChecked={handleGetRadioValue}
            text="Chưa sử dụng"
          />
          <Radio
            id="expire"
            name="filter__status"
            value={2}
            isChecked={radioValue === 2 ? true : false}
            onChecked={handleGetRadioValue}
            text="Hết hạn"
          />
        </div>
      </div>
      <div className="filter__checking">
        <p className="filter__sub__title">Cổng Check - in</p>
        <div className="filter__checking__checkboxs">
          <Checkbox
            id="0"
            isChecked={filterForm.checkInPorts === "0" ? true : false}
            text="Tất cả"
            value="0"
            onChecked={handleGetChecked}
          />
          <Checkbox
            id="1"
            isChecked={filterForm.checkInPorts.includes("1")}
            text="Cổng 1"
            value="1"
            onChecked={handleGetChecked}
          />
          <Checkbox
            id="2"
            isChecked={filterForm.checkInPorts.includes("2")}
            text="Cổng 2"
            value="2"
            onChecked={handleGetChecked}
          />
          <Checkbox
            id="3"
            isChecked={filterForm.checkInPorts.includes("3")}
            text="Cổng 3"
            value="3"
            onChecked={handleGetChecked}
          />
          <Checkbox
            id="4"
            isChecked={filterForm.checkInPorts.includes("4")}
            text="Cổng 4"
            value="4"
            onChecked={handleGetChecked}
          />
          <Checkbox
            id="5"
            isChecked={filterForm.checkInPorts.includes("5")}
            text="Cổng 5"
            value="5"
            onChecked={handleGetChecked}
          />
        </div>
      </div>
      <button className="filter__btn" onClick={handleFilter}>
        Lọc
      </button>
    </div>
  );
};

export default Filter;
