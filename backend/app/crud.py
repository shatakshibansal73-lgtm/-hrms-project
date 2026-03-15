from sqlalchemy.orm import Session
from app import models

def create_employee(db: Session, employee):
    db_employee = models.Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def get_employees(db: Session):
    return db.query(models.Employee).all()


def delete_employee(db: Session, emp_id):
    emp = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    db.delete(emp)
    db.commit()


def create_attendance(db: Session, attendance):
    att = models.Attendance(**attendance.dict())
    db.add(att)
    db.commit()
    db.refresh(att)
    return att