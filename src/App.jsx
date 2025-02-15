import { BrowserRouter, Route, Routes } from "react-router-dom";
import Events from "./component/Events";
import About from "./component/About";
import Layout from "./component/Layout";
import AllTickets from "./component/AllTickets";


export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/my-tickets" element={<AllTickets />} />
          <Route path="/about-project" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
