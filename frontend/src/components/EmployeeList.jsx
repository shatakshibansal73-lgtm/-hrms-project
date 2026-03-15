import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // change to your Render URL when deployed

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/employees`)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Emp ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
        </tr>
      </thead>

      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              No employees found
            </td>
          </tr>
        ) : (
          employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td> {/* Use 'id' from backend */}
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default EmployeeList;