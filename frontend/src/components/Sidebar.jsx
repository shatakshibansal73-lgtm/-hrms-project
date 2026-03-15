import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardCheck,
  FaChartBar
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function Sidebar() {

  const location = useLocation();

  const [stats, setStats] = useState({
    total_employees: 0,
    present_today: 0,
    absent_today: 0
  });

  useEffect(() => {
    axios.get(`${API_URL}/dashboard`)
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, []);

  const menuStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "6px",
    color: "white",
    textDecoration: "none",
    background: location.pathname === path ? "#10b981" : "transparent"
  });

  return (
    <div style={{
      width: "240px",
      background: "#0f172a",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingTop: "10px"
    }}>

      {/* TOP */}
      <div>
        <h4 style={{
          padding: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}>
          HRMS <span style={{ color: "#10b981" }}>Lite</span>
        </h4>

        <ul style={{ listStyle: "none", padding: "20px" }}>
          <li style={{ marginBottom: "10px" }}>
            <Link to="/" style={menuStyle("/")}>
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <Link to="/employees" style={menuStyle("/employees")}>
              <FaUsers /> Employees
            </Link>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <Link to="/attendance" style={menuStyle("/attendance")}>
              <FaClipboardCheck /> Attendance
            </Link>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <Link to="/reports" style={menuStyle("/reports")}>
              <FaChartBar /> Reports
            </Link>
          </li>
        </ul>
      </div>

      {/* SYSTEM STATS */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "40px"
      }}>
        <h6 style={{ marginBottom: "15px", color: "#94a3b8" }}>System Stats</h6>
        <div style={{ fontSize: "14px", marginBottom: "8px" }}>
          Total Employees : <b style={{ marginLeft: "5px" }}>{stats.total_employees}</b>
        </div>
        <div style={{ fontSize: "14px", marginBottom: "8px", color: "#22c55e" }}>
          Present Today : <b style={{ marginLeft: "5px" }}>{stats.present_today}</b>
        </div>
        <div style={{ fontSize: "14px", color: "#ef4444" }}>
          Absent Today : <b style={{ marginLeft: "5px" }}>{stats.absent_today}</b>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;