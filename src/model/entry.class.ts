/**
 * Created by bouguerr on 24/03/2017.
 */

export class Entry {

  title: string;
  date: Date;
  content: string;
  images: string[];
  contacts: string[]


  constructor() {
    this.images = [];
  }

  addImage(uri: string): void {
    this.images.push(uri);
  }

}
