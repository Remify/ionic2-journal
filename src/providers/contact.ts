import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";
import {StoreService} from "./storage";
import {EntryContact} from "../model/contact.class";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {isSuccess} from "@angular/http/src/http_utils";
import {BehaviorSubject} from "rxjs";


/*
 *   Service pour la gestion des contacts
 */
@Injectable()
export class ContactService {


  db :SQLiteObject;

  contacts: BehaviorSubject<EntryContact[]> = new BehaviorSubject([]);
  constructor(public http: Http, private storage: Storage, private store: StoreService, private sqlite: SQLite) {

  }

  add(c :EntryContact) :Promise<any> {
    const query = `INSERT INTO contacts (displayName, numbers) VALUES (
                  '${c.displayName}', '${ c.numbers.toString()}'
                  );`;

    let promise = this.db.executeSql(query, []);
    promise.then(success => this.updateAll());
    return promise;
  }

  get(id :string): EntryContact {
    console.log('contact id', id);
    return this.contacts.getValue().find(c => {
      console.log(c.id);
      return  c.id == id;
    });
  }

  updateAll() {
    let updatedContacts = [];

    this.getAll().then(results => {
      results.forEach(obj => {
        updatedContacts.push(new EntryContact(obj))
      });

      this.contacts.next(updatedContacts);
    });
  }

  getAll() : Promise<any> {

    let sql = 'SELECT * FROM contacts';
    return this.db.executeSql(sql, [])
      .then(response => {
        let contacts = [];

        for (let index = 0; index < response.rows.length; index++) {
          contacts.push( response.rows.item(index) );
        }
        return Promise.resolve( contacts );
      })
      .catch(error => Promise.reject(error));
  }


  setDB(db :SQLiteObject) {
    this.db = db;
  }

  init() {
    /**
     * Numbers sera un tableau JSON.ToString()
     */
    const DB_QUERY = `CREATE TABLE IF NOT EXISTS contacts(
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          displayName VARCHAR(255),
                          numbers TEXT
                      )`;

    this.db.executeSql(DB_QUERY, {})
      .then(() => {
        console.log('DATABASE CREATE');
        this.updateAll();
      })
      .catch(e => console.log(e));

  }


}
