import { DateTime, DateType } from "../components/Calendar";
import { Time } from "../components/TimePicker";

const isLessThan = (number: number, compare: number) => {
  if (number < compare) {
    return true;
  }
  return false;
};
const convert = (number: number, split: string) => {
  let rs = "";
  if (isLessThan(number, 10)) {
    rs += `0${number}${split}`;
  } else {
    rs += `${number}${split}`;
  }
  return rs;
};
export const formatTime = (time: Time) => {
  let rs = "";

  rs += convert(time.hour, ":");
  rs += convert(time.minute, ":");
  rs += convert(time.second, "");

  return rs;
};
export const formatDate = (date: DateTime) => {
  let rs = "";

  rs += convert(date.day, "/");
  rs += convert(date.month, "/");
  rs += convert(date.year, "");

  return rs;
};

export const compareTo = (dateFrom: DateTime, dateTo: DateTime) => {
  if (dateFrom.year > dateTo.year) {
    return false;
  } else if (dateFrom.year === dateTo.year) {
    if (dateFrom.month > dateTo.month) {
      return false;
    } else if (dateFrom.month === dateTo.month) {
      if (dateFrom.day > dateTo.day) {
        return false;
      }
    }
  }
  return true;
};

export const getNow = () => {
  return {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
};

export const getDaysOfMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};
export const getDateBefore = (date: DateTime, numberOfDays: number) => {
  const { day, month, year } = date;

  const daysOfPrevMonth = getDaysOfMonth(month - 1, year);

  let temp = day;
  let days: DateType[] = [];
  let type = 0;
  for (let i = day; i > day - numberOfDays; i--) {
    if (temp > 0) {
      days.push({ type: type, value: temp });
    } else {
      temp = daysOfPrevMonth;
      type = -1;
      days.push({
        type: type,
        value: temp,
      });
    }
    temp--;
  }

  return days;
};
export const getCurrency = (currencies: number[]) => {
  const max = Math.max(...currencies);
  if (max < 1000000) {
    return "VNĐ";
  }
  return "tr";
};

export const convertRevenue = (number: number) =>{
  if(number >= 1000000){
    return Math.floor(number/1000000)
  }
  return number;
}
