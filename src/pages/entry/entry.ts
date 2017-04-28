import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Entry} from '../../model/entry.class';
import {EditEntryPage} from "../edit-entry/edit-entry";
import { ContactService } from "../../providers/contact";
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


  // Push sur edit page (voir html)
  pushPage = EditEntryPage;
  // Object passé au NavController
  params;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService ) {
    this.entry = this.navParams.data.entry;
    this.params = {entry: this.entry};
  }


  showContact(id: string) {
  }


  getContactName(id:string) {
    let res = "";
    let contact = this.contactService.get(id);
    if(contact) {
      res = contact.displayName;
    }
    return res;
  }

}
