import { useState } from "react";
import axios from "axios";

function EmployeeForm() {

  const [employee, setEmployee] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const API_URL = process.env.REACT_APP_API_URL; 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/employees`, employee);
      alert("Employee Added");
    } catch (err) {
      console.error(err);
      alert("Error adding employee");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        className="form-control mb-2"
        placeholder="Employee ID"
        onChange={(e) =>
          setEmployee({ ...employee, employee_id: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Full Name"
        onChange={(e) =>
          setEmployee({ ...employee, full_name: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        onChange={(e) =>
          setEmployee({ ...employee, email: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Department"
        onChange={(e) =>
          setEmployee({ ...employee, department: e.target.value })
        }
      />

      <button className="btn btn-primary">
        Add Employee
      </button>

    </form>
  );
}

export default EmployeeForm;