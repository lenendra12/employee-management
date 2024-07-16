import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // readonly serializedDate = new FormControl(new Date().toISOString());
  displayedColumns: string[] = [
    'id',
    'name',
    'position',
  ];
  
  employees: any = [];
  currentEmployees: any = [];
  previousEmployees: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private empService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmployeeDialog() {
    const dialogRef = this.dialog.open(EmpAddEditComponent, {
      height: '100vh', minWidth: '100%'
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  editEmployee(emp: any) {
    emp.fromDate = new Date(emp.fromDate).toISOString();
    if(emp.toDate) {
      emp.toDate = new Date(emp.toDate).toISOString();
    }
    const dialogRef = this.dialog.open(EmpAddEditComponent, {
      height: '100vh',
      minWidth: '100%',
      data: emp
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  filterEmployeeList(employees: any) {
    this.currentEmployees = [];
    this.previousEmployees = [];
    employees.forEach((emp: any) => {
      if(emp.toDate == "") {
        emp.fromDate = moment(emp.fromDate).format('ll')
        this.currentEmployees.push(emp);
      } else {
        emp.fromDate = moment(emp.fromDate).format('ll')
        emp.toDate = moment(emp.toDate).format('ll')
        this.previousEmployees.push(emp);
      }
    });
  }

  getEmployeeList() {
    this.empService.getEmployeeList().then((res: any) => {
        this.employees = res;
        this.filterEmployeeList(this.employees);
      });
  }

  deleteEmployee(emp: any) {
    let confirm = window.confirm("Do you want to delete this employee?");
    if(confirm) {
      this.empService.deleteEmployee(emp.id).then((res: any) => {
          alert('Employee deleted successfully!');
          this.getEmployeeList();
        });
    }
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }
}
