import { Injectable } from '@angular/core';
import {QuestionsEnum} from "../enums/questions.enum";

@Injectable({
  providedIn: 'root'
})
export class ShuffleQuestionService {
  private questions: any[];
  private currentIndex = 0;
  private batchSize = 3;
  private responses: { [category: string]: number } = {};
  private openness : number [] = [];
  private conscienciousness : number [] = [];
  private extroversion : number [] = [];
  private agreableness : number [] = [];
  private neuroticism : number [] = [];
  constructor() {
    this.questions = this.prepareQuestions();
    this.shuffleQuestions();
    this.initializeResponses();
  }

  private initializeState(): void {
    this.questions = this.prepareQuestions();
    this.shuffleQuestions();
    this.initializeResponses();
    this.currentIndex = 0;
    this.openness = [];
    this.conscienciousness = [];
    this.extroversion = [];
    this.agreableness = [];
    this.neuroticism = [];
  }
 private initializeResponses(): void {
    for (let question in QuestionsEnum)
    {
      this.responses[QuestionsEnum[question as keyof typeof QuestionsEnum]] = 3;
    }
 }
  private prepareQuestions(): any[] {
    return Object.keys(QuestionsEnum).map(key => {
      const category = key.slice(0, 3);
      const index = parseInt(key.slice(3), 10) - 1;
      return {
        key: key,
        category: category,
        index: index,
        question: QuestionsEnum[key as keyof typeof QuestionsEnum]
      };
    });
  }
 public getCurrentIndex():number{
    return this.currentIndex;
 }
  private shuffleQuestions(): void {
    this.questions.sort(() => 0.5 - Math.random());
  }
  public findResponseInEnum(questionText: string, value: number): void {
    const question = this.questions.find(q => q.question === questionText);
    if (question.category == 'OPN') {
      this.openness[question.index] = value;
    }else if(question.category == 'EXT'){
      this.extroversion[question.index] = value;
    }else if(question.category == 'CSN'){
      this.conscienciousness[question.index] = value;
    }else if(question.category == 'AGR'){
      this.agreableness[question.index] = value;
    }else if(question.category == 'EST') {
      this.neuroticism[question.index] = value;
    }
  }
  public prepareResponses():void {
    for (const [questionText, value] of Object.entries(this.responses))
    {
      this.findResponseInEnum(questionText,value);

    }
  }
  public getO()
  {
    return this.openness;
  }
  public getC()
  {
    return this.conscienciousness;
  }
  public getE()
  {
    return this.extroversion;
  }
  public getA()
  {
    return this.agreableness;
  }
  public getN()
  {
    return this.neuroticism;
  }

  public getNextBatch(): any[] {
    if (this.currentIndex >= this.getSize()) {
      return [-1]
    }
    const batch = this.questions.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.currentIndex += this.batchSize;
    return batch;
  }
  public getSize(): number{
    return this.questions.length;
  }
  public getBatchSize(): number{
    return this.batchSize;
  }
  getPrevBatch():any[]
  {
    this.currentIndex -= 2* this.batchSize;
    if (this.currentIndex < 0) {
      return [-1]
    }

    const batch = this.questions.slice(this.currentIndex , this.currentIndex + this.batchSize);
    this.currentIndex +=  this.batchSize;
    return batch;
  }


  public getAllResponses(): { [category: string]: number} {
    return this.responses;
  }

  public resetState(): void {
    this.initializeState();
  }
}
