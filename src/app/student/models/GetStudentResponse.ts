import {Dormitory} from "../../admin/models/dormitory";

export interface GetStudentResponse {
     id : number;
     email: string;
     registrationNumber: number;
     dormitory: Dormitory;
     firstname: string;
     lastname: string;
     birthday : Date;
     extroversion_score: number;
     openness_score: number;
     neuroticism_score: number;
     agreeableness_score: number;
     conscientiousness_score: number;
     cluster: number;
     avatarImage: string;
}
