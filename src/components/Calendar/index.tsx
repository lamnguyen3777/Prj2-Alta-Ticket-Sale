import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PickerPosition } from "../DatePicker";
import Radio from "../Radio";

interface Props {}
type DateOption = 0 | 1;
// 0 is day and 1 is week
export interface DateTime {
  day: number;
  month: number;
  year: number;
}
interface OtherTime {
  prev: number;
  next: number;
}

enum DateEnumType {
  NOW = 0,
  BEFORE = -1,
  AFTER = 1,
}

interface DateTimeAndWeek {
  dateTime: DateTime;
  weeks: DateType[];
}

export interface DateType {
  type: DateEnumType;
  value: number;
}
export interface Position {
  top: number;
  left: number;
  onGetDate: (date: DateTime) => void;
  isOpen: boolean;
  pos?: PickerPosition;
  onGetWeek?: (days: DateType[]) => void;
}
const Calendar = ({
  top,
  left,
  onGetDate,
  isOpen,
  pos,
  onGetWeek,
}: Position) => {
  const [option, setOptions] = useState<number>(0);

  const dispatch = useDispatch();

  const handleGetRadio = (value: number) => {
    value !== option && setOptions(value);
  };

  const [dateTimeList, setDateTimeList] = useState<DateType[]>([]);

  const getDaysOfMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const [dateTime, setDateTime] = useState<DateTime>(() => {
    const dateNow = new Date();

    const month = dateNow.getMonth() + 1;

    const year = dateNow.getFullYear();

    const day = dateNow.getDate();

    return {
      day,
      month,
      year,
    };
  });

  const prevDay = getDaysOfMonth(dateTime.year, dateTime.month - 1);

  const [prevDate, setPrevDate] = useState<OtherTime>(() => {
    const prevDate = new Date(
      dateTime.year,
      dateTime.month - 1,
      prevDay
    ).getDay();

    const nextDate = new Date(
      getDaysOfMonth(dateTime.year, dateTime.month)
    ).getDay();

    return {
      prev: prevDate + 1,
      next: 7 - nextDate,
    };
  });

  useEffect(() => {
    const prevClone = { ...dateTime };
    const nextClone = { ...dateTime };
    if (prevClone.month > 1) {
      prevClone.month = prevClone.month - 1;
    } else {
      prevClone.month = 12;
      prevClone.year = prevClone.year - 1;
    }
    // if (nextClone.month > 11) {
    //   nextClone.month = 1;
    //   nextClone.year = nextClone.year + 1;
    // } else {
    //   nextClone.month = nextClone.month + 1;
    // }

    const prevDate =
      new Date(prevClone.year, prevClone.month - 1, prevDay).getDay() + 1;

    const nextDate = new Date(
      nextClone.year,
      nextClone.month - 1,
      getDaysOfMonth(nextClone.year, nextClone.month)
    ).getDay();

    setPrevDate({ prev: prevDate, next: nextDate > 0 ? 7 - nextDate : 0 });
  }, [dateTime]);

  const getDateFromPrevDate = () => {
    const rs = [];
    for (let i = prevDay; i > prevDay - prevDate.prev + 1; i--) {
      rs.push(i);
    }

    return rs.reverse();
  };

  const handleChangeMonth = (type: -1 | 1) => {
    switch (type) {
      case -1:
        if (dateTime.month > 1) {
          setDateTime({ ...dateTime, month: dateTime.month - 1 });
        } else {
          setDateTime({ ...dateTime, month: 12, year: dateTime.year - 1 });
        }
        break;
      case 1:
        if (dateTime.month > 11) {
          setDateTime({ ...dateTime, month: 1, year: dateTime.year + 1 });
        } else {
          setDateTime({ ...dateTime, month: dateTime.month + 1 });
        }
        break;
      default:
        return dateTime;
    }
  };

  const handleChooseDate = (index: number) => {
    onGetDate({ ...dateTime, day: index });
    setDateTime({ ...dateTime, day: index });
  };

  useEffect(() => {
    if (pos) {
      const datePicker = document.getElementById("date__picker");
      if (datePicker) {
        datePicker.style.width = "fit-content";
        switch (pos) {
          case "bottom-left":
            datePicker.style.top = "40px";
            // datePicker.style.left = "0";
            // datePicker.style.bottom = "unset";
            // datePicker.style.right = "unset";
            break;
          case "top-left":
            datePicker.style.bottom = "calc(100% + 5px)";
            // datePicker.style.top = "unset";
            datePicker.style.left = "0";
            // datePicker.style.right = "unset";
            // datePicker.style.width = "fit-content";
            break;
          case "bottom-right":
            datePicker.style.top = "40px";
            datePicker.style.right = "0";
            // datePicker.style.bottom = "unset";
            // datePicker.style.left = "unset";
            // datePicker.style.width = "fit-content";
            break;
          case "top-right":
            datePicker.style.bottom = "calc(100% + 5px)";
            // datePicker.style.left = "unset";
            // datePicker.style.top = "unset";
            datePicker.style.right = "0";
            break;

          default:
            break;
        }
      }
    }
  }, []);

  const isSameDate = (day: number) => {
    return (
      new Date().getFullYear() === dateTime.year &&
      new Date().getMonth() + 1 === dateTime.month &&
      new Date().getDate() === day
    );
  };

  useEffect(() => {
    let dateList: DateType[] = [];
    const prevList = getDateFromPrevDate().map((item) => {
      return {
        type: DateEnumType.BEFORE,
        value: item,
      };
    });
    dateList = [...dateList, ...prevList];

    const daysOfMonth = getDaysOfMonth(dateTime.year, dateTime.month);

    const nowList = Array.from(new Array(daysOfMonth)).map((item, index) => {
      return {
        type: DateEnumType.NOW,
        value: index + 1,
      };
    });

    dateList = [...dateList, ...nowList];

    const nextList = Array.from(new Array(prevDate.next)).map(
      (number, index) => {
        return {
          type: DateEnumType.AFTER,
          value: index + 1,
        };
      }
    );

    dateList = [...dateList, ...nextList];

    setDateTimeList(dateList);
  }, [dateTime, prevDate]);

  const handleGetWeek = (days: DateType[]) => {
    if (option === 1) {
      onGetWeek && onGetWeek(days);
    } else {
      onGetWeek && onGetWeek(dateTimeList);
    }
  };

  const renderDateList = () => {
    let content = [];
    let count = 7;
    for (let i = 0; i < Math.ceil(dateTimeList.length / 7); i++) {
      content.push(
        <tr
          className={option === 0 ? "date--date" : "date--week"}
          onClick={() => handleGetWeek(dateTimeList.slice(i * 7, i * 7 + 7))}
        >
          {dateTimeList.slice(i * 7, count).map((item, index) => (
            <td
              key={index}
              onClick={() => handleChooseDate(item.value)}
              className={`${
                item.type !== DateEnumType.NOW ? "date--none" : ""
              } ${
                index === dateTimeList.slice(i * 7, count).length - 1 ||
                index === 0
                  ? "active"
                  : ""
              }`}
            >
              <span>{item.value}</span>
            </td>
          ))}
        </tr>
      );
      count += 7;
    }
    return content;
  };

  return (
    <>
      <div
        className={
          isOpen ? "date__picker date__picker--display" : "date__picker"
        }
        id="date__picker"
      >
        <div className="date__picker__header">
          <i
            className="bx bxs-chevron-left"
            onClick={() => handleChangeMonth(-1)}
          ></i>
          <span>
            Tháng {dateTime.month}, {dateTime.year}
          </span>
          <i
            className="bx bxs-chevron-right"
            onClick={() => handleChangeMonth(1)}
          ></i>
        </div>
        <div className="date__picker__options">
          <Radio
            id="day__picker"
            value={0}
            isChecked={option === 0 ? true : false}
            onChecked={handleGetRadio}
            name="picker"
            text="Theo ngày"
          />
          <Radio
            id="week__picker"
            value={1}
            isChecked={option === 1 ? true : false}
            onChecked={handleGetRadio}
            name="picker"
            text="Theo tuần"
          />
        </div>

        <table className="date__picker__head">
          <thead>
            <tr>
              <td>T2</td>
              <td>T3</td>
              <td>T4</td>
              <td>T5</td>
              <td>T6</td>
              <td>T7</td>
              <td>CN</td>
            </tr>
          </thead>
        </table>
        <table className="date__picker__table">
          <tbody>{renderDateList()}</tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
