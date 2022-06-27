import { convertPort, convertPorts } from "../api/crudData";
import { CheckItem, FilterInput } from "../components/Filter";
import { TicketListData, TicketPackage } from "../models/Ticket";
import { CheckingFilter } from "../pages/CheckTicket";
import { compareTo } from "./dateTime";

export const filter = (filterParams: FilterInput, list: TicketListData[]) => {
  const { checkInPorts, status, dateFrom, dateTo } = filterParams;
  let rs: TicketListData[] = [];
  rs = list.filter((item) => {
    if (checkInPorts !== "0") {
      return checkInPorts.includes(item.checkInPort.toString() as CheckItem);
    } else {
      return list;
    }
  });
  if (status === -1) {
  } else {
    rs = rs.filter((item) => item.status === status);
  }
  if (dateFrom && dateTo) {
    if (dateFrom.day !== 0 && dateTo.day !== 0) {
      rs = rs.filter(
        (item) =>
          compareTo(item.usingDate, dateTo) &&
          compareTo(dateFrom, item.usingDate)
      );
    }
  }

  return rs;
};

export const search = (key: string, list: TicketListData[]) => {
  if (key.trim() !== "") {
    return list.filter(
      (item) => item.ticketNumber.toString().indexOf(key) !== -1
    );
  }
  return list;
};
export const searchPackage = (key: string, list: TicketPackage[]) => {
  if (key.trim() !== "") {
    return list.filter((item) => item.id.toString().indexOf(key) !== -1);
  }
  return list;
};

export const filterCheckingList = (
  filterParams: CheckingFilter,
  list: TicketListData[]
) => {
  let result: TicketListData[] = [];
  const { searchKey, dateFrom, dateTo, status } = filterParams;

  if (status === -1) {
    result = list;
  } else {
    result = list.filter((item) => item.checkStatus === status);
  }
  if (dateFrom && dateTo) {
    if (dateFrom.day !== 0 && dateTo.day !== 0) {
      result = result.filter(
        (item) =>
          compareTo(item.usingDate, dateTo) &&
          compareTo(dateFrom, item.usingDate)
      );
    }
  }

  return result;
};
