import {Component, Input} from '@angular/core';
import {UploadStudentsService} from "../../services/upload-students.service";
import {LoginModel} from "../../../auth/models/loginModel";
import {StudentRequest} from "../../models/studentRequest";
import {finalize, Subscription} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {StudentResponse} from "../../models/studentResponse";
import {LoginResponse} from "../../../auth/models/loginResponse";
import {HandleErrorService} from "../../../auth/services/handle-error.service";

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
prepareFile(content: string): any[]
{
  const studentLines: string[] = content.split('\n').map(line => line.trim());


  const students = studentLines.map(line => {
    const [ email, password, registrationNumber, dormitory] = line.split(',');

    return {
       email: email, password: password,  registrationNumber : parseInt(registrationNumber),dormitory : parseInt(dormitory)
    };
  });
  return students
}
upload(): void
{
  if (this.selectedFile) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content: string = fileReader.result as string;
       const students = this.prepareFile(content)
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
    };

    fileReader.readAsText(this.selectedFile);
  }

}





}
