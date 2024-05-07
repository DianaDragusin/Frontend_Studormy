
import {LessInfoStudent} from "../lessInfoStudent/LessInfoStudent";

export interface GroupResponse {
  groupId : number;
  name: string;
  memberNumber: number;
  students: LessInfoStudent[];
}
