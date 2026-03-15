import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/employees")
      .then((res) => {
        setEmployees(res.data);
      });
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

        {employees.map((emp) => (

          <tr key={emp.id}>
            <td>{emp.employee_id}</td>
            <td>{emp.full_name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
          </tr>

        ))}

      </tbody>

    </table>

  );
}

export default EmployeeList;