import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../sharedApi/api.service';
import { AuthenticationService } from '../sharedApi/authentication/authentication.service';
import { StudentData } from './student.model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  formValue!: FormGroup;
  studentDataObj:StudentData=new StudentData();
  studentData!:any;
  length!:any;
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder:FormBuilder,private api:ApiService,private authentication:AuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      id:[''],
      name:[''],
      dob:[''],
      marks:['']
    })
    this.getAllStudent();
  }

  clickAddStudent(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postStudentData(){
    this.studentDataObj.id=this.formValue.value.id;
    this.studentDataObj.name=this.formValue.value.name;
    this.studentDataObj.marks=this.formValue.value.marks;
    this.studentDataObj.dob=this.formValue.value.dob;

    this.api.postData(this.studentDataObj).subscribe(res=>{
      console.log(res);
      this.formValue.reset();
      document.getElementById('cancel')?.click();
      // location.reload();
      this.getAllStudent();
    },err=>{
      alert("Something went wrong!!");
    })
  }


  getAllStudent(){
    this.api.getData().subscribe(res=>{
      this.studentData=res;
      this.length=this.studentData.length;
    })
  }

  deleteStudent(row:any){
    this.api.deleteData(row.id).subscribe(res=>{
      alert("Student data is deleted!");
      this.getAllStudent();
    })

  }


  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.studentDataObj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['marks'].setValue(row.marks);
    this.formValue.controls['dob'].setValue(row.dob);
  }

  updateStudentData(){
    this.studentDataObj.id=this.formValue.value.id;
    this.studentDataObj.name=this.formValue.value.name;
    this.studentDataObj.marks=this.formValue.value.marks;
    this.studentDataObj.dob=this.formValue.value.dob;
    this.api.updateData(this.studentDataObj,this.studentDataObj.id).subscribe(
      res=>{
        alert("Student "+this.studentDataObj.name+" is updated");
        console.log(res);
      this.formValue.reset();
      document.getElementById('cancel')?.click();
      this.getAllStudent();
      })
  }

  logout(){
    // this.authentication.isAuthenticated=false;
    // sessionStorage.setItem('isAuthenticated','false');
    localStorage.removeItem('isAuthenticated'); 
    localStorage.clear();
    this.router.navigate(['']);
  }
}
