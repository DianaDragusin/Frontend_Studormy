import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  @Input() question: string | undefined;
  @Input() response: number | undefined ;
  @Output() responseChange = new EventEmitter<{ question: string, value: number }>();
  disabled = false;
  max = 5;
  min = 1;
  showTicks = true;
  value= 3;


  onInputChange(): void {
    this.responseChange.emit({ question: this.question || '', value: this.value });
  }

  ngOnInit(): void {
    this.value = this.response != undefined ? this.response : 3;
  }
}
