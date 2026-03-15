import { useState } from "react";
import axios from "axios";

function AttendanceForm() {

  const [attendance, setAttendance] = useState({
    employee_id: "",
    date: "",
    status: "Present"
  });

  const API_URL = process.env.REACT_APP_API_URL; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/attendance`, attendance);
      alert("Attendance Marked");
    } catch (err) {
      console.error(err);
      alert("Error marking attendance");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        placeholder="Employee ID"
        onChange={(e) =>
          setAttendance({ ...attendance, employee_id: e.target.value })
        }
      />

      <input
        type="date"
        className="form-control mb-2"
        onChange={(e) =>
          setAttendance({ ...attendance, date: e.target.value })
        }
      />

      <select
        className="form-control mb-2"
        onChange={(e) =>
          setAttendance({ ...attendance, status: e.target.value })
        }
      >
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button className="btn btn-success">
        Mark Attendance
      </button>
    </form>
  );
}

export default AttendanceForm;