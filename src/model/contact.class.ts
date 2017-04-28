/**
 * Created by bouguerr on 24/03/2017.
 */

/**
 * Contact pour les entrée
 */
export class EntryContact {

  id: string;
  displayName: string;
  numbers :string[];

  constructor(id:string, name:string, numbers :string[]) {
    this.id = id;
    this.displayName = name;
    this.numbers = numbers;
  }


}
