import { EntryContact } from "./contact.class";
import { Contact } from "@ionic-native/contacts";


export class Entry {

  title: string;
  date: Date;
  content: string;
  images: string[];
  contacts: EntryContact[];
  ville: string;


  constructor() {
    this.images = [];
    this.contacts = [];
  }

  addImage(uri: string): void {
    this.images.push(uri);
  }


  addContact(c: Contact) {
    let nums: string[] = [];

    // Récupère seulement les numéros pour les ajouter
    if (c.phoneNumbers) {
      nums = c.phoneNumbers.map(pn => pn.value);
    }

    // Ajout de EntryContact à la liste des contacts de l'entrée
    const contact = {id: c.id,displayName: c.displayName,numbers: nums};
    this.contacts.push(new EntryContact(contact));
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

}
