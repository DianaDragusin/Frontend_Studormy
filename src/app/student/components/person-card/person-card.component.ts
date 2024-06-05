import {Component, Input} from '@angular/core';
import {GetStudentResponse} from "../../models/GetStudentResponse";
import {LessInfoStudent} from "../../models/lessInfoStudent/LessInfoStudent";


@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent {
  @Input() student: GetStudentResponse | undefined;
}
