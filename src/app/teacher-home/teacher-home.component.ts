import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService} from '../sharedApi/authentication/authentication.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {

  public loginForm!: FormGroup
  constructor(private formBuilder:FormBuilder, private http:HttpClient,private router:Router,
    private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm =  this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  teacherLogin(){
   
    this.http.get<any>("http://localhost:3000/teacher")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email==this.loginForm.value.email && a.password==this.loginForm.value.password
      });
      if(user){
        localStorage.setItem('isAuthenticated','true');
        // this.authenticationService.isAuthenticated=true;
        // console.log("from login :"+this.authenticationService.isAuthenticated);
        this.loginForm.reset();
        this.router.navigate(['teacher']);
      }
      else{
        alert("User not found!");
      }
    },err=>{
      alert("Something went wrong");
    })
  }
}
