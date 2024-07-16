import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
  providers: [NgxIndexedDBService]
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  positions: string[] = [
    'FullStack Developer',
    'Frontend Developer',
    'DB Admin',
    '.Net Developer',
    'Java Developer',
  ];
  employees: any = [];

  constructor(
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this.formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: [''],
    });
  }

  ngOnInit(): void {
    this.empService.getEmployeeList().then((res: any) => {
      if(res) {
        this.employees = res.sort();
      }
    });
    this.empForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empForm.value.id = this.data.id;
        this.empService.addEmployee(this.empForm.value, this.data.id).then(res =>{
          if(res) {
            this.dialogRef.close(true);
          }
        });
      } else {
        this.empForm.value.id = this.employees.length + 1;
        this.empService.addEmployee(this.empForm.value, this.empForm.value.id).then(res =>{
          if(res) {
            this.dialogRef.close(true);
          }
        });
      }
    }
  }
}
