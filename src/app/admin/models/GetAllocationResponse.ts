import {Dormitory} from "./dormitory";
import {LessInfoStudent} from "../../student/models/lessInfoStudent/LessInfoStudent";

export interface GetAllocationResponse {
  roomId : number
  roomNumber : number;
  maxPeopleNumber : number;
  dormitory : Dormitory;
  students?: LessInfoStudent[];
}
