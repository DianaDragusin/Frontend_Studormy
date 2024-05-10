import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LessInfoGroup} from "../../models/lessInfoGroup/LessInfoGroup";

@Component({
  selector: 'app-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.css']
})
export class SelectGroupComponent {
  constructor(
    public dialogRef: MatDialogRef<SelectGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { groups: LessInfoGroup[] }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectGroup(group: any): void {
    this.dialogRef.close(group);
  }
}
