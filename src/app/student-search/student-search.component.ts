import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthenticationService } from '../sharedApi/authentication/authentication.service';


@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.scss']
})
export class StudentSearchComponent implements OnInit {

  public studentForm!:FormGroup
  public name!:any

  constructor(private formBuilder:FormBuilder, private http:HttpClient,private router:Router,private auth:AuthenticationService) { }


  ngOnInit(): void {
    this.studentForm =  this.formBuilder.group({
      id:[''],
      dob:['']
    })
  }


  studentSearch(){
    //alert("clicked");
    this.http.get<any>("http://localhost:3000/StudentData")
    .subscribe(res=>{
      const student=res.find((details:any)=>{
        return details.id==this.studentForm.value.id && details.dob==this.studentForm.value.dob
      });
      if(student){
        this.auth.isStudent=true;
        this.router.navigate(['result'],{
          state:{student:student}
        });
      }
      else{
        alert("No Student Exist!");
      }
    })

  }

}
