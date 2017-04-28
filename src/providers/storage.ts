import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { Entry } from "../model/entry.class"

/*
 Generated class for the Store provider.
 TODO : Description probleme de perf du fonctionnement actuel
 */
@Injectable()
export class StoreService {
  /**
   * List des Entry
   * @type {BehaviorSubject}
   */
  entries: BehaviorSubject<Entry[]> = new BehaviorSubject([]);

  constructor(public http: Http, private storage: Storage) {

    console.log('storage service');

    // récupération en mémoire de la liste
    this.storage.get('entries').then(
      (value) => {
        if (value) {
          let arrInit = [];
          value.forEach(obj => {
            let e: Entry = Object.assign(new Entry(), obj);
            arrInit.push(e);
          });

          this.entries.next(arrInit);
        }

      }
    )
      .catch(e => console.log(e));

    // A chaque changement, la liste est enregistré
    this.entries.subscribe(
      (arr) => {
        if (arr.length > 0) {
          this.storage.set('entries', arr)
        }
      }
    )
  }

  /**
   * Retourne l'entry à l'index i
   * Si l'index n'existe pas , retourne null
   * @param id
   * @returns {any}
   */
  getEntry(i: number): Entry {
    if (typeof this.entries.getValue()[i] !== 'undefined') {
      return this.entries.getValue()[i]
    } else {
      return null
    }
  }


  getIndexOfEntry(e: Entry) {
    return this.entries.getValue().indexOf(e);
  }


  saveEntry(e: Entry) {
    let cacheArr = this.entries.getValue();
    cacheArr.push(e);
    this.entries.next(cacheArr);
  }

  /**
   * Update un index
   * retourne true si reussit, faux si echec
   */
  update(index: number, e: Entry) :boolean {
    // On vérifie si l'entrée que l'ont veut modifier existe dans la liste
    if (this.getEntry(index)) {
      console.log('in')
      const list = this.entries.getValue();
      list[index] = e;
      this.entries.next(list);
      return true;
    } else {
      return false;
    }
  }

  clear() {
    this.storage.clear();
  }

  delete(e :Entry) {
    const index = this.getIndexOfEntry(e);
    const newEntries = this.entries.getValue().filter(entry => entry !== e);
    this.entries.next(newEntries);
  }


}
