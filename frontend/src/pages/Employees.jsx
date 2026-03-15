import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import axios from "axios";
import "../App.css";

function Employees(){

const exportEmployees = async () => {

try{

const response = await axios.get(
"http://127.0.0.1:8000/export-employees",
{ responseType:"blob" }
);

const url = window.URL.createObjectURL(new Blob([response.data]));

const link = document.createElement("a");

link.href = url;
link.setAttribute("download","employees.xlsx");

document.body.appendChild(link);
link.click();

}catch(err){

console.log(err)

}

};

return(

<div className="employees-page">

<h2 className="page-title">Employee Management</h2>

<div className="employee-layout">

{/* LEFT SIDE FORM */}

<div className="employee-form-box">

<h4>Add New Employee</h4>

<EmployeeForm/>

</div>


{/* RIGHT SIDE LIST */}

<div className="employee-list-box">

<div className="list-header">

<h4>Employee List</h4>

<button className="export-btn" onClick={exportEmployees}>
Export
</button>

</div>

<EmployeeList/>

</div>

</div>

</div>

)

}

export default Employees;