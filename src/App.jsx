import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import List from "./Pages/List";
import Create from "./Pages/Create";
import Update from "./Pages/Update";
import Delete from "./Pages/Delete";
import NoMatch from "./Pages/NoMatch";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
