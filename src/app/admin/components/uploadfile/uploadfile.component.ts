import {Component, Input} from '@angular/core';
import {UploadStudentsService} from "../../services/upload-students.service";
import {LoginModel} from "../../../auth/models/loginModel";
import {StudentRequest} from "../../models/studentRequest";
import {finalize, Subscription} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {StudentResponse} from "../../models/studentResponse";
import {LoginResponse} from "../../../auth/models/loginResponse";
import {HandleErrorService} from "../../../auth/services/handle-error.service";
import * as CryptoJS from "crypto-js";

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent {
  @Input() idAdmin: number = 0;
  selectedFile?: File;
  fileName = '';
  response?:  StudentResponse[] = [];
  uploadProgress?:number;
  uploadSub?: Subscription;
  uploadSuccesful: boolean = true;
  constructor(private studentService: UploadStudentsService,private http: HttpClient,private handleErrorService: HandleErrorService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.fileName =this.selectedFile?.name || '';
    this.upload();

  }
  testAndPrepareFile(content: string): any[] {
    const studentLines: string[] = content.split('\n').map(line => line.trim());
    // starts with something that is not @ than has a @ then continues with something other than @ and then it ends
    const emailPattern = /^[^@]+@[^@]+$/;

    const students = studentLines.map((line, index) => {
      const parts = line.split(',');

      if (parts.length !== 4) {
        throw new Error(`Invalid data format at line ${index + 1}: ${line}`);
      }

      const [email, password, registrationNumber, dormitory] = parts;

      if (!emailPattern.test(email)) {
        throw new Error(`Invalid email at line ${index + 1}: ${email}`);
      }

      if ( password.length < 6) {
        throw new Error(`Passwords must have a length >= 6, invalid password at line ${index + 1}`);
      }

      const registrationNumberInt = parseInt(registrationNumber);
      if (isNaN(registrationNumberInt)) {
        throw new Error(`Invalid registration number at line ${index + 1}: ${registrationNumber}`);
      }

      const dormitoryInt = parseInt(dormitory);
      if (isNaN(dormitoryInt)) {
        throw new Error(`Invalid dormitory ID at line ${index + 1}: ${dormitory}`);
      }

      return {
        email: email,
        password: CryptoJS.SHA256(password).toString(),
        registrationNumber: registrationNumberInt,
        dormitory: dormitoryInt
      };
    });

    return students;
  }

  clearFile(): void {
    this.selectedFile = undefined;
    this.fileName = '';
    this.response = [];
    this.uploadProgress = undefined;
    this.uploadSuccesful = true;
  }

upload(): void
{
  if (this.selectedFile) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content: string = fileReader.result as string;
      try{
        const students = this.testAndPrepareFile(content)

       this.uploadProgress = 0;

       this.studentService.addStudents(this.idAdmin,students).subscribe(
        response => {
          this.response = response;
          this.uploadProgress = undefined; // Reset progress
          this.handleErrorService.handleSuccess("All the students have been successfully added")
          this.uploadSuccesful = true;
        },
        error => {
          this.handleErrorService.handleError(error)
          this.uploadProgress = undefined; // Reset progress
          this.uploadSuccesful = false;

        }
      );
      } catch (error){
        this.handleErrorService.handleErrorMessage(error as Error);
      }

    };

    fileReader.readAsText(this.selectedFile);
  }


}





}
