import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {result} from './result.model'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  
  public studentData!:any
  resultobj:result=new result();
  public student:any;

  constructor(private router:Router) {
    this.studentData=this.router.getCurrentNavigation()?.extras?.state?.["student"]
    this.resultobj.id=this.studentData.id;
    this.resultobj.name=this.studentData.name;
    this.resultobj.dob=this.studentData.dob;
    this.resultobj.marks=this.studentData.marks;
  }

  ngOnInit(): void {
    this.student=this.resultobj;
  }
 
}
