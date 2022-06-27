import { KeyBindings } from "@antv/xflow-core";
import {
  PackageListData,
  TicketListData,
  TicketPackage,
} from "../models/Ticket";
import { formatDate, formatTime } from "./dateTime";
export interface ExportData<T> {
  mapKey: FormatKey<T>;
  list: T[];
}

export type FormatKey<T> = { [K in keyof T]: string };

export const exportCSV = (
  exportData: ExportData<TicketListData | TicketPackage>,
  fileName: string,
  id: string
) => {
  const csv = "data:text/csv;charset=utf-8," + convertToString(exportData);

  const data = encodeURI(csv);

  const link = document.getElementById(id);

  if (link) {
    link.setAttribute("href", data);
    link.setAttribute("download", fileName);
  }
};

export const convertToString = (
  exportData: ExportData<TicketListData | TicketPackage>
) => {
  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const BOM = "\uFEFF";
  const { list, mapKey } = exportData;
  let result = "";

  if (list.length > 0) {
    const keys = Object.keys(list[0]);

    result += "STT,";
    keys.forEach((item, index) => {
      if (index !== keys.length - 1) {
        // @ts-ignore
        result += mapKey[item] + columnDelimiter;
      } else {
        // @ts-ignore
        result += mapKey[item] + lineDelimiter;
      }
    });

    list.forEach((item, index) => {
      result += index + 1 + columnDelimiter;
      keys.map((key, idx) => {
        // @ts-ignore
        const value = item[key];

        if (key.indexOf("ate") !== -1 || key.indexOf("ime") !== -1) {
          if (key.indexOf("ate") !== -1) {
            if (idx !== keys.length - 1) {
              result += formatDate(value) + columnDelimiter;
            } else {
              result += formatDate(value);
            }
          }
          if (key.indexOf("ime") !== -1) {
            if (idx !== keys.length - 1) {
              result += formatTime(value) + columnDelimiter;
            } else {
              result += formatTime(value);
            }
          }
        } else {
          if (idx !== keys.length - 1) {
            result += value + columnDelimiter;
          } else {
            result += value;
          }
        }
      });
      result += lineDelimiter;
    });
  }

  return BOM + result;
};
