import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { TicketListData, TicketPackage } from "../models/Ticket";
import { db } from "./fbConfig";
export enum RefType {
  TICKET_DOCS = "tickets",
  PACKAGES_DOCS = "packages",
}
// export const createTicket = async (ticket: TicketListData) => {
//   const ticketRef = collection(db, RefType.TICKET_DOCS);
//   try {
//     const docRef = await addDoc(ticketRef, ticket);
//     if (docRef.id) {
//       return true;
//     }
//   } catch (error) {
//     return false;
//   }
// };
export const createPackage = async (ticket: TicketPackage) => {
  let rdID = "ALTA";
  for (let j = 0; j < 5; j++) {
    rdID += Math.floor(Math.random() * 9);
  }
  const ticketRef = doc(db, RefType.PACKAGES_DOCS, rdID);

  try {
    await setDoc(ticketRef, {
      ...ticket,
      id: rdID,
    });
    return true;
  } catch (error) {
    return false;
  }
};
export const createTicket = async (ticket: TicketListData) => {
  const ticketRef = doc(db, RefType.TICKET_DOCS, ticket.bookingCode);

  try {
    await setDoc(ticketRef, {
      ...ticket,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const generateTicket = () => {
  for (let i = 5; i < 53; i++) {
    let ticketNumber = "";
    let rdID = "ALTA";
    for (let a = 0; a < 5; a++) {
      rdID += Math.floor(Math.random() * 9);
    }
    for (let j = 0; j < 5; j++) {
      ticketNumber += Math.floor(Math.random() * 10);
    }
    createTicket({
      bookingCode: rdID,
      checkInPort: Math.floor(Math.random() * 5) + 1,
      exportDate: {
        day: Math.floor(Math.random() * 31) + 1,
        month: Math.floor(Math.random() * 12) + 1,
        year: new Date().getFullYear(),
      },
      name: "Hội chợ triễn lãm " + i + 1,
      status: Math.floor(Math.random() * 3),
      ticketNumber: Number(ticketNumber),
      usingDate: {
        day: Math.floor(Math.random() * 31) + 1,
        month: Math.floor(Math.random() * 12) + 1,
        year: new Date().getFullYear(),
      },
      checkStatus: Math.floor(Math.random() * 2),
      typeName: "Vé cổng",
    });
  }
};

export const generateTicketPackages = () => {
  for (let i = 0; i < 32; i++) {
    let rdID = "";
    for (let j = 0; j < 5; j++) {
      rdID += Math.floor(Math.random() * 9);
    }
    let rdName = ["Gói gia đình", "Gói sự kiện"];
    const simplePrice = Math.floor(Math.random() * 100) * 1000 + 15;
    const quantity = Math.floor(Math.random() * 5) + 1;
    createPackage({
      id: "ALTA" + rdID,
      name: rdName[Math.floor(Math.random() * 2)],
      appliedDate: {
        day: Math.floor(Math.random() * 31) + 1,
        month: Math.floor(Math.random() * 12) + 1,
        year: new Date().getFullYear(),
      },
      expireDate: {
        day: Math.floor(Math.random() * 31) + 1,
        month: Math.floor(Math.random() * 12) + 1,
        year: new Date().getFullYear(),
      },
      appliedTime: {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        second: Math.floor(Math.random() * 60),
      },
      expireTime: {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        second: Math.floor(Math.random() * 60),
      },
      status: Math.floor(Math.random() * 2),
      simplePrice: simplePrice,
      quantityForCombo: quantity,
      comboPrice: simplePrice * quantity,
    });
  }
};
