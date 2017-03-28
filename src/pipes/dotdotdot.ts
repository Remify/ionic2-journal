import { Injectable, Pipe  } from '@angular/core';

/*
  Generated class for the Dotdotdot pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'dotdotdot'
})
@Injectable()
export class Dotdotdot  {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    console.log('dotodotdsot')
    value = value + ''; // make sure it's a string
    return value.substring(0, 50) + ' ...';
  }
}
