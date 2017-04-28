import { Injectable, Pipe  } from '@angular/core';

/**
 * Dotdotdot Pipe.
 */
@Pipe({
  name: 'dotdotdot'
})
@Injectable()
export class Dotdotdot  {
  
  /**
   * Transform une string, coupe les 100 premiers caractères et ajoute des ...
   */
  transform(value, args) {
    value = value + ''; // change en string au cas ou
    return value.substring(0, 100) + ' ...';
  }
}
