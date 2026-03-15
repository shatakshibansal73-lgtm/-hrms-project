import { useEffect, useState } from "react";
import axios from "axios";
import AttendanceForm from "../components/AttendanceForm";
import "../App.css";


const API_URL = import.meta.env.VITE_API_URL;

function Attendance() {

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/attendance`)
      .then(res => setAttendance(res.data))
      .catch(err => console.log(err));
  }, []);


  return (

    <div className="attendance-page">

      <h2 className="page-title">Attendance</h2>

      <div className="attendance-layout">

      

        <div className="attendance-form-box">

          <h4>Mark Attendance</h4>

          <AttendanceForm />

        </div>


        {/* RIGHT SIDE TABLE */}

        <div className="attendance-table-box">

          <h4>Attendance Records</h4>

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {attendance.map(a => (

                <tr key={a.id}>

                  <td>{a.id}</td>
                  <td>{a.employee_id}</td>
                  <td>{a.date}</td>

                  <td>
                    <span className={a.status === "Present" ? "present" : "absent"}>
                      {a.status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Attendance;