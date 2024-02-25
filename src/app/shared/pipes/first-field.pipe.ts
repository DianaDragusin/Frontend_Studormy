import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstField'
})
export class FirstFieldPipe implements PipeTransform {

  transform(object: any): any {
    if (object === null || typeof object !== 'object' || Object.keys(object).length === 0) {
      return null;
    }
    const firstField = Object.keys(object)[0];
    return firstField;
  }

}
