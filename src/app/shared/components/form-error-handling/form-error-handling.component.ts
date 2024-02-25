import { Component, Input } from '@angular/core';
import { FormErrorEnum } from '../../enums/form-error.enum';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-handling',
  templateUrl: './form-error-handling.component.html',
  styleUrls: ['./form-error-handling.component.scss'],
})
export class FormErrorHandlingComponent {
  @Input() control: AbstractControl | null | undefined ;
  @Input() errorMessages: any;
  FormErrorEnum = FormErrorEnum;
  constructor() {}
}
