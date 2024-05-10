import {Dormitory} from "./dormitory";

export interface AddRoomResponse {
  roomId : number
  roomNumber : number;
  maxPeopleNumber : number;
  dormitory : Dormitory;
}
