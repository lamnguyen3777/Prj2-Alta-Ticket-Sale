import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Calendar, { DateTime, DateType } from "./Calendar";

export type PickerPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
interface Props {
  onGetDate: (date: DateTime) => void;
  type: 0 | 1;
  date: DateTime;
  pos?: PickerPosition;
  onGetWeek?: (days: DateType[]) => void;
  onResetDate?: () => void;
}

interface Position {
  x: number;
  y: number;
}

const DatePicker = ({
  onGetDate,
  type,
  date,
  pos,
  onGetWeek,
  onResetDate,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [position, setPosition] = useState<Position>({ x: 0, y: 30 });

  const handleGetDate = (date: DateTime) => {
    setIsOpen(false);
    onGetDate(date);
  };

  const handleOpen = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setIsOpen(!isOpen);
  };

  const handleGetWeek = (days: DateType[]) => {
    onGetWeek && onGetWeek(days);
  };

  const handleResetDate = () => {
    onResetDate && onResetDate();
  };

  return (
    <div className="home__profit__date calendar" id="calender">
      <span onClick={handleOpen}>
        {date.day !== 0 && type !== 0 ? (
          <>
            {date.day < 10 ? `0${date.day}` : date.day}/
            {date.month < 10 ? `0${date.month}` : date.month}/{date.year}
          </>
        ) : (
          <>
            {date.month === 0 ? (
              <>
                Tháng {new Date().getMonth() + 1}, {new Date().getFullYear()}
              </>
            ) : (
              <>
                Tháng {date.month}, {date.year}
              </>
            )}
          </>
        )}
      </span>
      {onResetDate && (
        <i className="bx bx-x-circle date__close" onClick={handleResetDate}></i>
      )}
      <i
        className={`bx bx-calendar-alt ${onResetDate ? "date__icon" : ""}`}
      ></i>
      <Calendar
        top={position.y + 5}
        left={position.x}
        onGetDate={handleGetDate}
        isOpen={isOpen}
        pos={pos}
        onGetWeek={handleGetWeek}
      />
    </div>
  );
};

export default DatePicker;
