import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  doc,
  updateDoc,
  setDoc,
  where,
} from "firebase/firestore";
import { FilterInput } from "../components/Filter";
import { TicketListData, TicketPackage } from "../models/Ticket";
import { db } from "./fbConfig";
import { RefType } from "./generateData";
import { CollectionReference, DocumentData } from "firebase/firestore";
import { LineChart } from "../pages/Home/LineChart";
import { DateTime } from "../components/Calendar";

interface TicketStatus {
  used: number;
  unused: number;
}
export interface ChartType {
  familyPackages: TicketStatus;
  eventPackages: TicketStatus;
}

export const getAllTickets = (): Promise<TicketListData[]> => {
  let result: TicketListData[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      const ticketRef = await getDocs(collection(db, RefType.TICKET_DOCS));

      ticketRef.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data() as TicketListData;
          result = [...result, data];

          if (result.length === ticketRef.size) {
            resolve(result);
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllPackages = (): Promise<TicketPackage[]> => {
  let result: TicketPackage[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      const ticketRef = await getDocs(collection(db, RefType.PACKAGES_DOCS));

      ticketRef.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data() as TicketPackage;

          data.id = doc.id;

          result = [...result, data];

          if (result.length === ticketRef.size) {
            resolve(result);
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const convertPort = (portName: string) => {
  switch (portName) {
    case "c__c1":
      return 1;
    case "c__c2":
      return 2;
    case "c__c3":
      return 3;
    case "c__c4":
      return 4;
    case "c__c5":
      return 5;
    default:
      return 0;
  }
};
export const convertPorts = (checkInPorts: string[]) => {
  let rs: number[] = [];
  for (let i = 0; i < checkInPorts.length; i++) {
    rs.push(convertPort(checkInPorts[i]));
  }
  return rs;
};
export const filter = (
  filterParams: FilterInput
): Promise<TicketListData[]> => {
  return new Promise(async (resolve, reject) => {
    let result: TicketListData[] = [];
    const { dateFrom, dateTo, checkInPorts, status } = filterParams;
    try {
      const ticketsRef = collection(db, RefType.TICKET_DOCS);
      let q;
      if (checkInPorts === "0") {
        q = query(
          ticketsRef,
          where("checkInPort", "in", [1, 2, 3, 4, 5]),
          where("status", "==", status)
        );
      } else {
        q = query(
          ticketsRef,
          where("checkInPort", "in", checkInPorts),
          where("status", "==", status)
        );
      }

      const dataRef = await getDocs(q);

      dataRef.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data() as TicketListData;
          result = [...result, data];

          if (dataRef.size === result.length) {
            resolve(result);
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getChartDataHelper = (
  typeName: string,
  ref: CollectionReference<DocumentData>,
  month: number,
  year: number,
  status: number
) => {
  return query(
    ref,
    where("name", "==", typeName),
    where("appliedDate.month", "==", month),
    where("appliedDate.year", "==", year),
    where("status", "==", status)
  );
};
export const getChartData = (
  month: number,
  year: number
): Promise<ChartType> => {
  return new Promise(async (resolve, reject) => {
    const packageRef = collection(db, RefType.PACKAGES_DOCS);

    const qUsedFamily = getChartDataHelper(
      "Gói gia đình",
      packageRef,
      month,
      year,
      0
    );
    const qUnusedFamily = getChartDataHelper(
      "Gói gia đình",
      packageRef,
      month,
      year,
      1
    );
    const qUsedEvent = getChartDataHelper(
      "Gói sự kiện",
      packageRef,
      month,
      year,
      0
    );
    const qUnusedEvent = getChartDataHelper(
      "Gói sự kiện",
      packageRef,
      month,
      year,
      1
    );

    try {
      const familyUsedRef = await getDocs(qUsedFamily);
      const familyUnusedRef = await getDocs(qUnusedFamily);
      const eventUsedRef = await getDocs(qUsedEvent);
      const eventUnusedRef = await getDocs(qUnusedEvent);

      resolve({
        familyPackages: {
          used: familyUsedRef.size,
          unused: familyUnusedRef.size,
        },
        eventPackages: {
          used: eventUsedRef.size,
          unused: eventUnusedRef.size,
        },
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const updatePackage = (ticket: TicketPackage): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const packageRef = doc(db, RefType.PACKAGES_DOCS, ticket.id);
    console.log(ticket.id);
    try {
      await updateDoc(packageRef, { ...ticket });
      resolve(true);
    } catch (error) {
      reject(false);
    }
  });
};
export const createPackage = (
  ticket: TicketPackage
): Promise<TicketPackage | boolean> => {
  return new Promise(async (resolve, reject) => {
    let id = "ALTA";
    for (let i = 0; i < 5; i++) {
      id += Math.floor(Math.random() * 10);
    }
    const packageRef = doc(db, RefType.PACKAGES_DOCS, id);

    try {
      await setDoc(packageRef, { ...ticket, id });
      resolve({
        ...ticket,
        id: id,
      });
    } catch (error) {
      reject(false);
    }
  });
};
export const createTicket = (
  ticket: TicketPackage
): Promise<TicketPackage | boolean> => {
  return new Promise(async (resolve, reject) => {
    let id = "ALTA";
    for (let i = 0; i < 5; i++) {
      id += Math.floor(Math.random() * 10);
    }
    const packageRef = doc(db, RefType.TICKET_DOCS, id);

    try {
      await setDoc(packageRef, { ...ticket, id });
      resolve({
        ...ticket,
        id: id,
      });
    } catch (error) {
      reject(false);
    }
  });
};
export const revenueByDate = (
  day: number,
  month: number,
  year: number
): Promise<LineChart> => {
  return new Promise(async (resolve, reject) => {
    const packageRef = collection(db, RefType.PACKAGES_DOCS);
    let revenue = 0;

    const q = query(
      packageRef,
      where("appliedDate.day", "==", day),
      where("appliedDate.month", "==", month),
      where("appliedDate.year", "==", year)
    );

    try {
      const dataRef = await getDocs(q);

      let count = 0;
      dataRef.forEach((doc) => {
        count++;
        if (doc.exists()) {
          const data = doc.data() as TicketPackage;
          revenue += data.simplePrice + data.comboPrice;
        }
        if (count === dataRef.size) {
          resolve({
            day: `${day}/${month}/${year}`,
            revenue,
          });
        }
      });
      if (dataRef.size === 0) {
        resolve({
          day: `${day}/${month}/${year}`,
          revenue: 0,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const revenue = (dateTime: DateTime[]): Promise<LineChart[]> => {
  return new Promise(async (resolve, reject) => {
    let result: LineChart[] = [];
    dateTime.forEach((item) => {
      revenueByDate(item.day, item.month, item.year)
        .then((res) => {
          result.push(res);

          if (dateTime.length === result.length) {
            resolve(result);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};

export const updateTicketStatus = (
  ticket: TicketListData
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const ticketRef = doc(db, RefType.TICKET_DOCS, ticket.bookingCode);

    try {
      await updateDoc(ticketRef, {
        ...ticket,
        status: 0,
      });
      resolve(true);
    } catch (error) {
      reject(false);
    }
  });
};
