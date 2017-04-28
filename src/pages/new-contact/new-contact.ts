import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ContactService } from "../../providers/contact";
import { EntryContact } from "../../model/contact.class";
import { NewEntryPage } from "../new-entry/new-entry"
import { Events } from 'ionic-angular';
/*
  Generated class for the NewContact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-contact',
  templateUrl: 'new-contact.html'
})
export class NewContactPage {
  displayName: string = "";
  number: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService,public viewCtrl :ViewController, public events: Events) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewContactPage');
  }

  onSubmit(form: any, event: Event) {
    event.preventDefault();

    let contact = new EntryContact({ displayName: this.displayName, numbers: [this.number] });
    this.addContact(contact);

  }

  addContact(contact: EntryContact) {

    this.contactService.add(contact).then(
      res => {
          this.events.publish('new:contact', {contact:res.insertId--})
          this.navCtrl.pop();
      }
    );

  }

}
