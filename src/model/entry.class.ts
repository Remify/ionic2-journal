import {EntryContact} from "./contact.class";
import {Contact} from "@ionic-native/contacts";


export class Entry {

  title: string;
  date: Date;
  content: string;
  images: string[];
  contacts: EntryContact[];
  ville :string;


  constructor() {
    this.images = [];
    this.contacts = [];
  }

  addImage(uri: string): void {
    this.images.push(uri);
  }

  addImageBase64(image :any) {

  }

  addContact(c :Contact) {
    let nums :string[] = [];

    if(c.phoneNumbers) {
      nums  = c.phoneNumbers.map( pn => pn.value);
    }

    this.contacts.push( new EntryContact(c.id, c.displayName, nums) )
  }

}
