import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logs'
})
export class LogsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
