import { Component } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileComponent} from "../../../student/components/edit-profile/edit-profile.component";
import {ClusterStudentsService} from "../../../student/services/cluster-students.service";
import {StudentService} from "../../../student/services/student.service";
import {UpdateStudentRequest} from "../../../student/models/UpdateStudentRequest";
import {catchError, of} from "rxjs";
import {HandleErrorService} from "../../../auth/services/handle-error.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  flagClosed = false;
  image = "";
  profileId =  0;
  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private studentService: StudentService,
    private handleErrorService: HandleErrorService,
  ) {}
  logOut():void{
    this.auth.logout();
    this.router.navigate(['/landing']);
  }
  openEditModal(): void {
    let id  = this.auth.getUserId();
    if (id !== null)
    {
      this.profileId = id;
      let studentData$ = this.studentService.getStudent(id);
       studentData$.subscribe((studentGetResponse) => {
         const dialogRef = this.dialog.open(EditProfileComponent, {
           width: '300px',
           height: 'auto',
           data: { student: studentGetResponse}
         });
         dialogRef.afterClosed().subscribe(result => {
           this.flagClosed = true;
           if (result)
             this.image = result.avatar;
           const updateStudentRequest: UpdateStudentRequest = {
             firstname: result.firstname,
             lastname: result.lastname,
             birthday: result.birthday,
             email: result.email,
           };
           this.studentService.updateStudent(this.profileId, updateStudentRequest)
             .pipe(
               catchError(error => {
                 this.handleErrorService.handleError(error);
                 return of(null); // Return observable with null to continue the observable chain
               })
             )
             .subscribe(updatedStudent => {
               if (updatedStudent) {
                 this.handleErrorService.handleSuccess("Student has been updated successfully");
                 console.log('Student information updated successfully:', updatedStudent);
                 // Additional actions if needed
               }
             });
         });
      });



    }

  }
}
