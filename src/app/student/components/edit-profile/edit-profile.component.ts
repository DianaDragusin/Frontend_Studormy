import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  avatars: string[] = [
    'assets/av1.PNG',
    'assets/av2.PNG',
    'assets/av3.PNG',
    'assets/av4.PNG',
    'assets/av5.PNG',
    'assets/av6.PNG',
    'assets/av7.PNG',
    'assets/av8.PNG',
    'assets/av9.PNG',
    'assets/av10.PNG',
    'assets/av11.PNG',
    'assets/av12.PNG',
    'assets/av13.PNG',
    'assets/av14.PNG',

    // More avatar paths
  ];

  studentInfoForm: FormGroup;
  currentAvatarIndex = 0;

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.studentInfoForm = this.fb.group({
      firstname: [this.data.student.firstname || '', [Validators.required]],  // Validators are optional
      lastname: [this.data.student.lastname|| '' , [Validators.required]],
      birthday: [this.data.student.birthday, [Validators.required]],
      email: [this.data.student.email, [Validators.required, Validators.email]],
      registration_number: [this.data.student.registrationNumber]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    const result = {
      ...this.studentInfoForm.value,
      avatar: this.avatars[this.currentAvatarIndex]
    };

    this.dialogRef.close(result);
  }
  nextAvatar(): void {
    if (this.currentAvatarIndex < this.avatars.length - 1) {
      this.currentAvatarIndex++;
    } else {
      this.currentAvatarIndex = 0;
    }
  }

  previousAvatar(): void {
    if (this.currentAvatarIndex > 0) {
      this.currentAvatarIndex--;
    } else {
      this.currentAvatarIndex = this.avatars.length - 1;
    }
  }
}
