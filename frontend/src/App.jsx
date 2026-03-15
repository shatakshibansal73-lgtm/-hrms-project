import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports"

function App() {

  return (

    <BrowserRouter>

      <div className="d-flex">

        <Sidebar />

        <div className="flex-grow-1">

          <Navbar />

          <div className="container mt-3">

            <Routes>

              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/reports" element={<Reports/>}/>

            </Routes>

          </div>

        </div>

      </div>

    </BrowserRouter>

  );

}

export default App;