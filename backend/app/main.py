from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app import models, schemas, crud
from app.database import engine, SessionLocal, Base
from sqlalchemy import func
from datetime import date
import pandas as pd
from fastapi.responses import StreamingResponse
import io
Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    "http://localhost:5173",                     # local dev
    "https://your-vercel-frontend.vercel.app"    # Vercel frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "HRMS API Running"}


@app.post("/employees")
def add_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, employee)


@app.get("/employees")
def get_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)


@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    crud.delete_employee(db, emp_id)
    return {"message": "Employee deleted"}


@app.post("/attendance")
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    return crud.create_attendance(db, attendance)
@app.get("/employees/search")
def search_employee(name: str, db: Session = Depends(get_db)):

    employees = db.query(models.Employee).filter(
        models.Employee.full_name.contains(name)
    ).all()

    return employees
@app.put("/employees/{emp_id}")
def update_employee(emp_id: int, employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):

    emp = db.query(models.Employee).filter(models.Employee.id == emp_id).first()

    emp.full_name = employee.full_name
    emp.email = employee.email
    emp.department = employee.department

    db.commit()
    db.refresh(emp)

    return emp

@app.get("/dashboard")
def dashboard_data(db: Session = Depends(get_db)):

    today = date.today()

    total = db.query(models.Employee).count()

    present = db.query(models.Attendance).filter(
        models.Attendance.status == "Present",
        models.Attendance.date == today
    ).count()

    absent = db.query(models.Attendance).filter(
        models.Attendance.status == "Absent",
        models.Attendance.date == today
    ).count()

    departments = db.query(models.Employee.department).distinct().count()

    employees = db.query(models.Employee).order_by(
        models.Employee.id.desc()
    ).limit(5).all()

    return {
        "total_employees": total,
        "present_today": present,
        "absent_today": absent,
        "departments": departments,
        "recent_employees": employees
    }
@app.get("/attendance")
def get_attendance(db: Session = Depends(get_db)):
    return db.query(models.Attendance).all()

@app.get("/department-stats")
def department_stats(db: Session = Depends(get_db)):

    data = db.query(
        models.Employee.department,
        func.count(models.Employee.id)
    ).group_by(models.Employee.department).all()

    return data


@app.get("/export-employees")
def export_employees(db: Session = Depends(get_db)):

    employees = db.query(models.Employee).all()

    data = []

    for emp in employees:
        data.append({
            "ID": emp.id,
            "Name": emp.full_name,
            "Email": emp.email,
            "Department": emp.department
        })

    df = pd.DataFrame(data)

    stream = io.BytesIO()
    df.to_excel(stream, index=False)
    stream.seek(0)

    return StreamingResponse(
        stream,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=employees.xlsx"}
    )