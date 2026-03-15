import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
const API_URL = process.env.REACT_APP_API_URL;
function Reports(){

const [attendance,setAttendance] = useState([]);

useEffect(()=>{

axios.get(`${API_URL}/attendance`)
  .then(res => setAttendance(res.data))
  .catch(err => console.log(err));

},[])

return(

<div className="reports-container">

<h2>Attendance Reports</h2>


{/* FILTERS */}

<div className="report-filters">

<input type="date"/>

<select>
<option>All Employees</option>
</select>

<select>
<option>All Status</option>
<option>Present</option>
<option>Absent</option>
</select>

<button className="filter-btn">
Filter
</button>

</div>


{/* REPORT TABLE */}

<div className="report-table">

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

{attendance.map(a=>(
<tr key={a.id}>
<td>{a.id}</td>
<td>{a.employee_id}</td>
<td>{a.date}</td>
<td>
<span className={a.status==="Present" ? "present" : "absent"}>
{a.status}
</span>
</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

)

}

export default Reports