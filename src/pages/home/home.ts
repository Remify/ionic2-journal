import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {StoreService} from "../../providers/storage";
import {Entry} from "../../model/entry.class";
import {EntryPage} from "../entry/entry";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class EntriesPage {
  entries :any[];
  constructor(public navCtrl: NavController, private store:StoreService) {

    this.entries = [];
    // Souscription au store
    this.store.entries.subscribe(
      // Tri de l'entrée la plus récente
      entries =>  {
        this.entries = entries;
        this.entries.sort((a, b) => { return b.date.getTime() - a.date.getTime() });
      }
    )
  }

  showEntry(e :Entry ) {
    this.navCtrl.push(EntryPage, { entry : e})
  }

  gotoNewEntry() {
    this.navCtrl.parent.select(1);
  }

}
