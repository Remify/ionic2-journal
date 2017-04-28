import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EntryContact} from "../../model/contact.class";
import {ContactService} from "../../providers/contact";
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-contact',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  contacts: EntryContact[] = [];
  constructor(public navCtrl: NavController, private  contactService : ContactService,private call :CallNumber ) {

    this.contactService.contacts.subscribe(
      contacts => this.contacts = contacts
    );

  }
  callNumber(contact:EntryContact) {
    let number = contact.numbers;
    this.call.callNumber(number.toString(), true)
  }

  sendText() {
    console.log('send text');
  }

}
