
import {LessInfoStudent} from "../lessInfoStudent/LessInfoStudent";

export interface GroupResponse {
  groupId : number;
  roomId : number;
  name: string;
  memberNumber: number;
  students: LessInfoStudent[];
}
