import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from "@ionic/storage";
import {StoreService} from "./storage";
import {EntryContact} from "../model/contact.class";


/*
*   Service pour la gestion des contacts
*/
@Injectable()
export class ContactService {


  contacts: EntryContact[] = [];

  constructor(public http: Http, private storage: Storage, private store : StoreService) {
    this.store.entries.getValue().forEach(entry => {
      entry.contacts.forEach(
        contact => this.contacts.push(contact)
      );
    });

  }

}
