import {Component, Input, OnInit} from '@angular/core';
import {QuestionsEnum} from "../../enums/questions.enum";
import {ShuffleQuestionService} from "../../services/shuffle-question.service";
import {ClusterStudentsService} from "../../services/cluster-students.service";
import {LoginResponse} from "../../../auth/models/loginResponse";
import {ClusterOceanRequest} from "../../models/ClusterOceanRequest";
import {switchMap} from "rxjs";
import {PredictionClusterResponse} from "../../models/PredictionClusterResponse";
import {GetStudentResponse} from "../../models/GetStudentResponse";
import {HandleErrorService} from "../../../auth/services/handle-error.service";
import {StudentService} from "../../services/student.service";
import {SettingsService} from "../../../admin/services/settings/settings.service";
import {getClusterName} from "../../../shared/utils/clusterIndex";
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent  implements OnInit{
  @Input() idStudent : number  = -1;
  questions: any[] = [];
  responses: { [question: string]: number } = {};
  flagNext = true;
  flagPrev= false;
  cluster = -1;
  students : any[] = [];
  isAllocationProcessOver = false;


  constructor(
    private questionService: ShuffleQuestionService,
    private clusterService : ClusterStudentsService,
    private studentService: StudentService,
    private handleErrorService: HandleErrorService
  ) {}

  ngOnInit(): void {
    this.loadNextBatch();
    this.initializeResponseValues();
    this.initializeCuster();
    this.getAllocationProcessOver();
  }
  initializeCuster():void{
    this.studentService.getStudent(this.idStudent).subscribe(
      (student: GetStudentResponse) => {
        if (student.cluster) {
          this.cluster = student.cluster;
          this.getStudentsSameClusterAndDormitory();
        }
      },
      error => {
        this.handleErrorService.handleError(error);
      }
    );
  }
  getAllocationProcessOver():void{
    this.studentService.getStudentHasRoom(this.idStudent).subscribe(
      (hasRoom) => {
        this.isAllocationProcessOver = hasRoom.valueOf();
      },
      error => {
        this.handleErrorService.handleError(error);
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

  getStudentsSameClusterAndDormitory():void
  {
    this.clusterService.getStudentsSameClusterAndDormitory(this.idStudent).subscribe(
      (studentsResponse: GetStudentResponse[]) => {
        if (studentsResponse) {
          this.students = studentsResponse;
        }
      },
      error => {
        this.handleErrorService.handleError(error);
      }
    );

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
          return this.clusterService.predictCluster(this.idStudent, clusterOceanResponse);
        })
      )
      .subscribe(
        (predictionClusterResponse: PredictionClusterResponse) => {
          this.cluster = predictionClusterResponse.cluster;
        },
        error => {
          this.handleErrorService.handleError(error);
        }
      );

  }
  goToGroups(): void{

  }


  protected readonly getClusterName = getClusterName;
}
