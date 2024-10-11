import { Dialog } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','experience','package','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog, private _empService:EmployeeService){}

  ngOnInit(){
    this.getEmployeeList()
  }

  openAddEditForm(){
    const dialogRef=this._dialog.open(EmpAddEditComponent)
    dialogRef.afterClosed().subscribe((val)=>{
      if(val){
        this.getEmployeeList()
      }
    })
  }
  getEmployeeList(){
    this._empService.getEmployeeList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.sort=this.sort
      this.dataSource.paginator=this.paginator

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:string){
     this._empService.deleteEmployee(id).subscribe((data)=>{
        alert('Employee deleted');
        this.getEmployeeList()
    })
  }

  editEmployee(data:any){
    this._dialog.open(EmpAddEditComponent,{
      data
    })
 }
}
