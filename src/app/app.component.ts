import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {ContactService} from "../providers/contact";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, private sqlite :SQLite, private contactService : ContactService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();


      // Ouvre ou créer la base de donnée
      this.sqlite.create({
        name: 'journal.db',
        location: 'default'
      }).then((db: SQLiteObject) => {

        this.contactService.setDB(db);
        this.contactService.init();


      }).catch(e => console.log(e));
    });
  }
}
