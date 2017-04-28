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


  addContact(c :Contact) {
    let nums :string[] = [];

    // Récupère seulement les numéros pour les ajouter
    if(c.phoneNumbers) {
      nums  = c.phoneNumbers.map( pn => pn.value);
    }

    // Ajout de EntryContact à la liste des contacts de l'entrée
    this.contacts.push( new EntryContact(c.id, c.displayName, nums) )
  }

}
