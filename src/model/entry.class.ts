import { EntryContact } from "./contact.class";
import { Contact } from "@ionic-native/contacts";


export class Entry {

  title: string;
  date: Date;
  content: string;
  images: string[];
  contacts: string[];
  ville: string;


  constructor() {
    this.images = [];
    this.contacts = [];
  }

  addImage(uri: string): void {
    this.images.push(uri);
  }


  addContact(c: EntryContact) {

  }

  /**
   * Supprime la première image qui match l'uri donné
   * @param uri
   */
  deleteImage(uri: string) {
    let firstImageMatch = this.images.findIndex(entryUri => entryUri == uri);
    if (firstImageMatch >= 0) {
      this.images = this.images.splice(firstImageMatch, 1);
    }
  }

  clearPos() {
    this.ville = undefined;
  }

  clearContact(id:string) {
    this.contacts = this.contacts.filter(c => c !== id);
  }

}
