import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";
import {StoreService} from "./storage";
import {EntryContact} from "../model/contact.class";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";


/*
 *   Service pour la gestion des contacts
 */
@Injectable()
export class ContactService {


  contacts: EntryContact[] = [];

  constructor(public http: Http, private storage: Storage, private store: StoreService, private sqlite: SQLite) {

    this.store.entries.getValue().forEach(entry => {
      entry.contacts.forEach(
        contact => this.contacts.push(contact)
      );
    });

    // Ouvre ou créer la base de donnée
    this.sqlite.create({
      name: 'journal.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

        /**
         * Numbers sera un tableau JSON.ToString()
         */
        const DB_QUERY = `CREATE TABLE contacts(
                          id INT PRIMARY KEY NOT NULL,
                          displayName VARCHAR(255),
                          numbers TEXT
                      )`;

        db.executeSql(DB_QUERY, {})
          .then(() => console.log('DATABASE CREATE'))
          .catch(e => console.log(e));


      })
      .catch(e => console.log(e));

  }

}
