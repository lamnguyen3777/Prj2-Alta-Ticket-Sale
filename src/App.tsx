import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllTickets, getChartData, revenue, revenueByDate } from "./api/crudData";
import { generateTicket, generateTicketPackages } from "./api/generateData";
import Content from "./components/Content";
import DatePicker from "./components/DatePicker";
import Filter from "./components/Filter";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import TicketModal from "./components/TicketModal";
import ChangeDateModal from "./components/TicketModal/ChangeDateModal";
import "antd/dist/antd.css";
import "./scss/app.scss";
import { ModalStatus } from "./slice/ModalSlice";
import { RootState } from "./store";
import { filter } from "./utils/filter";
import Loading from "./components/Loading";
import { getDateBefore } from "./utils/dateTime";

function App() {
  const modalState = useSelector((state: RootState) => state.modal.modalState);
  const filterParams = useSelector((state: RootState) => state.filter.filter);
  
  useEffect(() => {
    // filter({
    //   checkInPorts: ["c__c1"],
    //   status: 1,
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // generateTicket()
    // generateTicketPackages()

  }, []);

  const Layer = () => {
    return (
      <div
        className={
          modalState !== ModalStatus.HIDDEN_MODAL
            ? "layer layer--display"
            : "layer"
        }
      ></div>
    );
  };
  return (
    <div className="app">
      <Header />

      <div className="app__main">
        <SideBar />
        <Content />
      </div>
      <Layer />
      <Filter />
      <TicketModal />
      <ChangeDateModal/>
      <Loading/>
    </div>
  );
}

export default App;
