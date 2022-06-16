import { Routes, Route } from 'react-router-dom';
import Home from "../view/index";
import Check from "../view/checkTicket";
import TicketList from "../view/ticketList";
import Setting from "../view/setting";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ticketList" element={<TicketList />} />
      <Route path="/check" element={<Check />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  );
};

export default Router;