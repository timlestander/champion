import { Pipe, PipeTransform } from '@angular/core';
import { ChampionInterface } from '../interfaces';
@Pipe({
  name: 'accepted'
})
export class AcceptedPipe implements PipeTransform {
  transform(value: ChampionInterface[], args?: any): any {
    return value.filter((x: ChampionInterface) => x.response === true);
  }
}
