import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Entry} from "../../model/entry.class";
import {StoreService} from "../../providers/storage";

/*
  Generated class for the EditEntry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-entry',
  templateUrl: 'edit-entry.html'
})
export class EditEntryPage {

  entry: Entry;
  constructor(public navCtrl: NavController, public navParams: NavParams,private store :StoreService) {
    this.entry = this.navParams.data.entry;
    this.store.entries.subscribe(
      change => console.log('store changed')
    );
  }

  ionViewDidLoad() {

  }

}
