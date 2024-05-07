import {LessInfoStudent} from "../lessInfoStudent/LessInfoStudent";
import {LessInfoGroup} from "../lessInfoGroup/LessInfoGroup";

export interface StudentGroupResponse {
  id : number;
  groups: LessInfoGroup[];
}
