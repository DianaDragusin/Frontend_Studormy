import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileComponent} from "../../../student/components/edit-profile/edit-profile.component";
import {ClusterStudentsService} from "../../../student/services/cluster-students.service";
import {StudentService} from "../../../student/services/student.service";
import {UpdateStudentRequest} from "../../../student/models/UpdateStudentRequest";
import {catchError, Observable, of} from "rxjs";
import {HandleErrorService} from "../../../auth/services/handle-error.service";
import {GetStudentResponse} from "../../../student/models/GetStudentResponse";
import {AdminService} from "../../../admin/services/admin.service";
import {GetAdminResponse} from "../../../admin/models/adminResponse";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  flagClosed = false;
  avatarImage = "";
  profileId: number  = -1;
  studentData : GetStudentResponse | undefined;
  adminData : GetAdminResponse | undefined;
  userRole : string = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private studentService: StudentService,
    private adminService : AdminService,
    private handleErrorService: HandleErrorService
  ) {}
  ngOnInit() {
    this.initializeData();
  }
  private initializeData() {
    this.profileId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();

    if (this.userRole == 'student') {
      this.getStudentData();
    }
    else if (this.userRole == 'admin') {
      this.getAdminData();
    }
  }
  getStudentData(){
    this.studentService.getStudent(this.profileId).subscribe({
      next: (studentResponse) => {
        this.studentData = studentResponse;
      },
      error: (err) => {
        this.handleErrorService.handleError(err);
      }
    });
  }
  getAdminData(){
    this.adminService.getAdmin(this.profileId).subscribe({
      next: (adminResponse) => {
        this.adminData = adminResponse;
      },
      error: (err) => {
        this.handleErrorService.handleError(err);
      }
    });
  }

  logOut():void{
    this.auth.logout();
    this.router.navigate(['/landing']);
  }
  openEditModal(): void {
    if (this.profileId !== null)
    {
      const dialogRef = this.dialog.open(EditProfileComponent, {
           width: '300px',
           height: 'auto',
           data: { student: this.studentData}
         });
         dialogRef.afterClosed().subscribe(result => {
           this.flagClosed = true;
             const updateStudentRequest: UpdateStudentRequest = {
               firstname: result.firstname,
               lastname: result.lastname,
               birthday: result.birthday,
               email: result.email,
               avatarImage: result.avatarImage,
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
                 this.studentData = updatedStudent;
                 this.handleErrorService.handleSuccess("Student has been updated successfully");
                 console.log('Student information updated successfully:', updatedStudent);
               }
             });
         });
    }

  }
}
