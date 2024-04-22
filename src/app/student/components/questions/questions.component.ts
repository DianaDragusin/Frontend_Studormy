import {Component, Input, OnInit} from '@angular/core';
import {QuestionsEnum} from "../../enums/questions.enum";
import {ShuffleQuestionService} from "../../services/shuffle-question.service";
import {ClusterStudentsService} from "../../services/cluster-students.service";
import {LoginResponse} from "../../../auth/models/loginResponse";
import {ClusterOceanRequest} from "../../models/ClusterOceanRequest";
import {switchMap} from "rxjs";
import {PredictionClusterResponse} from "../../models/PredictionClusterResponse";
import {GetStudentResponse} from "../../models/GetStudentResponse";
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent  implements OnInit{
  @Input() idStudent : number  = 0;
  questions: any[] = [];
  responses: { [question: string]: number } = {};
  flagNext = true;
  flagPrev= false;
  cluster = -1;

  constructor(
    private questionService: ShuffleQuestionService,
    private clusterService : ClusterStudentsService
  ) {}

  ngOnInit(): void {
    this.loadNextBatch();
    this.initializeResponseValues();
    this.initializeCuster();
  }
  initializeCuster():void{
    this.clusterService.getStudent(this.idStudent).subscribe(
      (student: GetStudentResponse) => {
        if (student.cluster) {
          this.cluster = student.cluster;
        }
      },
      error => {
        console.error('Error retrieving student:', error);
      }
    );

  }
  initializeResponseValues(){
    this.responses = this.questionService.getAllResponses()
  }
  onResponseChange(response:{ question: string, value: number }) {
    if(this.responses[response.question] != response.value )
      this.responses[response.question] = response.value
  }

  loadNextBatch(): void {
    this.flagNext = this.questionService.getCurrentIndex() <=  this.questionService.getSize()- this.questionService.getBatchSize() ;
    this.flagPrev = this.questionService.getCurrentIndex() < this.questionService.getSize() && this.questionService.getCurrentIndex() > 0;
    this.questions = this.questionService.getNextBatch();
  }

  loadPrevBatch(): void {
    this.flagNext = this.questionService.getCurrentIndex() - this.questionService.getBatchSize() <  this.questionService.getSize();
    this.flagPrev = this.questionService.getCurrentIndex() >  2 * this.questionService.getBatchSize();
    this.questions = this.questionService.getPrevBatch();
  }

  submitResponse(questionKey: string, value: number): void {
   // this.questionService.saveResponse(questionKey, value);
  }

  finalizeResponses(): void {
    this.questionService.prepareResponses();
    const clusterOcean: ClusterOceanRequest = {
      openness_responses: this.questionService.getO(),
      conscientiousness_responses: this.questionService.getC(),
      extroversion_responses: this.questionService.getE(),
      agreeableness_responses: this.questionService.getA(),
      neuroticism_responses: this.questionService.getN()
    };
    this.clusterService.sendClusters(this.idStudent, clusterOcean)
      .pipe(
        switchMap(clusterOceanResponse => {
          console.log(clusterOceanResponse.openness_score);
          console.log(clusterOceanResponse.conscientiousness_score);
          console.log(clusterOceanResponse.extroversion_score);
          console.log(clusterOceanResponse.agreeableness_score);
          console.log(clusterOceanResponse.neuroticism_score);
          return this.clusterService.predictCluster(this.idStudent, clusterOceanResponse);
        })
      )
      .subscribe(
        (predictionClusterResponse: PredictionClusterResponse) => {
          this.cluster = predictionClusterResponse.cluster;
        },
        error => {
          console.log("Error");
        }
      );

  }

}
