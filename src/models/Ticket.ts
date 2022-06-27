import { DateTime } from "../components/Calendar";
interface Date {
    day: number;
    month: number;
    year: number;
  }
  interface Time {
    hour: number;
    minute: number;
    second: number;
  }
  
export interface TicketListData {
    bookingCode: string;
    ticketNumber: number;
    name: string;
    status: number;
    usingDate: Date;
    exportDate: Date;
    checkInPort: number;
    checkStatus: number
    typeName: string;
  }
  export interface CheckingTicketData {
    ticketNumber: string;
    usingDate: Date;
    typeName: string;
    checkInPort: number;
    status: number;
  }
  
  export interface PackageListData {
    packageID: string;
    packageName: string;
    applyDate: Date & Time;
    expireDate: Date & Time;
    ticketPrice: number;
    comboPrice: number;
    status: number;
  }

  export interface TicketPackage {
    id: string;
    name: string;
    appliedDate: DateTime;
    appliedTime: Time;
    expireDate: DateTime;
    expireTime: Time;
    status: number;
    simplePrice: number;
    comboPrice: number;
    quantityForCombo: number;
  }
  
  