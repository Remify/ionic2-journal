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

  constructor(obj :any) {
    this.id = obj.id || undefined;
    this.displayName = obj.displayName || undefined;
    this.numbers = obj.numbers || [];
  }


}
