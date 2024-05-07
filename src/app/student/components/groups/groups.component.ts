import { Component, OnInit } from '@angular/core';
import { Group, GroupService } from "../../services/group.service";
import { GroupMembersComponent } from "../group-members/group-members.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import {StudentGroupResponse} from "../../models/group/StudentGroupResponse";
import {LessInfoGroup} from "../../models/lessInfoGroup/LessInfoGroup";
import {GroupResponse} from "../../models/group/GroupResponse";
import {LessInfoStudent} from "../../models/lessInfoStudent/LessInfoStudent";
import {HandleErrorService} from "../../../auth/services/handle-error.service";
import {StudentService} from "../../services/student.service";
import {GetStudentResponse} from "../../models/GetStudentResponse";
import {AddStudentToGroupRequest} from "../../models/group/AddStudentToGroupRequest";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  addMemberClicked: boolean = false;
  groups$: LessInfoGroup[]  = []; // Renamed and defined as an array of groups
  selectedGroup: Group | null = null;
  idStudent: number = -1;
  allStudents: GetStudentResponse[] = [];
  currentGroupId: number = -1;
  constructor(
    private groupService: GroupService,
    private studentService: StudentService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private handleErrorService: HandleErrorService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idStudent = params['idStudent'];
      this.getGroupsOfStudent(); // Fetch groups for the student
      this.getAllStudents();
    });
  }

  showGroupMembers(studentsInAGroup: LessInfoStudent[]): void {

    this.dialog.open(GroupMembersComponent, {
      width: '400px',
      data: { members: studentsInAGroup }
    });
  }

  toggleGroupDetails(group: Group): void {
    if (this.selectedGroup && this.selectedGroup.id === group.id) {
      this.selectedGroup = null; // If clicked again, hide the details
    } else {
      this.selectedGroup = group; // Show details for the clicked group
    }
  }

  leaveGroup(group: LessInfoGroup): void {
    if (group.memberNumber > 1) {
      this.groupService.deleteStudentFromGroup(group.groupId, this.idStudent)
        .subscribe(
          () => {
            this.handleErrorService.handleSuccess(`You have been removed from group ${group.name}`)
            this.getGroupsOfStudent(); // Refresh groups after successful deletion
          },
          (error) => {
           this.handleErrorService.handleError(error);
          }
        );
    } else {
      this.groupService.deleteGroup(group.groupId)
        .subscribe(
          () => {
            this.handleErrorService.handleSuccess(`Group ${group.name} deleted successfully`)
            this.getGroupsOfStudent(); // Refresh groups after successful deletion
          },
          (error) => {
            this.handleErrorService.handleError(error)
          }
        );
    }
  }
  createGroup(): void {
    const groupName = prompt("Enter new group name:");
    if (groupName) {
      this.groupService.createGroup(groupName);
    }
  }

  getGroupsOfStudent(): void {
    if (this.idStudent) {
      this.groupService.getStudentGroups(this.idStudent)
        .subscribe((groups: StudentGroupResponse) => {
          this.groups$ = groups.groups; // Assign fetched groups to groups$
        });
    }
  }
  getAllStudents(): void
  {
    this.studentService.getAllStudentsWithSameDormitory(this.idStudent).subscribe(
      (allStudents) => {
       this.allStudents =  allStudents;
      });
  }
  getGroupsById(groupId: number): void {
    if (this.idStudent) {
      this.groupService.getGroupById(groupId)
        .subscribe((groups: GroupResponse) => {
          console.log(groups.students);
          this.showGroupMembers(groups.students)
        });
    }
  }
  addMember(groupId : number): void {
    this.addMemberClicked = !this.addMemberClicked;
    this.currentGroupId = groupId;
  }
  addPerson(newStudentId: any) {
    this.addMemberClicked = false;
     const addStudentRequest: AddStudentToGroupRequest = {
      groupId: this.currentGroupId,
      newMemberId: newStudentId
    };

    this.groupService.addStudentToGroup(addStudentRequest).subscribe(
      () => {
        this.getGroupsOfStudent();
      });
  }

  addGroup(): void {
    const groupName = prompt("Enter new group name:");
    if (groupName) {
      this.groupService.addGroup(this.idStudent, groupName).subscribe(
        () => {
          this.getGroupsOfStudent();
        });
    }
  }
}
