import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.css']
})

export class GroupMembersComponent {
constructor(
  public dialogRef: MatDialogRef<GroupMembersComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
}
  onClose(): void {
    this.dialogRef.close();
  }

}
