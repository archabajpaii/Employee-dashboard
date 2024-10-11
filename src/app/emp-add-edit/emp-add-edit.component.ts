import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
})
export class EmpAddEditComponent {
  empForm: FormGroup;

  education: string[] = ['Post Graduate', 'Graduate', 'High School', 'Diploma', 'PG'];
  company: string[] = ['Kaplan', 'Google', 'Amazon', 'Flipkart'];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      _id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(1)]],
      package: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.empForm.patchValue(this.data);
    console.log(this.empForm.value);
    
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.empForm.value._id !== "") {
        // console.log(this.empForm.value);

        this._empService
          .updateEmployee(this.empForm.value._id, this.empForm.value)
          .subscribe((data) => {
            alert('Employee updated successfully');
            this._dialogRef.close(true);
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe((data) => {
          alert('Employee added successfully'); //give a label or something dont use alert
          this._dialogRef.close(true);
        });
      }
    }
  }
}
