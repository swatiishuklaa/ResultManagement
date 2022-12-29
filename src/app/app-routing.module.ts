import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { StudentGuardGuard } from './guard/student-guard.guard';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherComponent } from './teacher/teacher.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'app-home',component:HomeComponent},
  { path:'teacher-home',component:TeacherHomeComponent},
  {path:'teacher',component:TeacherComponent,canActivate:[AuthGuard]},
  {path:'student-search',component:StudentSearchComponent},
  {path:'result',component:ResultComponent,canActivate:[StudentGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
