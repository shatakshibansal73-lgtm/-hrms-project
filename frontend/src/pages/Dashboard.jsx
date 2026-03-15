import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaBuilding,
  FaDownload
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "../App.css";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {

  const [data, setData] = useState({
    total_employees:0,
    present_today:0,
    absent_today:0,
    recent_employees:[],
    departments: 0
  });

  useEffect(()=>{
    axios.get(`${API_URL}/dashboard`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const exportEmployees = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/export-employees`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "employees.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch(err) {
      console.log(err);
    }
  };

const chartData = [
{ name:"Present", value:data.present_today },
{ name:"Absent", value:data.absent_today }
];


return(

<div className="dashboard-container">

{/* HEADER */}

<div className="dashboard-header">

<h2>Dashboard</h2>

</div>


{/* CARDS */}

<div className="cards">

<div className="card blue">
<FaUsers className="card-icon"/>
<p>Total Employees</p>
<h3>{data.total_employees}</h3>
</div>

<div className="card green">
<FaUserCheck className="card-icon"/>
<p>Today Present</p>
<h3>{data.present_today}</h3>
</div>

<div className="card red">
<FaUserTimes className="card-icon"/>
<p>Today Absent</p>
<h3>{data.absent_today}</h3>
</div>

<div className="card purple">
<FaBuilding className="card-icon"/>
<p>Departments</p>
<h3>{data.departments}</h3>
</div>

</div>


{/* MAIN GRID */}

<div className="main-grid">


{/* LEFT */}

<div className="left">
<div className="box">

<h5>Add Employee</h5>

<form>

<input placeholder="Employee ID"/>
<input placeholder="Full Name"/>
<input placeholder="Email"/>
<input placeholder="Department"/>

<button className="green-btn">
Add Employee
</button>

</form>

</div>


{/* EMPLOYEE LIST */}

<div className="box">

<div className="box-header">

<h5>Employee List</h5>

<button className="export-btn" onClick={exportEmployees}>
Export
</button>
</div>

<table>

<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Department</th>
</tr>
</thead>

<tbody>

{data.recent_employees.map(emp=>(
<tr key={emp.id}>
<td>{emp.id}</td>
<td>{emp.name}</td>
<td>{emp.email}</td>
<td>{emp.department}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>



{/* RIGHT */}

<div className="right">

<div className="box">

<h5>Attendance Overview</h5>

<ResponsiveContainer width="100%" height={200}>

<BarChart data={chartData}>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="value" fill="#2563eb"/>

</BarChart>

</ResponsiveContainer>

</div>



<div className="box">

<h5>Mark Attendance</h5>

<form className="attendance-form">

<select>
<option>Select Employee</option>
</select>

<input type="date"/>

<div className="radio">

<label>
<input type="radio" name="status"/> Present
</label>

<label>
<input type="radio" name="status"/> Absent
</label>

</div>

<button className="blue-btn">
Mark Attendance
</button>

</form>

</div>

</div>

</div>

</div>

)

}

export default Dashboard