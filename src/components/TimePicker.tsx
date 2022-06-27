import React, { useState } from "react";
import { formatTime } from "../utils/dateTime";

interface Props {
  time: Time,
  onGetTime: (time: Time) => void
}

export interface Time {
  hour: number;
  minute: number;
  second: number;
}

const TimePicker = ({time, onGetTime}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="home__profit__date home__profit__time time__picker__main">
      <span onClick={() => setIsOpen(!isOpen)}>
        {time.hour === 0 && time.minute === 0 && time.second === 0
          ? "hh:mm:ss"
          : formatTime(time)}
      </span>
      <i className="bx bx-stopwatch"></i>

      <div
        className={
          isOpen ? "time__picker time__picker--display" : "time__picker"
        }
      >
        <div className="time__picker__item">
          {Array.from(new Array(24)).map((item, index) => (
            <span className={index === time.hour ? "active" : ""} key={index} onClick={() => onGetTime({ ...time, hour: index })}>
              {index < 10 ? `0${index}` : index}
            </span>
          ))}
        </div>
        <div className="time__picker__item">
          {Array.from(new Array(60)).map((item, index) => (
            <span
              key={index}
              onClick={() => onGetTime({ ...time, minute: index })}
              className={index === time.minute ? "active" : ""}
            >
              {index < 10 ? `0${index}` : index}
            </span>
          ))}
        </div>
        <div className="time__picker__item">
          {Array.from(new Array(60)).map((item, index) => (
            <span
              key={index}
              onClick={() => onGetTime({ ...time, second: index })}
              className={index === time.second ? "active" : ""}
            >
              {index < 10 ? `0${index}` : index}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
