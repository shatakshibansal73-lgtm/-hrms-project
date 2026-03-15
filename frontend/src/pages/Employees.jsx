import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import axios from "axios";
import "../App.css";

const API_URL = process.env.REACT_APP_API_URL;

function Employees() {
  const [employees, setEmployees] = useState([]);

  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${API_URL}/employees`);
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const exportEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/export-employees`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "employees.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="employees-page">
      <h2 className="page-title">Employee Management</h2>
      <div className="employee-layout">
        {/* LEFT SIDE FORM */}
        <div className="employee-form-box">
          <h4>Add New Employee</h4>
          <EmployeeForm />
        </div>

        {/* RIGHT SIDE LIST */}
        <div className="employee-list-box">
          <div className="list-header">
            <h4>Employee List</h4>
            <button className="export-btn" onClick={exportEmployees}>
              Export
            </button>
          </div>

          {/* Pass employees as prop */}
          <EmployeeList employees={employees} />
        </div>
      </div>
    </div>
  );
}

export default Employees;