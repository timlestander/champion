import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'when'
})
export class WhenPipe implements PipeTransform {
  transform(value: Date, args?: any): any {
    return moment(value).fromNow();
  }
}
