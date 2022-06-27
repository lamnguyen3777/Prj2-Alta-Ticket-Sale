import React from "react";
import { Route, Routes } from "react-router";
import { RoutePath } from "../../constants/routes";
import CheckTicket from "../../pages/CheckTicket";
import Home from "../../pages/Home";
import TicketList from "../../pages/TicketList";
import PackageList from "../PackageList";

interface Props {}

const Content = (props: Props) => {
  return (
    <>
      <Routes>
        <Route path={RoutePath.HOME_PAGE} element={<Home />} />
        <Route path={RoutePath.TICKET_MANAGE_PAGE} element={<TicketList />} />
        <Route path={RoutePath.TICKET_CHECK_PAGE} element={<CheckTicket />} />
        <Route path={RoutePath.PACKAGE_PAGE} element={<PackageList />} />
      </Routes>
    </>
  );
};

export default Content;
