import {EntryContact} from "./contact.class";
import {Contact} from "ionic-native";


export class Entry {

  title: string;
  date: Date;
  content: string;
  images: string[];
  contacts: EntryContact[]


  constructor() {
    this.images = [];
    this.contacts = [];
  }

  addImage(uri: string): void {
    this.images.push(uri);
  }

  addContact(c :Contact) {
    let nums :string[] = [];

    if(c.phoneNumbers) {
      nums  = c.phoneNumbers.map( pn => pn.value);
    }

    this.contacts.push( new EntryContact(c.id, c.displayName, nums) )
  }

}
