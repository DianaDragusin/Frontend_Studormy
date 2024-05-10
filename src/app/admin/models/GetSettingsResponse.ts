import {Dormitory} from "./dormitory";
import {GetAdminResponse} from "./adminResponse";

export interface GetSettingsResponse {
  settingsId: number
  roomAllocationStarted :boolean;
  roomAllocationStopped : boolean,
  admin :GetAdminResponse;
}
