import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Entry} from '../../model/entry.class';
import {EditEntryPage} from "../edit-entry/edit-entry";

/*
 Generated class for the Entry page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html'
})

export class EntryPage {

  @Input() entry: Entry;
  pushPage = EditEntryPage;
  params;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams)
    this.entry = this.navParams.data.entry;
    this.params = {entry: this.entry};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryPage');
  }

  showContact(id: string) {
    console.log('show contact id :' + id);
  }

  editEntry() {

  }

}
